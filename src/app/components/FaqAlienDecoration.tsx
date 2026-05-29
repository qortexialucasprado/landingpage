import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import alienIcon from "../../imports/Html→Body/alien-png-icon-406x500a.png";

const HIDDEN_CLIP = "inset(100% 100% 100% 100%)";

function clipToSection(rect: DOMRect): string {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (rect.bottom <= 0 || rect.top >= vh || rect.right <= 0 || rect.left >= vw) {
    return HIDDEN_CLIP;
  }

  const top = Math.max(0, rect.top);
  const left = Math.max(0, rect.left);
  const right = Math.max(0, vw - rect.right);
  const bottom = Math.max(0, vh - rect.bottom);

  return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
}

export function FaqAlienDecoration({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const [clipPath, setClipPath] = useState(HIDDEN_CLIP);

  const updateClip = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    setClipPath(clipToSection(section.getBoundingClientRect()));
  }, [sectionRef]);

  useEffect(() => {
    updateClip();
    window.addEventListener("scroll", updateClip, { passive: true });
    window.addEventListener("resize", updateClip);
    return () => {
      window.removeEventListener("scroll", updateClip);
      window.removeEventListener("resize", updateClip);
    };
  }, [updateClip]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ clipPath }}
      aria-hidden
    >
      <img
        src={alienIcon}
        alt=""
        className="absolute right-0 top-1/2 h-auto w-[280px] -translate-y-1/2 translate-x-1/4 opacity-[0.12] sm:w-[340px] md:w-[406px] md:opacity-[0.15] lg:translate-x-0"
      />
    </div>
  );
}
