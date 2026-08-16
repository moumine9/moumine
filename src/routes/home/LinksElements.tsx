import { Col } from 'react-bootstrap';
import linksJson from '../../data/links.json';
import PrivacyGate from '../../components/PrivacyGate';

const fontAwesomeStyle = {
  style: "fa-duotone",
  size: "fa-2x",
};

const icons: Record<string, string> = {
  github: "fa-brands fa-github",
  email: "fa-envelope",
  cellNumber: "fa-phone-rotary",
  tableau: "fa-link",
  name: "fa-user",
  place: "fa-location-dot",
  linkedIn: "fa-brands fa-linkedin",
  hobbies: "fa-dice",
  twitter: "fa-brands fa-x-twitter",
};

const titles: Record<string, string> = {
  github: "Github",
  email: "Mail Me",
  cellNumber: "Call Me",
  linkedIn: "LinkedIn",
  twitter: "X (Twitter)",
};

const PRIVATE_KEYS = new Set(["email", "cellNumber"]);
const LINK_KEYS = ["github", "email", "cellNumber", "linkedIn", "twitter"];

interface LinksElementsProps {
  class?: string;
  authenticated: boolean;
  onAuthenticated: (name: string, email: string) => void;
}

export default function LinksElements(props: LinksElementsProps) {
  const getIconStyle = (icon: string) =>
    icon.includes("fa-brands")
      ? `${icon} ${fontAwesomeStyle.size}`
      : `${fontAwesomeStyle.style} ${fontAwesomeStyle.size} ${icon}`;

  const generateValue = (value: string, key: string) => {
    if (PRIVATE_KEYS.has(key) && !props.authenticated) {
      return <span class="text-muted fst-italic small">🔒 hidden</span>;
    }
    return LINK_KEYS.includes(key)
      ? <a href={value} target={"_blank"} rel={"noreferrer"} class={"text-center"}>{titles[key]}</a>
      : <span>{titles[key] ?? value}</span>;
  };

  return (
    <div className={`col-12 d-flex flex-column align-items-center gap-2 ${props?.class ?? ""}`}>
      <div className="d-flex flex-row flex-wrap gap-2 justify-content-center">
        {Object.entries(linksJson).map(([key, value]) => (
          <Col key={`linksElements${key}`} className="d-flex flex-column align-items-center" data-toggle="tooltip" data-placement="top" title={key}>
            <i className={getIconStyle(icons[key] ?? "")} />
            {generateValue(value as string, key)}
          </Col>
        ))}
      </div>
      {!props.authenticated && (
        <div className="mt-2">
          <PrivacyGate onAuthenticated={props.onAuthenticated} />
        </div>
      )}
    </div>
  );
}
