import Image from "next/image";
import styles from "./page.module.css";

const profile = {
  name: "Kent Cañada",
  email: "kentcanada02@gmail.com",
  github: "https://github.com/KentCanada",
  linkedin: "https://www.linkedin.com/in/kent-canada-aab396436/",
};

const projects = [
  {
    title: "Food Hub",
    category: "Personal project",
    description:
      "A food discovery and ordering concept with a bold, inviting menu, helpful categories, and a smooth browsing experience.",
    technologies: ["JavaScript", "Next.js", "React", "CSS Modules"],
    image: "/food-hub/hero.jpg",
    imageAlt: "A colorful bowl of fresh food from the Food Hub concept",
    href: "/projects/food-hub",
    number: "01",
    action: "Explore Food Hub",
  },
  {
    title: "AI Lead Processing Automation",
    category: "Personal project",
    description:
      "An AI-assisted lead processing workflow that classifies website inquiries, routes leads to the appropriate sales team, generates follow-up email drafts for human review, and records lead details in Google Sheets.",
    technologies: [
      "Next.js",
      "JavaScript",
      "n8n",
      "Ollama",
      "AI/LLM",
      "Google Sheets",
      "Webhooks",
    ],
    imageAlt: "A diagram of an AI-assisted lead processing workflow",
    href: "/projects/ai-lead-processing",
    number: "02",
    action: "View Project",
  },
];

const services = [
  {
    number: "01",
    title: "Business websites",
    description:
      "A considered online home for your services, story, and the people you help.",
  },
  {
    number: "02",
    title: "Responsive design",
    description:
      "Layouts that feel clear and easy to use on phones, tablets, and desktops.",
  },
  {
    number: "03",
    title: "Website improvements",
    description:
      "Thoughtful updates to make an existing site easier to navigate and maintain.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.45H4.96V9.02h2.97v9.43ZM6.45 7.73a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12 10.72h-2.96v-4.59c0-1.09-.02-2.5-1.53-2.5-1.53 0-1.77 1.19-1.77 2.42v4.67H9.23V9.02h2.84v1.29h.04c.4-.74 1.36-1.53 2.8-1.53 3 0 3.55 1.97 3.55 4.53v5.14Z" />
    </svg>
  );
}

function SectionHeading({ number, label, title, id }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.sectionLabel}>
        <span>{number}</span>
        {label}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={styles.projectCard}>
      <a
        className={styles.projectVisual}
        href={project.href}
        aria-label={`View ${project.title} project`}
      >
        {project.image ? (
          <Image
            className={styles.projectImage}
            src={project.image}
            alt={project.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        ) : (
          <svg
            className={styles.projectImage}
            aria-hidden="true"
            viewBox="0 0 720 430"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <rect width="720" height="430" fill="#e6e3d9" />
            <path
              d="M185 214h100m150 0h100"
              fill="none"
              stroke="#9b9c8d"
              strokeDasharray="5 7"
              strokeWidth="2"
            />
            <g fill="#fbfaf7" stroke="#b9b6aa">
              <rect x="35" y="156" width="150" height="116" rx="3" />
              <rect x="285" y="156" width="150" height="116" rx="3" />
              <rect x="535" y="156" width="150" height="116" rx="3" />
            </g>
            <g fill="#777b60">
              <circle cx="110" cy="191" r="12" />
              <circle cx="360" cy="191" r="12" />
              <circle cx="610" cy="191" r="12" />
            </g>
            <g
              fill="#292d29"
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
            >
              <text x="110" y="229" fontSize="12" fontWeight="600">
                NEW INQUIRY
              </text>
              <text x="360" y="229" fontSize="11" fontWeight="600">
                AI CLASSIFICATION
              </text>
              <text x="610" y="229" fontSize="12" fontWeight="600">
                HUMAN REVIEW
              </text>
              <text x="110" y="249" fill="#777b60" fontSize="10">
                Website form
              </text>
              <text x="360" y="249" fill="#777b60" fontSize="10">
                Route and draft
              </text>
              <text x="610" y="249" fill="#777b60" fontSize="10">
                Google Sheets
              </text>
              <text
                x="60"
                y="76"
                fill="#777b60"
                fontSize="11"
                fontWeight="600"
                letterSpacing="1.5"
                textAnchor="start"
              >
                LEAD PROCESSING / WORKFLOW
              </text>
            </g>
          </svg>
        )}
        <span className={styles.projectImageLabel}>
          PROJECT / {project.number}
        </span>
      </a>

      <div className={styles.projectInfo}>
        <div className={styles.projectTopline}>
          <p className={styles.projectMeta}>{project.category}</p>
          <span className={styles.projectNumber}>{project.number}</span>
        </div>
        <h3>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.techList} aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <a className={styles.projectLink} href={project.href}>
          {project.action} <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className={styles.site} id="top">
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label={`${profile.name}, home`}>
          {profile.name}
          <span>WEB DEVELOPER</span>
        </a>
        <div className={styles.headerActions}>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a className={styles.navContact} href="#contact">
              Contact <ArrowIcon />
            </a>
          </nav>
          <div className={styles.headerSocials} aria-label="Social profiles">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (replace placeholder URL)"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (replace placeholder URL)"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.statusMark} aria-hidden="true" />
              Independent web developer
            </p>
            <h1 id="hero-title">
              Modern websites,
              <br />
              <em>made for people.</em>
            </h1>
            <p className={styles.heroDescription}>
              I build clear, user-friendly websites for businesses—thoughtfully
              designed to help people understand what you do and find what they
              need.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.buttonPrimary} href="#work">
                Explore selected work <ArrowIcon />
              </a>
              <a className={styles.textLink} href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <div className={styles.heroAside} aria-hidden="true">
            <span className={styles.heroAsideMark}>W</span>
            <p>
              Thoughtful by design.
              <br />
              Useful by nature.
            </p>
            <span className={styles.heroAsideRule} />
            <span className={styles.heroAsideIndex}>PORTFOLIO / WEB</span>
          </div>
          <a className={styles.scrollCue} href="#work">
            <span>SCROLL TO EXPLORE</span>
            <span className={styles.scrollLine} />
          </a>
        </section>

        <section className={styles.section} id="work" aria-labelledby="work-title">
          <SectionHeading
            number="01"
            label="Selected work"
            title="Made with curiosity and care."
            id="work-title"
          />
          <div className={styles.projectList}>
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className={`${styles.about} ${styles.section}`} id="about">
          <SectionHeading
            number="02"
            label="A little about me"
            title="Learning by building useful things."
          />
          <div className={styles.aboutContent}>
            <p className={styles.aboutLead}>
              I&apos;m a developer growing my skills through real projects,
              learning how to make the web a little more useful with each one.
            </p>
            <div className={styles.aboutDetails}>
              <p>
                I enjoy turning ideas into straightforward, well-crafted
                websites. I&apos;m building my experience one practical
                challenge at a time, paying attention to the details that make
                a site feel clear and comfortable to use.
              </p>
              <a className={styles.textLink} href="#contact">
                Have a project in mind? <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section} id="services">
          <SectionHeading
            number="03"
            label="What I can help with"
            title="Good websites, built with care."
          />
          <div className={styles.servicesList}>
            {services.map((service) => (
              <article className={styles.service} key={service.number}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ArrowIcon />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contact} id="contact">
          <div className={styles.contactInner}>
            <div className={styles.contactCopy}>
              <p className={styles.contactEyebrow}>04 / Contact</p>
              <h2>
                Let&apos;s make
                <br />
                something <em>useful.</em>
              </h2>
              <p>
                Have an idea or a website that could use a thoughtful update?
                I&apos;d be glad to hear about it.
              </p>
              <a className={styles.contactEmail} href={`mailto:${profile.email}`}>
                {profile.email} <ArrowIcon />
              </a>
            </div>
            <div className={styles.socialLinks}>
              <span>Find me elsewhere</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> GitHub <ArrowIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon /> LinkedIn <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.footerName} href="#top">
          {profile.name}
        </a>
        <p>Designed and built with care.</p>
        <div className={styles.footerSocials} aria-label="Social profiles">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (replace placeholder URL)"
          >
            <GithubIcon /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (replace placeholder URL)"
          >
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
        <a href="#top" className={styles.backToTop}>
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
