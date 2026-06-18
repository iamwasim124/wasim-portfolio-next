"use client";

import { FC } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  return (
    <Box
      component="section"
      id="skills"
      aria-label="Technical skills"
      sx={{
        pt: { xs: "92px", md: 12 },
        pb: { xs: 9, md: 12 },
        position: "relative",
        bgcolor: "rgba(0,0,0,.3)",
      }}
    >
      <Container maxWidth="xl">
        {/* Title */}
        <Reveal sx={{ textAlign: "center", mb: 8 }}>
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
        </Reveal>

        <Grid container spacing={3}>
          {Object.entries(skills).map(([category, items], index) => {
            const isGreen = Math.floor(index / 2) % 2 === index % 2;

            return (
              <Grid key={category} size={{ xs: 12, md: 6 }}>
                <Reveal delay={index * 0.1} sx={{ height: "100%" }}>
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
                        component="h3"
                        sx={{
                          mb: 3,
                          color: isGreen ? "#8ef3ff" : "#e6c3ff",
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
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
