import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './style/about.scss'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  // Refs for animations
  const heroBadgeRef = useRef()
  const heroH1Ref = useRef()
  const heroSubRef = useRef()
  const missionCardRef = useRef()
  const valuesRef = useRef()
  const teamSectionRef = useRef()
  const teamCardsRef = useRef([])

  useEffect(() => {
    const timeline = gsap.timeline()

    // Hero animations
    timeline.fromTo(
      heroBadgeRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    timeline.fromTo(
      heroH1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    timeline.fromTo(
      heroSubRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    // Mission card
    timeline.fromTo(
      missionCardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    )

    // Values section
    gsap.fromTo(
      valuesRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%'
        }
      }
    )

    // Team section
    gsap.fromTo(
      teamSectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: 'top 80%'
        }
      }
    )

    // Team cards stagger
    gsap.fromTo(
      teamCardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: 'top 70%'
        }
      }
    )
  }, [])

  const developers = [
    {
      name: 'Om Rokade',
      role: 'Full Stack Developer',
      bio: 'Passionate about building scalable web applications'
    }
  ]

  return (
    <div className='about-page'>
      {/* Decorative blobs */}
      <div className='about__blob about__blob--1' aria-hidden='true' />
      <div className='about__blob about__blob--2' aria-hidden='true' />
      <div className='about__blob about__blob--3' aria-hidden='true' />

      {/* Hero Section */}
      <section className='about-hero'>
        <div className='about-hero__content'>
          {/* Badge */}
          <div className='about-hero__badge' ref={heroBadgeRef}>
            <span className='about-hero__badge-dot' />
            Learn About Us
          </div>

          {/* Heading */}
          <h1 className='about-hero__h1' ref={heroH1Ref}>
            Empowering Interview{' '}
            <span className='about-hero__highlight'>Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className='about-hero__sub' ref={heroSubRef}>
            Experience the future of interview preparation with our AI-powered platform. We\'re dedicated to helping professionals ace their interviews with confidence and skill.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className='about-content'>
        {/* Mission Card */}
        <div className='mission-card' ref={missionCardRef}>
          <div className='mission-card__header'>
            <div className='mission-icon'>🎯</div>
            <h2>Our Mission</h2>
          </div>
          <p className='mission-card__content'>
            We are committed to democratizing interview preparation by delivering AI-driven, personalized strategies that empower candidates to showcase their true potential. Our goal is to bridge the gap between ambition and achievement, one interview at a time.
          </p>
        </div>

        {/* Values Section */}
        <section className='values-section' ref={valuesRef}>
          <h2 className='section-title'>Our Core Values</h2>
          <div className='values-grid'>
            <div className='value-card'>
              <div className='value-icon'>💡</div>
              <h3>Innovation</h3>
              <p>Leveraging cutting-edge AI technology to create solutions that truly make a difference</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>🤝</div>
              <h3>Integrity</h3>
              <p>Operating with transparency and honesty in everything we do and say</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>⭐</div>
              <h3>Excellence</h3>
              <p>Striving for the highest standard in every project and interaction</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>🚀</div>
              <h3>Growth</h3>
              <p>Continuously evolving and improving to serve our users better every day</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className='team-section' ref={teamSectionRef}>
          <h2 className='section-title'>Meet Our Team</h2>
          <p className='team-subtitle'>Talented professionals working together to build the future of interview prep</p>
          <div className='team-grid'>
            {developers.map((dev, index) => (
              <div
                key={index}
                className='team-card'
                ref={(el) => (teamCardsRef.current[index] = el)}
              >
                <div className='team-card__avatar'>
                  {dev.name[0]}
                </div>
                <h3 className='team-card__name'>{dev.name}</h3>
                <p className='team-card__role'>{dev.role}</p>
                <p className='team-card__bio'>{dev.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className='features-section'>
          <h2 className='section-title'>Why Choose TalentStage</h2>
          <div className='features-grid'>
            <div className='feature-item'>
              <div className='feature-number'>01</div>
              <h3>AI-Powered Strategy</h3>
              <p>Get personalized interview strategies tailored to your profile and target role</p>
            </div>
            <div className='feature-item'>
              <div className='feature-number'>02</div>
              <h3>Rapid Generation</h3>
              <p>Complete interview preparation plan in just 30 seconds</p>
            </div>
            <div className='feature-item'>
              <div className='feature-number'>03</div>
              <h3>Comprehensive Analysis</h3>
              <p>Skill gap analysis, technical prep, and behavioral interview guidance</p>
            </div>
            <div className='feature-item'>
              <div className='feature-number'>04</div>
              <h3>Proven Results</h3>
              <p>92% of our users report increased confidence in interviews</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About