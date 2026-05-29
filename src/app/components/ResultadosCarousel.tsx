import { useCallback, useEffect, useRef, useState } from "react";
import { resultadosItems } from "../resultadosMedia";

function CarouselVideo({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const posterTimeRef = useRef(0.1);
  const [isHovered, setIsHovered] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  const seekToPosterFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const time =
      Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(0.2, video.duration * 0.02)
        : 0.1;

    posterTimeRef.current = time;
    video.currentTime = time;
  }, []);

  const loadPosterFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || loadedRef.current) return;

    loadedRef.current = true;
    video.src = src;
    video.preload = "metadata";

    const markPosterReady = () => {
      video.pause();
      setPosterReady(true);
    };

    const handleLoadedData = () => {
      seekToPosterFrame();
      window.setTimeout(() => {
        if (video.readyState >= 2) {
          markPosterReady();
        }
      }, 400);
    };

    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    video.addEventListener("seeked", markPosterReady, { once: true });
  }, [src, seekToPosterFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadPosterFrame();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [loadPosterFrame]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (!video) return;

    if (!loadedRef.current) {
      loadPosterFrame();
    }

    void video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (!video || !loadedRef.current) return;

    video.pause();
    video.currentTime = posterTimeRef.current;
  };

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;

      const video = videoRef.current;
      if (!video) return;

      video.pause();
      if (loadedRef.current) {
        video.currentTime = posterTimeRef.current;
      }
      setIsHovered(false);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full cursor-pointer"
      style={{ backgroundColor: "var(--clr-surface)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          style={{
            color: "var(--clr-text-disabled)",
            backgroundColor: posterReady
              ? "rgba(5, 13, 26, 0.35)"
              : "transparent",
          }}
          aria-hidden
        >
          <iconify-icon icon="solar:play-circle-linear" width="40" />
        </div>
      )}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        style={{ opacity: posterReady ? 1 : 0 }}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title}
      />
    </div>
  );
}

function MediaCard({ item }: { item: (typeof resultadosItems)[number] }) {
  return (
    <article className="relative mx-2 w-52 shrink-0 overflow-hidden rounded-lg border border-white/5 aspect-[3/4] sm:w-56 md:w-64 [content-visibility:auto]">
      {item.type === "video" ? (
        <CarouselVideo src={item.src} title={item.title} />
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
  if (resultadosItems.length === 0) return null;

  const loopItems = [...resultadosItems, ...resultadosItems];

  return (
    <div
      className="resultados-carousel mb-20 min-h-64 w-full overflow-hidden -mx-5 md:-mx-10 lg:-mx-20"
      aria-label="Carrossel de resultados antes e depois"
    >
      <div className="flex w-max animate-resultados-scroll">
        {loopItems.map((item, idx) => (
          <MediaCard key={`${item.src}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}
