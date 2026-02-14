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
  Button,
} from "@mui/material";
import { Code, Speed, School } from "@mui/icons-material";
import theme from "@/theme/theme";
interface AboutProps {
  data: any;
}

const About: FC<AboutProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={sectionRef} id="about" sx={{ py: 12, position: "relative" }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Fade in={visible} timeout={1000}>
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
          </Box>
        </Fade>

        <Grid container spacing={4} alignItems="stretch">
          {/* Left */}
          <Grid size={{ xs: 12 }}>
            <Slide direction="right" in={visible} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,

                  bgcolor: "rgba(255,255,255,.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,.1)",
                  height: showAll ? 430 : "auto",
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
                  <Typography variant="h5" color={theme.palette.text.primary}>
                    {data?.journey?.heading || "Professional Journey"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    overflowY: showAll ? "auto" : "hidden",
                    pr: 1,

                    "&::-webkit-scrollbar": {
                      width: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: theme.palette.primary.main,
                      borderRadius: 10,
                    },
                  }}
                >
                  {(showAll
                    ? data?.journey?.paragraphs
                    : data?.journey?.paragraphs?.slice(0, 2)
                  )?.map((text: string, index: number) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                      }}
                    >
                      {text}
                    </Typography>
                  ))}
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
            </Slide>
          </Grid>

          {/* Right */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="up" in={visible} timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "rgba(255,255,255,.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,.1)",
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
                  <Typography variant="h5" color={theme.palette.text.primary}>
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
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Slide>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="left" in={visible} timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  p: 4,
                  bgcolor: "rgba(255,255,255,.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,.1)",
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
                  <Typography variant="h5" color={theme.palette.text.primary}>
                    {data.education.degree || "Education"}
                  </Typography>
                </Box>

                {data.education.items.map((edu: any, i: number) => (
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
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {edu.institute} | {edu.year}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
