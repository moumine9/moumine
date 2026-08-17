import content from "./generate.content.json";

export default function GenerateResume() {
  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">{content.eyebrow}</div>
          <h1 class="page__title">{content.title}</h1>
        </div>
      </header>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--ink-soft)" }}>
        {content.body}
      </p>
    </section>
  );
}
