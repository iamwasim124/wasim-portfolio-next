"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Fade,
  Slide,
  Paper,
  Divider,
  TextField,
  Button,
  Link,
  Zoom,
} from "@mui/material";
import { Email, Phone, Send } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import theme from "@/theme/theme";

const Contact: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, "First name must contain only letters")
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name cannot exceed 30 characters")
        .required("First name is required"),

      lastName: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters")
        .min(1, "Last name must be at least 1 character")
        .max(30, "Last name cannot exceed 30 characters")
        .required("Last name is required"),

      phone: Yup.string()
        .trim()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
        .required("Phone number is required"),

      email: Yup.string()
        .trim()
        .email("Enter a valid email address (example@domain.com)")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Enter a properly formatted email address",
        )
        .required("Email address is required"),

      message: Yup.string()
        .trim()
        .min(10, "Message must be at least 10 characters long")
        .max(500, "Message cannot exceed 500 characters")
        .required("Message is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log(values); // API later

      setSubmitted(true);
      resetForm();
    },
  });

  return (
    <Box ref={ref} id="contact" sx={{ py: 12, bgcolor: "rgba(0, 0, 0, 0.3)" }}>
      <Container maxWidth="md">
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get In Touch
            </Typography>

            <Box
              sx={{
                width: 100,
                height: 4,
                bgcolor: theme.palette.primary.main,
                mx: "auto",
              }}
            />

            <Typography
              variant="body1"
              sx={{ mt: 2, color: theme.palette.text.secondary }}
            >
              Have a project in mind? Let's work together!
            </Typography>
          </Box>
        </Fade>

        <Slide direction="up" in={visible} timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: "rgba(255,255,255,.05)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            {submitted ? (
              <Fade in timeout={600}>
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Zoom in timeout={800}>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 2,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Thank you! 🎉
                    </Typography>
                  </Zoom>

                  <Fade in timeout={1000}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      I’ll get back to you shortly.
                    </Typography>
                  </Fade>
                </Box>
              </Fade>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="message"
                      label="Message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.message && Boolean(formik.errors.message)
                      }
                      helperText={
                        formik.touched.message && formik.errors.message
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      fullWidth
                      endIcon={<Send />}
                      variant="contained"
                      sx={{
                        background: "linear-gradient(135deg,#00d8e9,#9333ea)",
                        py: 1.5,
                        fontWeight: 600,
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}

            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Email
                  sx={{ color: theme.palette.primary.main, fontSize: 32 }}
                />
                <Typography variant="body2">Email</Typography>
                <Link
                  href="mailto:iamwasim124@gmail.com"
                  sx={{ color: theme.palette.primary.main }}
                >
                  iamwasim124@gmail.com
                </Link>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Phone
                  sx={{ color: theme.palette.primary.main, fontSize: 32 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.primary }}
                >
                  Phone
                </Typography>
                <Link
                  href="tel:+918123833968"
                  sx={{ color: theme.palette.primary.main }}
                >
                  +91 8123833968
                </Link>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default Contact;
