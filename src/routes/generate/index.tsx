import content from "./generate.content.json";
import { usePageMeta } from "../../utils/usePageMeta";

export default function GenerateResume() {
  usePageMeta(content.title);
  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">{content.eyebrow}</div>
          <h1 class="page__title">{content.title}</h1>
        </div>
      </header>
      <p class="page__note">{content.body}</p>
    </section>
  );
}
