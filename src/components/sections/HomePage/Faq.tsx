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
import theme from "@/theme/theme";

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqProps {
  items: FaqItem[];
}

const Faq: FC<FaqProps> = ({ items }) => {
  return (
    <Box id="faq" sx={{ py: { xs: 9, md: 12 }, bgcolor: "rgba(0,0,0,0.3)" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
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
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.88)", maxWidth: 720, mx: "auto" }}
          >
            Answers to common questions about my React.js, Next.js, frontend
            development, SEO, and freelance web development services.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          {items.map((item) => (
            <Accordion
              key={item.question}
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px !important",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}
              >
                <Typography variant="h6" component="h3">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Faq;
