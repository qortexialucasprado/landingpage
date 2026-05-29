import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { resultadosItems } from "../resultadosMedia";

function usePrefersHover() {
  const prefersHover = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  return prefersHover;
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
  onActivate,
  onDeactivate,
}: {
  item: (typeof resultadosItems)[number];
  cardId: string;
  activeCardId: string | null;
  onActivate: (cardId: string) => void;
  onDeactivate: (cardId: string) => void;
}) {
  const isActive = activeCardId === cardId;

  return (
    <article className="relative mx-2 w-52 shrink-0 overflow-hidden rounded-lg border border-white/5 aspect-[3/4] sm:w-56 md:w-64 [content-visibility:auto]">
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
        />
      )}
      <div
        className="pointer-events-none absolute top-2 left-2 z-20 rounded px-2 py-1 text-[0.6rem] text-white backdrop-blur-sm"
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

  const handleActivate = useCallback((cardId: string) => {
    setActiveCardId(cardId);
  }, []);

  const handleDeactivate = useCallback((cardId: string) => {
    setActiveCardId((prev) => (prev === cardId ? null : prev));
  }, []);

  if (resultadosItems.length === 0) return null;

  const loopItems = [...resultadosItems, ...resultadosItems];

  return (
    <div
      className={`resultados-carousel mb-20 min-h-64 w-full overflow-hidden -mx-5 md:-mx-10 lg:-mx-20${activeCardId ? " is-video-playing" : ""}`}
      aria-label="Carrossel de resultados antes e depois"
    >
      <div className="flex w-max animate-resultados-scroll">
        {loopItems.map((item, idx) => {
          const cardId = `${item.src}::${idx}`;
          return (
            <MediaCard
              key={cardId}
              item={item}
              cardId={cardId}
              activeCardId={activeCardId}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
            />
          );
        })}
      </div>
    </div>
  );
}
