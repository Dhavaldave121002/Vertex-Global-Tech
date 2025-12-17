import React, { useState, useEffect, useRef } from 'react';
import './contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '250000',
    urgency: 'Normal',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [typingText, setTypingText] = useState('');
  
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  // Text for typing animation
  const texts = ['Extraordinary', 'Amazing', 'Innovative', 'Successful'];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Services data
  const services = [
    { name: 'Website Development', icon: '🌐', desc: 'Responsive & Fast', color: '#6366f1' },
    { name: 'E-Commerce Platform', icon: '🛒', desc: 'Shopify/WooCommerce', color: '#10b981' },
    { name: 'Mobile Application', icon: '📱', desc: 'iOS & Android', color: '#3b82f6' },
    { name: 'UI/UX Design', icon: '🎨', desc: 'User Experience', color: '#8b5cf6' },
    { name: 'Brand Identity', icon: '🏷️', desc: 'Logo & Branding', color: '#f59e0b' },
    { name: 'Digital Marketing', icon: '📈', desc: 'SEO & Social Media', color: '#ec4899' },
    { name: 'Web Application', icon: '💻', desc: 'Custom Solutions', color: '#06b6d4' },
    { name: 'Consultation', icon: '💬', desc: 'Strategy & Planning', color: '#84cc16' }
  ];
  
  // Social links
  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: '💼', color: '#0077B5' },
    { name: 'Twitter', url: '#', icon: '🐦', color: '#1DA1F2' },
    { name: 'GitHub', url: '#', icon: '💻', color: '#181717' },
    { name: 'Instagram', url: '#', icon: '📷', color: '#E4405F' },
    { name: 'Dribbble', url: '#', icon: '🏀', color: '#EA4C89' },
    { name: 'Behance', url: '#', icon: '🎨', color: '#1769FF' }
  ];
  
  // Target values for counting animation
  const targetStats = [
    { value: 24, label: 'Hour Response', suffix: 'h' },
    { value: 150, label: 'Projects Delivered', suffix: '+' },
    { value: 98, label: 'Client Satisfaction', suffix: '%' },
    { value: 5, label: 'Years Experience', suffix: '+' }
  ];

  useEffect(() => {
    // Set page title
    document.title = "Contact | Vertex Global Tech - Digital Excellence";
    
    // Simulate loading with timeout
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Start animations after loading
      setTimeout(() => {
        // Start typing animation
        startTypingAnimation();
        
        // Start counting animation
        startCountingAnimation();
        
        // Auto-scroll to form after skeleton disappears
        if (formRef.current) {
          setTimeout(() => {
            formRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Focus on name input with delay
            setTimeout(() => {
              if (nameInputRef.current) {
                nameInputRef.current.focus();
                nameInputRef.current.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center',
                  inline: 'center'
                });
              }
            }, 300);
          }, 100);
        }
      }, 500);
    }, 1800);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (isLoading) return;
    
    const currentText = texts[textIndex];
    const speed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setTypingText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, isLoading]);

  const startTypingAnimation = () => {
    setCharIndex(0);
    setIsDeleting(false);
    setTextIndex(0);
  };

  const startCountingAnimation = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    targetStats.forEach((target, index) => {
      let current = 0;
      const increment = target.value / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target.value) {
          current = target.value;
          clearInterval(timer);
        }
        
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, stepDuration);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFocus = (fieldName) => {
    setActiveInput(fieldName);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (form.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    } else if (form.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (minimum 20 characters)';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`.error-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    setSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success animation
    setFormSubmitted(true);
    setSending(false);
    
    // Prepare email data
    const emailData = {
      subject: `Project Inquiry: ${form.service} - ${form.company || form.name}`,
      body: `
Project Inquiry Details:

👤 Contact Information:
• Name: ${form.name}
• Company: ${form.company || 'N/A'}
• Email: ${form.email}
• Phone: ${form.phone || 'N/A'}
• Service: ${form.service}
• Budget: ₹${parseInt(form.budget).toLocaleString('en-IN')}
• Urgency: ${form.urgency}

📋 Project Brief:
${form.message}

📅 Preferred Timeline: ${form.urgency === 'Urgent' ? 'ASAP' : 'Flexible'}

Best regards,
${form.name}
${form.company ? `From ${form.company}` : ''}
      `.trim()
    };
    
    // Open email client
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    
    // Reset form after delay
    setTimeout(() => {
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Website Development',
        budget: '250000',
        urgency: 'Normal',
        message: ''
      });
      setFormSubmitted(false);
    }, 4000);
  };

  const openWhatsApp = () => {
    const message = `
*New Project Inquiry from ${form.name}*

📋 *Project Details:*
• Service: ${form.service}
• Company: ${form.company || 'N/A'}
• Budget: ₹${parseInt(form.budget).toLocaleString('en-IN')}
• Urgency: ${form.urgency}

💬 *Message:*
${form.message}

📞 *Contact Info:*
• Email: ${form.email}
• Phone: ${form.phone || 'N/A'}

_Sent via Vertex Global Tech Website_
    `.trim();
    
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scheduleCall = () => {
    window.open('https://calendly.com/vertexglobal/consultation', '_blank', 'width=700,height=600');
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 300);
    }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="contact-page">
        <div className="skeleton-overlay">
          <div className="skeleton-hero">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line subtitle"></div>
            <div className="skeleton-line short"></div>
          </div>
          
          <div className="skeleton-content">
            <div className="skeleton-form">
              <div className="skeleton-line"></div>
              <div className="skeleton-grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="skeleton-input"></div>
                ))}
              </div>
            </div>
            
            <div className="skeleton-sidebar">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
        <div className="bg-circle-4"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${i * 0.2}s`,
            '--size': `${Math.random() * 4 + 2}px`,
            '--x': `${Math.random() * 100}vw`,
            '--y': `${Math.random() * 100}vh`
          }}></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="badge animate-badge">
                <span className="badge-icon">🚀</span>
                <span className="badge-text">Ready to Launch?</span>
              </div>
              
              <h1 className="hero-title animate-title">
                Let's Build Something 
                <span className="typing-container">
                  <span className="typing-text">{typingText}</span>
                  <span className="cursor">|</span>
                </span>
              </h1>
              
              <p className="hero-subtitle animate-subtitle">
                Transform your ideas into digital excellence with our expert team. 
                We craft solutions that drive results and exceed expectations.
              </p>
              
              <div className="hero-stats animate-stats" ref={statsRef}>
                {animatedStats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-value">
                      <span className="count">{stat}</span>
                      <span className="suffix">{targetStats[index].suffix}</span>
                    </div>
                    <div className="stat-label">{targetStats[index].label}</div>
                  </div>
                ))}
              </div>
              
              <div className="hero-actions animate-actions">
                <button className="btn-primary" onClick={scrollToForm}>
                  <span className="btn-icon">📝</span>
                  Start Your Project
                </button>
                <a href="tel:+919876543210" className="btn-secondary">
                  <span className="btn-icon">📞</span>
                  Call Now
                </a>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="floating-card">
                <div className="card-icon">💡</div>
                <h3>Innovation Starts Here</h3>
                <p>Your vision + Our expertise = Success</p>
                <div className="sparkle"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="contact-section" ref={formRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">01</div>
            <h2 className="section-title">Project Inquiry</h2>
            <p className="section-subtitle">
              Complete the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <div className="contact-grid">
            {/* Main Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  {/* Name */}
                  <div className={`form-group ${activeInput === 'name' ? 'active' : ''} animate-input`}>
                    <label className="form-label">
                      <span className="label-icon">👤</span>
                      Full Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && (
                      <div className="error-message error-name">
                        <span className="error-icon">⚠️</span>
                        {errors.name}
                      </div>
                    )}
                  </div>
                  
                  {/* Company */}
                  <div className={`form-group ${activeInput === 'company' ? 'active' : ''} animate-input`}>
                    <label className="form-label">
                      <span className="label-icon">🏢</span>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={handleBlur}
                      className="form-input"
                      placeholder="Your company (optional)"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className={`form-group ${activeInput === 'email' ? 'active' : ''} animate-input`}>
                    <label className="form-label">
                      <span className="label-icon">📧</span>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your.email@company.com"
                      required
                    />
                    {errors.email && (
                      <div className="error-message error-email">
                        <span className="error-icon">⚠️</span>
                        {errors.email}
                      </div>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div className={`form-group ${activeInput === 'phone' ? 'active' : ''} animate-input`}>
                    <label className="form-label">
                      <span className="label-icon">📱</span>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <div className="error-message error-phone">
                        <span className="error-icon">⚠️</span>
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  
                  {/* Service Selection */}
                  <div className="form-group full-width animate-input">
                    <label className="form-label">
                      <span className="label-icon">🎯</span>
                      Service Needed *
                    </label>
                    <div className="services-grid">
                      {services.map((service, index) => (
                        <label
                          key={index}
                          className={`service-option ${form.service === service.name ? 'selected' : ''}`}
                          style={{ '--service-color': service.color }}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.name}
                            checked={form.service === service.name}
                            onChange={handleChange}
                            className="visually-hidden"
                          />
                          <div className="service-content">
                            <span className="service-icon">{service.icon}</span>
                            <div className="service-info">
                              <div className="service-name">{service.name}</div>
                              <div className="service-desc">{service.desc}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Budget */}
                  <div className="form-group full-width animate-input">
                    <label className="form-label">
                      <span className="label-icon">💰</span>
                      Estimated Budget
                    </label>
                    <div className="budget-container">
                      <input
                        type="range"
                        name="budget"
                        min="50000"
                        max="1000000"
                        step="50000"
                        value={form.budget}
                        onChange={handleChange}
                        className="budget-slider"
                      />
                      <div className="budget-display">
                        <div className="budget-value">
                          ₹{parseInt(form.budget).toLocaleString('en-IN')}
                        </div>
                        <div className="budget-scale">
                          <span>50K</span>
                          <span>250K</span>
                          <span>500K</span>
                          <span>1M+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Urgency */}
                  <div className="form-group full-width animate-input">
                    <label className="form-label">
                      <span className="label-icon">⏱️</span>
                      Project Urgency
                    </label>
                    <div className="urgency-grid">
                      {['Relaxed', 'Normal', 'Urgent', 'ASAP'].map((level) => (
                        <label
                          key={level}
                          className={`urgency-option ${form.urgency === level ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level}
                            checked={form.urgency === level}
                            onChange={handleChange}
                            className="visually-hidden"
                          />
                          <span className="urgency-label">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="form-group full-width animate-input">
                    <label className="form-label">
                      <span className="label-icon">📝</span>
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Tell us about your project goals, requirements, timeline, and any specific needs..."
                      rows="5"
                      maxLength="500"
                      required
                    ></textarea>
                    <div className="textarea-footer">
                      <div className="char-count">
                        {form.message.length}/500 characters
                      </div>
                      {errors.message && (
                        <div className="error-message error-message-text">
                          <span className="error-icon">⚠️</span>
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="form-actions animate-actions">
                  <button
                    type="submit"
                    className={`submit-btn ${sending ? 'sending' : ''}`}
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">✈️</span>
                        Send Project Brief
                      </>
                    )}
                  </button>
                  
                  <div className="alternative-actions">
                    <button
                      type="button"
                      className="whatsapp-btn"
                      onClick={openWhatsApp}
                    >
                      <span className="btn-icon">💬</span>
                      WhatsApp
                    </button>
                    
                    <button
                      type="button"
                      className="schedule-btn"
                      onClick={scheduleCall}
                    >
                      <span className="btn-icon">📅</span>
                      Schedule Call
                    </button>
                  </div>
                </div>
              </form>
              
              {/* Success Message */}
              {formSubmitted && (
                <div className="success-message animate-success">
                  <div className="success-icon">🎉</div>
                  <div className="success-content">
                    <h3>Message Sent Successfully!</h3>
                    <p>We've received your inquiry and will contact you within 24 hours.</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="contact-sidebar">
              {/* Contact Info Card */}
              <div className="info-card animate-card">
                <div className="card-header">
                  <h3>Contact Information</h3>
                  <div className="card-icon">📇</div>
                </div>
                
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">📧</div>
                    <div className="info-content">
                      <div className="info-label">Email</div>
                      <a href="mailto:hello@vertexglobaltech.com" className="info-value">
                        hello@vertexglobaltech.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <div className="info-label">Phone</div>
                      <a href="tel:+919876543210" className="info-value">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div className="info-content">
                      <div className="info-label">Location</div>
                      <div className="info-value">Ahmedabad, Gujarat</div>
                      <div className="info-note">Remote & Worldwide</div>
                    </div>
                  </div>
                </div>
                
                <div className="working-hours">
                  <h4>Working Hours</h4>
                  <div className="hours-grid">
                    <div>Monday - Friday</div>
                    <div>10:00 - 18:00 IST</div>
                    <div>Saturday</div>
                    <div>10:00 - 14:00 IST</div>
                    <div>Sunday</div>
                    <div>Closed</div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="social-card animate-card">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': social.color }}
                      title={social.name}
                    >
                      <span className="social-icon">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="stats-card animate-card">
                <h3>Why Choose Us</h3>
                <div className="quick-stats">
                  <div className="quick-stat">
                    <div className="stat-icon">🚀</div>
                    <div className="stat-text">Fast Delivery</div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">💎</div>
                    <div className="stat-text">Premium Quality</div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">🛡️</div>
                    <div className="stat-text">Secure & Reliable</div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">🤝</div>
                    <div className="stat-text">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Get Started</div>
            <h2 className="cta-title">Ready to Transform Your Vision?</h2>
            <p className="cta-subtitle">
              Let's create something amazing together. Contact us today for a free consultation.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={scrollToForm}>
                <span className="cta-icon">🚀</span>
                Start Your Project
              </button>
              <a href="tel:+919876543210" className="cta-btn secondary">
                <span className="cta-icon">📞</span>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;