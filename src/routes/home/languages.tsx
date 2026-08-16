import languagesJson from "../../data/languages.json";

type TechnologiesSummaryProps = {
  theme?: string;
  class?: string;
};

interface LanguageType {
  Languages: Record<string, number>;
  Frameworks: Record<string, number>;
}

export default function TechnologiesSummary(_props: TechnologiesSummaryProps) {
  return (
    <div class="skills">
      {Object.entries(languagesJson).map(([groupName, group]) => (
        <SkillGroup
          key={`group-${groupName}`}
          name={groupName as string}
          content={group as LanguageType}
        />
      ))}
    </div>
  );
}

function SkillGroup(props: { name: string; content: LanguageType }) {
  return (
    <section>
      <h3 class="skills__group-title">
        <span>{props.name}</span>
        <span class="eyebrow">§ {String(Object.keys(props.content.Languages).length + Object.keys(props.content.Frameworks).length).padStart(2, "0")}</span>
      </h3>

      <div class="skills__section">
        <div class="skills__kind">Languages</div>
        <ul class="skills__list">
          {Object.entries(props.content.Languages).map(([name, value]) => (
            <SkillMeter key={`lang-${name}`} name={name} value={value as number} />
          ))}
        </ul>
      </div>

      <hr class="rule" />

      <div class="skills__section">
        <div class="skills__kind">Frameworks</div>
        <ul class="skills__list">
          {Object.entries(props.content.Frameworks).map(([name, value]) => (
            <SkillMeter key={`fw-${name}`} name={name} value={value as number} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SkillMeter(props: { name: string; value: number }) {
  const pct = Math.min(100, Math.max(0, props.value * 10));
  return (
    <li class="skill">
      <span class="skill__name">{props.name}</span>
      <span class="skill__meter" style={{ ["--pct" as any]: `${pct}%` }} />
      <span class="skill__value">{props.value}/10</span>
    </li>
  );
}
