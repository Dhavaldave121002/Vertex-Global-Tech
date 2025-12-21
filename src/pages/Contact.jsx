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
  
  const formRef = useRef(null);
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  
  // Text for creative animation
  const heroTexts = [
    { text: "Digital Solutions", color: "#6366f1" },
    { text: "Creative Projects", color: "#10b981" },
    { text: "Business Growth", color: "#3b82f6" },
    { text: "Innovative Ideas", color: "#f59e0b" }
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Services data
  const services = [
    { 
      name: 'Website Development', 
      icon: '🌐', 
      desc: 'Responsive & Fast Websites', 
      color: '#6366f1',
      details: 'Custom websites with modern frameworks, SEO optimization, and high performance.'
    },
    { 
      name: 'E-Commerce Platform', 
      icon: '🛒', 
      desc: 'Shopify/WooCommerce Solutions', 
      color: '#10b981',
      details: 'Complete e-commerce solutions with payment integration and inventory management.'
    },
    { 
      name: 'Mobile Application', 
      icon: '📱', 
      desc: 'iOS & Android Apps', 
      color: '#3b82f6',
      details: 'Native and cross-platform mobile apps with intuitive UX and robust backend.'
    },
    { 
      name: 'UI/UX Design', 
      icon: '🎨', 
      desc: 'User Experience Design', 
      color: '#8b5cf6',
      details: 'User-centered design with wireframing, prototyping, and usability testing.'
    },
    { 
      name: 'Brand Identity', 
      icon: '🏷️', 
      desc: 'Logo & Branding', 
      color: '#f59e0b',
      details: 'Complete brand identity including logo, style guides, and brand strategy.'
    },
    { 
      name: 'Digital Marketing', 
      icon: '📈', 
      desc: 'SEO & Social Media', 
      color: '#ec4899',
      details: 'Comprehensive digital marketing strategies for maximum online presence.'
    },
    { 
      name: 'Web Application', 
      icon: '💻', 
      desc: 'Custom Solutions', 
      color: '#06b6d4',
      details: 'Scalable web applications with modern architecture and cloud integration.'
    },
    { 
      name: 'Consultation', 
      icon: '💬', 
      desc: 'Strategy & Planning', 
      color: '#84cc16',
      details: 'Expert consultation for digital transformation and technology roadmaps.'
    }
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
    { value: 24, label: 'Hour Response', suffix: 'h', icon: '⏰' },
    { value: 150, label: 'Projects Delivered', suffix: '+', icon: '🚀' },
    { value: 98, label: 'Client Satisfaction', suffix: '%', icon: '⭐' },
    { value: 5, label: 'Years Experience', suffix: '+', icon: '📅' }
  ];

  useEffect(() => {
    // Set page title
    document.title = "Contact | Vertex Global Tech";
    
    // Prevent body scroll issues
    document.body.style.overflowX = 'hidden';
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Start animations after loading
      setTimeout(() => {
        startCountingAnimation();
        startTextRotation();
        createBackgroundEffects();
      }, 300);
    }, 1200);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflowX = '';
    };
  }, []);

  // Text rotation effect
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const startCountingAnimation = () => {
    targetStats.forEach((target, index) => {
      let start = 0;
      const end = target.value;
      const duration = 2000;
      const startTime = Date.now();
      
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.floor(end * eased);
        
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = current;
          return newStats;
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    });
  };

  const startTextRotation = () => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('loaded');
      }, index * 100);
    });
  };

  const createBackgroundEffects = () => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear existing dots
    const existingDots = container.querySelectorAll('.floating-dot');
    existingDots.forEach(dot => dot.remove());
    
    // Create floating dots
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement('div');
      dot.className = 'floating-dot';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 15 + Math.random() * 15;
      const delay = Math.random() * 5;
      
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background: ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(139, 92, 246, 0.2)'};
      `;
      
      container.appendChild(dot);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      newErrors.name = 'Full name is required';
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
      newErrors.message = 'Project details are required';
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
      const inputElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (inputElement) {
        inputElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        inputElement.focus();
      }
      
      return;
    }

    setSending(true);
    
    // Add loading animation
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.classList.add('loading');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Success state
    setFormSubmitted(true);
    setSending(false);
    
    if (submitBtn) {
      submitBtn.classList.remove('loading');
    }
    
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
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Loading Skeleton - Professional Design
  if (isLoading) {
    return (
      <div className="contact-page loading">
        {/* Background */}
        <div className="skeleton-background"></div>
        
        {/* Hero Section Skeleton */}
        <section className="skeleton-hero-section">
          <div className="container">
            <div className="skeleton-hero-content">
              <div className="skeleton-badge"></div>
              <div className="skeleton-title-container">
                <div className="skeleton-title-line"></div>
                <div className="skeleton-title-line short"></div>
              </div>
              <div className="skeleton-description">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
              
              <div className="skeleton-stats-grid">
                {[1,2,3,4].map(i => (
                  <div key={i} className="skeleton-stat-card">
                    <div className="skeleton-stat-icon"></div>
                    <div className="skeleton-stat-value"></div>
                    <div className="skeleton-stat-label"></div>
                  </div>
                ))}
              </div>
              
              <div className="skeleton-cta-buttons">
                <div className="skeleton-cta-btn primary"></div>
                <div className="skeleton-cta-btn secondary"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Form Section Skeleton */}
        <section className="skeleton-form-section">
          <div className="container">
            <div className="skeleton-section-header">
              <div className="skeleton-section-badge"></div>
              <div className="skeleton-section-title"></div>
              <div className="skeleton-section-subtitle"></div>
            </div>
            
            <div className="skeleton-content-grid">
              <div className="skeleton-form-wrapper">
                <div className="skeleton-form">
                  <div className="skeleton-form-group">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-input"></div>
                  </div>
                  <div className="skeleton-form-group">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-input"></div>
                  </div>
                  <div className="skeleton-form-group">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-input"></div>
                  </div>
                  <div className="skeleton-form-group">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-input"></div>
                  </div>
                  
                  <div className="skeleton-services-section">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-services-grid">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="skeleton-service-option"></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="skeleton-budget-section">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-slider"></div>
                  </div>
                  
                  <div className="skeleton-message-section">
                    <div className="skeleton-label"></div>
                    <div className="skeleton-textarea"></div>
                  </div>
                  
                  <div className="skeleton-submit-btn"></div>
                </div>
              </div>
              
              <div className="skeleton-sidebar">
                <div className="skeleton-contact-card">
                  <div className="skeleton-card-header">
                    <div className="skeleton-card-title"></div>
                  </div>
                  <div className="skeleton-contact-info">
                    <div className="skeleton-contact-item"></div>
                    <div className="skeleton-contact-item"></div>
                    <div className="skeleton-contact-item"></div>
                  </div>
                </div>
                
                <div className="skeleton-social-card">
                  <div className="skeleton-card-title"></div>
                  <div className="skeleton-social-icons">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="skeleton-social-icon"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Loading Indicator */}
        <div className="loading-indicator">
          <div className="loading-progress">
            <div className="progress-fill"></div>
          </div>
          <div className="loading-text">Loading Experience...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page" ref={containerRef}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>
      
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-on-load">
              <div className="hero-badge">
                <span className="badge-icon">✨</span>
                <span className="badge-text">Let's Build Together</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line">Create Amazing</span>
                <div className="animated-text-container">
                  <div className="animated-text-wrapper">
                    {heroTexts.map((text, index) => (
                      <span
                        key={index}
                        className={`animated-text ${index === currentTextIndex ? 'active' : ''}`}
                        style={{ color: text.color }}
                      >
                        {text.text}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="title-line">Digital Experiences</span>
              </h1>
              
              <p className="hero-description animate-on-load">
                Transform your vision into reality with our expert team. We craft digital 
                solutions that drive growth, engagement, and exceptional results.
              </p>
              
              <div className="hero-stats animate-on-load">
                {animatedStats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon">{targetStats[index].icon}</div>
                    <div className="stat-value">
                      <span className="count">{stat}</span>
                      <span className="suffix">{targetStats[index].suffix}</span>
                    </div>
                    <div className="stat-label">{targetStats[index].label}</div>
                  </div>
                ))}
              </div>
              
              <div className="hero-cta animate-on-load">
                <button className="cta-btn primary" onClick={scrollToForm}>
                  <span className="btn-icon">🚀</span>
                  Start Your Project
                </button>
                <a href="tel:+919876543210" className="cta-btn secondary">
                  <span className="btn-icon">📞</span>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
          <span className="scroll-text">Scroll to Explore</span>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section" ref={formRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">01</div>
            <h2 className="section-title">Project Inquiry</h2>
            <p className="section-subtitle">
              Share your project details and we'll craft the perfect solution for you
            </p>
          </div>
          
          <div className="contact-content">
            {/* Main Form */}
            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  <div className="form-grid">
                    {/* Name */}
                    <div className={`form-group ${activeInput === 'name' ? 'active' : ''}`}>
                      <label className="form-label">
                        <span className="label-icon">👤</span>
                        Full Name *
                      </label>
                      <input
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
                        <div className="error-message">
                          <span className="error-icon">!</span>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    
                    {/* Email */}
                    <div className={`form-group ${activeInput === 'email' ? 'active' : ''}`}>
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
                        <div className="error-message">
                          <span className="error-icon">!</span>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    
                    {/* Company */}
                    <div className={`form-group ${activeInput === 'company' ? 'active' : ''}`}>
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
                    
                    {/* Phone */}
                    <div className={`form-group ${activeInput === 'phone' ? 'active' : ''}`}>
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
                        <div className="error-message">
                          <span className="error-icon">!</span>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Service Selection */}
                <div className="form-section">
                  <h3 className="form-section-title">Service Requirements</h3>
                  <div className="services-container">
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
                          <div className="service-card">
                            <div className="service-icon-wrapper">
                              <span className="service-icon">{service.icon}</span>
                            </div>
                            <div className="service-info">
                              <div className="service-name">{service.name}</div>
                              <div className="service-desc">{service.desc}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="service-tooltip">
                      Currently selected: <strong>{form.service}</strong>
                    </div>
                  </div>
                </div>
                
                {/* Budget & Timeline */}
                <div className="form-section">
                  <h3 className="form-section-title">Project Specifications</h3>
                  <div className="specs-grid">
                    {/* Budget */}
                    <div className="spec-item">
                      <label className="spec-label">
                        <span className="label-icon">💰</span>
                        Estimated Budget
                      </label>
                      <div className="budget-slider-container">
                        <div className="budget-display">
                          ₹{parseInt(form.budget).toLocaleString('en-IN')}
                        </div>
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
                        <div className="budget-scale">
                          <span>50K</span>
                          <span>500K</span>
                          <span>1M+</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Urgency */}
                    <div className="spec-item">
                      <label className="spec-label">
                        <span className="label-icon">⏱️</span>
                        Project Urgency
                      </label>
                      <div className="urgency-options">
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
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="form-section">
                  <h3 className="form-section-title">Project Details</h3>
                  <div className={`form-group ${activeInput === 'message' ? 'active' : ''}`}>
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
                      maxLength="2000"
                      required
                    ></textarea>
                    <div className="textarea-footer">
                      <div className="char-count">
                        {form.message.length}/2000 characters
                      </div>
                      {errors.message && (
                        <div className="error-message">
                          <span className="error-icon">!</span>
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="form-actions">
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
                        <span className="btn-icon">🚀</span>
                        Send Project Brief
                      </>
                    )}
                  </button>
                  
                  <div className="alt-actions">
                    <span className="alt-divider">or contact us directly</span>
                    <div className="alt-buttons">
                      <button
                        type="button"
                        className="alt-btn whatsapp"
                        onClick={openWhatsApp}
                      >
                        <span className="btn-icon">💬</span>
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        className="alt-btn schedule"
                        onClick={scheduleCall}
                      >
                        <span className="btn-icon">📅</span>
                        Schedule Call
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Success Message */}
              {formSubmitted && (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <div className="success-content">
                    <h3>Project Submitted Successfully!</h3>
                    <p>We've received your inquiry and will contact you within 24 hours.</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="contact-sidebar">
              {/* Contact Info Card */}
              <div className="info-card">
                <div className="card-header">
                  <h3 className="card-title">Contact Information</h3>
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
                  <h4 className="hours-title">Working Hours</h4>
                  <div className="hours-grid">
                    <div className="hours-day">Monday - Friday</div>
                    <div className="hours-time">10:00 - 18:00 IST</div>
                    <div className="hours-day">Saturday</div>
                    <div className="hours-time">10:00 - 14:00 IST</div>
                    <div className="hours-day">Sunday</div>
                    <div className="hours-time">Closed</div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="social-card">
                <h3 className="card-title">Connect With Us</h3>
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
              
              {/* Why Choose Us */}
              <div className="benefits-card">
                <h3 className="card-title">Why Choose Us</h3>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon">⚡</div>
                    <div className="benefit-text">Fast Delivery</div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💎</div>
                    <div className="benefit-text">Premium Quality</div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🛡️</div>
                    <div className="benefit-text">Secure & Reliable</div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🤝</div>
                    <div className="benefit-text">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Get Started</div>
            <h2 className="cta-title">Ready to Begin Your Project?</h2>
            <p className="cta-subtitle">
              Let's create something amazing together. Contact us today for a free consultation.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={scrollToForm}>
                <span className="cta-icon">🚀</span>
                Start Your Project
              </button>
              <a href="mailto:hello@vertexglobaltech.com" className="cta-btn secondary">
                <span className="cta-icon">📧</span>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;