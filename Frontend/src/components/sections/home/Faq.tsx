"use client";

import { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import theme from "@/theme/theme";
import Reveal from "@/components/motion/Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqProps {
  items: FaqItem[];
}

const Faq: FC<FaqProps> = ({ items }) => {
  return (
    <>
      <Box
        component="section"
        id="faq"
        aria-label="Frequently asked questions"
        sx={{
          pt: { xs: "92px", md: 12 },
          pb: { xs: 9, md: 12 },
          bgcolor: alpha(theme.palette.common.black, 0.3),
        }}
      >
        <Container maxWidth="xl">
          <Reveal sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              React & Next.js Freelancer FAQ
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
            <Typography
              variant="body1"
              sx={{
                color: alpha(theme.palette.common.white, 0.88),
                maxWidth: 720,
                mx: "auto",
                marginTop: "16px",
              }}
            >
              Answers to common questions about my React.js, Next.js, frontend
              development, SEO, and freelance web development services.
            </Typography>
          </Reveal>

          <Box sx={{ display: "grid", gap: 2 }}>
            {items.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.06} y={24}>
                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                    borderRadius: "16px !important",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore sx={{ color: theme.palette.primary.main }} />
                  }
                >
                  <Typography variant="h6" component="h3">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{ color: alpha(theme.palette.common.white, 0.88) }}
                    >
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Faq;
