// src/pages/Contact.jsx
import React, { useState } from 'react'
import './contact.css' // Ensure the CSS is imported

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Website (Informative)',
    budget: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(err => ({ ...err, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim()) err.email = 'Please enter your email'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email'
    if (!form.message.trim()) err.message = 'Tell us about the project'
    return err
  }

  // opens user's default mail client with prefilled subject & body
  function sendByMail(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }

    setSending(true)
    const subject = encodeURIComponent(`Inquiry: ${form.service} — ${form.company || 'No Company'}`)
    const bodyLines = [
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '-'}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget || '-'}`,
      '',
      `Message:`,
      form.message
    ]
    const body = encodeURIComponent(bodyLines.join('\n'))
    // mailto fallback (opens email client)
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
    // allow UI to show briefly that it was triggered
    setTimeout(() => setSending(false), 800)
  }

  // opens WhatsApp web / app with prefilled message
  function sendByWhatsapp() {
    const text = [
      `Hi Vertex Global Tech,`,
      `I am ${form.name || '—'}`,
      `Company: ${form.company || '—'}`,
      `Interested in: ${form.service}`,
      `Budget: ${form.budget || '—'}`,
      '',
      `Message: ${form.message || '—'}`,
      `Contact Email: ${form.email || '—'}`,
      `Phone: ${form.phone || '—'}`
    ].join(' ')
    const encoded = encodeURIComponent(text)
    // change number to your number in international format (without +)
    const phone = '919876543210'
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank')
  }

  return (
    <main className="contact-page py-5">
      <div className="container">

        {/* HERO */}
        <div className="row align-items-center mb-4">
          <div className="col-md-7">
            <h1 className="mb-2">Get in touch</h1>
            <p className="lead text-white">Tell us about your project — we’ll reply with a clear plan, timeline and estimate.</p>
          </div>

          <div className="col-md-5 text-md-end mt-3 mt-md-0">
            <a className="btn btn-outline-secondary me-2" href="mailto:hello@vertexglobaltech.com">Email: hello@vertexglobaltech.com</a>
            <a className="btn btn-outline-secondary" href="tel:+919876543210">Call: +91 98765 43210</a>
          </div>
        </div>

        <div className="row g-4">
          {/* FORM */}
          <div className="col-lg-7">
            <div className="card form-card p-4">
              <h4 className="mb-3">Start a conversation</h4>

              <form onSubmit={sendByMail} noValidate>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Your name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      placeholder="First & last name"
                      required
                    />
                    {errors.name && <div id="err-name" className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Company</label>
                    <input name="company" value={form.company} onChange={handleChange} className="form-control" placeholder="Company (optional)" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      placeholder="you@company.com"
                      required
                    />
                    {errors.email && <div id="err-email" className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="+91 98765 43210" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Service</label>
                    <select name="service" value={form.service} onChange={handleChange} className="form-select">
                      <option>Website (Informative)</option>
                      <option>Website (Dynamic / CMS)</option>
                      <option>Website (E-Commerce)</option>
                      <option>Application (Android / iOS)</option>
                      <option>UI / UX Design</option>
                      <option>Other / Consultation</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Estimated budget</label>
                    <input name="budget" value={form.budget} onChange={handleChange} className="form-control" placeholder="eg. ₹15k, ₹45k, Custom" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Project brief</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      rows="6"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                      placeholder="Short description, goals, timeline, anything important..."
                      required
                    />
                    {errors.message && <div id="err-message" className="invalid-feedback">{errors.message}</div>}
                  </div>

                  <div className="col-12 d-flex gap-2 align-items-center">
                    <button className="btn btn-primary" type="submit" disabled={sending}>
                      {sending ? 'Opening mail client…' : 'Send via Email'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={sendByWhatsapp}
                      title="Send via WhatsApp"
                    >
                      Send via WhatsApp
                    </button>

                    <small className="text-white">Prefer a call? <a href="tel:+919876543210">+91 98765 43210</a></small>
                  </div>

                </div>
              </form>
            </div>
          </div>

          {/* SIDEBAR CONTACT INFO */}
          <aside className="col-lg-5">
            <div className="card contact-card p-4 mb-4">
              <h5 className="mb-2">Contact details</h5>
              <p className="mb-1"><strong>Email:</strong> <a href="mailto:hello@vertexglobaltech.com">hello@vertexglobaltech.com</a></p>
              <p className="mb-1"><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
              <p className="mb-0"><strong>Location:</strong> Ahmedabad, Gujarat, India</p>

              <hr className="my-3" />

              <h6>Office hours</h6>
              <p className="text-white mb-0">Mon — Fri: 10:00 — 18:00 IST</p>
            </div>

            <div className="card map-card p-0">
              {/* lightweight map placeholder — replace with embed if you want */}
              <div className="map-placeholder d-flex align-items-center justify-content-center">
                <div>
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 6.08 7 13 7 13s7-6.92 7-13c0-3.86-3.14-7-7-7z" stroke="#0d6efd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.2" fill="#0dcaf0"/>
                  </svg>
                  <p className="mt-2 mb-0 text-white">Map (replace with Google Maps iframe or embed)</p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  )
}