// src/pages/services/Ecommerce.jsx
import React, { useEffect, useState } from 'react'
import './ecommerce.css'

// Utility: fetch JSON from /public/data
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Failed to fetch: ' + res.status)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function EcommerceService() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [projectModal, setProjectModal] = useState(null)

  // contact form (mailto fallback)
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      // projects.json should include e-commerce case studies (optional)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      setProjects(pj || [])
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(err => ({ ...err, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email required'
    if (!form.message.trim()) err.message = 'Share a short brief'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    const subject = encodeURIComponent(`E-commerce Inquiry — ${form.company || 'No company'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || '-'}`,
      '',
      `Message:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="ecom-service-page">

      {/* HERO */}
      <section className="ecom-hero">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <p className="eyebrow">E-commerce Websites</p>
              <h1 className="display-5">Scalable, secure & conversion-first e-commerce platforms</h1>
              <p className="lead text-muted">
                Headless commerce, Shopify / WooCommerce, custom storefronts — we build storefronts that convert, integrate with payments & logistics, and scale as your business grows.
              </p>

              <div className="mt-3 d-flex gap-2">
                <a href="#pricing" className="btn btn-primary btn-lg">See Pricing</a>
                <a href="#contact" className="btn btn-outline-light btn-lg">Request Quote</a>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <img src="/assets/ecom-hero-mock.png" alt="E-commerce mockup" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>What we deliver</h3>
            <p className="text-muted">From catalog to conversion: UX, inventory, payments, shipping and analytics — all built robustly and securely.</p>
          </div>

          <div className="row g-3">
            {[
              { t: 'Product Catalog & Search', d: 'Fast product browsing, faceted search and product variants (size/color/variants).' },
              { t: 'Secure Payments', d: 'Stripe, Razorpay, PayPal integrations with PCI compliance best practices.' },
              { t: 'Checkout & Cart', d: 'Optimised checkout flows, saved carts, coupon codes and abandoned cart recovery.' },
              { t: 'Inventory & Orders', d: 'Admin panels for stock, order management, and fulfilment workflows.' },
              { t: 'Shipping & Tax', d: 'Carrier integration (DHL/ShipRocket), live rates and tax calculation.' },
              { t: 'Performance & SEO', d: 'Image optimization, CDN, SSR and best SEO practices to drive organic visits.' }
            ].map((f, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="ecom-feature p-3 h-100">
                  <h5 className="mb-1">{f.t}</h5>
                  <p className="text-muted small mb-0">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Selected e-commerce projects</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loading ? <p>Loading projects…</p> : (
            <div className="row g-3">
              {projects.length === 0 && <div className="col-12"><p className="text-muted">No case studies available yet.</p></div>}
              {projects.slice(0,6).map(p => (
                <div key={p.id} className="col-sm-6 col-lg-4">
                  <article className="card proj-card h-100">
                    <img src={p.thumb} alt={p.title} className="card-img-top" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-1">{p.title}</h5>
                      <p className="text-muted small mb-2">{p.excerpt}</p>
                      <div className="mt-auto d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light" onClick={() => setProjectModal(p)}>Preview</button>
                        <a className="btn btn-sm btn-primary" href="/contact">Enquire</a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Our process</h3>
            <p className="text-muted">A pragmatic 5-step process to ship an e-commerce platform with predictable milestones.</p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">1</div>
                <h6 className="mt-2">Discovery & Scope</h6>
                <p className="small text-muted">Business goals, catalog, payment partners and KPI setting.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">2</div>
                <h6 className="mt-2">Design & Prototyping</h6>
                <p className="small text-muted">UX for product pages, checkout & mobile-first flows.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">3</div>
                <h6 className="mt-2">Build & Integrate</h6>
                <p className="small text-muted">Headless or platform-based builds, payment & logistics integration.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">4</div>
                <h6 className="mt-2">Test & QA</h6>
                <p className="small text-muted">Order flows, security checks, load and UAT testing.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">5</div>
                <h6 className="mt-2">Launch & Optimize</h6>
                <p className="small text-muted">Go-live, monitoring, and conversion & performance optimisations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>E-commerce pricing (estimates)</h3>
            <p className="text-muted">Representative packages — final quote depends on integrations, catalog size and custom features.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Starter Shop</h5>
                <div className="price">₹55,000</div>
                <p className="small text-muted">Small catalog, payment & shipping, admin panel.</p>
                <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center featured">
                <h5>Business Store</h5>
                <div className="price">₹1,25,000</div>
                <p className="small text-muted">Advanced integrations, performance & marketing stack.</p>
                <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Enterprise</h5>
                <div className="price">Custom</div>
                <p className="small text-muted">Headless commerce, multi-store, complex integrations.</p>
                <a className="btn btn-sm btn-primary" href="/contact">Get Quote</a>
              </div>
            </div>
          </div>

          <div className="mt-4 table-responsive">
            <table className="table table-borderless table-sm ecom-feat-table">
              <thead>
                <tr><th>Feature</th><th>Starter</th><th>Business</th><th>Enterprise</th></tr>
              </thead>
              <tbody>
                <tr><td>Catalog size</td><td>Up to 500 SKUs</td><td>Up to 10k SKUs</td><td>Unlimited</td></tr>
                <tr><td>Integrations</td><td>Payments, Shipping</td><td>ERP, CRM, Marketing</td><td>Custom integrations</td></tr>
                <tr><td>Performance</td><td>CDN & caching</td><td>Optimised</td><td>Enterprise SRE</td></tr>
                <tr><td>Support</td><td>Email</td><td>Priority</td><td>Dedicated</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <h3 className="mb-3">Frequently asked questions</h3>

          <div className="accordion" id="ecomFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse1" aria-expanded="false" aria-controls="ecollapse1">
                  How long does an e-commerce site take?
                </button>
              </h2>
              <div id="ecollapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#ecomFaq">
                <div className="accordion-body text-muted">Starter shops typically 4–6 weeks; business stores 8–12 weeks depending on integrations and catalog readiness.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse2" aria-expanded="false" aria-controls="ecollapse2">
                  Do you handle payment and tax setup?
                </button>
              </h2>
              <div id="ecollapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#ecomFaq">
                <div className="accordion-body text-muted">Yes — we integrate payment gateways, configure tax rules and work with your finance team to set up settlements.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / QUOTE */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <h3>Request a quote</h3>
              <p className="text-muted">Share a few details and we’ll send a tailored proposal.</p>

              <form className="row g-2" onSubmit={sendQuote} noValidate>
                <div className="col-md-6">
                  <input name="name" value={form.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your name" required />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="col-md-6">
                  <input name="email" type="email" value={form.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" required />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <input name="company" value={form.company} onChange={change} className="form-control" placeholder="Company (optional)" />
                </div>

                <div className="col-md-6">
                  <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated budget (eg. 125000)" />
                </div>

                <div className="col-12">
                  <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Short brief (catalog size, integrations, timeline)" required />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <div className="col-12">
                  <button className="btn btn-primary">Request proposal</button>
                  <a className="btn btn-outline-light ms-2" href="/contact">Contact sales</a>
                </div>
              </form>
            </div>

            <aside className="col-md-5">
              <div className="card p-3 contact-panel">
                <h6>Need help scoping?</h6>
                <p className="small text-muted mb-2">We provide scoping calls and a sample SOW for larger projects.</p>
                <a className="btn btn-outline-light btn-sm" href="/contact">Contact Sales</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Project modal */}
      {projectModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{projectModal.title}</h5>
                <button className="btn-close" onClick={() => setProjectModal(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img src={projectModal.thumb} alt={projectModal.title} className="img-fluid mb-3 rounded" />
                <p className="text-muted">{projectModal.description}</p>
                {projectModal.stack && <p className="small text-muted">Tech: {projectModal.stack.join(', ')}</p>}
              </div>
              <div className="modal-footer">
                <a href="/contact" className="btn btn-primary">Enquire</a>
                <button className="btn btn-outline-secondary" onClick={() => setProjectModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
