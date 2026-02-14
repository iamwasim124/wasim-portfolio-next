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
  Chip,
} from "@mui/material";
import { Web } from "@mui/icons-material";
import theme from "@/theme/theme";

interface Project {
  name: string;
  url: string;
  tech: string[];
}

interface Props {
  projects: Project[];
}

const Projects: FC<Props> = ({ projects }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="projects"
      sx={{ py: 12, position: "relative", bgcolor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
          </Box>
        </Fade>

        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {projects.map((project, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Zoom in timeout={1000 + index * 100}>
                <Card
                  component="a"
                  href={project.url}
                  target="_blank"
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
              </Zoom>
            </Grid>
          ))}
        </Grid>

        <Fade in timeout={1600}>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              + Multiple other projects including maintenance and client support
              work
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Projects;
