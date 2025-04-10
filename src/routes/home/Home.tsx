import { useLocalStorage } from '@uidotdev/usehooks';
import { VNode } from 'preact';
import { Col, Container, Row } from 'react-bootstrap';
import TechnologiesSummary from './languages';
import LinksElements from './LinksElements';

interface MenuItem {
  id: string;
  title: string;
  component: VNode;
}


export default function Home() {
  const [theme, _] = useLocalStorage('theme', 'light');

  const comingSoon: VNode = <figure>
    <blockquote class="blockquote mx-auto my-3">
      <p>Something greate coming here soon !!!</p>
    </blockquote>
    <figcaption class="blockquote-footer">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>;

  return (
    <Container>
      <Row className="cover-container d-flex col-12 vh-100 mx-auto flex-column">
        <Row className={"my-5"}>
          <Profile class={"col-4"} />
          <Col className={"col-8"} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <LinksElements />
            <h4 class="text-center text-italic">Codito Ergo Sum</h4>
          </Col>
        </Row>

        <a href="#cv" class={`btn btn-lg btn-${theme} fw-bold border-${theme === "dark" ? "black" : "white"} color-white`}>
          <span class="fa-1x5 fa-duotone fa-circle-arrow-down" />
        </a>
      </Row>

      <Row id="cv" class="vh-100 p-3">
        <Col class="col-12">
          <TechnologiesSummary class={"cleafix"} theme={theme} />
        </Col>
      </Row>
    </Container>
  );
}

function Profile(props: { class?: string; }) {
  return (
    <Col className={`${props.class} d-flex flex-column align-items-center`}>
      <img className="rounded" alt="Generated avatar" src="./avatar.png" width="256" height="256" />
      <h3>Abdoul Moumine</h3>
      <h5><i className="fa-duotone fa-solid fa-mars" /> He/Him</h5>
      <p><i className="fa fa-duotone fa-location-dot" /> QC &mdash; Canada</p>
    </Col>
  );
}
