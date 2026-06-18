"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import theme from "@/theme/theme";
import HeaderComponent from "./Header";
import FooterComponet from "./Footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        color: theme.palette.common.white,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderComponent scrollY={scrollY} />
      {/* grows to fill the viewport so the footer sits at the page bottom */}
      <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
      <FooterComponet />
    </Box>
  );
}
