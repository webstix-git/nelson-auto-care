export default function HtmlMain({ html }) {
  return <main id="main" dangerouslySetInnerHTML={{ __html: html }} />;
}
