export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  brakeService: "/brake-service",
  contact: "/contact",
  thankYou: "/thank-you",
  siteMap: "/site-map",
  privacyPolicy: "/privacy-policy",
  aiPolicy: "/ai-policy",
  aiReadiness: "/ai-readiness-service-index",
};

export const navItems = [
  { href: routes.home, label: "Home", key: "home" },
  { href: routes.about, label: "About Us", key: "about" },
  {
    href: routes.services,
    label: "Services",
    key: "services",
    drop: [
      { href: `${routes.services}#maintenance`, label: "Routine Maintenance" },
      { href: `${routes.services}#brakes`, label: "Brake Services" },
      { href: `${routes.services}#suspension`, label: "Suspension Services" },
      { href: `${routes.services}#alignments`, label: "Wheel Alignments" },
      { href: `${routes.services}#inspections`, label: "Pre-Purchase Inspections" },
      { href: `${routes.services}#state`, label: "State Inspections" },
    ],
  },
  { href: routes.brakeService, label: "Brake Service & Repair", key: "brake-service" },
  { href: routes.contact, label: "Contact Us", key: "contact" },
];
