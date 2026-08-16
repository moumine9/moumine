import awardsJson from '../../data/awards.json';

interface Award {
  contest: string;
  category: string;
  time: string;
  place: string;
}

export default function Awards() {
  const awards: Award[] = awardsJson;

  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">Récompenses</div>
          <h1 class="page__title">Awards.</h1>
        </div>
        <span class="hero__masthead-issue">{awards.length} entries</span>
      </header>

      <ul class="awardlist">
        {awards.map((a, i) => (
          <li key={`award-${i}`} class="awardlist__item">
            <div>
              <h3 class="awardlist__title">
                {a.contest}
                <small>{a.category} &nbsp;·&nbsp; {a.place}</small>
              </h3>
            </div>
            <span class="awardlist__meta">{a.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
