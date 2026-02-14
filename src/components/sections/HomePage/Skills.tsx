"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Fade,
  Zoom,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import theme from "@/theme/theme";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      id="skills"
      sx={{ py: 12, position: "relative", bgcolor: "rgba(0,0,0,.3)" }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Technical Skills
            </Typography>

            <Box
              sx={{
                width: 100,
                height: 4,
                bgcolor: theme.palette.primary.main,
                mx: "auto",
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {Object.entries(skills).map(([category, items], index) => {
            const isGreen = Math.floor(index / 2) % 2 === index % 2;

            return (
              <Grid key={category} size={{ xs: 12, md: 6 }}>
                <Zoom in={visible} timeout={900 + index * 200}>
                  <Card
                    sx={{
                      bgcolor: "rgba(255,255,255,.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: 4,
                      height: "100%",
                      transition: "all .3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 10px 40px ${
                          isGreen ? "rgba(0,216,233,.3)" : "rgba(147,51,234,.3)"
                        }`,
                        borderColor: isGreen
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 3,
                          color: isGreen
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                          textTransform: "capitalize",
                        }}
                      >
                        {category === "core" ? "Core Technologies" : category}
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {items.map((skill, i) => (
                          <Chip
                            key={i}
                            label={skill}
                            size="medium"
                            sx={{
                              bgcolor: "rgba(255,255,255,.1)",
                              color: theme.palette.text.primary,
                              fontWeight: 500,
                              p: "8px",
                              typography: "body1",
                              "&:hover": {
                                bgcolor: isGreen
                                  ? "rgba(0,216,233,.2)"
                                  : "rgba(147,51,234,.2)",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
