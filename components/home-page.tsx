"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { MissionControlAssistant } from "@/components/mission-control-assistant";
import { SiteNav } from "@/components/site-nav";
import { Starfield } from "@/components/starfield";
import { VisitorTracker } from "@/components/visitor-tracker";
import {
  certificationTimeline,
  missions,
  profile,
  toolkit,
  type Mission
} from "@/lib/portfolio-data";

function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ArchitectureVisual({ stages }: { stages: string[] }) {
  return (
    <div className="architecture-visual" aria-label="Architecture visual">
      {stages.map((stage, index) => (
        <div className="architecture-node" key={stage}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{stage}</strong>
        </div>
      ))}
    </div>
  );
}

function MissionLink({ href, label }: { href: string; label: string }) {
  const pending = href === "#";

  return (
    <a
      className={pending ? "mission-link is-pending" : "mission-link"}
      href={href}
      aria-disabled={pending}
      aria-label={pending ? `${label} link pending` : label}
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </a>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <motion.article
      className={mission.flagship ? "mission-card flagship" : "mission-card"}
      id={mission.slug}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="mission-copy">
        <div className="mission-kicker">
          <span>{mission.number}</span>
          <span>{mission.status}</span>
        </div>
        <h3>{mission.title}</h3>
        <p className="mission-summary">{mission.summary}</p>

        <div className="mission-detail-grid">
          <div>
            <h4>Overview</h4>
            <p>{mission.overview}</p>
          </div>
          <div>
            <h4>Problem</h4>
            <p>{mission.problem}</p>
          </div>
          <div>
            <h4>Solution</h4>
            <p>{mission.solution}</p>
          </div>
        </div>

        <div className="tech-stack" aria-label={`${mission.title} technologies`}>
          {mission.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="mission-actions">
          <MissionLink href={mission.github} label="GitHub" />
          <MissionLink href={mission.demo} label="Demo" />
        </div>
      </div>

      <ArchitectureVisual stages={mission.architecture} />
    </motion.article>
  );
}

function Hero() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [photoMissing, setPhotoMissing] = useState(false);

  useEffect(() => {
    if (!orbitRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(".orbit-ring", {
        rotate: 360,
        duration: 44,
        repeat: -1,
        ease: "none",
        stagger: 7
      });
    }, orbitRef);

    return () => context.revert();
  }, []);

  return (
    <section className="hero-section" id="mission-log">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="hero-label-row" aria-label={`${profile.siteName}, ${profile.name}`}>
          <span className="eyebrow">{profile.siteName}</span>
          <span>{profile.name}</span>
        </div>
        <h1>{profile.headline}</h1>
        <p>{profile.supporting}</p>
        <p className="identity-line">{profile.identity}</p>
        <div className="hero-actions">
          <a href="#missions">View Missions</a>
          <a href="#contact">Contact</a>
        </div>
      </motion.div>

      <motion.div
        className="portrait-zone"
        ref={orbitRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      >
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="portrait-frame">
          {!photoMissing && (
            <img
              src="/darshil-photo.jpg"
              alt="Darshil Modi"
              onError={() => setPhotoMissing(true)}
            />
          )}
          {photoMissing && (
            <div className="portrait-fallback">
              <span>{profile.name}</span>
              <strong>Mission Log</strong>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <VisitorTracker />
      <Starfield />
      <SiteNav />

      <main>
        <Hero />

        <section className="content-band about-band" id="about">
          <SectionHeading eyebrow="About" title="A student exploring intelligent systems." />
          <div className="about-copy">
            <p>{profile.about}</p>
            <strong>{profile.signal}</strong>
          </div>
        </section>

        <section className="content-band missions-band" id="missions">
          <SectionHeading
            eyebrow="Missions"
            title="Build logs from the frontier."
            text="Projects are framed as missions: practical systems, clear problems, and a record of how each one is being built."
          />
          <div className="missions-list">
            {missions.map((mission) => (
              <MissionCard key={mission.slug} mission={mission} />
            ))}
          </div>
        </section>

        <section className="content-band research-band" id="research-log">
          <SectionHeading eyebrow="Research Log" title="Notes in preparation." />
          <div className="research-note">
            <p>
              Research logs are currently being prepared. I'm documenting lessons from
              building multi-agent systems, AI applications, software architecture, and
              future technologies.
            </p>
            <strong>First entries arriving soon.</strong>
          </div>
        </section>

        <section className="content-band toolkit-band" id="toolkit">
          <SectionHeading
            eyebrow="Toolkit"
            title="Tools for current and future missions."
          />
          <div className="toolkit-grid">
            {toolkit.map((group) => (
              <article key={group.group} className="toolkit-card">
                <h3>{group.group}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="content-band certifications-band"
          aria-labelledby="certifications-title"
        >
          <SectionHeading eyebrow="Certifications" title="Small signals, kept as evidence." />
          <div className="timeline" id="certifications-title">
            {certificationTimeline.map((item) => (
              <article key={`${item.date}-${item.title}`}>
                <span>{item.date}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-band assistant-band">
          <MissionControlAssistant />
        </section>

        <section className="content-band contact-band" id="contact">
          <SectionHeading
            eyebrow="Contact"
            title="Open a channel."
            text="For project discussions, collaboration, or opportunities connected to AI and emerging technology."
          />
          <ContactForm />
        </section>
      </main>
    </>
  );
}
