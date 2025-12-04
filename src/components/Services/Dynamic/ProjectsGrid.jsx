// src/components/Services/Dynamic/ProjectsGrid.jsx
import React from 'react'

export default function ProjectsGrid({ projects = [], onPreview }) {
  const visible = projects.slice(0, 6)
  return (
    <div className="row g-3">
      {visible.map(proj => (
        <div key={proj.id} className="col-sm-6 col-lg-4">
          <article className="card proj-card h-100">
            <img src={proj.thumb} alt={proj.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title mb-1">{proj.title}</h5>
              <p className="text-muted small mb-2">{proj.excerpt}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(proj)}>Preview</button>
                <a href="/contact" className="btn btn-sm btn-primary">Enquire</a>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
