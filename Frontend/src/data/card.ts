export type CardContactIcon = "website" | "email" | "phone" | "linkedin";

export type CardContact = {
  icon: CardContactIcon;
  label: string;
  href: string;
};

export type CardData = {
  name: string;
  specialty: string;
  role: string;
  website: string;
  websiteUrl: string;
  banner: string;
  cta: string;
  ctaSub: string;
  services: string[];
  contacts: CardContact[];
};

export const cardData: CardData = {
  name: "Mohammed Wasim",
  specialty: "Web Application Specialist",
  role: "React & Next.js Developer",
  website: "iamwasim.in",
  websiteUrl: "https://iamwasim.in",
  banner: "/assets/images-videos/wasim-3.webp",
  cta: "Have a project in mind?",
  ctaSub:
    "Helping Businesses, Startups & Students Bring Their Ideas to Life Online",
  services: ["Custom Websites", "Web Applications", "Ongoing Support"],
  contacts: [
    { icon: "website", label: "iamwasim.in", href: "https://iamwasim.in" },
    {
      icon: "email",
      label: "iamwasim124@gmail.com",
      href: "mailto:iamwasim124@gmail.com",
    },
    { icon: "phone", label: "+91 8123833968", href: "tel:+918123833968" },
    {
      icon: "linkedin",
      label: "linkedin.com/in/iamwasim124",
      href: "https://linkedin.com/in/iamwasim124",
    },
  ],
};
