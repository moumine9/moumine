import linksJson from '../../data/links.json';

const LABELS: Record<string, string> = {
  github: "Github",
  linkedIn: "LinkedIn",
  twitter: "X (Twitter)",
  email: "Email",
};

const ORDER = ["email", "github", "linkedIn", "twitter"] as const;

function displayValue(key: string, url: string): string {
  if (key === "email") return url.replace(/^mailto:/, "");
  if (key === "github") return "@moumine9";
  if (key === "linkedIn") return "moumine9";
  if (key === "twitter") return "@moumine9";
  return url;
}

export default function LinksElements() {
  return (
    <div class="linklist">
      <ul class="linklist__items">
        {ORDER.map((key) => {
          const value = (linksJson as Record<string, string>)[key];
          if (!value) return null;
          return (
            <li key={`link-${key}`} class="linklist__item">
              <span class="linklist__label">{LABELS[key]}</span>
              <a
                class="linklist__value"
                href={value}
                target={key === "email" ? undefined : "_blank"}
                rel="noreferrer"
              >
                {displayValue(key, value)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
