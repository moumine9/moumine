import { VNode } from 'preact';
import linksJson from '../../data/links.json';
import Awards from './cvSections/awards';
import Formations from './cvSections/formations';
import TechnologiesSummary from './cvSections/languages';
import WorkExperiences from './cvSections/workExperiences';

interface MenuItem {
  id: string;
  title: string;
  component: VNode;
}

export default function Home() {

  const comingSoon: VNode = <figure>
    <blockquote class="blockquote mx-auto my-3">
      <p>Something greate coming here soon !!!</p>
    </blockquote>
    <figcaption class="blockquote-footer">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>;

  const menuItems: MenuItem[] = [
    {
      id: "technologiesSummary",
      title: "Languages/Technologies",
      component: <TechnologiesSummary class={"cleafix"} />
    },
    {
      id: "workExperience",
      title: "Work Experience",
      component: <WorkExperiences />,
    },
    {
      id: "formations",
      title: "Formations",
      component: <Formations />
    },
    {
      id: "awards",
      title: "Awards",
      component: <Awards />
    },
/*     {
      id: "certifications",
      title: "Certifications",
      component: comingSoon
    },
    {
      id: "projects",
      title: "Projects",
      component: comingSoon
    }, */
  ];

  return (
    <div>
      <div class="cover-container d-flex col-10 vh-100 p-3 mx-auto flex-column">
        <h1 class={"text-center"}>Welcome on my tiny blog</h1>

        <div class={"row my-5"}>
          <Profile class={"col-4"} />
          <div class={"col-8"} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <LinksElements />
            <h4 class="text-center text-italic">Codito Ergo Sum</h4>
          </div>
        </div>

        <a href="#cv" class="btn btn-lg btn-secondary fw-bold border-white bg-primary">
          <span class="fa-1x5 fa-duotone fa-circle-arrow-down" />
        </a>

      </div>

      <div id="cv" class="row vh-100 p-3">
        <div class="col-4">
          <ul id="sideMenu" class="nav nav-pills flex-column sticky-top mt-3 simple-list-example-scrollspy">
            {menuItems.map(({ id, title }) => <li key={`sideMenuElements${id}`} class="nav-item">
              <a class="nav-link" href={`#${id}`}>{title}</a>
            </li>)}
          </ul>
        </div>
        <div class="col-7">
          <div data-bs-spy="scroll" data-bs-target="#sideMenu" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabIndex={0}>
            {
              menuItems.map(e => <div key={e.id} id={e.id} class={"p-3 my-3 border-bottom"}>
                <h4 class={"mb-4"}>{e.title}</h4>
                <div height={"100vh"}>{e.component}</div>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile(props: { class?: string; }) {

  return (<div class={`${props.class} d-flex flex-column align-items-center`}>
    <img class={"rounded"} alt={"Generated avatar"} src="./avatar.png" width={"256"} height={"256"} />
    <h3>Abdoul Moumine</h3>
    <h5> <i class="fa-duotone fa-solid fa-mars" /> He/Him</h5>
    <p> <i class={"fa fa-duotone fa-location-dot"} /> QC &mdash; Canada </p>
  </div>);
}

function LinksElements(props: {
  class?: string;
}) {

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
    github: "Github Profile",
    email: "Mail Me",
    cellNumber: "Call Me",
    linkedIn: "Let's connect on LinkedIn",
    "twitter": "Follow me on Twitter",
  };

  const getIconStyle = (icon: string) => icon.includes("fa-brands") ? `${icon} ${fontAwesomeStyle.size}` : `${fontAwesomeStyle.style} ${fontAwesomeStyle.size} ${icon}`;
  const generateValue = (value: string, key: string) => ["github", "linkedIn", "twitter"].includes(key) ? <a href={value} target={"_blank"} rel={"noreferrer"} class={"text-center"} >{titles[key]}</a> : <span>{titles[key] ?? value}</span>;

  return (<ul class={`d-flex flex-row flex-wrap gap-2 ${props?.class}`}>
    {
      Object.entries(linksJson).map(([key, value]) => <li key={`linksElements${key}`} className="d-flex p-3 flex-column" data-toggle="tooltip" data-placement="top" title={key}>
        <i class={getIconStyle(icons[key] ?? "")} />
        {generateValue(value as string, key)}
      </li>)
    }
  </ul>);
}
