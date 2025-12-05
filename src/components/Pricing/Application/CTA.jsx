// src/components/Pricing/Application/CTA.jsx
import React from 'react'

export default function CTA() {
  return (
    <section className="py-5 bg-soft">
      <div className="container text-center">
        <h4>Start your app project</h4>
        <p className="text-muted">Share your brief and we’ll send a project plan and estimate.</p>
        <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
        <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=App%20Plan%20Inquiry">Request Quote</a>
      </div>
    </section>
  )
}
