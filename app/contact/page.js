import HtmlMain from "@/components/HtmlMain";
import { getPageHtml, getMeta } from "@/lib/content";

const meta = getMeta()["contact"];

export const metadata = {
  title: meta.title,
  description: meta.description,
  other: { "theme-color": "#000000" },
};

export default function Page() {
  const html = getPageHtml("contact");
  return <HtmlMain html={html} />;
}
