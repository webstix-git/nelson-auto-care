import HtmlMain from "@/components/HtmlMain";
import { getPageHtml, getMeta } from "@/lib/content";

export const metadata = {
  title: getMeta()["404"].title,
  description: getMeta()["404"].description,
  other: { "theme-color": "#000000" },
};

export default function NotFound() {
  const html = getPageHtml("404");
  return <HtmlMain html={html} />;
}
