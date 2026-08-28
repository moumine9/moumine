import languagesJson from "../../data/languages.json";

interface LanguageType {
  Languages: Record<string, number>;
  Frameworks: Record<string, number>;
  Tools?: Record<string, number>;
}

export default function TechnologiesSummary() {
  return (
    <div class="stack">
      {Object.entries(languagesJson).map(([groupName, group]) => (
        <StackGroup
          key={`group-${groupName}`}
          name={groupName}
          content={group as LanguageType}
        />
      ))}
    </div>
  );
}

function StackGroup(props: { name: string; content: LanguageType }) {
  const langs = Object.keys(props.content.Languages);
  const frameworks = Object.keys(props.content.Frameworks);
  const tools = props.content.Tools ? Object.keys(props.content.Tools) : null;

  return (
    <section class="stack__group">
      <h3 class="stack__group-title">{props.name}</h3>

      <dl class="stack__rows">
        <div class="stack__row">
          <dt>Languages</dt>
          <dd>{langs.join(" · ")}</dd>
        </div>
        <div class="stack__row">
          <dt>Frameworks</dt>
          <dd>{frameworks.join(" · ")}</dd>
        </div>
        {tools && (
          <div class="stack__row">
            <dt>Tools</dt>
            <dd>{tools.join(" · ")}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
