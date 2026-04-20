const getHeroData = () => {
  return {
    greeting: "Hello, I'm",
    name: "Mohammed Wasim",
    role: "React & Next.js Frontend Developer",
    description:
      "Freelance React.js and Next.js developer with 4.5 years of experience building scalable web applications, landing pages, and SEO-friendly frontend experiences for modern businesses.",
    resumeUrl: "/assets/files/resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/iamwasim124",
      email: "mailto:iamwasim124@gmail.com",
      phone: "tel:+918123833968",
    },
    image: "/assets/images-videos/wasim.png",
  };
};

module.exports = {
  getHeroData,
};
