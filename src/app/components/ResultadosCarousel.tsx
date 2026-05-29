import {
  createContext,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { resultadosItems } from "../resultadosMedia";

const SCROLL_DURATION_S = 200;
const DRAG_THRESHOLD_PX = 8;

function isCardHiddenInViewport(
  card: HTMLElement,
  viewport: HTMLElement,
): boolean {
  const cardRect = card.getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();

  return (
    cardRect.right <= viewportRect.left ||
    cardRect.left >= viewportRect.right
  );
}

type CarouselInteractionContextValue = {
  suppressNextClick: () => void;
  consumeSuppressedClick: () => boolean;
};

const CarouselInteractionContext =
  createContext<CarouselInteractionContextValue | null>(null);

function useCarouselInteraction() {
  return useContext(CarouselInteractionContext);
}

function usePrefersHover() {
  return useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
}

function useInfiniteCarouselScroll({
  paused,
}: {
  paused: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const prefersHover = usePrefersHover();
  const isHoveringRef = useRef(false);
  const pausedRef = useRef(paused);
  const [isDragging, setIsDragging] = useState(false);

  pausedRef.current = paused;

  const normalizeOffset = useCallback((offset: number) => {
    const half = halfWidthRef.current;
    if (half <= 0) return offset;

    let next = offset;
    while (next < -half) next += half;
    while (next > 0) next -= half;
    return next;
  }, []);

  const applyOffset = useCallback(
    (offset: number) => {
      const normalized = normalizeOffset(offset);
      offsetRef.current = normalized;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${normalized}px, 0, 0)`;
      }
    },
    [normalizeOffset],
  );

  const measureHalfWidth = useCallback(() => {
    if (!trackRef.current) return;
    halfWidthRef.current = trackRef.current.scrollWidth / 2;
  }, []);

  useEffect(() => {
    measureHalfWidth();
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(measureHalfWidth);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measureHalfWidth]);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const tick = (time: number) => {
      const last = lastFrameRef.current ?? time;
      lastFrameRef.current = time;
      const dt = (time - last) / 1000;

      const shouldAutoScroll =
        !isDraggingRef.current &&
        !pausedRef.current &&
        !(prefersHover.current && isHoveringRef.current) &&
        halfWidthRef.current > 0;

      if (shouldAutoScroll) {
        const speed = halfWidthRef.current / SCROLL_DURATION_S;
        applyOffset(offsetRef.current - speed * dt);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [applyOffset]);

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    pointerIdRef.current = null;
    setIsDragging(false);
  }, []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (prefersReducedMotion.current) return;

    measureHalfWidth();
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    pointerIdRef.current = e.pointerId;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [measureHalfWidth]);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) {
        return;
      }

      const delta = e.clientX - dragStartXRef.current;
      if (!didDragRef.current && Math.abs(delta) >= DRAG_THRESHOLD_PX) {
        didDragRef.current = true;
      }

      if (didDragRef.current) {
        applyOffset(dragStartOffsetRef.current + delta);
      }
    },
    [applyOffset],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== e.pointerId) return;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      endDrag();
    },
    [endDrag],
  );

  const onPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== e.pointerId) return;
      endDrag();
    },
    [endDrag],
  );

  const onMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  return {
    trackRef,
    isDragging,
    didDragRef,
    prefersReducedMotion: prefersReducedMotion.current,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onMouseEnter,
    onMouseLeave,
  };
}

function CarouselVideo({
  cardId,
  src,
  title,
  poster,
  isActive,
  onActivate,
  onDeactivate,
}: {
  cardId: string;
  src: string;
  title: string;
  poster?: string;
  isActive: boolean;
  onActivate: (cardId: string) => void;
  onDeactivate: (cardId: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const prefersHover = usePrefersHover();
  const carouselInteraction = useCarouselInteraction();

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!loadedRef.current) {
      video.src = src;
      loadedRef.current = true;
    }

    void video.play().catch(() => {});
  }, [src]);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (loadedRef.current) {
      video.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      playVideo();
    } else {
      stopVideo();
    }
  }, [isActive, playVideo, stopVideo]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      onDeactivate(cardId);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [cardId, onDeactivate]);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (carouselInteraction?.consumeSuppressedClick()) return;

    if (isActive) {
      onDeactivate(cardId);
    } else {
      onActivate(cardId);
    }
  };

  const handleMouseEnter = () => {
    if (!prefersHover.current) return;
    onActivate(cardId);
  };

  const handleMouseLeave = () => {
    if (!prefersHover.current) return;
    onDeactivate(cardId);
  };

  if (poster) {
    return (
      <button
        type="button"
        className="relative h-full w-full cursor-pointer border-0 bg-[var(--clr-surface)] p-0"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={
          isActive ? `Pausar vídeo: ${title}` : `Reproduzir vídeo: ${title}`
        }
        aria-pressed={isActive}
      >
        <img
          src={poster}
          alt={title}
          className={`h-full w-full object-cover transition-opacity duration-200 ${isActive ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {!isActive && (
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            style={{
              color: "var(--clr-text-disabled)",
              backgroundColor: "rgba(5, 13, 26, 0.35)",
            }}
            aria-hidden
          >
            <iconify-icon icon="solar:play-circle-linear" width="40" />
          </div>
        )}
        <video
          ref={videoRef}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden={!isActive}
        />
      </button>
    );
  }

  return (
    <CarouselVideoFallback
      cardId={cardId}
      src={src}
      title={title}
      isActive={isActive}
      onActivate={onActivate}
      onDeactivate={onDeactivate}
    />
  );
}

function CarouselVideoFallback({
  cardId,
  src,
  title,
  isActive,
  onActivate,
  onDeactivate,
}: {
  cardId: string;
  src: string;
  title: string;
  isActive: boolean;
  onActivate: (cardId: string) => void;
  onDeactivate: (cardId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const [posterReady, setPosterReady] = useState(false);
  const prefersHover = usePrefersHover();
  const carouselInteraction = useCarouselInteraction();

  const loadPosterFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || loadedRef.current) return;

    loadedRef.current = true;
    video.src = src;
    video.preload = "metadata";

    const markReady = () => {
      video.pause();
      setPosterReady(true);
    };

    video.addEventListener(
      "loadeddata",
      () => {
        video.currentTime = 0.1;
        window.setTimeout(markReady, 400);
      },
      { once: true },
    );
    video.addEventListener("seeked", markReady, { once: true });
  }, [src]);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!loadedRef.current) {
      loadPosterFrame();
    }
    void video.play().catch(() => {});
  }, [loadPosterFrame]);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (loadedRef.current) {
      video.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      playVideo();
    } else {
      stopVideo();
    }
  }, [isActive, playVideo, stopVideo]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadPosterFrame();
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [loadPosterFrame]);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (carouselInteraction?.consumeSuppressedClick()) return;

    if (isActive) {
      onDeactivate(cardId);
    } else {
      onActivate(cardId);
    }
  };

  const handleMouseEnter = () => {
    if (!prefersHover.current) return;
    onActivate(cardId);
  };

  const handleMouseLeave = () => {
    if (!prefersHover.current) return;
    onDeactivate(cardId);
  };

  return (
    <button
      type="button"
      className="relative h-full w-full cursor-pointer border-0 bg-[var(--clr-surface)] p-0"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={
        isActive ? `Pausar vídeo: ${title}` : `Reproduzir vídeo: ${title}`
      }
      aria-pressed={isActive}
    >
      <div ref={containerRef} className="absolute inset-0" aria-hidden />
      {!posterReady && !isActive && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ color: "var(--clr-text-disabled)" }}
        >
          <iconify-icon icon="solar:play-circle-linear" width="40" />
        </div>
      )}
      {!isActive && posterReady && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          style={{
            color: "var(--clr-text-disabled)",
            backgroundColor: "rgba(5, 13, 26, 0.35)",
          }}
          aria-hidden
        >
          <iconify-icon icon="solar:play-circle-linear" width="40" />
        </div>
      )}
      <video
        ref={videoRef}
        className="pointer-events-none h-full w-full object-cover"
        style={{ opacity: posterReady || isActive ? 1 : 0 }}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={!isActive}
      />
    </button>
  );
}

function MediaCard({
  item,
  cardId,
  activeCardId,
  viewportRef,
  onActiveCardElementChange,
  onActivate,
  onDeactivate,
}: {
  item: (typeof resultadosItems)[number];
  cardId: string;
  activeCardId: string | null;
  viewportRef: RefObject<HTMLDivElement | null>;
  onActiveCardElementChange: (element: HTMLElement | null) => void;
  onActivate: (cardId: string) => void;
  onDeactivate: (cardId: string) => void;
}) {
  const isActive = activeCardId === cardId;
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || item.type !== "video") {
      onActiveCardElementChange(null);
      return;
    }

    onActiveCardElementChange(articleRef.current);
    return () => onActiveCardElementChange(null);
  }, [isActive, item.type, onActiveCardElementChange]);

  useEffect(() => {
    if (!isActive || item.type !== "video") return;

    const article = articleRef.current;
    const viewport = viewportRef.current;
    if (!article || !viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          onDeactivate(cardId);
        }
      },
      { root: viewport, threshold: 0 },
    );

    observer.observe(article);
    return () => observer.disconnect();
  }, [cardId, isActive, item.type, onDeactivate, viewportRef]);

  return (
    <article
      ref={articleRef}
      data-carousel-card={cardId}
      className="relative mx-2 w-52 shrink-0 overflow-hidden rounded-lg border border-white/5 aspect-[3/4] sm:w-56 md:w-64 [content-visibility:auto]"
    >
      {item.type === "video" ? (
        <CarouselVideo
          cardId={cardId}
          src={item.src}
          title={item.title}
          poster={item.poster}
          isActive={isActive}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )}
      <div
        className="pointer-events-none absolute top-2 left-2 z-20 rounded px-2 py-1 text-xs md:text-[0.6rem] text-white backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(5, 13, 26, 0.8)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {item.title.toUpperCase()}
      </div>
    </article>
  );
}

export function ResultadosCarousel() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const suppressClickRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeCardElementRef = useRef<HTMLElement | null>(null);

  const handleActivate = useCallback((cardId: string) => {
    setActiveCardId(cardId);
  }, []);

  const handleDeactivate = useCallback((cardId: string) => {
    setActiveCardId((prev) => (prev === cardId ? null : prev));
  }, []);

  const handleActiveCardElementChange = useCallback(
    (element: HTMLElement | null) => {
      activeCardElementRef.current = element;
    },
    [],
  );

  const pauseActiveVideoIfHidden = useCallback(() => {
    const cardId = activeCardId;
    const viewport = viewportRef.current;
    const card = activeCardElementRef.current;
    if (!cardId || !viewport || !card) return;

    if (isCardHiddenInViewport(card, viewport)) {
      handleDeactivate(cardId);
    }
  }, [activeCardId, handleDeactivate]);

  const scroll = useInfiniteCarouselScroll({
    paused: Boolean(activeCardId),
  });

  const interactionValue = useMemo<CarouselInteractionContextValue>(
    () => ({
      suppressNextClick: () => {
        suppressClickRef.current = true;
      },
      consumeSuppressedClick: () => {
        if (!suppressClickRef.current) return false;
        suppressClickRef.current = false;
        return true;
      },
    }),
    [],
  );

  if (resultadosItems.length === 0) return null;

  const loopItems = [...resultadosItems, ...resultadosItems];

  const carouselClassName = [
    "resultados-carousel mb-20 min-h-64 w-full -mx-5 md:-mx-10 lg:-mx-20",
    activeCardId ? "is-video-playing" : "",
    scroll.isDragging ? "is-dragging" : "",
    scroll.prefersReducedMotion ? "overflow-x-auto" : "overflow-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CarouselInteractionContext.Provider value={interactionValue}>
      <div
        ref={viewportRef}
        className={carouselClassName}
        aria-label="Carrossel de resultados antes e depois"
        onPointerDown={scroll.onPointerDown}
        onPointerMove={(e) => {
          scroll.onPointerMove(e);
          if (scroll.didDragRef.current) {
            pauseActiveVideoIfHidden();
          }
        }}
        onPointerUp={(e) => {
          const wasDrag = scroll.didDragRef.current;
          scroll.onPointerUp(e);
          if (wasDrag) {
            suppressClickRef.current = true;
          }
          pauseActiveVideoIfHidden();
        }}
        onPointerCancel={scroll.onPointerCancel}
        onMouseEnter={scroll.onMouseEnter}
        onMouseLeave={scroll.onMouseLeave}
        style={{ touchAction: scroll.prefersReducedMotion ? "pan-x" : "none" }}
      >
        <div
          ref={scroll.trackRef}
          className={`flex w-max ${scroll.prefersReducedMotion ? "" : "will-change-transform"}`}
        >
          {loopItems.map((item, idx) => {
            const cardId = `${item.src}::${idx}`;
            return (
              <MediaCard
                key={cardId}
                item={item}
                cardId={cardId}
                activeCardId={activeCardId}
                viewportRef={viewportRef}
                onActiveCardElementChange={handleActiveCardElementChange}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              />
            );
          })}
        </div>
      </div>
    </CarouselInteractionContext.Provider>
  );
}
