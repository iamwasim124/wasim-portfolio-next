"use client";

import { Box, Typography, Card, Container } from "@mui/material";

import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

const testimonials = [
  {
    name: "Ashfaq Parveez",
    role: "College Mini Project",
    company: "SHREE MEDHA DEGREE COLLEGE",
    feedback:
      "Helped me build exactly what I needed for my mini project and made the final output much better than I expected. I would definitely recommend to others.",
  },
  {
    name: "Sandeep",
    role: "Business Email Template",
    company: "Freelance Client",
    feedback:
      "Very helpful in understanding my requirement and creating a professional email template. Easy to work with and I would happily refer others.",
  },
  {
    name: "Tanya Gupta",
    role: "Portfolio Website",
    company: "Small Startup Founder",
    feedback:
      "Delivered a clean portfolio page based on what I needed and also suggested useful improvements. Would definitely recommend for similar work.",
  },
  {
    name: "Imran",
    role: "Landing Page",
    company: "Freelance Client",
    feedback:
      "Supportive throughout the work and helped improve the landing page beyond my initial idea. I would recommend to anyone looking for frontend work.",
  },
  {
    name: "Karthik",
    role: "Website Support",
    company: "Client Maintenance",
    feedback:
      "Quick with changes, helpful with fixes and reliable during support work. Happy to refer to others needing this kind of help.",
  },
];

const Testimonials = () => {
  return (
    <Box
      component="section"
      id="testimonials"
      aria-label="Client testimonials"
      sx={{
        pt: { xs: "92px", md: 12 },
        pb: { xs: 9, md: 12 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Reveal sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Testimonials
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: theme.palette.secondary.main,
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </Reveal>

        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              width: "max-content",
              animation: "marquee 30s linear infinite",

              "@keyframes marquee": {
                "0%": {
                  transform: "translateX(0)",
                },
                "100%": {
                  transform: "translateX(-50%)",
                },
              },

              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 350,
                  maxWidth: 350,

                  bgcolor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  p: 3,

                  flexShrink: 0,

                  display: "flex",
                  flexDirection: "column",

                  "&:hover": {
                    boxShadow: "0 10px 40px rgba(147,51,234,.3)",
                    borderColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    mb: 3,
                    fontStyle: "italic",
                  }}
                >
                  “{item.feedback}”
                </Typography>

                <Box
                  sx={{
                    mt: "auto",
                    pt: 3,
                  }}
                >
                  <Typography variant="h6" color={theme.palette.primary.main}>
                    {item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.role} • {item.company}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
