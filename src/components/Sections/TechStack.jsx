import React from 'react'
import './sections.css'

export default function TechStack() {
  const stack = ['React', 'Bootstrap', 'Node.js', 'Firebase', 'Flutter', 'Postgres']

  return (
    <section className="sections tech-stack container py-5" aria-label="Technology stack">
      <div className="text-center mb-3">
        <h3 className="section-title">Tech we use</h3>
        <p className="section-intro text-muted">Trusted, modern tools we use to deliver stable products.</p>
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
        {stack.map((s) => (
          <div key={s} className="tech-chip" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" className="chip-icon" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#fff0" /></svg>
            <span className="chip-label">{s}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
