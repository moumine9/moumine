import TechnologiesSummary from "./languages";
import LinksElements from "./LinksElements";
import formationsJson from "../../data/formations.json";
import awardsJson from "../../data/awards.json";
import content from "./home.content.json";

export default function Home() {
  const primaryFormation = formationsJson[0];
  const awardCount = awardsJson.length;
  const latestAward = awardsJson[0];
  const { hero, factstrip, stackSection } = content;

  const recognitions = factstrip.recognitionsTemplate
    .replace("{count}", String(awardCount))
    .replace("{contest}", latestAward.contest)
    .replace("{time}", latestAward.time);

  return (
    <>
      <section class="hero">
        <div class="hero__grid">
          <div class="hero__nameplate">
            <h1 class="hero__name">
              {hero.nameWords.map((word, i) => (
                <span key={`word-${i}`} class="hero__name-word">
                  <span>{word}</span>
                </span>
              ))}
            </h1>
            <p class="hero__role">
              {hero.role}<span class="dot">{hero.roleSeparator}</span>{hero.place}
            </p>
            <p class="hero__tagline">{hero.tagline}</p>
          </div>

          <figure class="hero__portrait">
            <img
              src={hero.portraitSrc}
              alt={hero.portraitAlt}
              width={hero.portraitSize}
              height={hero.portraitSize}
            />
          </figure>
        </div>

        <hr class="rule rule--short" />

        <LinksElements />

        <dl class="factstrip">
          <div class="factstrip__row">
            <dt>{factstrip.educationLabel}</dt>
            <dd>
              {primaryFormation.type} &mdash;{" "}
              <a href={primaryFormation.link} target="_blank" rel="noreferrer" class="factstrip__link">
                {primaryFormation.place}
              </a>{" "}
              ({primaryFormation.time.start.slice(0, 4)}&ndash;{primaryFormation.time.end.slice(0, 4)})
            </dd>
          </div>
          <div class="factstrip__row">
            <dt>{factstrip.recognitionsLabel}</dt>
            <dd>{recognitions}</dd>
          </div>
        </dl>
      </section>

      <section id="cv" class="page">
        <header class="page__header">
          <div>
            <div class="page__eyebrow">{stackSection.eyebrow}</div>
            <h2 class="page__title">{stackSection.title}</h2>
          </div>
        </header>
        <TechnologiesSummary />
      </section>
    </>
  );
}
