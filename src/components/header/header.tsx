import { useEffect, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import {
  applyTheme,
  cycleThemePref,
  readThemePref,
  ThemePref,
  writeThemePref,
} from "../../utils/theme";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work-experiences", label: "Work" },
  { href: "/projects", label: "Projects" },
];

const ICONS: Record<ThemePref, string> = {
  light: "fa-sun",
  dark: "fa-moon",
  auto: "fa-circle-half-stroke",
};

const LABELS: Record<ThemePref, string> = {
  light: "Light",
  dark: "Dark",
  auto: "Auto",
};

const Header = () => {
  const { url } = useLocation();
  const [pref, setPref] = useState<ThemePref>(() =>
    typeof window === "undefined" ? "auto" : readThemePref(),
  );

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

  const onCycle = () => setPref((prev) => cycleThemePref(prev));

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
          <button
            type="button"
            class="masthead__theme"
            aria-label={`Theme: ${LABELS[pref]}. Click to cycle.`}
            title={`Theme: ${LABELS[pref]}`}
            onClick={onCycle}
          >
            <i class={`fa-solid ${ICONS[pref]}`} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
