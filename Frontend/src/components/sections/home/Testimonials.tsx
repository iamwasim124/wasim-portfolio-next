"use client";

import { Box, Typography, Card, Container } from "@mui/material";

import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";
import AutoScroller from "@/components/motion/AutoScroller";
import { testimonialsData as testimonials } from "@/data/testimonials";

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

        <AutoScroller>
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
                  <Typography
                    variant="h6"
                    component="p"
                    color={theme.palette.primary.main}
                  >
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
        </AutoScroller>
      </Container>
    </Box>
  );
};

export default Testimonials;
