import { useEffect } from "preact/hooks";

const BASE_TITLE = "A. Moumine Blog";

export function usePageMeta(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE;
  }, [title]);
}
