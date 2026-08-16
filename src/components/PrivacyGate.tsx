import { useEffect, useRef, useState } from "preact/hooks";
import { Modal, Form } from "react-bootstrap";
import {
  saveVisitorCredentials,
  sendCredentialsToAPI,
  TURNSTILE_SITE_KEY,
} from "../utils/visitorAuth";

interface PrivacyGateProps {
  onAuthenticated: (name: string, email: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export default function PrivacyGate({ onAuthenticated }: PrivacyGateProps) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!show) return;

    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || !turnstileContainer.current || !window.turnstile) return;
      if (widgetId.current) return;
      widgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        "error-callback": () => setTurnstileToken(null),
        "expired-callback": () => setTurnstileToken(null),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return () => { cancelled = true; };
    }

    const interval = window.setInterval(() => {
      if (window.turnstile) {
        window.clearInterval(interval);
        renderWidget();
      }
    }, 100);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [show]);

  const handleClose = () => {
    setShow(false);
    setErrors({ name: "", email: "" });
    setTurnstileToken(null);
    if (widgetId.current && window.turnstile) {
      window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;
    if (!name.trim()) { newErrors.name = "Name required"; isValid = false; }
    if (!email.trim()) { newErrors.email = "Email required"; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { newErrors.email = "Not a valid email"; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (!validateForm() || !turnstileToken) return;
    setIsSubmitting(true);
    saveVisitorCredentials(name, email);
    await sendCredentialsToAPI({ name, email, timestamp: new Date().toISOString() }, turnstileToken);
    onAuthenticated(name, email);
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <>
      <button type="button" class="linklist__unlock" onClick={() => setShow(true)}>
        Unlock contact
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span class="eyebrow" style={{ display: "block", marginBottom: "0.4rem" }}>
              Correspondance
            </span>
            Please leave your card.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body class="privacy-body">
          <p class="privacy-body__lede">
            To view private contact details, please share your name and email — a small
            courtesy, so the exchange isn't one-sided.
          </p>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group class="mb-4">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First and last"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group class="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@somewhere.tld"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <div ref={turnstileContainer} class="mb-4 d-flex justify-content-center" />

            <button
              type="submit"
              class="privacy-body__submit"
              disabled={isSubmitting || !turnstileToken}
            >
              {isSubmitting
                ? "Sending…"
                : !turnstileToken
                  ? "Awaiting verification"
                  : "Grant access"}
            </button>
          </Form>
          <p class="privacy-body__fineprint">
            Stored locally, sent nowhere unless you contact me back.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
