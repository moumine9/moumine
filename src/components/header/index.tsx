import { useState } from "react";
import {
  Container,
  Dropdown,
  Nav,
  Navbar
} from "react-bootstrap";
import { useClickAway, useHover, useLocalStorage } from "usehooks-ts";

type Theme = "light" | "dark";

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, saveTheme] = useLocalStorage<Theme>("theme", "light");
  const [hoverRef, isHovering] = useHover();
  const [isLanguage, setIsLanguage] = useLocalStorage("language", "fr");

  const ref = useClickAway<HTMLDivElement>(() => {
    if (isSettingsOpen) toggleSettings();
  });

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleTheme = (e) => {
    e.preventDefault();
    saveTheme(() => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Navbar expand="lg" variant={theme}>
      <Container>
        <div className="d-flex align-items-center">
          <Navbar.Brand href="/">
            <i className="fa fa-duotone fa-home fa-lg" />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle 
          aria-controls="navbarColor01" 
        />
        <Navbar.Collapse id="navbarColor01">
          <Nav className="mx-auto mw-auto">
            <Nav.Item>
              <Nav.Link href="/work-experiences">
                <i className="fa-duotone fa-solid fa-wrench fa-lg"></i>&nbsp; Work
                Experiences
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/formations">
                <i className="fa fa-duotone fa-graduation-cap fa-lg" />
                &nbsp; Formations
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/awards">
                <i className="fa fa-duotone fa-award fa-lg" />
                &nbsp; Awards
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto w-auto">
            <Dropdown show={isSettingsOpen} align="end">
              <div ref={hoverRef}>
                <Dropdown.Toggle 
                  as="a"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSettings();
                  }}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <i
                    className={`fa fa-cog fa-duotone fa-lg ${
                      isHovering ? "fa-spin" : ""
                    }`}
                  />
                </Dropdown.Toggle>
              </div>
              <Dropdown.Menu 
                ref={ref}
              >
                <Dropdown.Item href="#" onClick={toggleTheme}>
                  <i className="fa fa-regular fa-moon fa-duotone me-2" />
                  Thème
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="fa fa-language fa-duotone me-2" />
                  Langue
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
