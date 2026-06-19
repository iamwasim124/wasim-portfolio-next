"use client";

import { Box, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import theme from "@/theme/theme";
import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Skills from "@/components/sections/home/Skills";
import Experience from "@/components/sections/home/Experience";
import Projects from "@/components/sections/home/Projects";
import Services from "@/components/sections/home/Services";
import Contact from "@/components/sections/home/Contact";
import Faq from "@/components/sections/home/Faq";
import { heroData } from "@/data/hero";
import { aboutData } from "@/data/about";
import { skillsData } from "@/data/skills";
import { experienceData, achievementsData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { faqData } from "@/data/faq";
import Testimonials from "@/components/sections/home/Testimonials";

export default function Home() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [heroData, setHeroData] = useState(null);

  // useEffect(() => {
  //   const fetchHeroData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4005/api/hero");
  //       const data = await res.json();
  //       setHeroData(data);
  //     } catch (error) {
  //       console.error("Error fetching hero data:", error);
  //     }
  //   };

  //   fetchHeroData();
  // }, []);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Wasim",
    url: "https://iamwasim.in",
    image: "https://iamwasim.in/assets/images-videos/wasim-3.webp",
    jobTitle: "React and Next.js Frontend Developer",
    description:
      "React.js and Next.js freelancer building modern web applications, landing pages, and performant frontend experiences.",
    email: "mailto:iamwasim124@gmail.com",
    telephone: "+91 8123833968",
    sameAs: ["https://linkedin.com/in/iamwasim124"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ballari",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    nationality: "Indian",
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      skills:
        "React.js, Next.js, TypeScript, Frontend Development, SEO, Responsive Web Design",
    },
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

  // Local + service signal: helps "freelancer / web developer / projects in
  // Ballari" and "college / mini / final-year project" style searches.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mohammed Wasim — Freelance React & Next.js Developer",
    image: "https://iamwasim.in/assets/images-videos/wasim-3.webp",
    url: "https://iamwasim.in",
    email: "mailto:iamwasim124@gmail.com",
    telephone: "+91 8123833968",
    priceRange: "$$",
    description:
      "Freelance React.js and Next.js web developer based in Ballari, Karnataka — building business websites, landing pages, web apps, and college, mini, and final-year projects for students. Available locally in Ballari and remotely across India.",
    founder: { "@type": "Person", name: "Mohammed Wasim" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ballari",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Ballari" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: ["https://linkedin.com/in/iamwasim124"],
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Frontend Development",
      "College and final-year projects",
      "Mini projects",
      "SEO",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Websites & Landing Pages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom React & Next.js Web Applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "College, Mini & Final-Year Projects for Students",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Performance Optimization",
          },
        },
      ],
    },
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
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        color: theme.palette.common.white,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Animated aurora background — drifting brand-colour orbs */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            borderRadius: "50%",
          },
          "&::before": {
            width: "62vmax",
            height: "62vmax",
            top: "-22vmax",
            left: "-16vmax",
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 62%)`,
            animation: isMobile ? "none" : "auroraOne 26s ease-in-out infinite",
          },
          "&::after": {
            width: "66vmax",
            height: "66vmax",
            bottom: "-26vmax",
            right: "-18vmax",
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 62%)`,
            animation: isMobile ? "none" : "auroraTwo 32s ease-in-out infinite",
          },
          "@keyframes auroraOne": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(18vmax, 12vmax) scale(1.18)" },
          },
          "@keyframes auroraTwo": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(-15vmax, -10vmax) scale(1.12)" },
          },
        }}
      >
        {/* third drifting orb */}
        <Box
          sx={{
            position: "absolute",
            top: "28%",
            left: "36%",
            width: "46vmax",
            height: "46vmax",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(theme.palette.brand.blue, 0.16)} 0%, transparent 60%)`,
            animation: isMobile ? "none" : "auroraThree 30s ease-in-out infinite",
            "@keyframes auroraThree": {
              "0%, 100%": { transform: "translate(0, 0) scale(1)" },
              "33%": { transform: "translate(-12vmax, 9vmax) scale(1.22)" },
              "66%": { transform: "translate(13vmax, -7vmax) scale(0.92)" },
            },
          }}
        />
      </Box>

      {/* Hero Section */}
      {/* {heroData &&  */}
      <Hero data={heroData} />
      {/* } */}

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
