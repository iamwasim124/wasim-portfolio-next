"use client";

import { Box, Container, Typography, IconButton, Tooltip } from "@mui/material";
import { GitHub, LinkedIn, Email, Phone } from "@mui/icons-material";
import theme from "@/theme/theme";

const FooterComponent = () => {
  const SOCIALS = [
    {
      label: "LinkedIn",
      icon: <LinkedIn />,
      href: "https://linkedin.com/in/iamwasim124",
    },
    {
      label: "GitHub profile coming soon — polishing projects",
      icon: <GitHub />,
      href: null, // disabled for now
    },
    {
      label: "Email",
      icon: <Email />,
      href: "mailto:iamwasim124@gmail.com",
    },
    {
      label: "Phone",
      icon: <Phone />,
      href: "tel:+918123833968",
    },
  ];

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
              <span>
                <IconButton
                  component={item.href ? "a" : "button"}
                  href={item.href ?? undefined}
                  target="_blank"
                  sx={{
                    color: theme.palette.primary.main,
                    transition: "all .3s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </span>
            </Tooltip>
          ))}
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
