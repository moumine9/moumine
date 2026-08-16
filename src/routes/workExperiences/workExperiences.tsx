import { Fragment } from "preact";
import { useMemo, useState } from "preact/hooks";
import { Modal } from "react-bootstrap";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import workExperiencesJson from "../../data/workexperiences.json";

dayjs.extend(relativeTime);
dayjs.extend(duration);

type FilterKey = "frontend" | "backend" | "others" | "contract" | "longterm" | "intern";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "others", label: "Others" },
  { key: "contract", label: "Contract" },
  { key: "longterm", label: "Long-term" },
  { key: "intern", label: "Intern" },
];

export default function WorkExperiences() {
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience>();
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

  const rows: WorkExperience[] = useMemo(() => workExperiencesJson, []);

  const visible = useMemo(() => {
    if (active.size === 0) return rows;
    return rows.filter((row) => {
      const types = row.type?.split(";") ?? [];
      return types.some((t) => active.has(t as FilterKey));
    });
  }, [rows, active]);

  const toggle = (k: FilterKey) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  return (
    <Fragment>
      <section class="page">
        <header class="page__header">
          <div>
            <div class="page__eyebrow">Chronicle</div>
            <h1 class="page__title">Work.</h1>
          </div>
          <span class="hero__masthead-issue">{visible.length} entries</span>
        </header>

        <div class="filters" role="group" aria-label="Filter work by type">
          {FILTERS.map(({ key, label }) => (
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
            onOpen={() => {
              setSelectedExperience(exp);
              setShowModal(true);
            }}
          />
        ))}
      </section>

      {selectedExperience && (
        <ModalExperience
          show={showModal}
          exp={selectedExperience}
          onClose={() => {
            setShowModal(false);
            setSelectedExperience(undefined);
          }}
        />
      )}
    </Fragment>
  );
}

function ExperienceEntry(props: { experience: WorkExperience; onOpen: () => void }) {
  const exp = props.experience;
  const startYear = String(exp.years.start).slice(0, 4);
  const endYear = exp.years.end === "now" ? "Now" : String(exp.years.end).slice(0, 4);
  const types = exp.type?.split(";") ?? [];

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
            {exp.role.description.length > 220
              ? exp.role.description.slice(0, 220) + "…"
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
          Read more &rarr;
        </button>
      </div>
    </article>
  );
}

function ModalExperience(props: { show: boolean; exp: WorkExperience; onClose: () => void }) {
  const { exp, onClose, show } = props;

  const [start, end] = [
    dayjs(exp.years.start),
    exp.years.end === "now" ? dayjs() : dayjs(exp.years.end),
  ];
  const roleDuration = dayjs.duration(start.diff(end)).humanize();

  return (
    <Modal
      id="modalExperience"
      show={show}
      onHide={onClose}
      dialogClassName="modal-lg modal-dialog-scrollable"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span class="eyebrow" style={{ display: "block", marginBottom: "0.4rem" }}>
            {exp.company.name}
          </span>
          {exp.role.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p class="privacy-body__lede">{exp.role.description}</p>

        <hr class="rule" />

        <div class="eyebrow" style={{ marginBottom: "0.75rem" }}>Responsibilities</div>
        <ul style={{ fontFamily: "var(--font-serif)", color: "var(--ink-soft)", paddingLeft: "1.25rem" }}>
          {exp.role.tasks.map((t, i) => (
            <li key={`task-${i}`} style={{ marginBottom: "0.35rem" }}>{t}</li>
          ))}
        </ul>

        {exp.languages && exp.languages.length > 0 && (
          <>
            <hr class="rule" />
            <div class="eyebrow" style={{ marginBottom: "0.5rem" }}>Languages</div>
            <p style={{ fontFamily: "var(--font-serif)" }}>{exp.languages.join(" · ")}</p>
          </>
        )}

        {exp.technologies && exp.technologies.length > 0 && (
          <>
            <hr class="rule" />
            <div class="eyebrow" style={{ marginBottom: "0.5rem" }}>Technologies</div>
            <p style={{ fontFamily: "var(--font-serif)" }}>{exp.technologies.join(" · ")}</p>
          </>
        )}

        {exp.librairies && exp.librairies.length > 0 && (
          <>
            <hr class="rule" />
            <div class="eyebrow" style={{ marginBottom: "0.5rem" }}>Libraries</div>
            <p style={{ fontFamily: "var(--font-serif)" }}>{exp.librairies.join(" · ")}</p>
          </>
        )}

        <hr class="rule" />
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", fontFamily: "var(--font-serif)", color: "var(--ink-mute)", fontStyle: "italic" }}>
          <span>{exp.years.start} &mdash; {exp.years.end} ({roleDuration})</span>
          <span>{exp.company.place}</span>
          {exp.company.team && <span>{exp.company.team} · {exp.company.sector}</span>}
        </div>
      </Modal.Body>
    </Modal>
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
