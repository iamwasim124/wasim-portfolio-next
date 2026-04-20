"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { AttachFile, Close, Email, Phone, Send } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import theme from "@/theme/theme";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/", "video/"];

const Contact: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.65)",
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.25)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.45)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.02) inset",
        WebkitTextFillColor: theme.palette.text.primary,
        caretColor: theme.palette.text.primary,
        transition: "background-color 9999s ease-out 0s",
        borderRadius: "inherit",
      },
      "& textarea:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.02) inset",
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
    },
  };

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

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitError("");
      setFileError("");

      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (selectedFile) {
          formData.append("attachment", selectedFile);
        }

        const response = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        setSubmitted(true);
        resetForm();
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;

    if (!file) {
      setSelectedFile(null);
      setFileError("");
      return;
    }

    const isAcceptedType = ACCEPTED_FILE_TYPES.some((type) =>
      type.endsWith("/") ? file.type.startsWith(type) : file.type === type,
    );

    if (!isAcceptedType) {
      setSelectedFile(null);
      setFileError("Only images, videos, or PDF files are allowed.");
      event.currentTarget.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setFileError("File size must be 10 MB or less.");
      event.currentTarget.value = "";
      return;
    }

    setSelectedFile(file);
    setFileError("");
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      ref={ref}
      id="contact"
      sx={{ py: { xs: 9, md: 12 }, bgcolor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Container maxWidth="lg">
        <Fade in={isMobile ? true : visible} timeout={isMobile ? 0 : 1000}>
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
              Have a project in mind? Let&apos;s work together!
            </Typography>
          </Box>
        </Fade>

        <Slide
          direction="up"
          in={isMobile ? true : visible}
          timeout={isMobile ? 0 : 1200}
        >
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
              <Fade in timeout={isMobile ? 0 : 600}>
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Zoom in timeout={isMobile ? 0 : 800}>
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

                  <Fade in timeout={isMobile ? 0 : 1000}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      I&apos;ll get back to you shortly.
                    </Typography>
                  </Fade>
                </Box>
              </Fade>
            ) : (
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      autoComplete="off"
                      sx={textFieldSx}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                        htmlInput: {
                          autoComplete: "off",
                        },
                      }}
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
                      autoComplete="off"
                      sx={textFieldSx}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                        htmlInput: {
                          autoComplete: "off",
                        },
                      }}
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
                      autoComplete="off"
                      sx={textFieldSx}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                        htmlInput: {
                          autoComplete: "new-password",
                        },
                      }}
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
                      autoComplete="off"
                      sx={textFieldSx}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                        htmlInput: {
                          autoComplete: "new-password",
                        },
                      }}
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
                      autoComplete="off"
                      sx={textFieldSx}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      slotProps={{
                        htmlInput: {
                          autoComplete: "off",
                        },
                      }}
                      error={
                        formik.touched.message && Boolean(formik.errors.message)
                      }
                      helperText={
                        formik.touched.message && formik.errors.message
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {selectedFile ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                          px: 2,
                          py: 1.5,
                          borderRadius: 2,
                          border: "1px solid rgba(255,255,255,0.25)",
                          bgcolor: "rgba(255,255,255,0.03)",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.primary,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {selectedFile.name}
                        </Typography>
                        <IconButton
                          aria-label="Remove selected file"
                          onClick={clearSelectedFile}
                          sx={{
                            color: theme.palette.text.primary,
                            flexShrink: 0,
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<AttachFile />}
                        sx={{
                          borderColor: "rgba(255,255,255,0.25)",
                          color: theme.palette.text.primary,
                          justifyContent: "flex-start",
                          width: "100%",
                          py: 1.5,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            bgcolor: "rgba(0,216,233,0.08)",
                          },
                        }}
                      >
                        Upload Image, Video, or PDF
                        <input
                          ref={fileInputRef}
                          hidden
                          type="file"
                          name="attachment"
                          accept="image/*,video/*,.pdf,application/pdf"
                          onChange={handleFileChange}
                        />
                      </Button>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: theme.palette.text.secondary }}
                    >
                      Optional. Max size 10 MB.
                    </Typography>
                    {fileError ? (
                      <Typography
                        color="error"
                        sx={{
                          mt: "3px",
                          fontSize: "0.75rem",
                          lineHeight: 1.66,
                        }}
                      >
                        {fileError}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {submitError ? (
                      <Typography
                        color="error"
                        sx={{ mb: 1, fontSize: "0.75rem", lineHeight: 1.66 }}
                      >
                        {submitError}
                      </Typography>
                    ) : null}

                    <Button
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting}
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
                      {formik.isSubmitting ? "Sending..." : "Send Message"}
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
