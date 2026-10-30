// Fails the build if a home story image has no 768px version next to it.
// ProjectStory always offers "name-768.webp" to phones, so a missing file would load broken on mobile.
// Create one with any image tool: same name plus "-768", 768px wide, WebP.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "app", "data", "projects.ts"), "utf8");
const srcs = [...data.matchAll(/src: "([^"]+\.webp)"/g)].map((m) => m[1]);
const missing = srcs.filter((src) => !existsSync(join(root, "public", src.replace(/\.webp$/, "-768.webp"))));
if (missing.length) {
  console.error(`Missing 768px versions for home images:\n${missing.map((s) => `  ${s}`).join("\n")}`);
  process.exit(1);
}
console.log(`Home images: ${srcs.length} checked, all have a 768px version.`);
