import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './style/contact.scss'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  // Refs for animations
  const heroBadgeRef = useRef()
  const heroH1Ref = useRef()
  const heroSubRef = useRef()
  const contactFormRef = useRef()
  const contactInfoRef = useRef()
  const infoCardsRef = useRef([])

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

    // Form section
    gsap.fromTo(
      contactFormRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactFormRef.current,
          start: 'top 80%'
        }
      }
    )

    // Contact info section
    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 80%'
        }
      }
    )

    // Info cards stagger
    gsap.fromTo(
      infoCardsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 70%'
        }
      }
    )
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (response.ok) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
      // }
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <div className='contact-page'>
      {/* Decorative blobs */}
      <div className='contact__blob contact__blob--1' aria-hidden='true' />
      <div className='contact__blob contact__blob--2' aria-hidden='true' />
      <div className='contact__blob contact__blob--3' aria-hidden='true' />

      {/* Hero Section */}
      <section className='contact-hero'>
        <div className='contact-hero__content'>
          {/* Badge */}
          <div className='contact-hero__badge' ref={heroBadgeRef}>
            <span className='contact-hero__badge-dot' />
            Get in Touch
          </div>

          {/* Heading */}
          <h1 className='contact-hero__h1' ref={heroH1Ref}>
            We'd Love to Hear from{' '}
            <span className='contact-hero__highlight'>You</span>
          </h1>

          {/* Subtitle */}
          <p className='contact-hero__sub' ref={heroSubRef}>
            Have a question or feedback? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className='contact-content'>
        {/* Contact Form */}
        <div className='contact-form-wrapper' ref={contactFormRef}>
          <div className='contact-form'>
            <h2>Send us a Message</h2>
            {submitStatus === 'success' && (
              <div className='alert alert--success'>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className='alert alert--error'>
                ✗ Failed to send message. Please try again.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='John Doe'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='john@example.com'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='subject'>Subject</label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder='How can we help?'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Tell us your thoughts...'
                  rows='5'
                  required
                />
              </div>

              <button type='submit' className='submit-btn'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M22 2L11 13M22 2l-7 20-5-9-9-5 20-7z' />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <section className='contact-info' ref={contactInfoRef}>
          <h2>Contact Information</h2>
          <div className='info-cards'>
            <div
              className='info-card'
              ref={(el) => (infoCardsRef.current[0] = el)}
            >
              <div className='info-card__icon'>📧</div>
              <h3>Email</h3>
              <p>support@talentstage.com</p>
              <a href='mailto:support@talentstage.com'>Send an email</a>
            </div>

            <div
              className='info-card'
              ref={(el) => (infoCardsRef.current[1] = el)}
            >
              <div className='info-card__icon'>💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <a href='#'>Start chat</a>
            </div>

            <div
              className='info-card'
              ref={(el) => (infoCardsRef.current[2] = el)}
            >
              <div className='info-card__icon'>📱</div>
              <h3>Social Media</h3>
              <p>Follow us on social platforms</p>
              <div className='social-links'>
                <a href='#'>Twitter</a>
                <a href='#'>LinkedIn</a>
                <a href='#'>Discord</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='faq-section'>
          <h2>Frequently Asked Questions</h2>
          <div className='faq-list'>
            <div className='faq-item'>
              <h3>What is your response time?</h3>
              <p>We typically respond to all inquiries within 24 business hours. For urgent matters, please use our live chat feature.</p>
            </div>
            <div className='faq-item'>
              <h3>Do you offer phone support?</h3>
              <p>Currently, we provide support through email and live chat. Phone support may be available for premium users.</p>
            </div>
            <div className='faq-item'>
              <h3>Can I get a demo of TalentStage?</h3>
              <p>Yes! Contact our sales team at sales@talentstage.com and they'll schedule a personalized demo for you.</p>
            </div>
            <div className='faq-item'>
              <h3>How secure is my data?</h3>
              <p>We use industry-standard encryption and follow GDPR compliance. Your data is fully protected and never shared with third parties.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact