
import { Col } from 'react-bootstrap';
import linksJson from '../../data/links.json';


const fontAwesomeStyle = {
    style: "fa-duotone",
    size: "fa-6x",
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
    "twitter": "X (Twitter)",
  };

export default function LinksElements(props: { class?: string; }) {
  
    const getIconStyle = (icon: string) => icon.includes("fa-brands") ? `${icon} ${fontAwesomeStyle.size}` : `${fontAwesomeStyle.style} ${fontAwesomeStyle.size} ${icon}`;
    const generateValue = (value: string, key: string) => ["github", "linkedIn", "twitter"].includes(key) ? <a href={value} target={"_blank"} rel={"noreferrer"} class={"text-center"} >{titles[key]}</a> : <span>{titles[key] ?? value}</span>;
  
    return (
      <div className={`col-12 d-flex flex-row flex-nowrap gap-2 justify-content-between  ${props?.class}`}>
        {
          Object.entries(linksJson).map(([key, value]) => (
            <Col key={`linksElements${key}`} className="d-flex flex-column" data-toggle="tooltip" data-placement="top" title={key}>
              <i className={getIconStyle(icons[key] ?? "")} />
              {generateValue(value as string, key)}
            </Col>
          ))
        }
      </div>
    );
  }