import { h } from 'preact';
import { useState } from "preact/hooks";
import { Modal, Button, Form } from "react-bootstrap";
import { saveVisitorCredentials, sendCredentialsToAPI } from "../utils/visitorAuth";

interface PrivacyGateProps {
  onAuthenticated: (name: string, email: string) => void;
}

export default function PrivacyGate({ onAuthenticated }: PrivacyGateProps) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
    setErrors({ name: "", email: "" });
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;
    if (!name.trim()) { newErrors.name = "Name is required"; isValid = false; }
    if (!email.trim()) { newErrors.email = "Email is required"; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { newErrors.email = "Please enter a valid email address"; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    saveVisitorCredentials(name, email);
    await sendCredentialsToAPI({ name, email, timestamp: new Date().toISOString() });
    onAuthenticated(name, email);
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-secondary" size="sm" onClick={() => setShow(true)}>
        <i class="fa-duotone fa-lock me-2" />
        Unlock contact info
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-duotone fa-shield-check me-2" />
            Access Contact Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p class="text-muted mb-3">
            To view private contact details, please share your name and email.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group class="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group class="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" class="w-100" disabled={isSubmitting}>
              {isSubmitting
                ? <><span class="spinner-border spinner-border-sm me-2" role="status" /> Processing...</>
                : <><i class="fa-duotone fa-unlock me-2" />Grant Access</>
              }
            </Button>
          </Form>
          <p class="text-muted small mt-3">
            <i class="fa-solid fa-circle-info me-1" />
            Your info is stored locally and used only to personalise your experience.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
