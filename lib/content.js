import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export function getPageHtml(slug) {
  return fs.readFileSync(path.join(contentDir, `${slug}.html`), "utf8");
}

export function getMeta() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, "meta.json"), "utf8"));
}
