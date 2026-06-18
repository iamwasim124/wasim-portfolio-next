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
 * pauses while the user is dragging and resumes afterwards.
 */
export default function AutoScroller({
  children,
  speed = 0.5,
  sx,
}: AutoScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      // pause while the user is hovering (reading) or dragging
      if (el && !hovering.current && !drag.current.active) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

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
    drag.current.active = false;
  };

  return (
    <Box
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
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
