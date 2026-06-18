export type SocialIcon = "linkedin" | "github" | "email" | "phone";

export type SocialLink = {
  icon: SocialIcon;
  label: string;
  /** null = disabled / coming soon */
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/iamwasim124",
  },
  {
    icon: "github",
    label: "GitHub profile coming soon — polishing projects",
    href: null,
  },
  {
    icon: "email",
    label: "Email",
    href: "mailto:iamwasim124@gmail.com",
  },
  {
    icon: "phone",
    label: "Phone",
    href: "tel:+918123833968",
  },
];
