import HtmlMain from "@/components/HtmlMain";
import { getPageHtml, getMeta } from "@/lib/content";

const meta = getMeta()["thank-you"];

export const metadata = {
  title: meta.title,
  description: meta.description,
  other: { "theme-color": "#000000" },
};

export default function Page() {
  const html = getPageHtml("thank-you");
  return <HtmlMain html={html} />;
}
