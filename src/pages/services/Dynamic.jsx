// src/pages/services/Dynamic.jsx
import React, { useEffect, useState } from 'react'
import './dynamic.css'

// Utility: fetch JSON from /public/data
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Failed to fetch')
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function Dynamic() {
  // dynamic content state
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [projectModal, setProjectModal] = useState(null)
  const [postModal, setPostModal] = useState(null)

  // Blog pagination/search state
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 4

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [pj, pb] = await Promise.all([
        fetchJson('/data/projects.json'),
        fetchJson('/data/blog.json')
      ])
      if (!mounted) return
      setProjects(pj)
      setPosts(pb.sort((a,b) => new Date(b.date) - new Date(a.date)))
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  // filter posts by query
  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.excerpt && p.excerpt.toLowerCase().includes(query.toLowerCase()))
  )
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PER_PAGE))
  const visiblePosts = filteredPosts.slice((page-1)*PER_PAGE, (page-1)*PER_PAGE + PER_PAGE)

  // contact form state (mailto fallback)
  const [form, setForm] = useState({ name:'', email:'', website:'', message:'', budget:''})
  function onChange(e){ setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  function sendQuote(e){
    e.preventDefault()
    const subject = encodeURIComponent(`Dynamic Website Inquiry — ${form.website || 'No website'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Website: ${form.website}`,
      `Estimated budget: ${form.budget}`,
      '',
      `Message:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="dynamic-page">

      {/* HERO */}
      <section className="dyn-hero py-6">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-7">
              <p className="eyebrow">Dynamic Websites</p>
              <h1 className="display-5">Powerful, CMS-driven websites & web apps</h1>
              <p className="lead text-muted">WordPress, Headless CMS, Next.js / React — content-first, fast and extensible. Admin panels, roles, eCommerce integrations, APIs and more.</p>

              <div className="d-flex gap-2 mt-3">
                <a className="btn btn-primary btn-lg" href="#contact">Request Quote</a>
                <a className="btn btn-outline-light btn-lg" href="#pricing">Pricing</a>
              </div>
            </div>

            <div className="col-md-5 text-center">
              <img src="/assets/dyn-hero.png" alt="Dynamic site mock" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Features of our dynamic sites</h3>
            <p className="text-muted">Admin dashboard, content workflows, user roles, third-party integrations and scalable hosting.</p>
          </div>

          <div className="row g-3">
            {[
              {t:'Headless CMS', d:'Content-first editing with Strapi / Sanity / Contentful.'},
              {t:'SEO & SSR', d:'Server-side rendering for SEO & fast first paint.'},
              {t:'Authentication', d:'User accounts, gated content, protected routes.'},
              {t:'Integrations', d:'Payments, CRM, analytics, marketing automations.'},
              {t:'eCommerce', d:'Product catalogs, cart, checkout integrations.'},
              {t:'Performance', d:'CDN, caching, image optimisation and monitoring.'}
            ].map((f,i) => (
              <div key={i} className="col-md-4">
                <div className="feature-card p-3 h-100">
                  <h5 className="mb-1">{f.t}</h5>
                  <p className="text-muted small mb-0">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS (dynamic fetch) */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Case studies & projects</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loading ? <p>Loading projects…</p> : (
            <div className="row g-3">
              {projects.slice(0,6).map(proj => (
                <div key={proj.id} className="col-sm-6 col-lg-4">
                  <article className="card proj-card h-100">
                    <img src={proj.thumb} alt={proj.title} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title mb-1">{proj.title}</h5>
                      <p className="text-muted small mb-2">{proj.excerpt}</p>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light" onClick={() => setProjectModal(proj)}>Preview</button>
                        <a href="/contact" className="btn btn-sm btn-primary">Enquire</a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* BLOG (dynamic fetch, search, pagination) */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Latest articles (CMS)</h3>
            <div className="d-flex gap-2">
              <input className="form-control form-control-sm" placeholder="Search posts…" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} />
              <a href="/blog" className="btn btn-sm btn-outline-light">All Posts</a>
            </div>
          </div>

          {loading ? <p>Loading posts…</p> : (
            <>
              <div className="row g-3">
                {visiblePosts.map(p => (
                  <div key={p.id} className="col-md-6 col-lg-3">
                    <article className="card post-card h-100">
                      <img src={p.thumb} alt={p.title} className="card-img-top" />
                      <div className="card-body">
                        <h6 className="mb-1">{p.title}</h6>
                        <small className="text-muted">{new Date(p.date).toLocaleDateString()}</small>
                        <p className="text-muted small mt-2 mb-2">{p.excerpt}</p>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-primary" onClick={() => setPostModal(p)}>Read</button>
                          <a className="btn btn-sm btn-outline-light" href={`/blog/${p.slug}`}>Open</a>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* pagination */}
              <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Blog pages">
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${page===1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.max(1,p-1))}>Prev</button></li>
                    {Array.from({length:totalPages}).map((_,i) => (
                      <li key={i} className={`page-item ${page===i+1 ? 'active' : ''}`}><button className="page-link" onClick={() => setPage(i+1)}>{i+1}</button></li>
                    ))}
                    <li className={`page-item ${page===totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.min(totalPages,p+1))}>Next</button></li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Dynamic Website Pricing (teaser)</h3>
            <p className="text-muted">Estimates — final price depends on integrations, pages and custom work.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Starter CMS</h5>
                <div className="price">₹35,000</div>
                <p className="small text-muted">Small business + admin, blog, contact forms</p>
                <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center featured">
                <h5>Business</h5>
                <div className="price">₹75,000</div>
                <p className="small text-muted">Multi-page, CMS, analytics, 3rd-party integrations</p>
                <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-3 text-center">
                <h5>Custom / Enterprise</h5>
                <div className="price">Custom</div>
                <p className="small text-muted">Complex platforms, apps, eCommerce & integrations</p>
                <a className="btn btn-sm btn-primary" href="/contact">Get Quote</a>
              </div>
            </div>
          </div>

          <div className="mt-4 table-responsive">
            <table className="table table-borderless table-sm dynamic-feat-table">
              <thead>
                <tr><th>Feature</th><th>Starter</th><th>Business</th><th>Enterprise</th></tr>
              </thead>
              <tbody>
                <tr><td>CMS</td><td>Basic</td><td>Advanced</td><td>Custom</td></tr>
                <tr><td>Pages</td><td>Up to 10</td><td>Up to 40</td><td>Unlimited</td></tr>
                <tr><td>Integrations</td><td>2</td><td>5</td><td>Custom</td></tr>
                <tr><td>Support</td><td>Email</td><td>Priority</td><td>Dedicated</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTACT / QUOTE */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <h3>Request a quote</h3>
              <p className="text-muted">Tell us briefly about your project and we'll propose a plan and timeline.</p>
              <form className="row g-2" onSubmit={sendQuote} noValidate>
                <div className="col-md-6"><input className="form-control" name="name" placeholder="Your name" value={form.name} onChange={onChange} required /></div>
                <div className="col-md-6"><input className="form-control" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required /></div>
                <div className="col-md-6"><input className="form-control" name="website" placeholder="Website (optional)" value={form.website} onChange={onChange} /></div>
                <div className="col-md-6"><input className="form-control" name="budget" placeholder="Estimated budget (eg. 50000)" value={form.budget} onChange={onChange} /></div>
                <div className="col-12"><textarea className="form-control" name="message" rows="4" placeholder="Short brief" value={form.message} onChange={onChange} required></textarea></div>
                <div className="col-12"><button className="btn btn-primary">Send request</button></div>
              </form>
            </div>

            <aside className="col-md-5">
              <div className="card p-3 contact-panel">
                <h6>Need help choosing?</h6>
                <p className="small text-muted mb-2">Schedule a quick call for scoping and recommendations.</p>
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
                <p className="small text-muted">Tech: {projectModal.stack.join(', ')}</p>
              </div>
              <div className="modal-footer">
                <a href="/contact" className="btn btn-primary">Enquire</a>
                <button className="btn btn-outline-secondary" onClick={() => setProjectModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post modal */}
      {postModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{postModal.title}</h5>
                <button className="btn-close" onClick={() => setPostModal(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img src={postModal.thumb} alt={postModal.title} className="img-fluid mb-3 rounded" />
                <p className="text-muted small">Published: {new Date(postModal.date).toLocaleDateString()}</p>
                <div className="post-body text-muted">{postModal.content || postModal.excerpt}</div>
              </div>
              <div className="modal-footer">
                <a className="btn btn-outline-light" href={`/blog/${postModal.slug}`}>Open in blog</a>
                <button className="btn btn-outline-secondary" onClick={() => setPostModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
