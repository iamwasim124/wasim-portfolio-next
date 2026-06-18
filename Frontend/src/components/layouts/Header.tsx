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
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const HEADER_DATA = {
  logoText: "Mohammed Wasim",
  logoSrc: "/assets/images-videos/logo-transparent.png",
  menu: [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "FAQ", id: "faq" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ],
};

interface HeaderComponentProps {
  scrollY?: number;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ scrollY = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showLogoImage, setShowLogoImage] = useState(
    Boolean(HEADER_DATA.logoSrc),
  );
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      // already on the home page → smooth-scroll to the section
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // on another route → go home and jump to that section
      router.push(`/#${id}`);
    }
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
        threshold: 0.3,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, mobileMenuOpen]);

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        inset: 0,
        bottom: "auto",
        zIndex: 1000,
        bgcolor:
          mobileMenuOpen || scrollY > 0
            ? theme.palette.background.default
            : "transparent",
        backdropFilter: mobileMenuOpen || scrollY > 0 ? "blur(10px)" : "none",
        borderBottom:
          scrollY > 0 ? `1px solid ${theme.palette.divider}` : "none",
        py: 1,
        height: mobileMenuOpen ? "100vh" : "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Logo */}
          {showLogoImage ? (
            <Box
              onClick={() => scrollToSection("hero")}
              sx={{
                cursor: "pointer",
                display: "inline-flex",
                marginLeft: "-60px",
              }}
            >
              <Image
                src={HEADER_DATA.logoSrc}
                alt={HEADER_DATA.logoText}
                width={180}
                height={60}
                priority
                onError={() => setShowLogoImage(false)}
                style={{ objectFit: "contain" }}
              />
            </Box>
          ) : (
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
              {HEADER_DATA.logoText}
            </Typography>
          )}

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
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
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
