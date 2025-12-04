// src/components/Services/Informative/ServicesBreakdown.jsx
import React from 'react'

export default function ServicesBreakdown() {
  return (
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
            <p className="text-muted">We use lightweight stacks: static site generators or Bootstrap + React/Vanilla. We deliver documentation and a training video.</p>

            <div className="mt-3">
              <span className="badge bg-light text-dark me-2">SEO-ready</span>
              <span className="badge bg-light text-dark me-2">Accessible</span>
              <span className="badge bg-light text-dark me-2">Fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
