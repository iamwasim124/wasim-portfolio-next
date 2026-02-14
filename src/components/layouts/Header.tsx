"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

const HEADER_DATA = {
  logo: "Mohammed Wasim",
  menu: [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ],
};

interface HeaderComponentProps {
  scrollY?: number;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ scrollY = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    const sections = HEADER_DATA.menu.map((m) => m.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        inset: 0,
        bottom: "auto",
        zIndex: 1000,
        bgcolor:
          mobileMenuOpen || scrollY > 100
            ? theme.palette.background.default
            : "transparent",
        backdropFilter: mobileMenuOpen || scrollY > 100 ? "blur(10px)" : "none",
        borderBottom:
          scrollY > 100 ? `1px solid ${theme.palette.divider}` : "none",
        transition: "all .3s ease",
        py: 2,
        height: mobileMenuOpen ? "100vh" : "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Logo */}
          <Typography
            variant="h5"
            onClick={() => scrollToSection("hero")}
            sx={{
              cursor: "pointer",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {HEADER_DATA.logo}
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box display="flex" gap={3}>
              {HEADER_DATA.menu.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <Typography
                    variant="body1"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      cursor: "pointer",
                      p: "12px 16px",
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      fontWeight: 600,
                      position: "relative",

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: isActive ? "100%" : 0,
                        height: 2,
                        bgcolor: theme.palette.primary.main,
                        transition: "width .3s",
                      },

                      ...(!isActive && {
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        },
                      }),
                    }}
                  >
                    {item.label}
                  </Typography>
                );
              })}
            </Box>
          )}

          {/* Mobile Toggle */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: theme.palette.text.primary }}
            >
              {mobileMenuOpen ? <Close /> : <Menu />}
            </IconButton>
          )}
        </Box>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Fade in>
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              {HEADER_DATA.menu.map((item) => (
                <Typography
                  variant="body1"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: theme.palette.text.primary,
                    justifyContent: "flex-start",
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default HeaderComponent;
