// src/pages/services/UIUX.jsx
import React, { useEffect, useState } from 'react'
import './uiux.css'

// small fetch helper for optional portfolio / case studies (public/data/projects.json)
async function fetchJson(path) {
  try {
    const r = await fetch(path)
    if (!r.ok) throw new Error('Fetch failed: ' + r.status)
    return await r.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function UIUX() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalProject, setModalProject] = useState(null)

  // quote form
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      // heuristics: pick projects tagged with 'ui' or 'design' if present
      const filtered = Array.isArray(pj)
        ? pj.filter(p => ((p.tags || []).join(' ').toLowerCase().includes('ui') || (p.tags || []).join(' ').toLowerCase().includes('design') || (p.categories||[]).join(' ').toLowerCase().includes('design')))
        : []
      setProjects(filtered)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email required'
    if (!form.message.trim()) err.message = 'Please add a short brief'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    const subject = encodeURIComponent(`UI/UX Inquiry — ${form.company || 'No company'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || '-'}`,
      '',
      `Brief:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="uiux-page">

      {/* HERO */}
      <section className="uiux-hero py-6">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <p className="eyebrow">UI / UX Design</p>
              <h1 className="display-5">Designing interfaces people love to use</h1>
              <p className="lead text-muted">
                Research-driven, conversion-focused UI/UX for web & mobile. Wireframes, prototypes, usability testing and polished visual systems to scale your product.
              </p>

              <div className="mt-3 d-flex gap-2">
                <a href="#contact" className="btn btn-primary btn-lg">Request Proposal</a>
                <a href="#process" className="btn btn-outline-light btn-lg">See Process</a>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <img src="/assets/uiux-hero.png" alt="UI/UX mock" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Our design offerings</h3>
            <p className="text-muted">End-to-end product design from discovery research to high-fidelity prototypes and design systems.</p>
          </div>

          <div className="row g-3">
            {[
              { t: 'User Research', d: 'Persona workshops, interviews, surveys and usability studies.' },
              { t: 'Interaction Design', d: 'Wireframes, flows and micro-interaction specs.' },
              { t: 'Visual Design', d: 'High-fidelity UI, brand alignment and accessibility-first styling.' },
              { t: 'Prototyping', d: 'Clickable prototypes for testing and stakeholder demos.' },
              { t: 'Design Systems', d: 'Scalable components, tokens and documentation.' },
              { t: 'Usability Testing', d: 'Remote & in-person usability sessions with synthesis.' }
            ].map((o, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="offering-card p-3 h-100">
                  <h5 className="mb-1">{o.t}</h5>
                  <p className="text-muted small mb-0">{o.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Design process</h3>
            <p className="text-muted">A collaborative process focused on outcomes — reduce risk and increase conversions.</p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">1</div>
                <h6 className="mt-2">Discovery</h6>
                <p className="small text-muted">Stakeholder workshops, analytics review and user research.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">2</div>
                <h6 className="mt-2">Structure</h6>
                <p className="small text-muted">Information architecture, flows and wireframes.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">3</div>
                <h6 className="mt-2">Design</h6>
                <p className="small text-muted">High-fidelity UI, component library and tokens.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">4</div>
                <h6 className="mt-2">Prototype</h6>
                <p className="small text-muted">Interactive prototypes and testable flows.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">5</div>
                <h6 className="mt-2">Validate</h6>
                <p className="small text-muted">Usability testing, iteration and design handoff.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / CASE STUDIES */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Selected UI/UX work</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loading ? <p>Loading projects…</p> : (
            <div className="row g-3">
              {projects.length === 0 && <div className="col-12"><p className="text-muted">No UI/UX case studies yet — add to <code>public/data/projects.json</code> or use placeholders.</p></div>}
              {projects.slice(0,6).map(p => (
                <div key={p.id} className="col-sm-6 col-lg-4">
                  <article className="card proj-card h-100">
                    <img src={p.thumb} alt={p.title} className="card-img-top" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-1">{p.title}</h5>
                      <p className="text-muted small mb-2">{p.excerpt}</p>
                      <div className="mt-auto d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light" onClick={() => setModalProject(p)}>Preview</button>
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

      {/* PRICING */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>UI/UX packages</h3>
            <p className="text-muted">Packages for startups and enterprises — tailored scope and deliverables.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Workshop</h5>
                <div className="price">₹25,000</div>
                <p className="small text-muted">Discovery workshop, personas and a 1-page plan.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center featured">
                <h5>Product</h5>
                <div className="price">₹95,000</div>
                <p className="small text-muted">End-to-end design, prototype and handoff for a single product.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Design System</h5>
                <div className="price">Custom</div>
                <p className="small text-muted">Component library, tokens and documentation for scaling design teams.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <h3 className="mb-3">FAQ</h3>

          <div className="accordion" id="uiuxFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="q1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u1" aria-expanded="false" aria-controls="u1">
                  How do you handoff designs to devs?
                </button>
              </h2>
              <div id="u1" className="accordion-collapse collapse" aria-labelledby="q1" data-bs-parent="#uiuxFaq">
                <div className="accordion-body text-muted">We provide Zeplin/Figma links, component specs, token documentation and example code snippets to make dev handoff frictionless.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="q2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u2" aria-expanded="false" aria-controls="u2">
                  Do you include usability testing?
                </button>
              </h2>
              <div id="u2" className="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#uiuxFaq">
                <div className="accordion-body text-muted">Yes — we run moderated/unmoderated usability tests, synthesize findings and iterate designs based on real user feedback.</div>
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
              <h3>Request a UI/UX proposal</h3>
              <p className="text-muted">Share a few details and we'll prepare a scoped proposal and timeline.</p>

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
                  <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated budget (optional)" />
                </div>

                <div className="col-12">
                  <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Short brief (users, goals, pages)" required />
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
                <h6>Design audits</h6>
                <p className="small text-muted mb-2">We offer quick design audits; attach a URL in the brief and we'll evaluate UX at a glance.</p>
                <a className="btn btn-outline-light btn-sm" href="/contact">Contact Sales</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {modalProject && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalProject.title}</h5>
                <button className="btn-close" onClick={() => setModalProject(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img src={modalProject.thumb} alt={modalProject.title} className="img-fluid mb-3 rounded" />
                <p className="text-muted">{modalProject.description}</p>
                {modalProject.stack && <p className="small text-muted">Deliverables: {modalProject.stack.join(', ')}</p>}
              </div>
              <div className="modal-footer">
                <a href="/contact" className="btn btn-primary">Enquire</a>
                <button className="btn btn-outline-secondary" onClick={() => setModalProject(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
