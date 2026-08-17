import { useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import {
  applyTheme,
  readThemePref,
  ThemePref,
  writeThemePref,
} from "../../utils/theme";
import { Icon, IconName } from "../Icon";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work-experiences", label: "Work" },
  { href: "/projects", label: "Projects" },
];

const OPTIONS: { key: ThemePref; label: string; icon: IconName }[] = [
  { key: "light", label: "Light", icon: "sun" },
  { key: "dark", label: "Dark", icon: "moon" },
  { key: "auto", label: "Auto", icon: "half-circle" },
];

const Header = () => {
  const { url } = useLocation();
  const [pref, setPref] = useState<ThemePref>(() =>
    typeof window === "undefined" ? "auto" : readThemePref(),
  );
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    applyTheme(pref);
    writeThemePref(pref);

    if (pref !== "auto") return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("auto");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onDocClick = (e: MouseEvent) => {
      const d = detailsRef.current;
      if (!d || !d.open) return;
      if (!(e.target instanceof Node) || !d.contains(e.target)) d.open = false;
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const select = (next: ThemePref) => {
    setPref(next);
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const current = OPTIONS.find((o) => o.key === pref)!;

  return (
    <header class="masthead">
      <div class="masthead__inner">
        <a href="/" class="masthead__brand" aria-label="Home" />
        <nav class="masthead__nav" aria-label="Primary">
          {NAV.map(({ href, label }) => (
            <a
              key={`nav-${href}`}
              href={href}
              class="masthead__link"
              aria-current={url === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <details ref={detailsRef} class="themepicker">
            <summary class="themepicker__summary" aria-label={`Theme: ${current.label}`}>
              <Icon name={current.icon} />
              <span>{current.label}</span>
              <Icon name="chevron-down" class="themepicker__chevron" />
            </summary>
            <ul class="themepicker__menu" role="menu">
              {OPTIONS.map(({ key, label, icon }) => (
                <li key={`opt-${key}`} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={pref === key}
                    class="themepicker__option"
                    onClick={() => select(key)}
                  >
                    <Icon name={icon} />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
};

export default Header;
