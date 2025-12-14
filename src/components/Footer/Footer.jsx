import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://linkedin.com/company/vertexglobaltech' },
    { name: 'Twitter', icon: 'bi-twitter-x', url: 'https://twitter.com/vertexglobaltech' },
    { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/vertexglobaltech' },
    { name: 'Dribbble', icon: 'bi-dribbble', url: 'https://dribbble.com/vertexglobaltech' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/vertexglobaltech' }
  ];

  // Quick links
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/career', label: 'Careers' },
    { path: '/blog', label: 'Blog' }
  ];

  // Services links
  const serviceLinks = [
    { path: '/services/informative', label: 'Informative Websites' },
    { path: '/services/dynamic', label: 'Dynamic Websites' },
    { path: '/services/ecommerce', label: 'E-Commerce Solutions' },
    { path: '/services/application', label: 'App Development' },
    { path: '/services/uiux', label: 'UI/UX Design' },
    { path: '/services/maintenance', label: 'Maintenance & Support' }
  ];

  // Contact information
  const contactInfo = [
    { icon: 'bi-geo-alt', label: 'Address', value: '123 Tech Street, Silicon Valley, CA 94000' },
    { icon: 'bi-telephone', label: 'Phone', value: '+1 (234) 567-8900' },
    { icon: 'bi-envelope', label: 'Email', value: 'contact@vertexglobaltech.com' },
    { icon: 'bi-clock', label: 'Business Hours', value: 'Mon-Fri: 9AM-6PM PST' }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="bi bi-chevron-up" aria-hidden="true"></i>
        <span className="back-to-top-tooltip">Back to Top</span>
      </button>

      <footer className="vg-footer">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-container">
            
            {/* Company Info Section */}
            <div className="footer-section company-info">
              <Link to="/" className="footer-logo-link">
                <div className="footer-logo">
                  <div className="logo-icon" aria-hidden="true">
                    <i className="bi bi-rocket-takeoff"></i>
                  </div>
                  <div className="logo-text">
                    <h3 className="company-name">Vertex Global Tech</h3>
                    <p className="company-tagline">Design • Engineering • Scale</p>
                  </div>
                </div>
              </Link>
              
              <p className="company-description">
                We design and engineer high-performing digital products that drive measurable growth 
                for startups and enterprises worldwide.
              </p>
              
              {/* Social Media */}
              <div className="social-links">
                <h4 className="social-title">Connect With Us</h4>
                <div className="social-icons">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="social-icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <i className={`bi ${social.icon}`} aria-hidden="true"></i>
                      <span className="social-tooltip">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section quick-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer-link-item">
                    <Link to={link.path} className="footer-link">
                      <i className="bi bi-chevron-right link-icon" aria-hidden="true"></i>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="footer-section services">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-links">
                {serviceLinks.map((service) => (
                  <li key={service.path} className="footer-link-item">
                    <Link to={service.path} className="footer-link">
                      <i className="bi bi-chevron-right link-icon" aria-hidden="true"></i>
                      <span>{service.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-section contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="contact-info">
                {contactInfo.map((info) => (
                  <li key={info.label} className="contact-item">
                    <div className="contact-icon" aria-hidden="true">
                      <i className={`bi ${info.icon}`}></i>
                    </div>
                    <div className="contact-content">
                      <span className="contact-label">{info.label}</span>
                      <span className="contact-value">{info.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Newsletter */}
              <div className="newsletter">
                <h4 className="newsletter-title">Stay Updated</h4>
                <form className="newsletter-form">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="newsletter-input"
                      aria-label="Email address for newsletter"
                      required
                    />
                    <button type="submit" className="newsletter-button" aria-label="Subscribe to newsletter">
                      <i className="bi bi-send" aria-hidden="true"></i>
                    </button>
                  </div>
                  <p className="newsletter-note">Get the latest tech insights and updates</p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="footer-stats">
          <div className="footer-container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">120+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0.8s</div>
                <div className="stat-label">Avg Load Time</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime Guarantee</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} Vertex Global Tech. All rights reserved.</p>
              </div>
              
              <div className="legal-links">
                <Link to="/privacy" className="legal-link">Privacy Policy</Link>
                <span className="separator">•</span>
                <Link to="/terms" className="legal-link">Terms of Service</Link>
                <span className="separator">•</span>
                <Link to="/cookies" className="legal-link">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;