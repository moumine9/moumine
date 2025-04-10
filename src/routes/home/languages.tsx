import {
    Card,
    Col,
    Container,
    ListGroup,
    Nav,
    ProgressBar,
    Row,
    Tab,
} from "react-bootstrap";
import languagesJson from "../../data/languages.json";

type TechnologiesSummaryProps = {
  theme: string;
  class?: string;
};

export default function TechnologiesSummary({
  theme,
  ...props
}: TechnologiesSummaryProps) {
  return (
    <Container className={`p-5 mh-100 ${props.class}`}>
      {Object.entries(languagesJson).map(([key, value]) => (
        <Section
          key={`Section${key}`}
          type={key as string}
          content={value as LanguageType}
          theme={theme}
        />
      ))}
    </Container>
  );
}

function Section(props: {
  type: string;
  content: LanguageType;
  theme: string;
}) {
  const backgrounds = ["", "bg-success", "bg-info", "bg-warning", "bg-danger"];

  return (
    <Card className="mb-3">
      <Card.Header>
        <h4>{props.type}</h4>
      </Card.Header>

      <Card.Body>
        <Tab.Container id={`tabs-${props.type}`} defaultActiveKey="languages">
          <Nav variant="tabs" className="nav-fill">
            <Nav.Item>
              <Nav.Link eventKey="languages">Languages</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="frameworks">Frameworks</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="languages" className="p-3">
              <ListGroup variant="flush">
                {Object.entries(props.content.Languages).map(
                  ([key, value], index) => (
                    <ProgresBar
                      key={`ProgressBar${key}`}
                      name={key}
                      value={value}
                      barColor={backgrounds[index % backgrounds.length]}
                    />
                  )
                )}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="frameworks" className="p-3">
              <ListGroup variant="flush">
                {Object.entries(props.content.Frameworks).map(
                  ([key, value], index) => (
                    <ProgresBar
                      key={`ProgressBar${key}`}
                      name={key}
                      value={value}
                      barColor={backgrounds[index % backgrounds.length]}
                    />
                  )
                )}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
}

function ProgresBar(props: { name: string; value: number; barColor: string }) {
  const progress = props.value * 10;

  return (
    <ListGroup.Item className="p-0 border-0">
      <Row className="my-2">
        <Col xs={2}>
          <p>{props.name}</p>
        </Col>
        <Col xs={10}>
          <ProgressBar
            striped
            animated
            className={props.barColor}
            now={progress}
            min={0}
            max={100}
            style={{ height: "20px" }}
            label={`${props.value} / 10`}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

interface Root {
  Web: LanguageType;
  Programmation: LanguageType;
}

interface LanguageType {
  Languages: Languages;
  Frameworks: Frameworks;
}

interface Languages {
  [key: string]: number;
}

interface Frameworks {
  [key: string]: number;
}
