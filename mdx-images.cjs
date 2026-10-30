// Rehype plugin for the case studies' MDX images, run at build time.
//
// - Adds width and height from the file itself, so the page doesn't jump while images load.
// - The first image (the cover) loads eagerly with high priority; the rest load lazily.
// - If a 768px version exists next to the image (name-768.webp), adds srcset so phones get the small one.
//
// Reads WebP, PNG and SVG sizes directly from the file header, with no dependencies.
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC = path.join(__dirname, "public");

function readSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.subarray(21, 25);
      return { width: 1 + (((b[1] & 0x3f) << 8) | b[0]), height: 1 + (((b[3] & 0xf) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6)) };
    }
  }
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (file.endsWith(".svg")) {
    const svg = buf.toString("utf8", 0, 2000);
    const w = svg.match(/<svg[^>]*\swidth="([\d.]+)/);
    const h = svg.match(/<svg[^>]*\sheight="([\d.]+)/);
    if (w && h) return { width: Math.round(+w[1]), height: Math.round(+h[1]) };
    const vb = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
    if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
  }
  return null;
}

function walk(node, visit) {
  visit(node);
  if (node.children) for (const child of node.children) walk(child, visit);
}

module.exports = function mdxImages() {
  return (tree, file) => {
    let first = true;
    walk(tree, (node) => {
      if (node.type !== "element" || node.tagName !== "img") return;
      const src = node.properties && node.properties.src;
      if (typeof src !== "string" || !src.startsWith("/")) return;
      const local = path.join(PUBLIC, src);
      if (!fs.existsSync(local)) {
        file.message(`Image not found in public/: ${src}`);
        return;
      }
      const size = readSize(local);
      if (size) Object.assign(node.properties, size);
      if (first) {
        node.properties.loading = "eager";
        node.properties.fetchpriority = "high";
        first = false;
      } else {
        node.properties.loading = "lazy";
      }
      node.properties.decoding = "async";
      const small = src.replace(/\.webp$/, "-768.webp");
      if (small !== src && size && size.width > 768 && fs.existsSync(path.join(PUBLIC, small))) {
        node.properties.srcSet = `${small} 768w, ${src} ${size.width}w`;
        // The case column is 768px wide, with 24px of padding on each side below that.
        node.properties.sizes = "(min-width: 816px) 768px, calc(100vw - 48px)";
      }
    });
  };
};
