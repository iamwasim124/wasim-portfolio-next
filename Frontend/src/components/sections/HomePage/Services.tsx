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
import { Web, Speed, Code } from "@mui/icons-material";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

type ServiceItem = {
  title: string;
  description: string;
};

type ServicesData = {
  heading: string;
  subHeading: string;
  intro?: string;
  services: ServiceItem[];
  whyChoose: string[];
};

interface Props {
  data: ServicesData;
}

const icons = [<Web key="web" />, <Code key="code" />, <Speed key="speed" />];

const Services: FC<Props> = ({ data }) => {
  return (
    <Box
      component="section"
      id="services"
      aria-label="Freelance services"
      sx={{ pt: { xs: "92px", md: 12 }, pb: { xs: 9, md: 12 } }}
    >
      <Container maxWidth="xl">
        {/* Title */}
        <Reveal sx={{ textAlign: "center", mb: 5 }}>
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
        </Reveal>

        {/* Services Cards */}
        <Grid container spacing={3}>
          {data.services.map((service, index: number) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
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

                    <Typography variant="h6" component="h3" mb={1}>
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
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose */}
        <Reveal
          delay={0.1}
          sx={{
            mt: 5,
            p: 4,
            bgcolor: "rgba(255,255,255,.05)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <Typography variant="h5" component="h3" mb={3}>
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
        </Reveal>
      </Container>
    </Box>
  );
};

export default Services;
