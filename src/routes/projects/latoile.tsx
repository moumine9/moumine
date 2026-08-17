import projectsJson from "../../data/projects.json";
import content from "../../data/case-studies/latoile.rendered.json";

interface Project {
  slug: string;
  language: string | null;
  pushedAt: string;
  url: string;
}

interface Crumb {
  label: string;
  href?: string;
}

interface Section {
  title: string;
  contentHtml: string;
}

interface Content {
  projectSlug: string;
  eyebrow: string;
  title: string;
  crumbs: Crumb[];
  lede: string;
  sections: Section[];
  cta: { label: string; href: string };
}

export default function ProjectLatoile() {
  const c = content as unknown as Content;
  const meta = (projectsJson as Project[]).find((p) => p.slug === c.projectSlug);
  const href = meta?.url ?? c.cta.href;

  return (
    <section class="page casestudy">
      <p class="casestudy__crumbs">
        {c.crumbs.map((crumb, i) => (
          <span key={`crumb-${i}`}>
            {crumb.href ? <a href={crumb.href}>{crumb.label}</a> : crumb.label}
            {i < c.crumbs.length - 1 && <> &nbsp;/&nbsp; </>}
          </span>
        ))}
      </p>

      <header class="page__header">
        <div>
          <div class="page__eyebrow">{c.eyebrow}</div>
          <h1 class="page__title">{c.title}</h1>
        </div>
        {meta && (
          <span class="hero__masthead-issue">
            {meta.language} · {new Date(meta.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        )}
      </header>

      <p class="casestudy__lede">{c.lede}</p>

      <hr class="rule" />

      {c.sections.map((section, i) => (
        <>
          <article key={`section-${i}`} class="casestudy__section">
            <h2 class="casestudy__h2">{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
          </article>
          <hr class="rule" />
        </>
      ))}

      <p class="casestudy__cta">
        <a href={href} target="_blank" rel="noreferrer" class="linklist__value">
          {c.cta.label}
        </a>
      </p>
    </section>
  );
}
