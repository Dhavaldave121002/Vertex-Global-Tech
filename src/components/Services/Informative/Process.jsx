// src/components/Services/Informative/Process.jsx
import React from 'react'

function Step({ step, title, text }) {
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

export default function Process() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Our process</h3>
          <p className="text-muted">A simple four-step process to ship quickly and predictably.</p>
        </div>

        <div className="row g-3">
          <Step step="1" title="Discovery" text="Workshop, goals, user questions and sitemap." />
          <Step step="2" title="Design" text="Wireframes, visual design and CTA paths." />
          <Step step="3" title="Build" text="Fast, accessible implementation and QA." />
          <Step step="4" title="Launch & Handover" text="Deploy, monitor and handover docs." />
        </div>
      </div>
    </section>
  )
}
