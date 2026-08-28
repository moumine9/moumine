#!/usr/bin/env node
// Read src/data/projects.json for the curated slug list + overrides,
// fetch each repo's metadata via gh CLI, write back to projects.json.
// Fails soft: if gh is unavailable or a repo fetch fails, keeps the
// existing entry from projects.json.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const PATH = "src/data/projects.json";

function loadCurated() {
  if (!existsSync(PATH)) return [];
  try {
    return JSON.parse(readFileSync(PATH, "utf8"));
  } catch {
    return [];
  }
}

function fetchRepo(slug) {
  const fields = "name,description,stargazerCount,primaryLanguage,repositoryTopics,url,pushedAt,updatedAt";
  const out = execFileSync("gh", ["repo", "view", slug, "--json", fields], {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  });
  const raw = JSON.parse(out);
  return {
    slug,
    name: raw.name,
    description: raw.description ?? "",
    stars: raw.stargazerCount ?? 0,
    language: raw.primaryLanguage?.name ?? null,
    topics: (raw.repositoryTopics ?? []).map((t) => t.name),
    url: raw.url,
    pushedAt: raw.pushedAt,
    updatedAt: raw.updatedAt,
  };
}

function main() {
  const curated = loadCurated();
  const cache = Object.fromEntries(curated.map((p) => [p.slug, p]));
  const out = [];

  for (const entry of curated) {
    const slug = entry.slug;
    if (!slug) {
      console.warn("skipping entry with no slug:", entry);
      continue;
    }
    try {
      const fetched = fetchRepo(slug);
      const merged = { ...fetched };
      if (entry.description) merged.description = entry.description;
      if (Array.isArray(entry.topics) && entry.topics.length) merged.topics = entry.topics;
      out.push(merged);
      console.log(`✓ ${slug}`);
    } catch (err) {
      const fallback = cache[slug];
      if (fallback) {
        console.warn(`⚠ ${slug} — fetch failed, using cached data`);
        out.push(fallback);
      } else {
        console.warn(`⚠ ${slug} — fetch failed, no cache available:`, err.message);
      }
    }
  }

  writeFileSync(PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${out.length} project(s) to ${PATH}`);
}

main();
