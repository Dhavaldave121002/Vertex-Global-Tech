import React, { useEffect, useState, useRef } from 'react';
import {
  FaWhatsapp,
  FaPhone,
  FaCommentAlt,
  FaTimes,
  FaChevronRight,
  FaSpinner,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaExclamationCircle,
  FaPaperPlane,
  FaDesktop,
  FaMobileAlt
} from 'react-icons/fa';
import './floating-actions.css';

export default function FloatingActions({
  whatsappNumbers = [
    { number: '+919876543210', label: 'Sales Team', icon: '👔' },
    { number: '+919876543211', label: 'Support Team', icon: '🛠️' }
  ],
  whatsappMessage = 'Hello, I would like to know more about your services!',
  phoneNumbers = [
    { number: '+919876543210', label: 'Sales Team', icon: '📞' },
    { number: '+919876543211', label: 'Support Team', icon: '🔧' }
  ],
  emailAddress = 'contact@vertexglobaltech.com',
  emailSubject = 'Inquiry from Website',
  enablePulse = true,
  position = 'right',
  showCallButton = true,
  showEmailButton = true,
  companyName = 'Vertex Global Tech'
}) {
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailForm, setEmailForm] = useState({
    subject: emailSubject,
    message: '',
    name: '',
    phone: '',
    email: ''
  });
  const [emailStatus, setEmailStatus] = useState(null);
  const [deviceType, setDeviceType] = useState('desktop');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const contactRef = useRef(null);
  const menuRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const notificationRef = useRef(null);
  const emailFormRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    const detectDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setDeviceType(isMobile ? 'mobile' : 'desktop');
      setViewportHeight(window.innerHeight);
    };
    
    detectDevice();
    
    const handleResize = () => {
      detectDevice();
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Preload animations
    const preloadStyles = document.createElement('style');
    preloadStyles.textContent = `
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      @keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes shimmer { 0% { background-position: -468px 0; } 100% { background-position: 468px 0; } }
    `;
    document.head.appendChild(preloadStyles);

    return () => {
      [closeTimeoutRef, copyTimeoutRef].forEach(ref => {
        if (ref.current) clearTimeout(ref.current);
      });
      document.head.removeChild(preloadStyles);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll email form into view on mobile
    if (activeMenu === 'email' && deviceType === 'mobile' && emailFormRef.current) {
      setTimeout(() => {
        emailFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [activeMenu, deviceType]);

  const closeAllMenus = (immediate = false) => {
    if (immediate) {
      setActiveMenu(null);
      setSelectedType(null);
      setIsClosing(false);
      setEmailStatus(null);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    } else {
      setIsClosing(true);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
        setSelectedType(null);
        setIsClosing(false);
        setEmailStatus(null);
      }, 300);
    }
  };

  const handleMainButtonClick = (e) => {
    e.stopPropagation();
    if (isClosing) return;
    
    if (activeMenu === 'main') {
      closeAllMenus();
    } else {
      setActiveMenu('main');
      setEmailForm({
        subject: emailSubject,
        message: '',
        name: '',
        phone: '',
        email: ''
      });
      setEmailStatus(null);
    }
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    if (whatsappNumbers.length === 1) {
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/${whatsappNumbers[0].number.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
      closeAllMenus(true);
    } else {
      setActiveMenu('whatsapp');
      setSelectedType('whatsapp');
    }
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    if (phoneNumbers.length === 1) {
      window.location.href = `tel:${phoneNumbers[0].number.replace(/\D/g, '')}`;
      closeAllMenus(true);
    } else {
      setActiveMenu('call');
      setSelectedType('call');
    }
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    setActiveMenu('email');
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    setActiveMenu('main');
    setSelectedType(null);
    setEmailStatus(null);
  };

  const handleNumberSelect = async (number, type, e) => {
    e.stopPropagation();
    setLoading(true);
    setSelectedType(type);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (type === 'whatsapp') {
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
    } else if (type === 'call') {
      window.location.href = `tel:${number.replace(/\D/g, '')}`;
    }
    
    setLoading(false);
    closeAllMenus(true);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setEmailForm(prev => ({ ...prev, [name]: value }));
  };

  const openMailClient = (mailtoUrl) => {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    if (deviceType === 'mobile') {
      link.style.display = 'none';
      document.body.appendChild(link);
    }
    
    link.click();
    
    if (deviceType === 'mobile') {
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }
  };

  const sendEnhancedEmail = async (e) => {
    if (e) e.stopPropagation();
    
    setEmailStatus('sending');
    
    try {
      const body = emailForm.message || `Hello,\n\nI would like to get in touch with you.\n\nBest regards,\n${emailForm.name || 'Website Visitor'}`;
      const enhancedSubject = `${emailForm.subject || emailSubject}${emailForm.name ? ` - From ${emailForm.name}` : ''}`;
      
      let enhancedBody = body;
      
      const contactInfo = [];
      if (emailForm.name) contactInfo.push(`Name: ${emailForm.name}`);
      if (emailForm.email) contactInfo.push(`Email: ${emailForm.email}`);
      if (emailForm.phone) contactInfo.push(`Phone: ${emailForm.phone}`);
      
      if (contactInfo.length > 0) {
        enhancedBody += `\n\n---\nContact Information:\n${contactInfo.join('\n')}`;
      }
      
      enhancedBody += `\n\n---\nSent via ${companyName} Contact Widget`;
      
      let mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(enhancedSubject)}&body=${encodeURIComponent(enhancedBody)}`;
      
      if (emailForm.email) {
        mailtoUrl += `&cc=${encodeURIComponent(emailForm.email)}`;
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      openMailClient(mailtoUrl);
      
      setEmailStatus('success');
      
      setTimeout(() => {
        closeAllMenus(true);
      }, 1500);
      
    } catch (error) {
      console.error('Email error:', error);
      setEmailStatus('error');
    }
  };

  const sendEmailDirectly = () => {
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
    openMailClient(mailtoUrl);
    closeAllMenus(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        contactRef.current &&
        !menuRef.current.contains(event.target) &&
        !contactRef.current.contains(event.target) &&
        activeMenu !== null &&
        !event.target.closest('.notification-toast')
      ) {
        closeAllMenus();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && activeMenu !== null) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeMenu]);

  if (!mounted) return null;

  const isSmallScreen = viewportHeight < 700 || deviceType === 'mobile';

  return (
    <div className={`floating-actions-container ${position}`}>
      <button
        ref={contactRef}
        className={`floating-btn contact-btn ${activeMenu !== null ? 'active' : ''} ${
          enablePulse ? 'pulse-animation' : ''
        } ${isClosing ? 'closing' : ''} glow-effect`}
        onClick={handleMainButtonClick}
        onMouseDown={(e) => e.preventDefault()}
        disabled={loading}
        aria-label={activeMenu !== null ? "Close contact menu" : "Open contact menu"}
        aria-expanded={activeMenu !== null}
      >
        <div className="btn-inner">
          {loading ? (
            <FaSpinner className="spinner-icon" />
          ) : activeMenu !== null ? (
            <FaTimes className="close-icon" />
          ) : (
            <FaCommentAlt className="comment-icon" />
          )}
        </div>
        <span className="btn-tooltip">
          {loading ? 'Loading...' : activeMenu !== null ? 'Close Menu' : 'Contact Options'}
        </span>
        
        <div className="btn-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
      </button>

      {activeMenu === 'main' && (
        <div 
          ref={menuRef} 
          className={`contact-menu main-menu ${isClosing ? 'closing' : ''} animated-menu ${isSmallScreen ? 'compact-menu' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Contact options"
        >
          <div className="menu-header">
            <div className="header-content">
              <div className="company-badge">{companyName}</div>
              <h4>Get in Touch</h4>
              <p>Choose how you'd like to contact us</p>
            </div>
          </div>

          <div className="menu-items">
            <button
              className="menu-item whatsapp-item hover-lift"
              onClick={handleWhatsAppClick}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loading}
              aria-label={`Open WhatsApp ${whatsappNumbers.length > 1 ? 'number selection' : 'chat'}`}
            >
              <div className="menu-icon-animated">
                <FaWhatsapp />
                <div className="icon-pulse"></div>
              </div>
              <div className="menu-content">
                <strong>WhatsApp Chat</strong>
                <span>Instant messaging {whatsappNumbers.length > 1 ? `(${whatsappNumbers.length} options)` : ''}</span>
              </div>
              {whatsappNumbers.length > 1 && (
                <div className="menu-badge animated-badge">
                  {whatsappNumbers.length}
                </div>
              )}
              <div className="menu-arrow animated-arrow">
                <FaChevronRight />
              </div>
            </button>

            {showCallButton && (
              <button
                className="menu-item call-item hover-lift"
                onClick={handleCallClick}
                onMouseDown={(e) => e.preventDefault()}
                disabled={loading}
                aria-label={`Call ${phoneNumbers.length > 1 ? 'number selection' : 'us'}`}
              >
                <div className="menu-icon-animated">
                  <FaPhone />
                  <div className="icon-pulse"></div>
                </div>
                <div className="menu-content">
                  <strong>Phone Call</strong>
                  <span>Direct phone call {phoneNumbers.length > 1 ? `(${phoneNumbers.length} options)` : ''}</span>
                </div>
                {phoneNumbers.length > 1 && (
                  <div className="menu-badge animated-badge">
                    {phoneNumbers.length}
                  </div>
                )}
                <div className="menu-arrow animated-arrow">
                  <FaChevronRight />
                </div>
              </button>
            )}

            {showEmailButton && (
              <button
                className="menu-item email-item hover-lift"
                onClick={handleEmailClick}
                onMouseDown={(e) => e.preventDefault()}
                disabled={loading}
                aria-label="Send email"
              >
                <div className="menu-icon-animated">
                  <FaEnvelope />
                  <div className="icon-pulse"></div>
                </div>
                <div className="menu-content">
                  <strong>Send Email</strong>
                  <span>{deviceType === 'mobile' ? 'Enhanced form' : 'Quick email'}</span>
                </div>
                <div className="menu-arrow animated-arrow">
                  <FaChevronRight />
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {activeMenu === 'whatsapp' && (
        <div 
          ref={menuRef} 
          className={`contact-menu selection-menu ${isClosing ? 'closing' : ''} animated-menu ${isSmallScreen ? 'compact-menu' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="WhatsApp number selection"
        >
          <div className="menu-header">
            <button
              className="back-button hover-lift"
              onClick={handleBackClick}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loading}
              aria-label="Go back to main menu"
            >
              <FaChevronRight className="back-icon" />
              <span>Back</span>
            </button>
            <div className="header-content">
              <h4>Select WhatsApp Number</h4>
              <p>Choose which team to contact</p>
            </div>
          </div>

          <div className="menu-items">
            {whatsappNumbers.map((item, index) => (
              <button
                key={index}
                className="menu-item whatsapp-number-item hover-lift"
                onClick={(e) => handleNumberSelect(item.number, 'whatsapp', e)}
                onMouseDown={(e) => e.preventDefault()}
                disabled={loading}
                aria-label={`Contact ${item.label} on WhatsApp`}
              >
                <div className="number-avatar-animated">
                  <div className="avatar-icon">{item.icon || <FaWhatsapp />}</div>
                  <div className="avatar-glow"></div>
                </div>
                <div className="menu-content">
                  <strong>{item.label}</strong>
                  <div className="number-display-container">
                    <span className="number-display">{formatPhoneNumber(item.number)}</span>
                    <button
                      className="copy-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.number, `whatsapp-${index}`);
                      }}
                      aria-label="Copy number"
                    >
                      {copied === `whatsapp-${index}` ? (
                        <FaCheck className="copy-success" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                  </div>
                </div>
                {loading && selectedType === 'whatsapp' ? (
                  <div className="loading-spinner-animated">
                    <FaSpinner />
                  </div>
                ) : (
                  <div className="menu-arrow animated-arrow">
                    <FaChevronRight />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeMenu === 'call' && (
        <div 
          ref={menuRef} 
          className={`contact-menu selection-menu ${isClosing ? 'closing' : ''} animated-menu ${isSmallScreen ? 'compact-menu' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Phone number selection"
        >
          <div className="menu-header">
            <button
              className="back-button hover-lift"
              onClick={handleBackClick}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loading}
              aria-label="Go back to main menu"
            >
              <FaChevronRight className="back-icon" />
              <span>Back</span>
            </button>
            <div className="header-content">
              <h4>Select Phone Number</h4>
              <p>Choose which team to call</p>
            </div>
          </div>

          <div className="menu-items">
            {phoneNumbers.map((item, index) => (
              <button
                key={index}
                className="menu-item call-number-item hover-lift"
                onClick={(e) => handleNumberSelect(item.number, 'call', e)}
                onMouseDown={(e) => e.preventDefault()}
                disabled={loading}
                aria-label={`Call ${item.label}`}
              >
                <div className="number-avatar-animated">
                  <div className="avatar-icon">{item.icon || <FaPhone />}</div>
                  <div className="avatar-glow"></div>
                </div>
                <div className="menu-content">
                  <strong>{item.label}</strong>
                  <div className="number-display-container">
                    <span className="number-display">{formatPhoneNumber(item.number)}</span>
                    <button
                      className="copy-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.number, `call-${index}`);
                      }}
                      aria-label="Copy number"
                    >
                      {copied === `call-${index}` ? (
                        <FaCheck className="copy-success" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                  </div>
                </div>
                {loading && selectedType === 'call' ? (
                  <div className="loading-spinner-animated">
                    <FaSpinner />
                  </div>
                ) : (
                  <div className="menu-arrow animated-arrow">
                    <FaChevronRight />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeMenu === 'email' && (
        <div 
          ref={menuRef} 
          className={`contact-menu email-menu ${isClosing ? 'closing' : ''} animated-menu ${isSmallScreen ? 'compact-menu' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Email form"
          style={isSmallScreen ? { maxHeight: `${viewportHeight - 100}px`, overflowY: 'auto' } : {}}
        >
          <div className="menu-header sticky-header">
            <button
              className="back-button hover-lift"
              onClick={handleBackClick}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loading || emailStatus === 'sending'}
              aria-label="Go back to main menu"
            >
              <FaChevronRight className="back-icon" />
              <span>Back</span>
            </button>
            <div className="header-content">
              <h4>Send Email</h4>
              <p>We'll get back to you soon</p>
              <div className="device-indicator">
                {deviceType === 'desktop' ? (
                  <span><FaDesktop /> Desktop Mode</span>
                ) : (
                  <span><FaMobileAlt /> Mobile Mode</span>
                )}
              </div>
            </div>
          </div>

          <div className="email-form-container" ref={emailFormRef}>
            {emailStatus === 'success' ? (
              <div className="email-success animated-success">
                <div className="success-icon">
                  <FaPaperPlane />
                </div>
                <h4>Email Ready!</h4>
                <p>Your email client will open shortly</p>
                <div className="success-message">
                  <p><strong>Subject:</strong> {emailForm.subject}</p>
                  <p><strong>To:</strong> {emailAddress}</p>
                </div>
              </div>
            ) : emailStatus === 'error' ? (
              <div className="email-error">
                <FaExclamationCircle />
                <h4>Oops!</h4>
                <p>Couldn't open email client. Try the copy option below.</p>
              </div>
            ) : (
              <>
                <div className="email-options">
                  <button
                    className="email-option quick-email hover-lift"
                    onClick={sendEmailDirectly}
                    disabled={emailStatus === 'sending'}
                  >
                    <div className="option-icon">
                      <FaPaperPlane />
                    </div>
                    <div className="option-content">
                      <strong>Quick Email</strong>
                      <span>Open email client directly</span>
                    </div>
                  </button>
                  
                  <div className="option-divider">
                    <span>OR</span>
                  </div>
                  
                  <div className="enhanced-email-section">
                    <h5>Enhanced Email</h5>
                    <p className="section-description">Fill the form below for a personalized email</p>
                    
                    <div className="form-group">
                      <label htmlFor="emailSubject">Subject *</label>
                      <input
                        type="text"
                        id="emailSubject"
                        name="subject"
                        value={emailForm.subject}
                        onChange={handleEmailFormChange}
                        placeholder="Email subject"
                        disabled={emailStatus === 'sending'}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="emailName">Your Name</label>
                        <input
                          type="text"
                          id="emailName"
                          name="name"
                          value={emailForm.name}
                          onChange={handleEmailFormChange}
                          placeholder="Optional"
                          disabled={emailStatus === 'sending'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailEmail">Your Email</label>
                        <input
                          type="email"
                          id="emailEmail"
                          name="email"
                          value={emailForm.email}
                          onChange={handleEmailFormChange}
                          placeholder="Optional"
                          disabled={emailStatus === 'sending'}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="emailPhone">Phone</label>
                        <input
                          type="tel"
                          id="emailPhone"
                          name="phone"
                          value={emailForm.phone}
                          onChange={handleEmailFormChange}
                          placeholder="Optional"
                          disabled={emailStatus === 'sending'}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="emailMessage">Message</label>
                      <textarea
                        id="emailMessage"
                        name="message"
                        value={emailForm.message}
                        onChange={handleEmailFormChange}
                        placeholder="Type your message here..."
                        rows={isSmallScreen ? 3 : 4}
                        disabled={emailStatus === 'sending'}
                      />
                      <div className="char-count">
                        {emailForm.message.length}/500
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="copy-email-btn hover-lift"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(emailAddress, 'email');
                    }}
                    disabled={emailStatus === 'sending'}
                  >
                    {copied === 'email' ? (
                      <>
                        <FaCheck /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Email
                      </>
                    )}
                  </button>
                  <button
                    className="send-email-btn hover-lift"
                    onClick={sendEnhancedEmail}
                    disabled={emailStatus === 'sending' || !emailForm.subject.trim()}
                  >
                    {emailStatus === 'sending' ? (
                      <>
                        <FaSpinner className="spinner" /> Preparing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Enhanced Email
                      </>
                    )}
                  </button>
                </div>

                <div className="email-preview">
                  <p className="preview-label">Preview:</p>
                  <div className="preview-content">
                    <p><strong>To:</strong> {emailAddress}</p>
                    <p><strong>Subject:</strong> {emailForm.subject}</p>
                    {emailForm.name && <p><strong>From:</strong> {emailForm.name}</p>}
                    {emailForm.message && (
                      <div className="message-preview">
                        <strong>Message:</strong>
                        <p>{emailForm.message.substring(0, 100)}{emailForm.message.length > 100 ? '...' : ''}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="email-tips">
                  <p><strong>💡 Tip:</strong> {deviceType === 'mobile' ? 'This will open your default email app' : 'This will open your email client'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="skeleton-overlay animated-fade" onClick={(e) => e.stopPropagation()}>
          <div className="skeleton-container animated-card">
            <div className="skeleton-header">
              <div className="skeleton-avatar shimmer"></div>
              <div className="skeleton-text">
                <div className="skeleton-line shimmer" style={{ width: '120px' }}></div>
                <div className="skeleton-line shimmer" style={{ width: '80px' }}></div>
              </div>
            </div>
            <div className="skeleton-body">
              <div className="skeleton-card shimmer"></div>
              <div className="skeleton-card shimmer"></div>
              <div className="skeleton-card shimmer"></div>
            </div>
          </div>
        </div>
      )}

      {copied && (
        <div ref={notificationRef} className="notification-toast animated-toast">
          <FaCheck />
          <span>Copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0,5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12) {
    return `+${cleaned.slice(0,2)} ${cleaned.slice(2,5)} ${cleaned.slice(5,8)} ${cleaned.slice(8)}`;
  }
  return phoneNumber;
}