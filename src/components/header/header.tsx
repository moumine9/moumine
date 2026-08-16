import { useLocation } from "preact-iso";
import { useLocalStorage } from "usehooks-ts";

type Theme = "light" | "dark";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work-experiences", label: "Work" },
  { href: "/formations", label: "Study" },
  { href: "/awards", label: "Awards" },
];

const Header = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const { url } = useLocation();

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-bs-theme", next);
      document.body.setAttribute("data-bs-theme", next);
    }
  };

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
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
          >
            <i class={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
