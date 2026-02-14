"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Fade,
  Slide,
  Paper,
  Divider,
  Zoom,
  Card,
} from "@mui/material";
import { WorkHistory, EmojiEvents } from "@mui/icons-material";
import theme from "@/theme/theme";

interface Props {
  experience: any[];
  achievements: any[];
}

const Experience: FC<Props> = ({ experience, achievements }) => {
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
    <Box ref={ref} id="experience" sx={{ py: 12, position: "relative" }}>
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
              Work Experience
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
          </Box>
        </Fade>

        <Box sx={{ position: "relative" }}>
          {/* Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 20, md: "50%" },
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "rgba(0, 216, 233, 0.3)",
              transform: { md: "translateX(-50%)" },
            }}
          />

          {experience.map((job, index) => (
            <Slide
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              in={visible}
              timeout={800 + index * 200}
            >
              <Box
                sx={{
                  position: "relative",
                  mb: 6,
                  ml: { xs: 6, md: 0 },
                }}
              >
                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: -26, md: "50%" },
                    top: 0,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor:
                      index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    transform: { md: "translateX(-50%)" },
                    boxShadow: `0 0 20px ${index % 2 === 0 ? "rgba(0, 216, 233, 0.5)" : "rgba(147, 51, 234, 0.5)"}`,
                    zIndex: 1,
                  }}
                />

                <Grid container spacing={4}>
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      order: { md: index % 2 === 0 ? 1 : 2 },
                      textAlign: { md: index % 2 === 0 ? "right" : "left" },
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 4,
                        border: `1px solid ${index % 2 === 0 ? "rgba(0, 216, 233, 0.3)" : "rgba(147, 51, 234, 0.3)"}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 10px 30px ${
                            index % 2 === 0
                              ? "rgba(0, 216, 233, 0.2)"
                              : "rgba(147, 51, 234, 0.2)"
                          }`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          justifyContent: {
                            md: index % 2 === 0 ? "flex-end" : "flex-start",
                          },
                        }}
                      >
                        <WorkHistory
                          sx={{
                            color:
                              index % 2 === 0
                                ? theme.palette.primary.main
                                : theme.palette.secondary.main,
                            mr: 1,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            color:
                              index % 2 === 0
                                ? theme.palette.primary.main
                                : theme.palette.secondary.main,
                          }}
                        >
                          {job.title}
                        </Typography>
                      </Box>
                      <Typography
                        color={theme.palette.text.primary}
                        variant="h6"
                        sx={{ mb: 1 }}
                      >
                        {job.company}
                      </Typography>
                      <Typography
                        sx={{ color: theme.palette.text.secondary, mb: 2 }}
                      >
                        {job.period} | {job.location}
                      </Typography>
                      <Divider
                        sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        {job.highlights.map((highlight: any, hIndex: any) => (
                          <Box key={hIndex} sx={{ display: "flex", mb: 1.5 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor:
                                  index % 2 === 0
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                mt: 1,
                                mr: 2,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {highlight}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{ order: { md: index % 2 === 0 ? 2 : 1 } }}
                  />
                </Grid>
              </Box>
            </Slide>
          ))}
        </Box>

        {/* Achievements */}
        <Box sx={{ mt: 12 }}>
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Achievements & Awards
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={3} justifyContent="center">
            {achievements.map((achievement, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Zoom in timeout={1200 + index * 200}>
                  <Card
                    component="a"
                    href={achievement.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecorationLine: "none",
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 4,
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 10px 40px rgba(147, 51, 234, 0.3)",
                        borderColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <EmojiEvents
                        sx={{ color: "#FFD700", fontSize: 40, mr: 2 }}
                      />
                      <Typography
                        variant="h6"
                        color={theme.palette.primary.main}
                      >
                        {achievement.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary, mb: 2 }}
                    >
                      {achievement.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        mt: "auto",
                      }}
                    >
                      {achievement.date}
                    </Typography>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
