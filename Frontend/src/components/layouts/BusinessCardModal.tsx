"use client";

import { useState } from "react";
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
} from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
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

export default function BusinessCardModal() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setFlipped(false), 250);
  };

  const faceSx = {
    position: "absolute",
    inset: 0,
    borderRadius: "20px",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
    display: "flex",
  } as const;

  return (
    <>
      <Tooltip title="My visiting card" arrow>
        <IconButton
          aria-label="Open my visiting card"
          onClick={() => setOpen(true)}
          sx={{
            color: theme.palette.primary.main,
            transition: "all .3s ease",
            "&:hover": { transform: "translateY(-3px)" },
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
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.08)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* Flip card */}
        <Box sx={{ perspective: "1600px", width: { xs: 400 } }}>
          <Box
            onClick={() => setFlipped((f) => !f)}
            role="button"
            aria-label="Flip visiting card"
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "1.62 / 1",
              cursor: "pointer",
              transformStyle: "preserve-3d",
              transition: "transform .8s cubic-bezier(.4,.2,.2,1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* ---------- FRONT: banner image ---------- */}
            <Box sx={{ ...faceSx, bgcolor: "#0a0e1a" }}>
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
                  background:
                    "linear-gradient(180deg, rgba(10,14,26,0.15) 0%, rgba(10,14,26,0.55) 75%, rgba(10,14,26,0.96) 100%)",
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

              <Typography
                sx={{
                  position: "absolute",
                  bottom: 20,
                  right: 12,
                  zIndex: 1,
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
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
                background:
                  "linear-gradient(135deg, #131a30 0%, #0a0e1a 55%, #0b1022 100%)",
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
                  background:
                    "radial-gradient(circle, rgba(0,216,233,0.2) 0%, transparent 70%)",
                }}
              />

              {/* CTA */}
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
                  sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}
                >
                  {CARD.contacts.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
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
                        color: "#fff",
                        fontSize: "0.7rem",
                        wordBreak: "break-word",
                        fontWeight: 600,
                        "& svg": { color: theme.palette.primary.main },
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      {c.icon}
                      {c.label}
                    </Link>
                  ))}
                </Box>

                {/* QR of the website */}
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

        {/* Flip control */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => setFlipped((f) => !f)}
            startIcon={<Cached />}
            variant="outlined"
            size="small"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: "rgba(0,216,233,0.08)",
              },
            }}
          >
            {flipped ? "Show front" : "Contact for projects"}
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
