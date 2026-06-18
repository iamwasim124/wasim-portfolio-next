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
import NextLink from "next/link";
import theme from "@/theme/theme";
import BusinessCardModal from "@/components/common/BusinessCardModal";
import { socialLinks as SOCIALS, type SocialIcon } from "@/data/social";

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
        borderTop: "1px solid rgba(255,255,255,0.1)",
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

        {/* Internal links */}
        <Box sx={{ mb: 2 }}>
          <Link
            component={NextLink}
            href="/blog"
            underline="none"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": { opacity: 0.85 },
            }}
          >
            Blog
          </Link>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          © 2026 Mohammed Wasim | Frontend Developer
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
