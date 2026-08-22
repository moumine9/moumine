import projectsJson from "../../data/projects.json";
import content from "./projects.content.json";
import { usePageMeta } from "../../utils/usePageMeta";

interface Project {
  slug: string;
  name: string;
  description: string;
  stars: number;
  language: string | null;
  topics: string[];
  url: string;
  pushedAt: string;
  updatedAt: string;
}

function formatPushed(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Projects() {
  usePageMeta("Projects");
  const projects: Project[] = projectsJson;
  const caseStudies = content.caseStudies as Record<string, string>;

  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">{content.page.eyebrow}</div>
          <h1 class="page__title">{content.page.title}</h1>
        </div>
        <span class="hero__masthead-issue">{projects.length} {content.page.entriesLabel}</span>
      </header>

      {projects.map((p, i) => {
        const caseStudy = caseStudies[p.slug];
        return (
          <article key={`project-${i}`} class="entry">
            <div class="entry__date">
              {p.language ?? content.entry.unknownLanguage}
              <small>{formatPushed(p.pushedAt)}</small>
            </div>
            <div class="entry__body">
              <h3 class="entry__role">
                {caseStudy ? (
                  <a href={caseStudy} class="entry__role-link">
                    {p.name}
                  </a>
                ) : (
                  <a href={p.url} target="_blank" rel="noreferrer" class="entry__role-link">
                    {p.name}
                  </a>
                )}
              </h3>
              <p class="entry__place">
                github.com/{p.slug}
                {p.stars > 0 && <>&nbsp;·&nbsp;{p.stars}★</>}
              </p>
              {p.description && <p class="entry__desc">{p.description}</p>}
              {p.topics.length > 0 && (
                <ul class="entry__tags">
                  {p.topics.map((t) => (
                    <li key={`tag-${p.slug}-${t}`} class="entry__tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {caseStudy && (
                <a href={caseStudy} class="entry__link">
                  {content.entry.readCaseStudyLabel}
                </a>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
