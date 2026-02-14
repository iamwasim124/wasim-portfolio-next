import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00d8e9",
      light: "#33e0ec",
      dark: "#00b8c7",
    },
    secondary: {
      main: "#9333ea",
      light: "#a855f7",
      dark: "#7e22ce",
    },
    background: {
      default: "#0a0e1a",
      paper: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#f6f6f6",
    },
  },

  // ==============================
  // TYPOGRAPHY (Montserrat)
  // ==============================

  /**
   * Typography scale notes (for refrence):
   *
   * We use REM instead of PX for accessibility and responsiveness.
   * Default browser font-size = 16px
   *
   * So:
   * 1rem   = 16px
   * 0.5rem = 8px
   * 0.75rem = 12px
   * 0.875rem = 14px
   * 1rem   = 16px
   * 1.25rem = 20px
   * 1.5rem = 24px
   * 2rem   = 32px
   * 3rem   = 48px
   * 4rem   = 64px
   * 5rem   = 80px
   *
   * clamp(min, viewport, max) is used for responsive typography:
   * Example:
   * clamp(2rem, 4vw, 3.5rem)
   * → Minimum 32px, fluid in between, maximum 56px
   *
   * This ensures:
   * - Mobile friendly text
   * - Desktop scaling
   * - No media queries needed
   * - Better accessibility
   */

  typography: {
    fontFamily: "var(--font-montserrat)",

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      fontSize: "clamp(2.8rem, 6vw, 5rem)",
      lineHeight: 1.1,
    },

    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
      lineHeight: 1.15,
    },

    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    },

    h4: {
      fontWeight: 600,
      letterSpacing: "-0.015em",
      fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
    },

    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    },

    h6: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
      fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
    },

    body1: {
      fontWeight: 400,
      lineHeight: 1.7,
      fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
      letterSpacing: "0.01em",
    },

    body2: {
      fontWeight: 400,
      lineHeight: 1.6,
      opacity: 0.8,
      fontSize: "clamp(0.9rem, 1vw, 1rem)",
      letterSpacing: "0.01em",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "rgba(255,255,255,.6)",
          },
        },
      },
    },
  },
});

export default theme;
