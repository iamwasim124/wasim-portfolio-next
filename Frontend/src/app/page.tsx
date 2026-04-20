"use client";

import { Box, useMediaQuery } from "@mui/material";
import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import Hero from "@/components/sections/HomePage/Hero";
import About from "@/components/sections/HomePage/About";
import Skills from "@/components/sections/HomePage/Skills";
import Experience from "@/components/sections/HomePage/Experience";
import Projects from "@/components/sections/HomePage/Project";
import Services from "@/components/sections/HomePage/Services";
import Contact from "@/components/sections/HomePage/Contact";
import Faq from "@/components/sections/HomePage/Faq";
import { heroData } from "@/data/hero";
import { aboutData } from "@/data/about";
import { skillsData } from "@/data/skills";
import { experienceData, achievementsData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { faqData } from "@/data/faq";
import Testimonials from "@/components/sections/HomePage/Testimonials";

export default function Home() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("http://localhost:4005/api/hero");
        const data = await res.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Wasim",
    url: "https://iamwasim.in",
    image: "https://iamwasim.in/assets/images-videos/wasim.png",
    jobTitle: "React and Next.js Frontend Developer",
    description:
      "React.js and Next.js freelancer building modern web applications, landing pages, and performant frontend experiences.",
    email: "mailto:iamwasim124@gmail.com",
    telephone: "+91 8123833968",
    sameAs: ["https://linkedin.com/in/iamwasim124"],
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Frontend Development",
      "SEO",
      "Responsive Web Design",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mohammed Wasim Portfolio",
    url: "https://iamwasim.in",
    description:
      "Portfolio website of Mohammed Wasim, a React.js and Next.js freelancer.",
    inLanguage: "en",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Box
      sx={{
        bgcolor: "#0a0e1a",
        minHeight: "100vh",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            animation: isMobile ? "none" : "gridMove 20s linear infinite",
          },
          "@keyframes gridMove": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(50px, 50px)" },
          },
        }}
      />

      {/* Hero Section */}
      {heroData && <Hero data={heroData} />}

      {/* About Section */}
      <About data={aboutData} />

      {/* Skills Section */}
      <Skills skills={skillsData} />

      {/* Experience Section */}
      <Experience experience={experienceData} achievements={achievementsData} />

      {/* Projects Section */}

      <Projects projects={projectsData} />
      <Services data={servicesData} />
      <Faq items={faqData} />
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </Box>
  );
}
