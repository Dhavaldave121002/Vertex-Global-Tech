// src/components/Services/Application/CaseStudies.jsx
import React from 'react'

export default function CaseStudies({ projects = [], loading = false, onPreview }) {
  if (loading) return <p>Loading projects…</p>

  if (!Array.isArray(projects) || projects.length === 0) {
    return <div className="row"><div className="col-12"><p className="text-muted">No app case studies available — add projects.json entries or use placeholders.</p></div></div>
  }

  return (
    <div className="row g-3">
      {projects.slice(0,6).map(p => (
        <div key={p.id} className="col-sm-6 col-lg-4">
          <article className="card proj-card h-100">
            <img src={p.thumb} alt={p.title} className="card-img-top" />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-1">{p.title}</h5>
              <p className="text-muted small mb-2">{p.excerpt}</p>
              <div className="mt-auto d-flex gap-2">
                <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(p)}>Preview</button>
                <a className="btn btn-sm btn-primary" href="/contact">Enquire</a>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
