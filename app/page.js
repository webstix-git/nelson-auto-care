import HtmlMain from "@/components/HtmlMain";
import { getPageHtml, getMeta } from "@/lib/content";

const meta = getMeta().home;

export const metadata = {
  title: meta.title,
  description: meta.description,
  other: { "theme-color": "#000000" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Nelson Auto Care",
  telephone: "+1-608-519-1437",
  email: "valvoline2006@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4131 Mormon Coulee Ct.",
    addressLocality: "La Crosse",
    addressRegion: "WI",
    postalCode: "54601",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: "La Crosse, WI",
  slogan: "Service is the Difference",
};

export default function HomePage() {
  const html = getPageHtml("home");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HtmlMain html={html} />
    </>
  );
}
