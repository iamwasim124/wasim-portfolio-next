"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Download,
  LinkedIn,
  Email,
  Phone,
  KeyboardArrowDown,
  GitHub,
} from "@mui/icons-material";
import profilePicture from "../../../../public/assets/images-videos/wasim.webp";
import Image, { type StaticImageData } from "next/image";
import { FC } from "react";
import theme from "@/theme/theme";

interface HeroProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    resumeUrl: string;
    socials: {
      linkedin: string;
      email: string;
      phone: string;
    };
    image: StaticImageData;
  };
}
const Hero: FC<HeroProps> = ({ data }) => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  const socials = [
    {
      label: "LinkedIn",
      icon: <LinkedIn />,
      href: data?.socials?.linkedin || "https://linkedin.com/in/iamwasim124",
      color: theme.palette.primary.main,
      disabled: false,
    },
    {
      label: "Phone",
      icon: <Phone />,
      href: "tel:+918123833968",
      color: theme.palette.secondary.main,
      disabled: false,
    },
    {
      label: "Email",
      icon: <Email />,
      href: data?.socials?.email || "mailto:iamwasim124@gmail.com",
      color: theme.palette.primary.main,
      disabled: false,
    },
    {
      label: "GitHub",
      icon: <GitHub />,
      href: "",
      color: theme.palette.secondary.main,
      disabled: true,
      tooltip: "GitHub profile coming soon — polishing projects",
    },
  ];

  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: "80px", md: 0 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                animation: "heroTextReveal 900ms ease-out both",
                "@keyframes heroTextReveal": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(28px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                {data?.greeting || "lll"}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  background: "linear-gradient(135deg, #fff 0%, #00d8e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {data?.name || "Mohammed Wasim"}
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  color: "#d7a9ff",
                  mb: 3,
                }}
              >
                {data?.role || "Frontend Developer"}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.92)",
                  mb: 4,
                  maxWidth: 600,
                }}
              >
                {data?.description ||
                  "React.js & Next.js Specialist with 4.5 years of experience building scalable, user-centric applications. Passionate about creating exceptional digital experiences."}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  href={data?.resumeUrl || "/assets/files/resume.pdf"}
                  download="Mohammed_Wasim_Resume.pdf"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                    px: "24px",
                    py: "12px",
                    "&:hover": {
                      bgcolor: theme.palette.primary.light,
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 30px rgba(0, 216, 233, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => scrollToSection("contact")}
                  aria-label="Go to contact section"
                  sx={{
                    borderColor: "#d7a9ff",
                    color: "#ffffff",
                    bgcolor: "rgba(147, 51, 234, 0.22)",
                    px: "24px",
                    py: "12px",
                    "&:hover": {
                      borderColor: "#e4c6ff",
                      bgcolor: "rgba(147, 51, 234, 0.35)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get In Touch
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {socials.map((item) => (
                  <Tooltip
                    key={item.label}
                    title={item.tooltip || item.label}
                    arrow
                  >
                    {item.disabled ? (
                      <Box component="span" sx={{ display: "inline-flex" }}>
                        <IconButton
                          disabled
                          aria-label={item.tooltip || item.label}
                          sx={{
                            color: item.color,
                            border: `2px solid ${item.color}`,
                          }}
                        >
                          {item.icon}
                        </IconButton>
                      </Box>
                    ) : (
                      <IconButton
                        aria-label={item.label}
                        component="a"
                        href={item.href || undefined}
                        target={
                          item.href?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        sx={{
                          color: item.color,
                          border: `2px solid ${item.color}`,

                          "&:hover": {
                            color: theme.palette.background.default,
                            bgcolor: item.color,
                            borderColor: item.color,
                            transform: "translateY(-2px)",
                          },
                          transition: "all .3s ease",
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    )}
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                animation: "heroImageReveal 1100ms ease-out both",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: 20,
                  bottom: 20,
                  border: `3px solid ${theme.palette.primary.main}`,
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  animation: "morphing 8s ease-in-out infinite",
                },
                "@keyframes heroImageReveal": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(34px) scale(0.96)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                  },
                },
                "@keyframes morphing": {
                  "0%, 100%": {
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  },
                  "25%": {
                    borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%",
                  },
                  "50%": {
                    borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%",
                  },
                  "75%": {
                    borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  overflow: "hidden",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  boxShadow: "0 20px 60px rgba(0, 216, 233, 0.3)",
                }}
              >
                <Image
                  src={data?.image || profilePicture}
                  alt="Mohammed Wasim"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 900px) 80vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
              "50%": { transform: "translateX(-50%) translateY(10px)" },
            },
          }}
        >
          <IconButton
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to about section"
            sx={{ color: "#00d8e9" }}
          >
            <KeyboardArrowDown fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
