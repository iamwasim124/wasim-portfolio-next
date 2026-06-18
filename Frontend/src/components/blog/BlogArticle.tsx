"use client";

import NextLink from "next/link";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Link,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import theme from "@/theme/theme";
import { getPostBySlug } from "@/data/blog";

const C = theme.palette;

export default function BlogArticle({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  return (
    <Box
      component="article"
      sx={{ pt: { xs: "110px", md: "140px" }, pb: { xs: 9, md: 12 } }}
    >
      <Container maxWidth="md">
        <Link
          component={NextLink}
          href="/blog"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: C.primary.main,
            fontWeight: 600,
            mb: 3,
            "&:hover": { opacity: 0.85 },
          }}
        >
          <ArrowBack fontSize="small" /> All articles
        </Link>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {post.tags.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                bgcolor: "rgba(0,216,233,.15)",
                color: C.text.primary,
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        <Typography
          variant="h1"
          sx={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            color: C.text.primary,
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.6)", mb: 5 }}
        >
          By Mohammed Wasim ·{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readingTime}
        </Typography>

        {post.body.map((section, i) => (
          <Box key={i} sx={{ mb: 4 }}>
            {section.heading && (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
                  color: C.primary.main,
                  mb: 2,
                }}
              >
                {section.heading}
              </Typography>
            )}
            {section.paragraphs.map((p, j) => (
              <Typography
                key={j}
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.85)", mb: 2, lineHeight: 1.8 }}
              >
                {p}
              </Typography>
            ))}
          </Box>
        ))}

        {/* CTA with an animated brand-gradient border rotating clockwise */}
        <Box
          sx={{
            mt: 6,
            position: "relative",
            borderRadius: "18px",
            p: "2px", // border thickness
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              // one bright cyan→purple segment, faint base for the rest of the ring
              background: `conic-gradient(from 0deg, ${C.primary.main} 0deg, ${C.secondary.main} 55deg, rgba(255,255,255,0.06) 95deg, rgba(255,255,255,0.06) 360deg)`,
              animation: "ctaBorderSpin 4s linear infinite",
            },
            "@keyframes ctaBorderSpin": {
              to: { transform: "rotate(360deg)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              "&::before": { animation: "none" },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "16px",
              p: 4,
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(0,216,233,0.08), rgba(147,51,234,0.08)), #0a0e1a",
            }}
          >
            <Typography variant="h6" component="p" sx={{ mb: 2 }}>
              Need a freelance React &amp; Next.js developer?
            </Typography>
          <Button
            component={NextLink}
            href="/#contact"
            variant="outlined"
            sx={{
              borderColor: "#d7a9ff",
              color: "#ffffff",
              bgcolor: "rgba(147, 51, 234, 0.22)",
              px: "24px",
              py: "12px",
              "&:hover": {
                borderColor: "#e4c6ff",
                bgcolor: "rgba(147, 51, 234, 0.35)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Get In Touch
          </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
