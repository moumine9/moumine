import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocalStorage } from "usehooks-ts";
import linksJson from "../../data/links.json";

type Theme = "light" | "dark" | "auto";

const SOCIALS: { key: keyof typeof linksJson; icon: string; label: string }[] = [
  { key: "github", icon: "fa-brands fa-github", label: "GitHub" },
  { key: "linkedIn", icon: "fa-brands fa-linkedin", label: "LinkedIn" },
  { key: "twitter", icon: "fa-brands fa-x-twitter", label: "X (Twitter)" },
];

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const [isLanguage, setIsLanguage] = useLocalStorage("language", "fr");

  const handleChangeTheme = (theme: Theme) => () => {
    setTheme(theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <Navbar
      expand="lg"
      bg="body-tertiary"
      data-bs-theme={theme}
      className="mb-3"
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <i className="fa-solid fa-house" />
          <span>Home</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarColor01" />

        <Navbar.Collapse id="navbarColor01">
          <Nav className="mx-auto">
            <Nav.Link href="/">
              <i className="fa-solid fa-house-user" />&nbsp; Home
            </Nav.Link>
            <Nav.Link href="/work-experiences">
              <i className="fa-solid fa-wrench" />&nbsp; Work Experiences
            </Nav.Link>
            <Nav.Link href="/formations">
              <i className="fa-solid fa-graduation-cap" />&nbsp; Formations
            </Nav.Link>
            <Nav.Link href="/awards">
              <i className="fa-solid fa-award" />&nbsp; Awards
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-2 me-3">
            {SOCIALS.map(({ key, icon, label }) => (
              <Nav.Link
                key={`nav-social-${key}`}
                href={linksJson[key]}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="p-1"
              >
                <i className={`${icon} fa-lg`} />
              </Nav.Link>
            ))}
          </Nav>

          <Nav>
            <NavDropdown
              title={<i class="fa-solid fa-lightbulb-gear fa-lg" />}
              id="navbarScrollingDropdown"
              align="end"
            >
              <NavDropdown.Item href="#" onClick={handleChangeTheme("light")}>
                <i class="fa-solid fa-lightbulb-on me-2" />
                &nbsp;Light
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleChangeTheme("dark")}>
                <i class="fa-solid fa-lightbulb-slash me-2" />
                &nbsp;Dark
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleChangeTheme("auto")}>
                <i class="fa-solid fa-lightbulb-gear me-2" />
                &nbsp;Automatic
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
