"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Box, type SxProps, type Theme } from "@mui/material";
import { type ReactNode } from "react";

const MotionBox = motion.create(Box);

type RevealProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  className?: string;
  id?: string;
  /** stagger delay in seconds */
  delay?: number;
  /** distance (px) the element rises from */
  y?: number;
  /** distance (px) the element slides in from horizontally */
  x?: number;
  /** how much of the element must be visible before it animates (0–1) */
  amount?: number;
  /** replay every time it scrolls into view instead of only once */
  replay?: boolean;
  /** animate immediately on mount instead of on scroll (use for hero/above-the-fold) */
  immediate?: boolean;
};

/**
 * Spring-based scroll reveal. Fades + rises (and optionally slides) its
 * children into place when they enter the viewport. Respects the user's
 * reduced-motion preference by rendering a plain Box with no animation.
 */
export default function Reveal({
  children,
  sx,
  className,
  id,
  delay = 0,
  y = 40,
  x = 0,
  amount = 0.2,
  replay = false,
  immediate = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Box sx={sx} className={className} id={id}>
        {children}
      </Box>
    );
  }

  const reveal = { opacity: 1, y: 0, x: 0 };
  const motionProps = immediate
    ? { animate: reveal }
    : { whileInView: reveal, viewport: { once: !replay, amount } };

  return (
    <MotionBox
      sx={sx}
      className={className}
      id={id}
      initial={{ opacity: 0, y, x }}
      {...motionProps}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay }}
    >
      {children}
    </MotionBox>
  );
}
