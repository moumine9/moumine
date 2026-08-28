#!/usr/bin/env node
// Read src/data/projects.json for the slug list. Each entry may carry
// _topicsOverride and/or description to pin values that differ from GitHub.
// Fetches live metadata via gh CLI and merges overrides on top.
// Fails soft: if gh is unavailable or a repo fetch fails, keeps the
// existing entry. If projects.json is absent or empty, exits with an error
// rather than silently writing an empty list.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const PATH = "src/data/projects.json";

function loadProjects() {
  if (!existsSync(PATH)) throw new Error(`${PATH} not found — cannot determine slug list`);
  const list = JSON.parse(readFileSync(PATH, "utf8"));
  if (!Array.isArray(list) || list.length === 0) throw new Error(`${PATH} is empty — refusing to overwrite`);
  return list;
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
  const projects = loadProjects();
  const cache = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const out = [];

  for (const entry of projects) {
    const slug = entry.slug;
    if (!slug) {
      console.warn("skipping entry with no slug:", entry);
      continue;
    }
    try {
      const fetched = fetchRepo(slug);
      const merged = { ...fetched };
      if (entry.description) merged.description = entry.description;
      // _topicsOverride pins topics that differ from the GitHub repo's topics
      if (Array.isArray(entry._topicsOverride) && entry._topicsOverride.length) {
        merged.topics = entry._topicsOverride;
        merged._topicsOverride = entry._topicsOverride;
      }
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
