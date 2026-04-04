import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import './style/footer.scss';

const Footer = () => {
  const footerContentRef = useRef();

  useEffect(() => {
    if (footerContentRef.current) {
      gsap.fromTo(
        footerContentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer">

      {/* ── Main grid ── */}
      <div className="footer-content" ref={footerContentRef}>

        {/* Brand */}
        <div className="footer-section footer-brand">
          <h3 className="footer-brand__title">InterviewAI</h3>
          <p className="footer-brand__tagline">
            AI-powered interview preparation to help you ace your dream job.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://github.com/omrokade123" aria-label="GitHub" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Product */}
        <div className="footer-section">
          <h4 className="footer-section__title">Product</h4>
          <ul className="footer-links">
            <li><a href="/">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="/">Interview Plans</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4 className="footer-section__title">Company</h4>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4 className="footer-section__title">Resources</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h4 className="footer-section__title">Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">GDPR</a></li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <p className="footer-copyright">
            &copy; {currentYear} InterviewAI. All rights reserved.
          </p>
          <div className="footer-bottom__links">
            <a href="#">Sitemap</a>
            <span className="footer-divider">•</span>
            <a href="#">Status</a>
            <span className="footer-divider">•</span>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;