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
  Breadcrumbs,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { NavigateNext } from "@mui/icons-material";
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
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            mb: 3,
            color: alpha(C.common.white, 0.4),
            "& a": {
              color: C.primary.main,
              fontWeight: 600,
              textDecoration: "none",
            },
            "& a:hover": { textDecoration: "underline" },
          }}
        >
          <Link component={NextLink} href="/">
            Home
          </Link>
          <Link component={NextLink} href="/blog">
            Blog
          </Link>
          <Typography
            component="span"
            aria-current="page"
            sx={{ color: alpha(C.common.white, 0.7), fontWeight: 600 }}
          >
            {post.title}
          </Typography>
        </Breadcrumbs>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {post.tags.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                bgcolor: alpha(C.primary.main, 0.15),
                color: C.text.primary,
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        <Typography
          variant="h2"
          component="h1"
          sx={{ color: C.text.primary, lineHeight: 1.15, mb: 1.5 }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: alpha(C.common.white, 0.6), mb: 5 }}
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
                variant="h5"
                component="h2"
                sx={{ color: C.primary.main, mb: 2 }}
              >
                {section.heading}
              </Typography>
            )}
            {section.paragraphs.map((p, j) => (
              <Typography
                key={j}
                variant="body1"
                sx={{ color: alpha(C.common.white, 0.85), mb: 2, lineHeight: 1.8 }}
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
              background: `conic-gradient(from 0deg, ${C.primary.main} 0deg, ${C.secondary.main} 55deg, ${alpha(C.common.white, 0.06)} 95deg, ${alpha(C.common.white, 0.06)} 360deg)`,
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
              background: `linear-gradient(135deg, ${alpha(C.primary.main, 0.08)}, ${alpha(C.secondary.main, 0.08)}), ${C.background.default}`,
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
                borderColor: C.brand.purpleBorder,
                color: C.common.white,
                bgcolor: alpha(C.secondary.main, 0.22),
                px: "24px",
                py: "12px",
                "&:hover": {
                  borderColor: C.brand.purpleBorderHover,
                  bgcolor: alpha(C.secondary.main, 0.35),
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
