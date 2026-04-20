"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        bgcolor: "#0a0e1a",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <HeaderComponent scrollY={scrollY} />
      {children}
      <FooterComponet />
    </Box>
  );
}
