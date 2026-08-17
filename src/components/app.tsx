import { LocationProvider, Route, Router } from "preact-iso";

import Header from "./header/header";

import "../style/index.css";

// Code-splitting is automated for `routes` directory
import GenerateResume from "../routes/generate";
import Home from "../routes/home/Home";
import Projects from "../routes/projects/projects";
import ProjectLatoile from "../routes/projects/latoile";
import WorkExperiences from "../routes/workExperiences/workExperiences";

export default function App() {
  return (
    <LocationProvider>
      <main class="app">
        <Header />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/generate" component={GenerateResume} />
          <Route path="/work-experiences" component={WorkExperiences} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/latoile" component={ProjectLatoile} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

function NotFound() {
  return (
    <section class="page">
      <header class="page__header">
        <div>
          <div class="page__eyebrow">Errata</div>
          <h1 class="page__title">Not found.</h1>
        </div>
        <span class="hero__masthead-issue">404</span>
      </header>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--ink-soft)" }}>
        The page you're looking for has been misfiled or never printed.
      </p>
    </section>
  );
}