"use client";

import { useRef } from "react";
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
import Image from "next/image";
import theme from "@/theme/theme";

const CARD = {
  name: "Mohammed Wasim",
  specialty: "Web Application Specialist",
  role: "React & Next.js Developer",
  website: "iamwasim.in",
  websiteUrl: "https://iamwasim.in",
  banner: "/assets/images-videos/wasim-3.png",
  cta: "Have a project in mind?",
  ctaSub:
    "Helping Businesses, Startups & Students Bring Their Ideas to Life Online",
  services: ["Custom Websites", "Web Applications", "Ongoing Support"],
  contacts: [
    {
      icon: <Language fontSize="small" />,
      label: "iamwasim.in",
      href: "https://iamwasim.in",
    },
    {
      icon: <Email fontSize="small" />,
      label: "iamwasim124@gmail.com",
      href: "mailto:iamwasim124@gmail.com",
    },
    {
      icon: <Phone fontSize="small" />,
      label: "+91 8123833968",
      href: "tel:+918123833968",
    },
    {
      icon: <LinkedIn fontSize="small" />,
      label: "linkedin.com/in/iamwasim124",
      href: "https://linkedin.com/in/iamwasim124",
    },
  ],
};

const ACCENT = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

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

export default function VisitingCardPage() {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

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
          <Box ref={frontRef} sx={{ ...faceSx, bgcolor: "#0a0e1a" }}>
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
              unoptimized
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,14,26,0.15) 63%, rgba(10,14,26,0.55) 75%, rgba(10,14,26,0.96) 100%)",
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
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  px: 1.2,
                  py: 0.3,
                  mb: 1,
                  borderRadius: "999px",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#0a0e1a",
                  background: ACCENT,
                }}
              >
                Freelancer
              </Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  lineHeight: 1.1,
                  color: "#fff",
                }}
              >
                {CARD.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#fff",
                  mt: 0.4,
                }}
              >
                {CARD.specialty}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mt: 0.2,
                }}
              >
                {CARD.role}
              </Typography>
            </Box>
          </Box>
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
                sx={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  background: ACCENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {CARD.cta}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: "#FFF",
                  mt: 0.3,
                  fontWeight: 600,
                }}
              >
                {CARD.ctaSub}
              </Typography>
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mt: 1.2 }}
              >
                {CARD.services.map((s) => (
                  <Box
                    key={s}
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: "999px",
                      fontSize: "0.56rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: "#FFF",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {s}
                  </Box>
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
                      color: "#fff",
                      fontSize: "0.7rem",
                      wordBreak: "break-word",
                      fontWeight: 600,
                      "& svg": { color: theme.palette.primary.main },
                    }}
                  >
                    {c.icon}
                    {c.label}
                  </Link>
                ))}
              </Box>
              <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: "5px",
                    borderRadius: "10px",
                    lineHeight: 0,
                  }}
                >
                  <QRCodeSVG
                    value={CARD.websiteUrl}
                    size={74}
                    bgColor="#ffffff"
                    fgColor="#0a0e1a"
                    level="M"
                  />
                </Box>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: "0.56rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#FFF",
                  }}
                >
                  Scan to visit
                </Typography>
              </Box>
            </Box>
          </Box>
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
