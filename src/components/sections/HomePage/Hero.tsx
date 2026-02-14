"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Zoom,
  Fade,
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
import { FC } from "react";
import theme from "@/theme/theme";

interface HeroProps {
  data: any;
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
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {data?.greeting || "Hello, I'm"}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    background:
                      "linear-gradient(135deg, #fff 0%, #00d8e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {data?.name || "Mohammed Wasim"}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.secondary.main,
                    mb: 3,
                  }}
                >
                  {data?.role || "Frontend Developer"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
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
                    sx={{
                      borderColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.main,
                      px: "24px",
                      py: "12px",
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        bgcolor: "rgba(147, 51, 234, 0.1)",
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
                      <span>
                        <IconButton
                          href={item.href || undefined}
                          target="_blank"
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
                      </span>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Zoom in timeout={1200}>
              <Box
                sx={{
                  position: "relative",
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
                <Avatar
                  src={data?.image?.src || profilePicture.src}
                  alt="Mohammed Wasim"
                  sx={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    boxShadow: "0 20px 60px rgba(0, 216, 233, 0.3)",
                  }}
                />
              </Box>
            </Zoom>
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
