import { useState } from "preact/hooks";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "usehooks-ts";
import TechnologiesSummary from "./languages";
import LinksElements from "./LinksElements";
import { isAuthenticated } from "../../utils/visitorAuth";

export default function Home() {
  const [theme, _] = useLocalStorage("theme", "light");
  const [authed, setAuthed] = useState(typeof window !== "undefined" ? isAuthenticated() : false);

  return (
    <Container>
      <div class="cover-container d-flex vh-100 flex-column justify-content-center align-items-center gap-4">
        <section class="profile-section">
          <Profile />
          <hr class="profile-section__divider" />
          <LinksElements authenticated={authed} onAuthenticated={() => setAuthed(true)} />
        </section>
        <p class="text-muted fst-italic m-0">Codito Ergo Sum</p>

        <a href="#cv" class={`btn btn-lg btn-${theme} fw-bold border-${theme === "dark" ? "black" : "white"} text-white mt-3`}>
          <span class="fa-2x fa-duotone fa-circle-arrow-down" />
        </a>
      </div>

      <div id="cv" class="vh-100 p-3">
        <TechnologiesSummary class={"clearfix"} theme={theme} />
      </div>
    </Container>
  );
}

function Profile() {
  return (
    <article class="profile-card">
      <img class="profile-card__avatar" alt="Generated avatar" src="./avatar.png" width="128" height="128" />
      <div class="profile-card__body">
        <h1 class="profile-card__name">Abdoul Moumine</h1>
        <p class="profile-card__role">Software Engineer</p>
        <p class="profile-card__meta">
          <i class="fa-duotone fa-location-dot" /> QC &mdash; Canada
        </p>
      </div>
    </article>
  );
}
