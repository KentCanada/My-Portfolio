"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const customerTypes = ["Homeowner", "Contractor", "Designer", "Builder"];

const workflowSteps = [
  {
    number: "01",
    title: "Capture",
    description: "A webhook receives the submitted lead details.",
    tool: "n8n · Webhook",
  },
  {
    number: "02",
    title: "Understand",
    description: "JavaScript prepares the message for AI-assisted processing.",
    tool: "JavaScript · Ollama",
  },
  {
    number: "03",
    title: "Organize",
    description: "Qwen3:4B helps interpret the request before it is recorded.",
    tool: "Qwen3:4B · Local model",
  },
  {
    number: "04",
    title: "Keep track",
    description: "Lead information is organized in a Google Sheets workflow.",
    tool: "Google Sheets",
  },
];

export default function AiLeadProcessingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    customerType: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !form.customerType || !message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_name: name,
          lead_email: email,
          lead_message: message,
          lead_source: form.customerType,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `The lead endpoint responded with status ${response.status}.`,
        );
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        customerType: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your request.",
      );
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Kent Cañada home">
          KC<span>.</span>
        </Link>
        <Link className={styles.backLink} href="/#work">
          <span aria-hidden="true">←</span> Back to selected work
        </Link>
        <span className={styles.headerNote}>PROJECT / 02</span>
      </header>

      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Workflow automation · AI assisted
          </p>
          <h1 id="project-title">
            A better way
            <br />
            to handle <em>new leads.</em>
          </h1>
          <p className={styles.heroDescription}>
            An AI lead processing workflow concept that brings form
            submissions, local language-model processing, and a simple lead
            tracker together.
          </p>
          <a className={styles.heroLink} href="#workflow">
            Explore the workflow <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.heroVisual} aria-label="Lead processing workflow preview">
          <div className={styles.visualTopline}>
            <span>LEAD FLOW</span>
            <span className={styles.liveBadge}>
              <span aria-hidden="true" />
              CONCEPT
            </span>
          </div>
          <div className={styles.flowPreview}>
            <div className={styles.flowNode}>
              <span className={styles.nodeIcon} aria-hidden="true">
                ↗
              </span>
              <span>
                <strong>New request</strong>
                <small>Form submission</small>
              </span>
            </div>
            <span className={styles.flowConnector} aria-hidden="true" />
            <div className={`${styles.flowNode} ${styles.aiNode}`}>
              <span className={styles.nodeIcon} aria-hidden="true">
                ✳
              </span>
              <span>
                <strong>AI processing</strong>
                <small>Ollama · Qwen3:4B</small>
              </span>
            </div>
            <span className={styles.flowConnector} aria-hidden="true" />
            <div className={`${styles.flowNode} ${styles.sheetsNode}`}>
              <span className={styles.nodeIcon} aria-hidden="true">
                ▦
              </span>
              <span>
                <strong>Lead tracker</strong>
                <small>Google Sheets</small>
              </span>
            </div>
          </div>
          <p className={styles.visualCaption}>
            An illustrative workflow — connections depend on setup and testing.
          </p>
          <span className={styles.visualIndex}>Nº 01 — 04</span>
        </div>
        <span className={styles.heroDecoration} aria-hidden="true">
          AI
        </span>
      </section>

      <section
        className={styles.workflowSection}
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>
            <span>01</span> THE APPROACH
          </p>
          <h2 id="workflow-title">
            From first message
            <br />
            to organized lead.
          </h2>
          <p>
            The workflow is designed to make incoming requests easier to
            understand and keep track of, with each tool handling a clear part
            of the process.
          </p>
        </div>

        <div className={styles.workflowList}>
          {workflowSteps.map((step) => (
            <article className={styles.workflowStep} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <span className={styles.stepTool}>{step.tool}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.demoSection} aria-labelledby="demo-title">
        <div className={styles.demoCopy}>
          <p className={styles.sectionLabel}>
            <span>02</span> TRY THE FORM
          </p>
          <h2 id="demo-title">
            Every good project
            <br />
            starts with a <em>conversation.</em>
          </h2>
          <p>
            Share a little about what you need. This form sends your details to
            the site&apos;s <code>/api/leads</code> endpoint.
          </p>
          <div className={styles.setupNote}>
            <span aria-hidden="true">i</span>
            <p>
              The API endpoint and n8n connection still need to be configured
              and tested. This form does not claim to deliver submissions to a
              live workflow.
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Full name</span>
              <input
                autoComplete="name"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
                required
                value={form.name}
              />
            </label>
            <label className={styles.field}>
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
                value={form.email}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Customer type</span>
            <select
              name="customerType"
              onChange={handleChange}
              required
              value={form.customerType}
            >
              <option value="" disabled>
                Choose the closest match
              </option>
              {customerTypes.map((customerType) => (
                <option key={customerType} value={customerType}>
                  {customerType}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Project message</span>
            <textarea
              name="message"
              onChange={handleChange}
              placeholder="Tell me a little about your project..."
              required
              rows="5"
              value={form.message}
            />
          </label>

          {status === "success" ? (
            <p className={styles.successMessage} role="status">
              Thanks — the endpoint accepted your request.
            </p>
          ) : null}
          {status === "error" ? (
            <p className={styles.errorMessage} role="alert">
              We couldn&apos;t send your request. {errorMessage}
            </p>
          ) : null}

          <button
            className={styles.submitButton}
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Sending request..." : "Send your request"}
            <span aria-hidden="true">{status === "loading" ? "…" : "↗"}</span>
          </button>
          <p className={styles.formFootnote}>
            No external webhook URL is configured in this page.
          </p>
        </form>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.wordmark} href="/" aria-label="Kent Cañada home">
          KC<span>.</span>
        </Link>
        <p>Thoughtful tools for better conversations.</p>
        <Link href="/#work">
          More selected work <span aria-hidden="true">↑</span>
        </Link>
      </footer>
    </main>
  );
}
