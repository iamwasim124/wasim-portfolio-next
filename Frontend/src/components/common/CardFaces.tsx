"use client";

import { forwardRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Email, Phone, LinkedIn, Language } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import theme from "@/theme/theme";
import { cardData as CARD, type CardContactIcon } from "@/data/card";

const C = theme.palette;
const ACCENT = `linear-gradient(135deg, ${C.primary.main}, ${C.secondary.main})`;

// fixed design size — the card is captured at this size for crisp exports
export const CARD_W = 400;
export const CARD_H = Math.round(CARD_W / 1.62);

const contactIcons: Record<CardContactIcon, React.ReactNode> = {
  website: <Language fontSize="small" />,
  email: <Email fontSize="small" />,
  phone: <Phone fontSize="small" />,
  linkedin: <LinkedIn fontSize="small" />,
};

const faceSx = {
  position: "relative",
  width: CARD_W,
  height: CARD_H,
  borderRadius: "20px",
  overflow: "hidden",
  border: `1px solid ${alpha(C.common.white, 0.12)}`,
  boxShadow: `0 24px 70px ${alpha(C.common.black, 0.55)}`,
  display: "flex",
} as const;

/** Front face — photo banner + identity. Capture-ready (CSS background image). */
export const CardFront = forwardRef<HTMLDivElement>(function CardFront(_, ref) {
  return (
    <Box ref={ref} sx={{ ...faceSx, bgcolor: C.background.default }}>
      <Box
        role="img"
        aria-label="Mohammed Wasim — React & Next.js freelancer"
        sx={{
          position: "absolute",
          top: "-40px",
          left: "85px",
          width: CARD_W,
          bottom: 0,
          backgroundImage: `url(${CARD.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${alpha(C.background.default, 0.15)} 63%, ${alpha(C.background.default, 0.55)} 75%, ${alpha(C.background.default, 0.96)} 100%)`,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: 10,
          left: 14,
          zIndex: 1,
          width: 54,
          height: 54,
          backgroundImage: "url(/assets/images-videos/logo-transparent.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2.5,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            alignSelf: "flex-start",
            px: 1.2,
            py: 0.1,
            mb: 1,
            borderRadius: "999px",
            lineHeight: 1.8,
            fontWeight: 700,
            color: C.background.default,
            background: ACCENT,
          }}
        >
          Freelancer
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, lineHeight: 1.1, color: C.text.primary }}
        >
          {CARD.name}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: C.text.primary, mt: 0.4 }}
        >
          {CARD.specialty}
        </Typography>
        <Typography
          variant="caption"
          component="p"
          sx={{ fontWeight: 600, color: C.primary.main, mt: 0.2 }}
        >
          {CARD.role}
        </Typography>
      </Box>
    </Box>
  );
});

/** Back face — CTA, services, contacts, QR. Capture-ready. */
export const CardBack = forwardRef<HTMLDivElement>(function CardBack(_, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        ...faceSx,
        flexDirection: "column",
        p: 2.5,
        background: `linear-gradient(135deg, ${C.surface.dark3} 0%, ${C.background.default} 55%, ${C.surface.dark2} 100%)`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -50,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(C.primary.main, 0.2)} 0%, transparent 70%)`,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            lineHeight: 1.2,
            background: ACCENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {CARD.cta}
        </Typography>
        <Typography
          variant="body4"
          sx={{ color: C.text.primary, mt: 0.3, fontWeight: 600 }}
        >
          {CARD.ctaSub}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mt: 1.2 }}>
          {CARD.services.map((s) => (
            <Typography
              key={s}
              variant="body4"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: "999px",
                lineHeight: 1.4,
                fontWeight: 600,
                color: C.text.primary,
                border: `1px solid ${alpha(C.common.white, 0.12)}`,
              }}
            >
              {s}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          mt: "auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
          {CARD.contacts.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                typography: "body4",
                fontWeight: 600,
                wordBreak: "break-word",
                color: C.text.primary,
                "& svg": { color: C.primary.main },
              }}
            >
              {contactIcons[c.icon]}
              {c.label}
            </Link>
          ))}
        </Box>
        <Box sx={{ textAlign: "center", flexShrink: 0 }}>
          <Box
            sx={{
              bgcolor: C.text.primary,
              p: "5px",
              borderRadius: "10px",
              lineHeight: 0,
            }}
          >
            <QRCodeSVG
              value={CARD.websiteUrl}
              size={74}
              bgColor={C.text.primary}
              fgColor={C.background.default}
              level="M"
            />
          </Box>
          <Typography
            variant="overline"
            component="p"
            sx={{ mt: 0.5, lineHeight: 1.4, color: C.text.primary }}
          >
            Scan to visit
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
