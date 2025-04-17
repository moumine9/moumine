import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocalStorage } from "usehooks-ts";

type Theme = "light" | "dark" | "auto";

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
        <div className="d-flex align-items-center">
          <Navbar.Brand href="/">
            <i className="fa fa-duotone fa-home fa-lg" />
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbarColor01" />

        <Navbar.Collapse id="navbarColor01">
          <Nav className="mx-auto">
            <Nav.Link href="/work-experiences">
              <i className="fa-duotone fa-solid fa-wrench fa-lg"></i>&nbsp; Work
              Experiences
            </Nav.Link>
            <Nav.Link href="/formations">
              <i className="fa fa-duotone fa-graduation-cap fa-lg" />
              &nbsp; Formations
            </Nav.Link>
            <Nav.Link href="/awards">
              <i className="fa fa-duotone fa-award fa-lg" />
              &nbsp; Awards
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown
              title={<i class="fa-duotone fa-solid fa-lightbulb-gear fa-lg" />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#" onClick={handleChangeTheme("light")}>
                <i class="fa-duotone fa-solid fa-lightbulb-on me-2" />
                &nbsp;Light
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleChangeTheme("dark")}>
                <i class="fa-duotone fa-solid fa-lightbulb-slash me-2"></i>
                &nbsp;Dark
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleChangeTheme("auto")}>
                <i class="fa-duotone fa-solid fa-lightbulb-gear" />
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
