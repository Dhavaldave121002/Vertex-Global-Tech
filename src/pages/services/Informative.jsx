// src/pages/services/Informative.jsx
import React, { useState } from 'react'
import './informative.css'

const PORTFOLIO = [
  { id: 'p1', title: 'Corporate Site — Dinesh Industries', thumb: '/assets/portfolio-1.jpg', description: 'Clean corporate site focused on services & lead gen.' },
  { id: 'p2', title: 'Portfolio — Creative Studio', thumb: '/assets/portfolio-2.jpg', description: 'Showcase site with case studies and gallery.' },
  { id: 'p3', title: 'Landing — SaaS Product', thumb: '/assets/portfolio-3.jpg', description: 'Conversion-focused landing: signups & trial flows.' }
]

export default function Informative() {
  const [modal, setModal] = useState(null)
  const [quote, setQuote] = useState({ name: '', email: '', website: '', message: '' })
  const [errors, setErrors] = useState({})

  function openModal(item) { setModal(item) }
  function closeModal() { setModal(null) }

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
    <main className="informative-page">

      {/* HERO */}
      <section className="inf-hero">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-7">
              <p className="eyebrow">Informative Websites</p>
              <h1 className="display-5">Beautiful, fast brochure websites that convert</h1>
              <p className="lead text-muted">Perfect for businesses, professionals and agencies that need a modern web presence — SEO-friendly, mobile-ready and simple to manage.</p>
              <div className="mt-3 d-flex gap-2">
                <a href="/contact" className="btn btn-primary btn-lg">Get a Quote</a>
                <a href="#pricing" className="btn btn-outline-light btn-lg">See Pricing</a>
              </div>
            </div>

            <div className="col-md-5 text-center">
              <div className="hero-mockup">
                <img src="/assets/inf-hero-mock.png" alt="Website mockup" className="img-fluid rounded-3 shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Why choose an Informative Website?</h3>
            <p className="text-muted">Fast to launch, low maintenance, clear messaging — ideal for lead generation and brand presence.</p>
          </div>

          <div className="row g-3">
            <Benefit title="Clear Messaging" text="Crafted info architecture and copy that clarifies what you do and why customers should trust you." />
            <Benefit title="SEO & Performance" text="Optimised for search and fast load times so users find you and stay." />
            <Benefit title="Mobile-first" text="Responsive layouts and touch-friendly interactions across all devices." />
            <Benefit title="Easy Editing" text="Simple CMS / admin or static site with easy content updates." />
          </div>
        </div>
      </section>

      {/* SERVICES BREAKDOWN */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h4>What we build</h4>
              <p className="text-muted">Informative websites typically include home, about, services, case studies, blog, contact — each optimised for conversions.</p>

              <ul className="list-unstyled fw-bold">
                <li>— Homepage & clear hero CTA</li>
                <li>— Services & case studies</li>
                <li>— Contact, inquiry forms & lead capture</li>
                <li>— Basic blog (optional)</li>
              </ul>
            </div>

            <div className="col-md-6">
              <h4>Tech & handover</h4>
              <p className="text-muted">We use lightweight stacks: static site generators or Bootstrap + React/Vanilla. We deliver with documentation and a training video.</p>

              <div className="mt-3">
                <span className="badge bg-light text-dark me-2">SEO-ready</span>
                <span className="badge bg-light text-dark me-2">Accessible</span>
                <span className="badge bg-light text-dark me-2">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Selected work</h3>
            <a href="/portfolio" className="link-primary">See all →</a>
          </div>

          <div className="row g-3">
            {PORTFOLIO.map(p => (
              <div className="col-sm-6 col-lg-4" key={p.id}>
                <article className="card portfolio-card h-100">
                  <img src={p.thumb} alt={p.title} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title mb-1">{p.title}</h5>
                    <p className="text-muted small mb-2">{p.description}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-light" onClick={() => openModal(p)}>Preview</button>
                      <a href="/contact" className="btn btn-sm btn-primary">Enquire</a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Our process</h3>
            <p className="text-muted">A simple four-step process to ship quickly and predictably.</p>
          </div>

          <div className="row g-3">
            <ProcessStep step="1" title="Discovery" text="Workshop, goals, user questions and sitemap." />
            <ProcessStep step="2" title="Design" text="Wireframes, visual design and CTA paths." />
            <ProcessStep step="3" title="Build" text="Fast, accessible implementation and QA." />
            <ProcessStep step="4" title="Launch & Handover" text="Deploy, monitor and handover docs." />
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section id="pricing" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Simple pricing</h3>
            <p className="text-muted">Transparent packages for brochure websites. Custom quotes available for complex projects.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <PriceCard title="Starter" price="₹12,000" bullets={['Up to 5 pages','Responsive','Basic SEO']} />
            <PriceCard title="Business" price="₹25,000" featured bullets={['Up to 12 pages','CMS','Contact forms','Analytics']} />
            <PriceCard title="Enterprise" price="Custom" bullets={['Large sites','Integrations','Priority support']} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5 bg-soft">
        <div className="container">
          <h3 className="mb-3">Frequently asked questions</h3>

          <div className="accordion" id="infFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">How long does an informative site take?</button>
              </h2>
              <div id="collapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#infFaq">
                <div className="accordion-body text-muted">Usually 2–4 weeks for a Starter site depending on feedback and content readiness.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">Do you provide content & images?</button>
              </h2>
              <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#infFaq">
                <div className="accordion-body text-muted">We can help with copy and stock imagery for an extra fee or you can provide your own assets.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
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

      {/* PORTFOLIO MODAL */}
      {modal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal.title}</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img src={modal.thumb} alt={modal.title} className="img-fluid mb-3 rounded" />
                <p className="text-muted">{modal.description}</p>
                <p className="small text-muted">This is a portfolio preview — final designs vary per client.</p>
              </div>
              <div className="modal-footer">
                <a href="/contact" className="btn btn-primary">Enquire</a>
                <button className="btn btn-outline-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

/* =========================
   Small presentational subcomponents
   ========================= */

function Benefit({ title, text }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="benefit-card p-3 h-100">
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}

function ProcessStep({ step, title, text }) {
  return (
    <div className="col-md-6 col-lg-3 text-center">
      <div className="process-step p-3 h-100">
        <div className="step-number mb-2">{step}</div>
        <h6>{title}</h6>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}

function PriceCard({ title, price, bullets = [], featured }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className={`price-card h-100 p-3 ${featured ? 'featured' : ''}`}>
        <h5>{title}</h5>
        <div className="price display-6">{price}</div>
        <ul className="list-unstyled mt-2 mb-3">
          {bullets.map((b, i) => <li key={i} className="small text-muted">• {b}</li>)}
        </ul>
        <a href="/contact" className="btn btn-sm btn-primary">Choose</a>
      </div>
    </div>
  )
}
