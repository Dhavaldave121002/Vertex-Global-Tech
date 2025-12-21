// src/pages/Referral.jsx
import React, { useState, useEffect, useRef } from 'react'
import './referral.css'

export default function Referral() {
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}` : 'https://vertexglobaltech.com'
  const [isLoading, setIsLoading] = useState(true)
  
  // Form state - Simplified for client referrals only
  const [ref, setRef] = useState({ 
    referrerName: '', 
    referrerEmail: '', 
    referrerPhone: '',
    clientName: '', 
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    clientService: 'Website Development',
    estimatedBudget: '50000',
    timeline: 'Within 1 month',
    notes: ''
  })
  
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Shareable link
  const [creatorName, setCreatorName] = useState('')
  const [shareCode, setShareCode] = useState('')
  const [copied, setCopied] = useState(false)

  // Stats animation
  const [animatedStats, setAnimatedStats] = useState({
    weeklyPayouts: 0,
    activeReferrers: 0,
    clientsReferred: 0,
    totalEarned: 0
  })

  const formRef = useRef(null)

  useEffect(() => {
    document.title = "Client Referral Program | Vertex Global Tech"
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      startAnimations()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const startAnimations = () => {
    const targetStats = {
      weeklyPayouts: 42,
      activeReferrers: 156,
      clientsReferred: 89,
      totalEarned: 125000
    }

    Object.keys(targetStats).forEach((key, index) => {
      let start = 0
      const end = targetStats[key]
      const duration = 1500
      const startTime = Date.now()

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutQuart(progress)
        const current = Math.floor(end * eased)
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: current
        }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      setTimeout(animate, index * 200)
    })
  }

  const validateForm = () => {
    const e = {}
    if (!ref.referrerName.trim()) e.referrerName = 'Your name is required'
    if (!/^\S+@\S+\.\S+$/.test(ref.referrerEmail)) e.referrerEmail = 'Valid email required'
    if (!ref.referrerPhone.trim()) e.referrerPhone = 'Phone number is required'
    if (!ref.clientName.trim()) e.clientName = 'Client name is required'
    if (!/^\S+@\S+\.\S+$/.test(ref.clientEmail)) e.clientEmail = 'Valid client email required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const eobj = validateForm()
    if (Object.keys(eobj).length) { 
      setErrors(eobj)
      const firstErrorKey = Object.keys(eobj)[0]
      setTimeout(() => {
        const errorElement = document.querySelector(`[name="${firstErrorKey}"]`)
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          errorElement.focus()
        }
      }, 100)
      return 
    }
    
    setSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    setSubmitSuccess(true)
    setSubmitting(false)
    
    // Reset form after delay
    setTimeout(() => {
      setRef({ 
        referrerName: '', 
        referrerEmail: '', 
        referrerPhone: '',
        clientName: '', 
        clientEmail: '',
        clientPhone: '',
        clientCompany: '',
        clientService: 'Website Development',
        estimatedBudget: '50000',
        timeline: 'Within 1 month',
        notes: ''
      })
      setSubmitSuccess(false)
      setErrors({})
    }, 3000)
  }

  const generateShareCode = () => {
    if (!creatorName.trim()) {
      setErrors(prev => ({ ...prev, share: 'Please enter your name first' }))
      return
    }
    
    const name = creatorName.trim().toLowerCase().replace(/\s+/g, '-')
    const random = Math.random().toString(36).substring(2, 8)
    const timestamp = Date.now().toString(36)
    setShareCode(`VGT-${name}-${timestamp.slice(0, 4)}-${random}`.toUpperCase())
    setErrors(prev => ({ ...prev, share: '' }))
  }

  const copyLink = async () => {
    if (!shareCode) return
    const link = `${baseUrl}/refer?code=${shareCode}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareWhatsApp = () => {
    if (!shareCode) return
    const link = `${baseUrl}/refer?code=${shareCode}`
    const text = encodeURIComponent(
      `Earn ₹1000-1500 weekly by referring clients to Vertex Global Tech! 🚀\n\n` +
      `We build amazing websites & apps. Share your referral link:\n${link}\n\n` +
      `Payout every week for successful referrals! 💰`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Services we offer (for client referrals)
  const services = [
    { name: 'Website Development', payout: '₹1000', icon: '🌐', color: '#6366f1' },
    { name: 'E-commerce Store', payout: '₹1200', icon: '🛒', color: '#10b981' },
    { name: 'Mobile App Development', payout: '₹1500', icon: '📱', color: '#3b82f6' },
    { name: 'UI/UX Design', payout: '₹1000', icon: '🎨', color: '#8b5cf6' },
    { name: 'Web Application', payout: '₹1500', icon: '💻', color: '#06b6d4' },
    { name: 'Digital Marketing', payout: '₹1200', icon: '📈', color: '#ec4899' }
  ]

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="referral-page loading">
        <div className="skeleton-background"></div>
        
        <section className="skeleton-hero-section">
          <div className="container">
            <div className="skeleton-hero-content">
              <div className="skeleton-badge"></div>
              <div className="skeleton-title-line"></div>
              <div className="skeleton-subtitle-line"></div>
              <div className="skeleton-stats">
                {[1,2,3,4].map(i => <div key={i} className="skeleton-stat"></div>)}
              </div>
              <div className="skeleton-cta-buttons">
                <div className="skeleton-cta-btn"></div>
                <div className="skeleton-cta-btn"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="skeleton-main-section">
          <div className="container">
            <div className="skeleton-content-grid">
              <div className="skeleton-left">
                <div className="skeleton-card">
                  <div className="skeleton-card-header"></div>
                  <div className="skeleton-services-grid">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-service"></div>)}
                  </div>
                </div>
                <div className="skeleton-card">
                  <div className="skeleton-card-header"></div>
                  <div className="skeleton-faq-list">
                    {[1,2,3,4].map(i => <div key={i} className="skeleton-faq"></div>)}
                  </div>
                </div>
              </div>
              <div className="skeleton-right">
                <div className="skeleton-card">
                  <div className="skeleton-card-header"></div>
                  <div className="skeleton-form">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="skeleton-form-group">
                        <div className="skeleton-label"></div>
                        <div className="skeleton-input"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="loading-indicator">
          <div className="loading-progress"></div>
          <div className="loading-text">Loading Referral Program...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="referral-page">
      <div className="background-effects">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">💰</span>
              <span className="badge-text">EARN WEEKLY CASH</span>
            </div>
            
            <h1 className="hero-title">
              Refer Clients & Earn
              <span className="highlight">₹1000-1500 Weekly</span>
            </h1>
            
            <p className="hero-description">
              Get paid every week for referring clients to our services. 
              Simple process, guaranteed payouts, no limits on earnings.
            </p>
            
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-value">
                  <span className="count">{animatedStats.weeklyPayouts}</span>
                  <span className="suffix">+</span>
                </div>
                <div className="stat-label">Weekly Payouts</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-value">
                  <span className="count">{animatedStats.activeReferrers}</span>
                  <span className="suffix">+</span>
                </div>
                <div className="stat-label">Active Referrers</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-value">
                  <span className="count">{animatedStats.clientsReferred}</span>
                  <span className="suffix">+</span>
                </div>
                <div className="stat-label">Clients Referred</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💵</div>
                <div className="stat-value">
                  <span className="count">{animatedStats.totalEarned.toLocaleString()}</span>
                  <span className="suffix">+</span>
                </div>
                <div className="stat-label">Total Earned</div>
              </div>
            </div>
            
            <div className="hero-cta">
              <button className="cta-btn primary" onClick={scrollToForm}>
                <span className="btn-icon">🚀</span>
                Refer a Client Now
              </button>
              <button className="cta-btn secondary" onClick={() => window.scrollTo({ top: document.querySelector('.services-section').offsetTop, behavior: 'smooth' })}>
                <span className="btn-icon">💰</span>
                See Payout Rates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section">
        <div className="container">
          <div className="content-grid">
            {/* Left Column - Services & Payouts */}
            <div className="left-column">
              {/* Services & Payouts */}
              <div className="services-card">
                <div className="card-header">
                  <h3 className="card-title">Services & Weekly Payouts</h3>
                  <div className="card-icon">💸</div>
                </div>
                
                <p className="card-description">
                  Earn fixed weekly payouts for each successful client referral. 
                  Payouts are processed every Friday.
                </p>
                
                <div className="services-grid">
                  {services.map((service, index) => (
                    <div key={index} className="service-card" style={{ '--service-color': service.color }}>
                      <div className="service-icon-wrapper">
                        <span className="service-icon">{service.icon}</span>
                      </div>
                      <div className="service-info">
                        <div className="service-name">{service.name}</div>
                        <div className="service-payout">{service.payout} weekly</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="payout-info">
                  <div className="info-item">
                    <div className="info-icon">✅</div>
                    <div className="info-text">Payout every Friday</div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">✅</div>
                    <div className="info-text">No maximum limit</div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">✅</div>
                    <div className="info-text">Instant approval</div>
                  </div>
                  <div className="info-icon">✅</div>
                  <div className="info-text">Bank transfer/Paytm/UPI</div>
                </div>
              </div>

              {/* How It Works */}
              <div className="process-card">
                <div className="card-header">
                  <h3 className="card-title">How It Works</h3>
                  <div className="card-icon">⚡</div>
                </div>
                
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4 className="step-title">Refer a Client</h4>
                      <p className="step-description">Submit client details through our form</p>
                    </div>
                  </div>
                  
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4 className="step-title">We Connect</h4>
                      <p className="step-description">Our team contacts the client within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4 className="step-title">Project Starts</h4>
                      <p className="step-description">Client signs up for our services</p>
                    </div>
                  </div>
                  
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4 className="step-title">You Get Paid</h4>
                      <p className="step-description">Receive payout every Friday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="faq-card">
                <div className="card-header">
                  <h3 className="card-title">Frequently Asked Questions</h3>
                  <div className="card-icon">❓</div>
                </div>
                
                <div className="faq-list">
                  <details className="faq-item">
                    <summary className="faq-question">
                      When do I get paid?
                    </summary>
                    <div className="faq-answer">
                      Payouts are processed every Friday for all successful referrals from the previous week.
                    </div>
                  </details>
                  
                  <details className="faq-item">
                    <summary className="faq-question">
                      What qualifies as a successful referral?
                    </summary>
                    <div className="faq-answer">
                      A client who signs up for any of our paid services and makes the first payment.
                    </div>
                  </details>
                  
                  <details className="faq-item">
                    <summary className="faq-question">
                      How much can I earn?
                    </summary>
                    <div className="faq-answer">
                      ₹1000-1500 per client, depending on the service. No limit on how many clients you can refer.
                    </div>
                  </details>
                  
                  <details className="faq-item">
                    <summary className="faq-question">
                      How will I receive my payment?
                    </summary>
                    <div className="faq-answer">
                      Bank transfer, Paytm, Google Pay, PhonePe, or UPI - whichever you prefer.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Right Column - Referral Form & Share */}
            <div className="right-column" ref={formRef}>
              {/* Share Link Card */}
              <div className="share-card">
                <div className="card-header">
                  <h3 className="card-title">Your Referral Link</h3>
                  <div className="card-icon">🔗</div>
                </div>
                
                <div className="share-content">
                  <p className="card-description">
                    Share your unique link or generate a personalized code for tracking.
                  </p>
                  
                  <div className="name-input">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className={`form-input ${errors.share ? 'error' : ''}`}
                    />
                    {errors.share && (
                      <div className="error-message">
                        <span className="error-icon">!</span>
                        {errors.share}
                      </div>
                    )}
                  </div>
                  
                  <div className="share-actions">
                    <button 
                      className="action-btn primary"
                      onClick={generateShareCode}
                    >
                      <span className="btn-icon">✨</span>
                      Generate Link
                    </button>
                    
                    {shareCode && (
                      <div className="share-result">
                        <div className="share-link-container">
                          <input
                            type="text"
                            readOnly
                            value={`${baseUrl}/refer?code=${shareCode}`}
                            className="share-link-input"
                          />
                          <button 
                            className="copy-btn"
                            onClick={copyLink}
                          >
                            {copied ? '✅' : '📋'}
                          </button>
                        </div>
                        
                        <div className="share-buttons">
                          <button className="share-btn whatsapp" onClick={shareWhatsApp}>
                            <span className="btn-icon">💬</span>
                            Share on WhatsApp
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Referral Form */}
              <div className="form-card">
                <div className="card-header">
                  <h3 className="card-title">Refer a Client</h3>
                  <div className="card-icon">📝</div>
                </div>
                
                <div className="form-content">
                  {submitSuccess ? (
                    <div className="success-message">
                      <div className="success-icon">🎉</div>
                      <div className="success-content">
                        <h4>Referral Submitted!</h4>
                        <p>We'll contact you and the client within 24 hours.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      {/* Your Information */}
                      <div className="form-section">
                        <h4 className="section-title">
                          <span className="section-icon">👤</span>
                          Your Information
                        </h4>
                        
                        <div className="form-group">
                          <label className="form-label">Your Name *</label>
                          <input
                            type="text"
                            name="referrerName"
                            value={ref.referrerName}
                            onChange={(e) => setRef(r => ({ ...r, referrerName: e.target.value }))}
                            className={`form-input ${errors.referrerName ? 'error' : ''}`}
                            placeholder="Enter your full name"
                          />
                          {errors.referrerName && (
                            <div className="error-message">
                              <span className="error-icon">!</span>
                              {errors.referrerName}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Email *</label>
                            <input
                              type="email"
                              name="referrerEmail"
                              value={ref.referrerEmail}
                              onChange={(e) => setRef(r => ({ ...r, referrerEmail: e.target.value }))}
                              className={`form-input ${errors.referrerEmail ? 'error' : ''}`}
                              placeholder="your.email@example.com"
                            />
                            {errors.referrerEmail && (
                              <div className="error-message">
                                <span className="error-icon">!</span>
                                {errors.referrerEmail}
                              </div>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Phone *</label>
                            <input
                              type="tel"
                              name="referrerPhone"
                              value={ref.referrerPhone}
                              onChange={(e) => setRef(r => ({ ...r, referrerPhone: e.target.value }))}
                              className={`form-input ${errors.referrerPhone ? 'error' : ''}`}
                              placeholder="+91 98765 43210"
                            />
                            {errors.referrerPhone && (
                              <div className="error-message">
                                <span className="error-icon">!</span>
                                {errors.referrerPhone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Client Information */}
                      <div className="form-section">
                        <h4 className="section-title">
                          <span className="section-icon">🏢</span>
                          Client Information
                        </h4>
                        
                        <div className="form-group">
                          <label className="form-label">Client Name *</label>
                          <input
                            type="text"
                            name="clientName"
                            value={ref.clientName}
                            onChange={(e) => setRef(r => ({ ...r, clientName: e.target.value }))}
                            className={`form-input ${errors.clientName ? 'error' : ''}`}
                            placeholder="Client's full name"
                          />
                          {errors.clientName && (
                            <div className="error-message">
                              <span className="error-icon">!</span>
                              {errors.clientName}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Client Email *</label>
                            <input
                              type="email"
                              name="clientEmail"
                              value={ref.clientEmail}
                              onChange={(e) => setRef(r => ({ ...r, clientEmail: e.target.value }))}
                              className={`form-input ${errors.clientEmail ? 'error' : ''}`}
                              placeholder="client@company.com"
                            />
                            {errors.clientEmail && (
                              <div className="error-message">
                                <span className="error-icon">!</span>
                                {errors.clientEmail}
                            </div>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Client Phone</label>
                            <input
                              type="tel"
                              name="clientPhone"
                              value={ref.clientPhone}
                              onChange={(e) => setRef(r => ({ ...r, clientPhone: e.target.value }))}
                              className="form-input"
                              placeholder="Client's phone number"
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            name="clientCompany"
                            value={ref.clientCompany}
                            onChange={(e) => setRef(r => ({ ...r, clientCompany: e.target.value }))}
                            className="form-input"
                            placeholder="Client's company name"
                          />
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="form-section">
                        <h4 className="section-title">
                          <span className="section-icon">🎯</span>
                          Service Details
                        </h4>
                        
                        <div className="form-group">
                          <label className="form-label">Service Needed</label>
                          <select
                            name="clientService"
                            value={ref.clientService}
                            onChange={(e) => setRef(r => ({ ...r, clientService: e.target.value }))}
                            className="form-select"
                          >
                            <option value="Website Development">Website Development</option>
                            <option value="E-commerce Store">E-commerce Store</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Web Application">Web Application</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Estimated Budget (₹)</label>
                          <select
                            name="estimatedBudget"
                            value={ref.estimatedBudget}
                            onChange={(e) => setRef(r => ({ ...r, estimatedBudget: e.target.value }))}
                            className="form-select"
                          >
                            <option value="50000">₹50,000 - ₹1,00,000</option>
                            <option value="150000">₹1,00,000 - ₹2,50,000</option>
                            <option value="350000">₹2,50,000 - ₹5,00,000</option>
                            <option value="750000">₹5,00,000+</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Timeline</label>
                          <select
                            name="timeline"
                            value={ref.timeline}
                            onChange={(e) => setRef(r => ({ ...r, timeline: e.target.value }))}
                            className="form-select"
                          >
                            <option value="Within 1 month">Within 1 month</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="Not sure">Not sure</option>
                          </select>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div className="form-section">
                        <div className="form-group">
                          <label className="form-label">Additional Notes</label>
                          <textarea
                            name="notes"
                            value={ref.notes}
                            onChange={(e) => setRef(r => ({ ...r, notes: e.target.value }))}
                            className="form-textarea"
                            placeholder="Any additional information about the client or project..."
                            rows="3"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="submit-btn primary"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <span className="btn-icon">🚀</span>
                              Submit Referral
                            </>
                          )}
                        </button>
                        <p className="form-note">
                          By submitting, you agree to our referral terms. Payout: ₹1000-1500 weekly.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Payout Schedule */}
              <div className="payout-card">
                <div className="card-header">
                  <h3 className="card-title">Payout Schedule</h3>
                  <div className="card-icon">📅</div>
                </div>
                
                <div className="payout-schedule">
                  <div className="schedule-item">
                    <div className="day">Monday - Thursday</div>
                    <div className="description">Referrals tracked</div>
                  </div>
                  <div className="schedule-item">
                    <div className="day">Friday</div>
                    <div className="description">Weekly payouts processed</div>
                  </div>
                  <div className="schedule-item">
                    <div className="day">Within 24 hours</div>
                    <div className="description">Payment received</div>
                  </div>
                </div>
                
                <div className="payout-methods">
                  <div className="method">🏦 Bank Transfer</div>
                  <div className="method">💳 Paytm</div>
                  <div className="method">📱 Google Pay</div>
                  <div className="method">💸 PhonePe</div>
                  <div className="method">💰 UPI</div>
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
            <h2 className="cta-title">Start Earning Today!</h2>
            <p className="cta-description">
              Refer your first client and get your first payout this Friday.
            </p>
            <button className="cta-btn primary" onClick={scrollToForm}>
              <span className="btn-icon">💰</span>
              Refer a Client Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}