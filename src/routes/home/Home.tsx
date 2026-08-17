import { useState } from "preact/hooks";
import TechnologiesSummary from "./languages";
import LinksElements from "./LinksElements";
import { isAuthenticated } from "../../utils/visitorAuth";

export default function Home() {
  const [authed, setAuthed] = useState(typeof window !== "undefined" ? isAuthenticated() : false);

  const year = new Date().getFullYear();

  return (
    <>
      <section class="hero">
        <div class="hero__masthead">
          <span class="eyebrow">N° 001 &nbsp;·&nbsp; Codito Ergo Sum</span>
          <span class="hero__masthead-issue">Édition {year}</span>
        </div>

        <div class="hero__grid">
          <div class="hero__nameplate">
            <h1 class="hero__name">
              <span class="hero__name-word"><span>Abdoul</span></span>
              <span class="hero__name-word"><span>Moumine.</span></span>
            </h1>
            <p class="hero__role">
              Software Engineer<span class="dot">·</span>Québec, Canada
            </p>
            <p class="hero__tagline">
              Building considered software. Interested in systems that read as
              carefully as they run — clarity first, then everything else.
            </p>
          </div>

          <figure class="hero__portrait">
            <img src="./avatar.png" alt="Portrait" width="128" height="128" />
            <figcaption class="hero__portrait-caption">
              &mdash; the author
            </figcaption>
          </figure>
        </div>

        <hr class="rule rule--short" />

        <LinksElements authenticated={authed} onAuthenticated={() => setAuthed(true)} />
      </section>

      <section id="cv" class="page">
        <header class="page__header">
          <div>
            <div class="page__eyebrow">Chapter II</div>
            <h2 class="page__title">Skills</h2>
          </div>
          <span class="hero__masthead-issue">Reading time · 2 min</span>
        </header>
        <TechnologiesSummary />
      </section>
    </>
  );
}
