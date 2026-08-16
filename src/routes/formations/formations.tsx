import formationsJson from '../../data/formations.json';

export default function Formations() {
  const formations: Formations = formationsJson;

  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">Curriculum</div>
          <h1 class="page__title">Study.</h1>
        </div>
        <span class="hero__masthead-issue">{formations.length} programs</span>
      </header>

      {formations.map((formation, index) => {
        const startYear = String(formation.time.start).slice(0, 4);
        const endYear = String(formation.time.end).slice(0, 4);

        return (
          <article key={`formation-${index}`} class="entry">
            <div class="entry__date">
              {startYear}
              <small>&mdash; {endYear}</small>
            </div>
            <div class="entry__body">
              <h3 class="entry__role">
                <a
                  href={formation.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--ink)" }}
                >
                  {formation.place}
                </a>
              </h3>
              <p class="entry__place">{formation.type}</p>
              <ul style={{ fontFamily: "var(--font-serif)", color: "var(--ink-soft)", paddingLeft: "1.25rem", margin: 0 }}>
                {formation.courses.map((course, i) => (
                  <li key={`course-${index}-${i}`} style={{ marginBottom: "0.3rem" }}>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}

type Formations = Formation[];
export type Formation = Root;

export interface Root {
  place: string;
  type: string;
  link: string;
  time: Time;
  courses: string[];
}

export interface Time {
  start: string;
  end: string;
}
