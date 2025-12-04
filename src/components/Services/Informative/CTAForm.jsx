// src/components/Services/Informative/CTAForm.jsx
import React, { useState } from 'react'

export default function CTAForm() {
  const [quote, setQuote] = useState({ name: '', email: '', website: '', message: '' })
  const [errors, setErrors] = useState({})

  function change(e) {
    const { name, value } = e.target
    setQuote(q => ({ ...q, [name]: value }))
    setErrors(err => ({ ...err, [name]: undefined }))
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = {}
    if (!quote.name.trim()) err.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(quote.email)) err.email = 'Enter a valid email'
    if (!quote.message.trim()) err.message = 'Give a short brief'
    if (Object.keys(err).length) { setErrors(err); return }
    const subject = encodeURIComponent('Website Inquiry — Informative Website')
    const body = encodeURIComponent(`Name: ${quote.name}\nEmail: ${quote.email}\nWebsite: ${quote.website}\n\nMessage:\n${quote.message}`)
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="cta-card p-4 rounded-3 text-center">
          <h4>Ready to start?</h4>
          <p className="text-muted mb-3">Tell us a few details and we’ll send a tailored quote.</p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="row g-2" onSubmit={sendQuote} noValidate>
                <div className="col-md-4">
                  <input name="name" value={quote.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your name" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-4">
                  <input name="email" value={quote.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-4">
                  <input name="website" value={quote.website} onChange={change} className="form-control" placeholder="Your website (optional)" />
                </div>

                <div className="col-12">
                  <textarea name="message" value={quote.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="3" placeholder="Short brief (goals, pages, deadline)"></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <div className="col-12 mt-2">
                  <button className="btn btn-primary btn-lg">Request Quote</button>
                  <a className="btn btn-outline-light ms-2" href="/contact">Contact Support</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
