"use client";

import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import { GitHub, LinkedIn, Email, Phone } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import NextLink from "next/link";
import theme from "@/theme/theme";
import BusinessCardModal from "@/components/common/BusinessCardModal";
import { socialLinks as SOCIALS, type SocialIcon } from "@/data/social";
import { footerLinks } from "@/data/navigation";

// resolve a social icon key to its MUI icon
const socialIcons: Record<SocialIcon, React.ReactNode> = {
  linkedin: <LinkedIn />,
  github: <GitHub />,
  email: <Email />,
  phone: <Phone />,
};

const FooterComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Social Icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          {SOCIALS.map((item) => (
            <Tooltip key={item.label} title={item.label} arrow>
              {item.href ? (
                <IconButton
                  aria-label={item.label}
                  component="a"
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  sx={{
                    color: theme.palette.primary.main,
                    transition: "all .3s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {socialIcons[item.icon]}
                </IconButton>
              ) : (
                <Box component="span" sx={{ display: "inline-flex" }}>
                  <IconButton
                    disabled
                    aria-label={item.label}
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    {socialIcons[item.icon]}
                  </IconButton>
                </Box>
              )}
            </Tooltip>
          ))}

          {/* Digital visiting card */}
          <BusinessCardModal />
        </Box>

        {/* Footer navigation */}
        <Box
          component="nav"
          aria-label="Footer"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 2.5, sm: 4 },
            mb: 2.5,
          }}
        >
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              component={NextLink}
              href={item.href}
              underline="none"
              sx={{
                display: "inline-block",
                typography: "h6",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "opacity .3s ease",
                "&:hover": { opacity: 0.8 },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          © 2026 Mohammed Wasim | React & Next.js Developer
        </Typography>

        {/* Tech Stack */}
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Built with React, Next.js & Material-UI
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterComponent;
