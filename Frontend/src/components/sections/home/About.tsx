"use client";

import { FC, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { Code, Speed, School } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

type AboutData = {
  title?: string;
  journey?: {
    heading?: string;
    paragraphs?: string[];
  };
  skills?: {
    heading?: string;
    items: string[];
  };
  education: {
    heading?: string;
    items: {
      degree: string;
      institute: string;
      year: string;
    }[];
  };
};

interface AboutProps {
  data: AboutData;
}

const About: FC<AboutProps> = ({ data }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Box
      component="section"
      id="about"
      aria-label="About Mohammed Wasim"
      sx={{
        pt: { xs: "92px", md: 12 },
        pb: { xs: 9, md: 12 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        {/* Title */}
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
            {data?.title || "About Me"}
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: theme.palette.secondary.main,
              mx: "auto",
              borderRadius: 2,
            }}
          />
        </Reveal>

        <Grid container spacing={4} alignItems="stretch">
          {/* Left */}
          <Grid size={{ xs: 12 }}>
            <Reveal>
              <Paper
                elevation={0}
                sx={{
                  p: 4,

                  bgcolor: alpha(theme.palette.common.white, 0.05),
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Code
                    sx={{
                      color: theme.palette.primary.main,
                      mr: 2,
                      alignSelf: "center",
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    color={theme.palette.text.primary}
                  >
                    {data?.journey?.heading || "Professional Journey"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    maxHeight: showAll ? 430 : 220,
                    overflowY: showAll ? "auto" : "hidden",
                    transition: "max-height 0.45s ease",
                    pr: showAll ? 1 : 0,
                    // soft fade at the bottom while collapsed
                    ...(showAll
                      ? {}
                      : {
                          WebkitMaskImage:
                            `linear-gradient(to bottom, ${theme.palette.common.black} 70%, transparent 100%)`,
                          maskImage:
                            `linear-gradient(to bottom, ${theme.palette.common.black} 70%, transparent 100%)`,
                        }),
                    "&::-webkit-scrollbar": {
                      width: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: theme.palette.primary.main,
                      borderRadius: 10,
                    },
                  }}
                >
                  {data?.journey?.paragraphs?.map(
                    (text: string, index: number) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          color: alpha(theme.palette.common.white, 0.9),
                          mb: 2,
                        }}
                      >
                        {text}
                      </Typography>
                    ),
                  )}
                </Box>

                <Box textAlign="center" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowAll(!showAll)}
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: `${theme.palette.primary.main}15`,
                      },
                    }}
                  >
                    {showAll ? "Show Less" : "Read Full Journey"}
                  </Button>
                </Box>
              </Paper>
            </Reveal>
          </Grid>

          {/* Right */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delay={0.1} sx={{ height: "100%" }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: alpha(theme.palette.common.white, 0.05),
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                }}
              >
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Speed
                    sx={{
                      color: theme.palette.primary.main,
                      mr: 2,
                      alignSelf: "center",
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    color={theme.palette.text.primary}
                  >
                    {data?.skills?.heading || "What I Do Best"}
                  </Typography>
                </Box>

                {data?.skills?.items.map((item: string, i: number) => (
                  <Box key={i} sx={{ display: "flex", mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.main,
                        mr: 2,
                        mt: 1,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: alpha(theme.palette.common.white, 0.9) }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delay={0.2} sx={{ height: "100%" }}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  p: 4,
                  bgcolor: alpha(theme.palette.common.white, 0.05),
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                }}
              >
                <Box sx={{ display: "flex", mb: 2 }}>
                  <School
                    sx={{
                      color: theme.palette.primary.main,
                      mr: 2,
                      alignSelf: "center",
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    color={theme.palette.text.primary}
                  >
                    {data.education.heading || "Education"}
                  </Typography>
                </Box>

                {data.education.items.map((edu, i: number) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      {edu.degree}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: alpha(theme.palette.common.white, 0.88) }}
                    >
                      {edu.institute} | {edu.year}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
