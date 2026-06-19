"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Link,
} from "@mui/material";
import {
  BadgeOutlined,
  Close,
  Email,
  Phone,
  LinkedIn,
  Language,
  Cached,
  Download,
} from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { alpha } from "@mui/material/styles";
import Image from "next/image";
import theme from "@/theme/theme";
import { cardData as CARD, type CardContactIcon } from "@/data/card";
import { CardFront, CardBack } from "@/components/common/CardFaces";

// resolve a contact icon key to its MUI icon
const contactIcons: Record<CardContactIcon, React.ReactNode> = {
  website: <Language fontSize="small" />,
  email: <Email fontSize="small" />,
  phone: <Phone fontSize="small" />,
  linkedin: <LinkedIn fontSize="small" />,
};

// colors sourced from the theme palette
const C = theme.palette;
const ACCENT = `linear-gradient(135deg, ${C.primary.main}, ${C.secondary.main})`;

// The card is built at a fixed design size, then uniformly scaled down to fit
// small screens — so the layout never reflows or clips.
const DESIGN_W = 400;
const DESIGN_H = DESIGN_W / 1.62;

export default function BusinessCardModal({
  triggerSx,
}: {
  triggerSx?: object;
}) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [scale, setScale] = useState(1);

  // shrink the card to fit the viewport (matches the wrapper's max width below)
  useEffect(() => {
    if (!open) return;
    const update = () =>
      setScale(Math.min(1, (window.innerWidth - 40) / DESIGN_W));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setFlipped(false), 250);
  };

  // hidden node holding BOTH faces — captured as a single PNG on download.
  // (Mobile browsers block a second programmatic download, so one file only.)
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // decode an image up-front so html-to-image can embed it on capture
  const preload = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new window.Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
    });

  const downloadCard = async () => {
    const node = cardRef.current;
    if (!node) return;
    setDownloading(true);
    try {
      // make sure the banner + logo are decoded before we snapshot the DOM
      await Promise.all([
        preload(CARD.banner),
        preload("/assets/images-videos/logo-transparent.png"),
      ]);
      const opts = { pixelRatio: 3, backgroundColor: C.background.default };
      // Safari / mobile often drop background-images on the first pass — run a
      // couple of warm-up captures and keep the final, fully-rendered one.
      await toPng(node, opts);
      await toPng(node, opts);
      const dataUrl = await toPng(node, opts);
      const a = document.createElement("a");
      a.download = "mohammed-wasim-visiting-card.png";
      a.href = dataUrl;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const faceSx = {
    position: "absolute",
    inset: 0,
    borderRadius: "20px",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    border: `1px solid ${alpha(C.common.white, 0.12)}`,
    boxShadow: `0 24px 70px ${alpha(C.common.black, 0.55)}`,
    display: "flex",
  } as const;

  return (
    <>
      <Tooltip title="My visiting card" arrow>
        <IconButton
          aria-label="Open my visiting card"
          onClick={() => setOpen(true)}
          sx={{
            color: C.primary.main,
            transition: "all .3s ease",
            "&:hover": { transform: "translateY(-3px)" },
            ...triggerSx,
          }}
        >
          <BadgeOutlined />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        slotProps={{
          backdrop: {
            sx: { backgroundColor: alpha(C.common.black, 0.8) },
          },
          paper: {
            sx: {
              bgcolor: "transparent",
              boxShadow: "none",
              overflow: "visible",
              m: 2,
            },
          },
        }}
      >
        {/* Close */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton
            aria-label="Close visiting card"
            onClick={handleClose}
            size="small"
            sx={{
              color: C.text.primary,
              bgcolor: alpha(C.common.white, 0.08),
              "&:hover": { bgcolor: alpha(C.common.white, 0.18) },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* Footprint — responsive box the scaled card fits into */}
        <Box
          sx={{
            position: "relative",
            mx: "auto",
            width: "min(400px, calc(100vw - 40px))",
            aspectRatio: "1.62 / 1",
          }}
        >
          {/* Scaler — fixed design size, scaled down to fit (out of flow) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: DESIGN_W,
              height: DESIGN_H,
              perspective: "1600px",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          >
            <Box
              onClick={() => setFlipped((f) => !f)}
              role="button"
              aria-label="Flip visiting card"
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transition: "transform .8s cubic-bezier(.4,.2,.2,1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* ---------- FRONT: banner image ---------- */}
              <Box
                sx={{
                  ...faceSx,
                  bgcolor: C.background.default,
                  // iOS Safari ignores backface-visibility with overflow:hidden,
                  // so also hide the off-face via opacity at the flip midpoint.
                  opacity: flipped ? 0 : 1,
                  transition: "opacity 0s linear 0.4s",
                }}
              >
                {/* Banner photo */}
                <Image
                  src={CARD.banner}
                  alt="Mohammed Wasim — React & Next.js freelancer"
                  fill
                  sizes="400px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                    top: "-40px",
                    minHeight: "fit-content",
                    left: "85px",
                  }}
                  priority
                />
                {/* Readability gradient */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, ${alpha(C.background.default, 0.15)} 63%, ${alpha(C.background.default, 0.55)} 75%, ${alpha(C.background.default, 0.96)} 100%)`,
                  }}
                />

                {/* Logo top-left */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    zIndex: 1,
                    width: 54,
                    height: 54,
                    backgroundImage:
                      "url(/assets/images-videos/logo-transparent.png)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />

                {/* Overlaid identity */}
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
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: C.text.primary,
                    }}
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

                <Typography
                  variant="overline"
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 12,
                    zIndex: 1,
                    lineHeight: 1,
                    color: alpha(C.common.white, 0.5),
                  }}
                >
                  Tap to flip ⟳
                </Typography>
              </Box>

              {/* ---------- BACK: data only ---------- */}
              <Box
                sx={{
                  ...faceSx,
                  transform: "rotateY(180deg)",
                  p: 2.5,
                  flexDirection: "column",
                  background: `linear-gradient(135deg, ${C.surface.dark3} 0%, ${C.background.default} 55%, ${C.surface.dark2} 100%)`,
                  // shows only after the flip passes its midpoint (iOS fix)
                  opacity: flipped ? 1 : 0,
                  transition: "opacity 0s linear 0.4s",
                }}
              >
                {/* glow accent */}
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

                {/* CTA */}
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

                  {/* services */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.6,
                      mt: 1.2,
                    }}
                  >
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

                {/* contacts + QR */}
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
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.7 }}
                  >
                    {CARD.contacts.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        target={
                          c.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          c.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
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
                          "&:hover": { color: C.primary.main },
                        }}
                      >
                        {contactIcons[c.icon]}
                        {c.label}
                      </Link>
                    ))}
                  </Box>

                  {/* QR of the website */}
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
                      sx={{
                        typography: "body4",
                        mt: 0.5,
                        lineHeight: 1.4,
                        color: C.text.primary,
                      }}
                    >
                      Scan to visit
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {/* Flip control */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={() => setFlipped((f) => !f)}
              startIcon={<Cached />}
              variant="outlined"
              size="small"
              sx={{
                color: C.text.primary,
                borderColor: alpha(C.common.white, 0.3),
                "&:hover": {
                  borderColor: C.primary.main,
                  bgcolor: alpha(C.primary.main, 0.08),
                },
              }}
            >
              {flipped ? "Front" : "Back"}
            </Button>
          </Box>

          {/* Download both faces as one image */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
            <Button
              onClick={downloadCard}
              disabled={downloading}
              startIcon={<Download fontSize="small" />}
              size="small"
              sx={{
                textTransform: "none",
                color: alpha(C.common.white, 0.75),
                fontWeight: 600,
                "&:hover": { color: C.primary.main },
              }}
            >
              {downloading ? "Preparing…" : "Download card"}
            </Button>
          </Box>
        </Box>

        {/* Hidden export node — both faces stacked, captured as one image */}
        <Box
          aria-hidden="true"
          sx={{
            position: "fixed",
            left: "-99999px",
            top: 0,
            pointerEvents: "none",
          }}
        >
          <Box
            ref={cardRef}
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              gap: 3,
              p: 3,
              bgcolor: C.background.default,
            }}
          >
            <CardFront />
            <CardBack />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
