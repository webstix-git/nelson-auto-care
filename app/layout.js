import "@/styles/style.css";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import Callbar from "@/components/Callbar";
import SiteEffects from "@/components/SiteEffects";
import BodyClass from "@/components/BodyClass";

export const metadata = {
  title: {
    default: "Nelson Auto Care | Auto Repair in La Crosse, WI",
    template: "%s",
  },
  description:
    "Nelson Auto Care: honest, quality auto repair in La Crosse, WI. Maintenance, brakes, suspension, wheel alignments, pre-purchase and state inspections. Service is the Difference.",
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&family=Barlow:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BodyClass />
        <SiteEffects>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <SiteChrome />
          {children}
          <Footer />
          <Callbar />
        </SiteEffects>
      </body>
    </html>
  );
}
