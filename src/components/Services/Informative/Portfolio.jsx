// src/components/Services/Informative/Portfolio.jsx
import React from 'react'

export default function Portfolio({ items = [], onPreview }) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Selected work</h3>
          <a href="/portfolio" className="link-primary">See all →</a>
        </div>

        <div className="row g-3">
          {items.map(p => (
            <div className="col-sm-6 col-lg-4" key={p.id}>
              <article className="card portfolio-card h-100">
                <img src={p.thumb} alt={p.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title mb-1">{p.title}</h5>
                  <p className="text-muted small mb-2">{p.description}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(p)}>Preview</button>
                    <a href="/contact" className="btn btn-sm btn-primary">Enquire</a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
