"use client";

import { FC } from "react";
import { Box, Container, Typography, Grid, Card, Chip } from "@mui/material";
import { Web } from "@mui/icons-material";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

interface Project {
  name: string;
  url: string;
  tech: string[];
}

interface Props {
  projects: Project[];
}

const Projects: FC<Props> = ({ projects }) => {
  return (
    <Box
      component="section"
      id="projects"
      aria-label="Featured projects"
      sx={{
        pt: { xs: "92px", md: 12 },
        pb: { xs: 9, md: 12 },
        position: "relative",
        bgcolor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Reveal sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Featured Projects
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: theme.palette.primary.main,
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </Reveal>

        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {projects.map((project, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal delay={index * 0.08} sx={{ height: "100%" }}>
                <Card
                  component="a"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open project ${project.name} in a new tab`}
                  sx={{
                    textDecoration: "none",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 10px 40px ${
                        index % 2 === 0
                          ? "rgba(0, 216, 233, 0.3)"
                          : "rgba(147, 51, 234, 0.3)"
                      }`,
                      borderColor:
                        index % 2 === 0
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Web
                      sx={{
                        color:
                          index % 2 === 0
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                        mr: 1,
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {project.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="medium"
                        sx={{
                          bgcolor:
                            index % 2 === 0
                              ? "rgba(0, 216, 233, 0.2)"
                              : "rgba(147, 51, 234, 0.2)",
                          color: theme.palette.text.primary,
                          fontWeight: 700,
                          typography: "body1",
                          p: "8px",
                        }}
                      />
                    ))}
                  </Box>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal sx={{ textAlign: "center", mt: 6 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: theme.palette.text.primary }}
          >
            + Multiple other projects including maintenance and client support
            work
          </Typography>
        </Reveal>
      </Container>
    </Box>
  );
};

export default Projects;
