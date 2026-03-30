import React, { useState, useEffect, useRef } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";
import gsap from "gsap";

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef();

  const toggle = () => {
    if (!open) {
      setOpen(true);
      // Body will mount — animate in next tick
      setTimeout(() => {
        if (bodyRef.current) {
          gsap.from(bodyRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }, 0);
    } else {
      if (bodyRef.current) {
        gsap.to(bodyRef.current, {
          opacity: 0,
          y: -6,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => setOpen(false),
        });
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <div className={`q-card ${open ? "q-card--open" : ""}`}>
      <div className="q-card__header" onClick={toggle}>
        <span className="q-card__index">Q{index + 1}</span>
        <p className="q-card__question">{item.question}</p>
        <span className={`q-card__chevron ${open ? "q-card__chevron--open" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {open && (
        <div className="q-card__body" ref={bodyRef}>
          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--intention">Intention</span>
            <p>{item.intention}</p>
          </div>
          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--answer">Model Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Roadmap Day ───────────────────────────────────────────────────────────────
const RoadMapDay = ({ day, index }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    // No ScrollTrigger — the content panel is already in the viewport.
    // Use a simple staggered delay so each day animates in sequence.
    gsap.fromTo(
      ref.current,
      { opacity: 0, x: -28 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        delay: 0.08 + index * 0.12,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="roadmap-day" ref={ref}>
      <div className="roadmap-day__connector">
        <div className="roadmap-day__dot" />
        <div className="roadmap-day__line" />
      </div>
      <div className="roadmap-day__content">
        <div className="roadmap-day__header">
          <span className="roadmap-day__badge">Day {day.day}</span>
          <h3 className="roadmap-day__focus">{day.focus}</h3>
        </div>
        <ul className="roadmap-day__tasks">
          {day.tasks.map((task, i) => (
            <li key={i}>
              <span className="roadmap-day__bullet" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── Match Score Ring (animated SVG circle) ────────────────────────────────────
const ScoreRing = ({ score, colorClass }) => {
  const circleRef = useRef();
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const target = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (!circleRef.current) return;
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: target,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.4,
      }
    );
  }, []);

  const strokeColor =
    colorClass === "score--high" ? "#3fb950" :
    colorClass === "score--mid"  ? "#f5a623" : "#ff4d4d";

  return (
    <div className="score-ring-wrap">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Track */}
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#2a3348" strokeWidth="8" />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}   // GSAP animates this
          transform="rotate(-90 60 60)"
          style={{ filter: `drop-shadow(0 0 6px ${strokeColor}55)` }}
        />
      </svg>
      <div className="score-ring-inner">
        <span className="score-ring-value">{score}</span>
        <span className="score-ring-pct">%</span>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  // Refs for GSAP
  const heroRef        = useRef();
  const heroTitleRef   = useRef();
  const heroSubRef     = useRef();
  const headerRef      = useRef();
  const layoutRef      = useRef();
  const navRef         = useRef();
  const sidebarRef     = useRef();
  const contentRef     = useRef();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  // ── GSAP entrance after data loads ──────────────────────────────────────
  useEffect(() => {
    if (loading || !report) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Hero lines
    gsap.set(heroTitleRef.current, { opacity: 0, y: -40 });
    gsap.set(heroSubRef.current,   { opacity: 0, y:  20 });

    tl.to(heroTitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(heroSubRef.current,   { opacity: 1, y: 0, duration: 0.7 }, 0.25);

    // Header fades in
    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.35);

    // Layout card scales up from slightly below
    gsap.set(layoutRef.current, { opacity: 0, y: 50, scale: 0.97, transformOrigin: "50% 0%" });
    tl.to(layoutRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power4.out" }, 0.45);

    // Nav items stagger in from left
    const navItems = navRef.current?.querySelectorAll(".interview-nav__item") || [];
    gsap.set(navItems, { opacity: 0, x: -20 });
    tl.to(navItems, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, 0.7);

    // Sidebar fades in from right
    gsap.set(sidebarRef.current, { opacity: 0, x: 24 });
    tl.to(sidebarRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.65);

    return () => { gsap.globalTimeline.clear(); };
  }, [loading, report]);

  // ── Re-animate content area on nav switch ────────────────────────────────
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeNav]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <div className="loading-screen__spinner" />
        <p>Loading your interview plan…</p>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80 ? "score--high" :
    report.matchScore >= 60 ? "score--mid"  : "score--low";

  return (
    <div className="interview-page">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="interview-hero" ref={heroRef}>
        <div className="hero__blob hero__blob--1" aria-hidden />
        <div className="hero__blob hero__blob--2" aria-hidden />
        <div className="hero-content">
          <h1 className="hero-title" ref={heroTitleRef}>
            Your Interview Preparation Guide
          </h1>
          <p className="hero-subtitle" ref={heroSubRef}>
            Ace your{" "}
            <span className="hero-highlight">{report.title}</span>{" "}
            interview with personalized strategies, targeted questions, and a proven preparation roadmap.
          </p>
        </div>
      </section>

      {/* ── Sub-header ───────────────────────────────────────────────── */}
      <header className="interview-header" ref={headerRef}>
        <h2 className="title">Interview Strategy</h2>
        <p className="subtitle">
          Match Score: <b>{report.matchScore}%</b>
        </p>
      </header>

      {/* ── 3-Column Layout ──────────────────────────────────────────── */}
      <div className="interview-layout" ref={layoutRef}>

        {/* Left Nav */}
        <nav className="interview-nav" ref={navRef}>
          <div className="nav-content">
            <p className="interview-nav__label">Sections</p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`interview-nav__item ${activeNav === item.id ? "interview-nav__item--active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="interview-nav__icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => getResumePdf(interviewId)}
            className="button primary-button"
          >
            <svg height="0.85rem" style={{ marginRight: "0.6rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        <div className="interview-divider" />

        {/* Center Content */}
        <main className="interview-content" ref={contentRef}>
          {activeNav === "technical" && (
            <section>
              <div className="content-header">
                <h2>Technical Questions</h2>
                <span className="content-header__count">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="q-list">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="content-header">
                <h2>Behavioral Questions</h2>
                <span className="content-header__count">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="q-list">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="content-header">
                <h2>Preparation Road Map</h2>
                <span className="content-header__count">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="roadmap-list">
                {report.preparationPlan.map((day, i) => (
                  <RoadMapDay key={day.day} day={day} index={i} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="interview-divider" />

        {/* Right Sidebar */}
        <aside className="interview-sidebar" ref={sidebarRef}>

          {/* Match Score */}
          <div className="match-score">
            <p className="match-score__label">Match Score</p>
            <ScoreRing score={report.matchScore} colorClass={scoreColor} />
            <p className={`match-score__sub ${scoreColor}`}>
              {report.matchScore >= 80 ? "Strong match for this role" :
               report.matchScore >= 60 ? "Good match — some gaps" :
               "Work on the skill gaps below"}
            </p>
          </div>

          <div className="sidebar-divider" />

          {/* Skill Gaps */}
          <div className="skill-gaps">
            <p className="skill-gaps__label">Skill Gaps</p>
            <div className="skill-gaps__list">
              {report.skillGaps.map((gap, i) => (
                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-divider" />

          {/* Back button */}
          <div className="back">
            <button onClick={() => navigate("/")} className="button back-button">
              <svg height="0.85rem" style={{ marginRight: "0.6rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
              </svg>
              Go Back
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Interview;