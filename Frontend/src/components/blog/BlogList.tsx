"use client";

import NextLink from "next/link";
import { Box, Container, Typography, Card, Chip, Stack } from "@mui/material";
import theme from "@/theme/theme";
import { blogPosts } from "@/data/blog";

const C = theme.palette;

export default function BlogList() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Box
      component="section"
      aria-label="Blog"
      sx={{ pt: { xs: "110px", md: "140px" }, pb: { xs: 9, md: 12 } }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            background: `linear-gradient(135deg, ${C.primary.main}, ${C.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1.5,
          }}
        >
          Blog
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 6, maxWidth: 640 }}
        >
          Practical guides on hiring freelance React &amp; Next.js developers,
          building fast SEO-friendly websites, and React/Next.js projects.
        </Typography>

        <Stack spacing={3}>
          {sorted.map((post) => (
            <Card
              key={post.slug}
              component={NextLink}
              href={`/blog/${post.slug}`}
              sx={{
                display: "block",
                textDecoration: "none",
                p: { xs: 3, md: 4 },
                bgcolor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                transition: "all .3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: C.primary.main,
                  boxShadow: "0 10px 40px rgba(0,216,233,.25)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
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
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.6)", ml: "auto" }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {post.readingTime}
                </Typography>
              </Box>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: "clamp(1.25rem, 2.4vw, 1.6rem)",
                  color: C.text.primary,
                  mb: 1,
                }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.78)" }}
              >
                {post.description}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
