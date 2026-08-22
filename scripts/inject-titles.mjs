import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE_TITLE = "A. Moumine Blog";
const LATOILE_TITLE = JSON.parse(
	readFileSync("src/data/case-studies/latoile.rendered.json", "utf8"),
).title;

// Prerendered pages ship the generic <title>; swap in the per-route one.
// Pages missing from dist (not prerendered) keep the base title until
// hydration, where usePageMeta sets it client-side.
const PAGES = [
	["dist/work-experiences/index.html", "Work"],
	["dist/projects/index.html", "Projects"],
	["dist/projects/latoile/index.html", LATOILE_TITLE],
	["dist/generate/index.html", "Generate."],
	["dist/404/index.html", "Not found"],
];

for (const [file, suffix] of PAGES) {
	const path = join(import.meta.dirname, "..", file);
	try {
		const html = readFileSync(path, "utf8");
		if (!html.includes(`<title>${BASE_TITLE}</title>`)) continue;
		writeFileSync(
			path,
			html.replace(`<title>${BASE_TITLE}</title>`, `<title>${suffix} · ${BASE_TITLE}</title>`),
		);
		console.log(`title: ${file} → "${suffix} · ${BASE_TITLE}"`);
	} catch {
		console.log(`title: ${file} skipped (not prerendered)`);
	}
}
