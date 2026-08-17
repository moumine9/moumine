#!/usr/bin/env node
// Read src/data/projects.yml, fetch each repo's metadata via gh CLI,
// write src/data/projects.json. Fails soft: if gh is unavailable or
// a repo fetch fails, keeps any existing entry from projects.json.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { parse } from "yaml";

const CURATED_PATH = "src/data/projects.yml";
const OUT_PATH = "src/data/projects.json";

function loadCurated() {
  const raw = readFileSync(CURATED_PATH, "utf8");
  const parsed = parse(raw);
  if (!Array.isArray(parsed)) throw new Error("projects.yml must be an array");
  return parsed;
}

function loadCache() {
  if (!existsSync(OUT_PATH)) return {};
  try {
    const list = JSON.parse(readFileSync(OUT_PATH, "utf8"));
    return Object.fromEntries(list.map((p) => [p.slug, p]));
  } catch {
    return {};
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
  const cache = loadCache();
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
      if (Array.isArray(entry.tags) && entry.tags.length) merged.topics = entry.tags;
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

  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${out.length} project(s) to ${OUT_PATH}`);
}

main();
