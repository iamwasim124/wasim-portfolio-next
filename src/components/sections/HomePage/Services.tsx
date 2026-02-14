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
import { Web, Speed, Code } from "@mui/icons-material";
import theme from "@/theme/theme";

interface Props {
  data: any;
}

const icons = [<Web />, <Code />, <Speed />];

const Services: FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref} id="services" sx={{ py: 12 }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Fade in={visible} timeout={1000}>
          <Box textAlign="center" mb={5}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {data.heading}
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
            <Typography
              variant="body1"
              sx={{ mt: 2, color: theme.palette.text.secondary }}
            >
              {data.subHeading}
            </Typography>
          </Box>
        </Fade>

        {/* Services Cards */}
        <Grid container spacing={3}>
          {data.services.map((service: any, index: number) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
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
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 50px rgba(0,216,233,.3)",
                      borderColor: "#00d8e9",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        bgcolor: "rgba(0,216,233,.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00d8e9",
                        mb: 3,
                      }}
                    >
                      {icons[index % icons.length]}
                    </Box>

                    <Typography variant="h6" mb={1}>
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose */}
        <Fade in={visible} timeout={1400}>
          <Box
            sx={{
              mt: 5,
              p: 4,
              bgcolor: "rgba(255,255,255,.05)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <Typography variant="h5" mb={3}>
              Why Choose Me?
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.whyChoose.map((item: string, i: number) => (
                <Chip
                  key={i}
                  label={item}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                    color: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: "rgba(0,216,233,.2)",
                    },
                    p: "8px",
                    typography: "body1",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Services;
