// src/pages/services/Application.jsx
import React, { useEffect, useState } from 'react'
import './application.css'

// simple JSON fetch util for optional case studies stored in /public/data/projects.json
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Fetch failed: ' + res.status)
    return await res.json()
  } catch (e) {
    // quietly fail and return empty array (page works without case studies)
    console.error(e)
    return []
  }
}

export default function Application() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projectModal, setProjectModal] = useState(null)

  // contact form state (mailto fallback)
  const [form, setForm] = useState({ name: '', email: '', company: '', platform: 'Both', budget: '', message: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoadingProjects(true)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      // show only mobile/app projects if available (heuristic: tag contains 'app' or 'mobile')
      const filtered = Array.isArray(pj) ? pj.filter(p => (p.tags||[]).join(' ').toLowerCase().includes('app') || (p.categories||[]).join(' ').toLowerCase().includes('app') ) : []
      setProjects(filtered)
      setLoadingProjects(false)
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
    if (!form.message.trim()) err.message = 'Please provide a short brief'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    const subject = encodeURIComponent(`Application Development Inquiry — ${form.company || 'No company'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Platform: ${form.platform}`,
      `Estimated budget: ${form.budget || '-'}`,
      '',
      `Brief:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="app-page">

      {/* HERO */}
      <section className="app-hero">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <p className="eyebrow">Application Development</p>
              <h1 className="display-5">Native & cross-platform apps that scale</h1>
              <p className="lead text-muted">
                Android, iOS and cross-platform (React Native & Flutter) — we design & build performant apps with clean code, secure architecture and delightful UX.
              </p>

              <div className="mt-3 d-flex gap-2">
                <a href="#contact" className="btn btn-primary btn-lg">Request Quote</a>
                <a href="#process" className="btn btn-outline-light btn-lg">Our Process</a>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <img src="/assets/app-hero-mock.png" alt="App mockups" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>What we build</h3>
            <p className="text-muted">Consumer apps, enterprise apps, internal tools, SaaS mobile frontends, and marketplaces — tailored to your business goals.</p>
          </div>

          <div className="row g-3">
            {[
              { t: 'Native Android', d: 'Kotlin/Jetpack implementation for performance and deep platform integration.' },
              { t: 'Native iOS', d: 'Swift + SwiftUI/Combine for smooth, native user experiences.' },
              { t: 'Cross-platform', d: 'React Native & Flutter to accelerate delivery while keeping native feel.' },
              { t: 'Offline & Sync', d: 'Reliable offline-first patterns, background sync and conflict resolution.' },
              { t: 'Auth & Security', d: 'OAuth, JWT, biometric auth and secure storage best-practices.' },
              { t: 'Analytics & Crash', d: 'Integrations with analytics, A/B testing and crash reporting.' }
            ].map((f, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="feature-card p-3 h-100">
                  <h5 className="mb-1">{f.t}</h5>
                  <p className="text-muted small mb-0">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-6">
              <h3>Platforms & approaches</h3>
              <p className="text-muted">We select the right platform based on product needs, performance, time-to-market and long-term maintainability.</p>

              <ul className="list-unstyled fw-bold">
                <li>• Native Android — Kotlin, Jetpack</li>
                <li>• Native iOS — Swift, SwiftUI</li>
                <li>• Cross-platform — React Native, Flutter</li>
                <li>• Backend & APIs — Node / .NET / Firebase / GraphQL</li>
                <li>• DevOps — CI/CD, Test automation, Play Store & App Store pipelines</li>
              </ul>
            </div>

            <div className="col-md-6 text-center">
              <img src="/assets/app-platforms.png" alt="Platforms" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Case studies</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loadingProjects ? (
            <p>Loading projects…</p>
          ) : (
            <div className="row g-3">
              {projects.length === 0 && <div className="col-12"><p className="text-muted">No app case studies available — add projects.json entries or use placeholders.</p></div>}
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
      <section id="process" className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Our process</h3>
            <p className="text-muted">From discovery to launch — a practical, test-driven approach.</p>
          </div>

          <div className="row g-3">
            {[
              { step: 'Discover', desc: 'Requirements, users, metrics, tech choices & roadmap.' },
              { step: 'Design', desc: 'Interaction design, prototypes, usability testing.' },
              { step: 'Build', desc: 'Modular code, automated tests & continuous integration.' },
              { step: 'QA', desc: 'Security, performance and real-device testing.' },
              { step: 'Launch', desc: 'Store submission, monitoring and phased rollout.' }
            ].map((p, i) => (
              <div key={i} className="col-md-4">
                <div className="process-card p-3 h-100">
                  <div className="process-number">{i + 1}</div>
                  <h6 className="mt-2">{p.step}</h6>
                  <p className="small text-muted mb-0">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section id="pricing" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Pricing (indicative)</h3>
            <p className="text-muted">Representative packages. Final cost depends on integrations, features and platform choices.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Prototype</h5>
                <div className="price">₹60,000</div>
                <p className="small text-muted">MVP prototype, basic flows, demo-ready.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Get Started</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center featured">
                <h5>Startup</h5>
                <div className="price">₹1,80,000</div>
                <p className="small text-muted">Full app, backend, analytics and store submission.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Enterprise</h5>
                <div className="price">Custom</div>
                <p className="small text-muted">Scaled architecture, integrations, SSO and SLAs.</p>
                <a className="btn btn-sm btn-primary" href="#contact">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5 bg-soft">
        <div className="container">
          <h3 className="mb-3">FAQ</h3>

          <div className="accordion" id="appFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faqA1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse1" aria-expanded="false" aria-controls="acollapse1">
                  What platform should I choose — native or cross-platform?
                </button>
              </h2>
              <div id="acollapse1" className="accordion-collapse collapse" aria-labelledby="faqA1" data-bs-parent="#appFaq">
                <div className="accordion-body text-muted">We evaluate product needs: native for deep platform features & max performance; React Native/Flutter for faster delivery & shared code. We can help choose after discovery.</div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faqA2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse2" aria-expanded="false" aria-controls="acollapse2">
                  Do you publish apps to the Play Store & App Store?
                </button>
              </h2>
              <div id="acollapse2" className="accordion-collapse collapse" aria-labelledby="faqA2" data-bs-parent="#appFaq">
                <div className="accordion-body text-muted">Yes — we prepare store assets, handle submission, address review feedback and set up CI pipelines for future releases.</div>
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
              <p className="text-muted">Tell us about your app idea and we’ll create a tailored proposal.</p>

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
                  <select name="platform" value={form.platform} onChange={change} className="form-select">
                    <option>Both</option>
                    <option>Android</option>
                    <option>iOS</option>
                    <option>Cross-platform</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated budget (eg. 180000)" />
                </div>

                <div className="col-12">
                  <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Short brief (features, users, timeline)" required />
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
                <h6>Project scoping</h6>
                <p className="small text-muted mb-2">We offer a scoping call and a sample SOW for complex projects — ask for details in the brief.</p>
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
