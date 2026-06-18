"use client";

import { FC } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Card,
} from "@mui/material";
import { WorkHistory, EmojiEvents } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";
import AutoScroller from "@/components/motion/AutoScroller";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

type AchievementItem = {
  title: string;
  description: string;
  date: string;
  pdfUrl: string;
};

interface Props {
  experience: ExperienceItem[];
  achievements: AchievementItem[];
}

const Experience: FC<Props> = ({ experience, achievements }) => {
  return (
    <Box
      component="section"
      id="experience"
      aria-label="Work experience and achievements"
      sx={{
        pt: { xs: "92px", md: 12 },
        pb: { xs: 9, md: 12 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Reveal sx={{ textAlign: "center", mb: 8 }}>
          <Box sx={{ display: "contents" }}>
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
        </Reveal>

        <Box sx={{ position: "relative" }}>
          {/* Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 20, md: "50%" },
              top: 0,
              bottom: 0,
              width: 2,
              display: { xs: "none", md: "block" },
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              transform: { md: "translateX(-50%)" },
            }}
          />

          {experience.map((job, index) => (
            <Reveal
              key={index}
              delay={index * 0.12}
              sx={{
                position: "relative",
                mb: { xs: 0, md: 6 },
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
                    display: { xs: "none", md: "block" },
                    borderRadius: "50%",
                    bgcolor:
                      index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    transform: { md: "translateX(-50%)" },
                    boxShadow: `0 0 20px ${index % 2 === 0 ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.secondary.main, 0.5)}`,
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
                        bgcolor: alpha(theme.palette.common.white, 0.05),
                        backdropFilter: "blur(10px)",
                        borderRadius: 4,
                        border: `1px solid ${index % 2 === 0 ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.secondary.main, 0.3)}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 10px 30px ${
                            index % 2 === 0
                              ? alpha(theme.palette.primary.main, 0.2)
                              : alpha(theme.palette.secondary.main, 0.2)
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
                          component="h3"
                          sx={{
                            color:
                              index % 2 === 0
                                ? theme.palette.brand.cyanSoft
                                : theme.palette.brand.purpleSoft,
                          }}
                        >
                          {job.title}
                        </Typography>
                      </Box>
                      <Typography
                        color={theme.palette.text.primary}
                        variant="h6"
                        component="p"
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
                        sx={{ my: 2, bgcolor: alpha(theme.palette.common.white, 0.1) }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        {job.highlights.map((highlight, hIndex: number) => (
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
                                color: alpha(theme.palette.common.white, 0.9),
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
            </Reveal>
          ))}
        </Box>

        {/* Achievements */}
        <Box sx={{ mt: { xs: 9, md: 12 }, overflow: "hidden" }}>
          <Reveal sx={{ textAlign: "center", mb: 6 }}>
            <Box sx={{ display: "contents" }}>
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
          </Reveal>

          <AutoScroller>
              {[...achievements, ...achievements].map((achievement, index) => (
                <Card
                  key={index}
                  component="a"
                  href={achievement.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    minWidth: 350,
                    maxWidth: 350,
                    height: "auto",

                    textDecorationLine: "none",
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                    borderRadius: 4,
                    p: 3,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    transition: "all .3s ease",

                    "&:hover": {
                      boxShadow: `0 10px 40px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmojiEvents
                      sx={{
                        color: theme.palette.brand.gold,
                        fontSize: 40,
                        mr: 2,
                      }}
                    />

                    <Typography
                      variant="h6"
                      component="h4"
                      color={theme.palette.primary.main}
                    >
                      {achievement.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: alpha(theme.palette.common.white, 0.9),
                      mb: 2,
                    }}
                  >
                    {achievement.description}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      mt: "auto",
                      pt: 2,
                    }}
                  >
                    {achievement.date}
                  </Typography>
                </Card>
              ))}
          </AutoScroller>
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
