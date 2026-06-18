"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box, Button, Typography, Link, Stack } from "@mui/material";
import {
  Download,
  Email,
  Phone,
  LinkedIn,
  Language,
} from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import theme from "@/theme/theme";
import { cardData as CARD, type CardContactIcon } from "@/data/card";

// resolve a contact icon key to its MUI icon
const contactIcons: Record<CardContactIcon, ReactNode> = {
  website: <Language fontSize="small" />,
  email: <Email fontSize="small" />,
  phone: <Phone fontSize="small" />,
  linkedin: <LinkedIn fontSize="small" />,
};

// colors sourced from the theme palette
const C = theme.palette;
const ACCENT = `linear-gradient(135deg, ${C.primary.main}, ${C.secondary.main})`;

// On-screen px size of the card (matches the site's modal). The PNG export
// upscales this with pixelRatio for crisp, print-ready output.
const W = 400;
const H = Math.round(W / 1.62);

const faceSx = {
  position: "relative",
  width: W,
  height: H,
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
  display: "flex",
} as const;

// Renders the fixed-size card scaled down to fit small screens. The card (with
// its download ref) stays at full design size inside — only the wrapper scales,
// so PNG exports keep full resolution.
function CardFrame({
  scale,
  children,
}: {
  scale: number;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: `min(${W}px, calc(100vw - 40px))`,
        aspectRatio: `${W} / ${H}`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function VisitingCardPage() {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  // shrink each card to fit narrow screens (matches CardFrame's max width)
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth - 40) / W));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const downloadPng = async (
    ref: React.RefObject<HTMLDivElement | null>,
    filename: string,
  ) => {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, {
      pixelRatio: 5, // 400px → 2000px wide ≈ print quality
      cacheBust: true,
      backgroundColor: "#0a0e1a",
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#070b14",
        color: "#fff",
        py: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {/* Toolbar (hidden when printing) */}
      <Box className="no-print" sx={{ textAlign: "center", maxWidth: 640 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Visiting Card — Download
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
          Download each side as a high-resolution PNG
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => downloadPng(frontRef, "visiting-card-front.png")}
            sx={{ bgcolor: theme.palette.primary.main, color: "#0a0e1a" }}
          >
            Front PNG
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => downloadPng(backRef, "visiting-card-back.png")}
            sx={{ bgcolor: theme.palette.secondary.main, color: "#fff" }}
          >
            Back PNG
          </Button>
        </Stack>
      </Box>

      {/* Cards */}
      <Box
        className="print-area"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* ---------- FRONT ---------- */}
        <Box>
          <Typography
            className="no-print"
            sx={{
              mb: 1,
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
            }}
          >
            Front
          </Typography>
          <CardFrame scale={scale}>
            <Box
              ref={frontRef}
              sx={{ ...faceSx, bgcolor: C.background.default }}
            >
              {/* CSS background image — captures reliably with html-to-image.
                  Offset to the right (left: 85px) to match the modal framing. */}
              <Box
                role="img"
                aria-label="Mohammed Wasim — React & Next.js freelancer"
                sx={{
                  position: "absolute",
                  top: "-40px",
                  left: "85px",
                  width: W,
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
                  background:
                    "linear-gradient(180deg, rgba(10,14,26,0.15) 63%, rgba(10,14,26,0.55) 75%, rgba(10,14,26,0.96) 100%)",
                }}
              />
              {/* Logo top-left */}
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 14,
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
            </Box>
          </CardFrame>
        </Box>

        {/* ---------- BACK ---------- */}
        <Box>
          <Typography
            className="no-print"
            sx={{
              mb: 1,
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
            }}
          >
            Back
          </Typography>
          <CardFrame scale={scale}>
            <Box
              ref={backRef}
              sx={{
                ...faceSx,
                flexDirection: "column",
                p: 2.5,
                background:
                  "linear-gradient(135deg, #131a30 0%, #0a0e1a 55%, #0b1022 100%)",
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
                  background:
                    "radial-gradient(circle, rgba(0,216,233,0.2) 0%, transparent 70%)",
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
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mt: 1.2 }}
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
                        border: "1px solid rgba(255,255,255,0.12)",
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
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}
                >
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
          </CardFrame>
        </Box>
      </Box>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #fff !important;
          }
          .print-area {
            gap: 24px !important;
          }
        }
      `}</style>
    </Box>
  );
}
