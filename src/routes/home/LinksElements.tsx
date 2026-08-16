import linksJson from '../../data/links.json';
import PrivacyGate from '../../components/PrivacyGate';

const LABELS: Record<string, string> = {
  github: "Github",
  linkedIn: "LinkedIn",
  twitter: "X (Twitter)",
  email: "Email",
  cellNumber: "Phone",
};

const ORDER = ["github", "linkedIn", "twitter", "email", "cellNumber"] as const;
const PRIVATE_KEYS = new Set(["email", "cellNumber"]);

interface LinksElementsProps {
  authenticated: boolean;
  onAuthenticated: (name: string, email: string) => void;
}

function displayValue(key: string, url: string): string {
  if (key === "email") return url.replace(/^mailto:/, "");
  if (key === "cellNumber") return url.replace(/^tel:/, "");
  if (key === "github") return "@moumine9";
  if (key === "linkedIn") return "moumine9";
  if (key === "twitter") return "@moumine9";
  return url;
}

export default function LinksElements(props: LinksElementsProps) {
  return (
    <div class="linklist">
      <ul class="linklist__items">
        {ORDER.map((key) => {
          const value = (linksJson as Record<string, string>)[key];
          if (!value) return null;
          const isGated = PRIVATE_KEYS.has(key) && !props.authenticated;
          return (
            <li key={`link-${key}`} class="linklist__item">
              <span class="linklist__label">{LABELS[key]}</span>
              {isGated ? (
                <span class="linklist__value linklist__value--hidden">withheld</span>
              ) : (
                <a
                  class="linklist__value"
                  href={value}
                  target={key === "email" || key === "cellNumber" ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {displayValue(key, value)}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {!props.authenticated && (
        <PrivacyGate onAuthenticated={props.onAuthenticated} />
      )}
    </div>
  );
}
