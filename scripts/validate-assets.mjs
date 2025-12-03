import fs from "node:fs";
import path from "node:path";

const projectDataPath = path.join(process.cwd(), "data/projects.json");
const publicDir = path.join(process.cwd(), "public");

const raw = fs.readFileSync(projectDataPath, "utf8");
const projects = JSON.parse(raw);

const missing = [];
let checked = 0;

const resolvePublicPath = (relPath) => {
  const normalized = relPath.startsWith("/") ? relPath.slice(1) : relPath;
  return path.join(publicDir, normalized);
};

const assertExists = (assetPath) => {
  const absolutePath = resolvePublicPath(assetPath);
  checked += 1;
  if (!fs.existsSync(absolutePath)) {
    missing.push({
      assetPath,
      absolutePath,
    });
  }
};

for (const project of projects) {
  if (project.heroImage) {
    assertExists(project.heroImage);
  }
  if (project.gallery && Array.isArray(project.gallery)) {
    for (const image of project.gallery) {
      if (image?.src) {
        assertExists(image.src);
      }
    }
  }
}

if (missing.length > 0) {
  console.error("Missing project asset(s):");
  for (const { assetPath, absolutePath } of missing) {
    console.error(`- ${assetPath} (expected at ${absolutePath})`);
  }
  process.exit(1);
}

console.log(`All ${checked} project image reference(s) are present in /public.`);
