"use client";

import { Box } from "@mui/material";

import Hero from "@/components/sections/HomePage/Hero";
import About from "@/components/sections/HomePage/About";
import Skills from "@/components/sections/HomePage/Skills";
import Experience from "@/components/sections/HomePage/Experience";
import Projects from "@/components/sections/HomePage/Project";
import Services from "@/components/sections/HomePage/Services";
import Contact from "@/components/sections/HomePage/Contact";
import { heroData } from "@/data/hero";
import { aboutData } from "@/data/about";
import { skillsData } from "@/data/skills";
import { experienceData, achievementsData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: "#0a0e1a",
        minHeight: "100vh",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 216, 233, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)
          `,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          },
          "@keyframes gridMove": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(50px, 50px)" },
          },
        }}
      />

      {/* Hero Section */}
      <Hero data={heroData} />

      {/* About Section */}
      <About data={aboutData} />

      {/* Skills Section */}
      <Skills skills={skillsData} />

      {/* Experience Section */}
      <Experience experience={experienceData} achievements={achievementsData} />

      {/* Projects Section */}

      <Projects projects={projectsData} />
      <Services data={servicesData} />

      {/* Contact Section */}
      <Contact />
    </Box>
  );
}
