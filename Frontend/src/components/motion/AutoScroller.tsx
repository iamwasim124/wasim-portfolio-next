"use client";

import { Box, type SxProps, type Theme } from "@mui/material";
import { useEffect, useRef, type ReactNode } from "react";

type AutoScrollerProps = {
  children: ReactNode;
  /** px moved per animation frame */
  speed?: number;
  sx?: SxProps<Theme>;
};

/**
 * Horizontal auto-scrolling strip that is also drag/swipe-able. Children should
 * be duplicated (e.g. [...items, ...items]) for a seamless loop. Auto-scroll
 * pauses while the user is dragging (or hovering with a mouse) and resumes
 * afterwards.
 */
export default function AutoScroller({
  children,
  speed = 0.5,
  sx,
}: AutoScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  // touch has no "hover", and native scroll handover fires pointercancel — so we
  // track touch separately and pause while a finger is down (the mobile
  // equivalent of hovering to read).
  const touching = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  // float position accumulator — mobile rounds scrollLeft to an integer, so a
  // sub-pixel `scrollLeft += speed` never advances. We track the exact position
  // ourselves and assign it each frame instead of reading it back.
  const pos = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    pos.current = el.scrollLeft;
    let raf = 0;
    const step = () => {
      // pause while the user is hovering (reading), touching, or dragging
      if (el && !hovering.current && !touching.current && !drag.current.active) {
        const half = el.scrollWidth / 2;
        pos.current += speed;
        if (half > 0 && pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [speed]);

  const onTouchStart = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    touching.current = true;
  };

  const onTouchEnd = () => {
    const el = ref.current;
    // resume from wherever native scroll/momentum left it, after a short pause
    // so the strip doesn't immediately slide out from under the finger
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (ref.current) pos.current = ref.current.scrollLeft;
      touching.current = false;
    }, 1200);
    if (el) pos.current = el.scrollLeft;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft =
      drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    const el = ref.current;
    drag.current.active = false;
    // resume auto-scroll from wherever the user left it
    if (el) pos.current = el.scrollLeft;
  };

  return (
    <Box
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      // hover-pause is mouse-only — a touch must not leave it paused forever
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hovering.current = false;
        endDrag();
      }}
      sx={{
        display: "flex",
        gap: 3,
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        cursor: "grab",
        userSelect: "none",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
        "&:active": { cursor: "grabbing" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
