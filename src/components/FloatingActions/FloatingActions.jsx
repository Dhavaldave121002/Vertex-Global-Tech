import React, { useEffect, useState, useRef } from 'react';
import {
  FaWhatsapp,
  FaArrowUp,
  FaPhone,
  FaCommentAlt,
  FaTimes
} from 'react-icons/fa';
import './floating-actions.css';

export default function FloatingActions({
  whatsappNumber = '+919876543210',
  whatsappMessage = 'Hello%20Vertex%20Global%20Tech!',
  phoneNumber = '+919876543210',
  enablePulse = true,
  position = 'right',
  showCallButton = true,
  showContactButton = true,
  showBackToTop = true
}) {
  const [mounted, setMounted] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const contactRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        contactRef.current &&
        !contactRef.current.contains(e.target)
      ) {
        setShowContactMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setShowTopBtn(scrollY > 300);
      setScrollProgress(Math.min((scrollY / docHeight) * 100, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) return null;

  const getWhatsAppUrl = () =>
    `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;

  const getTelUrl = () =>
    `tel:${phoneNumber.replace(/\D/g, '')}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowContactMenu(false);
  };

  return (
    <div className={`floating-actions-container ${position}`}>
      {/* WhatsApp */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-btn whatsapp-btn ${
          enablePulse ? 'pulse-animation' : ''
        }`}
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
        <span className="btn-tooltip">Chat on WhatsApp</span>
      </a>

      {/* Contact Button */}
      {showContactButton && (
        <>
          <button
            ref={contactRef}
            className={`floating-btn contact-btn ${
              showContactMenu ? 'active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowContactMenu(!showContactMenu);
            }}
          >
            {showContactMenu ? <FaTimes /> : <FaCommentAlt />}
            <span className="btn-tooltip">Contact Options</span>
          </button>

          {showContactMenu && (
            <div ref={menuRef} className="contact-menu">
              <div className="menu-header">
                <h4>Contact Us</h4>
                <p>Choose your preferred option</p>
              </div>

              <div className="menu-items">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item whatsapp-item"
                >
                  <div className="menu-icon">
                    <FaWhatsapp />
                  </div>
                  <div className="menu-content">
                    <strong>WhatsApp</strong>
                    <span>Instant chat</span>
                  </div>
                </a>

                {showCallButton && (
                  <a href={getTelUrl()} className="menu-item call-item">
                    <div className="menu-icon">
                      <FaPhone />
                    </div>
                    <div className="menu-content">
                      <strong>Call Now</strong>
                      <span>{phoneNumber}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Back To Top (FIXED) */}
      {showBackToTop && showTopBtn && (
        <button
          className="floating-btn top-btn visible"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <FaArrowUp />

          <div className="progress-ring">
            <svg viewBox="0 0 60 60">
              <circle
                className="progress-ring-track"
                cx="30"
                cy="30"
                r="28"
              />
              <circle
                className="progress-ring-fill"
                cx="30"
                cy="30"
                r="28"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={
                  2 * Math.PI * 28 * (1 - scrollProgress / 100)
                }
              />
            </svg>
          </div>

          <span className="btn-tooltip">Back to Top</span>
        </button>
      )}
    </div>
  );
}
