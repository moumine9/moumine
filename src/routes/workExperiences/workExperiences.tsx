import { Fragment } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import workExperiencesJson from "../../data/workexperiences.json";
import content from "./work.content.json";
import { Icon } from "../../components/Icon";
import { usePageMeta } from "../../utils/usePageMeta";

dayjs.extend(relativeTime);
dayjs.extend(duration);

type FilterKey = string;

export default function WorkExperiences() {
  usePageMeta("Work");
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience>();
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

  const rows: WorkExperience[] = useMemo(() => workExperiencesJson, []);

  const visible = useMemo(() => {
    if (active.size === 0) return rows;
    return rows.filter((row) => {
      const types = row.type?.split(";") ?? [];
      return types.some((t) => active.has(t));
    });
  }, [rows, active]);

  const toggle = (k: FilterKey) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const entriesLabel = visible.length === 1
    ? content.page.entriesLabelSingular
    : content.page.entriesLabelPlural;

  return (
    <Fragment>
      <section class="page">
        <header class="page__header">
          <div>
            <div class="page__eyebrow">{content.page.eyebrow}</div>
            <h1 class="page__title">{content.page.title}</h1>
          </div>
          <span class="hero__masthead-issue">{visible.length} {entriesLabel}</span>
        </header>

        <div class="filters" role="group" aria-label="Filter work by type">
          {content.filters.map(({ key, label }) => (
            <button
              key={`filter-${key}`}
              type="button"
              class="filter-pill"
              aria-pressed={active.has(key)}
              onClick={() => toggle(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {visible.map((exp, index) => (
          <ExperienceEntry
            key={`Entry${index}`}
            experience={exp}
            onOpen={() => setSelectedExperience(exp)}
          />
        ))}
      </section>

      {selectedExperience && (
        <ExperienceDialog
          exp={selectedExperience}
          onClose={() => setSelectedExperience(undefined)}
        />
      )}
    </Fragment>
  );
}

function ExperienceEntry(props: { experience: WorkExperience; onOpen: () => void }) {
  const exp = props.experience;
  const startYear = String(exp.years.start).slice(0, 4);
  const endYear = exp.years.end === "now"
    ? content.entry.endLabelNow
    : String(exp.years.end).slice(0, 4);
  const types = exp.type?.split(";") ?? [];
  const maxChars = content.entry.descriptionMaxChars;

  return (
    <article class="entry">
      <div class="entry__date">
        {startYear}
        <small>&mdash; {endYear}</small>
      </div>
      <div class="entry__body">
        <h3 class="entry__role">{exp.role.name}</h3>
        <p class="entry__place">
          {exp.company.name} &mdash; {exp.company.place}
        </p>
        {exp.role.description && (
          <p class="entry__desc">
            {exp.role.description.length > maxChars
              ? exp.role.description.slice(0, maxChars) + "…"
              : exp.role.description}
          </p>
        )}
        <ul class="entry__tags">
          {types.map((t) => (
            <li key={`entry-tag-${exp.company.name}-${t}`} class="entry__tag">
              {t}
            </li>
          ))}
        </ul>
        <button type="button" class="entry__link" onClick={props.onOpen}>
          {content.entry.readMoreLabel}
        </button>
      </div>
    </article>
  );
}

function ExperienceDialog(props: { exp: WorkExperience; onClose: () => void }) {
  const { exp, onClose } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const labels = content.dialog;

  const [start, end] = [
    dayjs(exp.years.start),
    exp.years.end === "now" ? dayjs() : dayjs(exp.years.end),
  ];
  const roleDuration = dayjs.duration(start.diff(end)).humanize();
  const types = exp.type?.split(";").filter(Boolean) ?? [];
  const frameworks = exp.frameworks?.react?.version?.length
    ? `React ${exp.frameworks.react.version.join(", ")}`
    : null;
  const editors = exp.environment?.editor?.filter(Boolean) ?? [];

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (!d.open) d.showModal();
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      class="dialog"
      onClick={onBackdropClick}
      onClose={onClose}
    >
      <div class="dialog__inner">
        <header class="dialog__header">
          <div class="dialog__heading">
            <span class="eyebrow dialog__eyebrow">{exp.company.name}</span>
            <h2 class="dialog__title">{exp.role.name}</h2>
            {types.length > 0 && (
              <ul class="entry__tags dialog__tags">
                {types.map((t) => (
                  <li key={`dialog-tag-${exp.company.name}-${t}`} class="entry__tag">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" class="dialog__close" aria-label={labels.closeAriaLabel} onClick={onClose}>
            <Icon name="xmark" />
          </button>
        </header>

        <div class="dialog__body">
          <p class="dialog__lede">{exp.role.description}</p>

          <section class="dialog__section">
            <div class="eyebrow dialog__label">{labels.responsibilitiesLabel}</div>
            <ul class="dialog__tasks">
              {exp.role.tasks.map((t, i) => (
                <li key={`task-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          {exp.languages && exp.languages.length > 0 && (
            <DialogRow label={labels.languagesLabel} value={exp.languages.join(" · ")} />
          )}

          {frameworks && (
            <DialogRow label={labels.frameworksLabel} value={frameworks} />
          )}

          {exp.technologies && exp.technologies.length > 0 && (
            <DialogRow label={labels.technologiesLabel} value={exp.technologies.join(" · ")} />
          )}

          {exp.librairies && exp.librairies.length > 0 && (
            <DialogRow label={labels.librariesLabel} value={exp.librairies.join(" · ")} />
          )}

          {editors.length > 0 && (
            <DialogRow label={labels.environmentLabel} value={editors.join(" · ")} />
          )}

          <footer class="dialog__meta">
            <span>{exp.years.start} &mdash; {exp.years.end} ({roleDuration})</span>
            <span>{exp.company.place}</span>
            {exp.company.team && <span>{exp.company.team} · {exp.company.sector}</span>}
          </footer>
        </div>
      </div>
    </dialog>
  );
}

function DialogRow(props: { label: string; value: string }) {
  return (
    <section class="dialog__section">
      <div class="eyebrow dialog__label">{props.label}</div>
      <p class="dialog__value">{props.value}</p>
    </section>
  );
}

export interface WorkExperience {
  company: Company;
  type: string;
  role: Role;
  years: Years;
  languages?: string[];
  frameworks?: Frameworks;
  technologies?: string[];
  environment?: Environment;
  librairies?: string[];
}

export interface Company {
  name: string;
  sector: string;
  team?: string;
  place: string;
}

export interface Role {
  name: string;
  description: string;
  tasks: string[];
}

export interface Years {
  start: string;
  end: string;
}

export interface Frameworks {
  react: React;
}

export interface React {
  version: string[];
}

export interface Environment {
  editor: string[];
}
