// src/components/Pricing/UIUX/CTA.jsx
import React from 'react'

export default function CTA() {
  return (
    <section className="py-5 bg-soft">
      <div className="container text-center">
        <h4>Need a tailored plan?</h4>
        <p className="text-muted">Contact us with your goals and we’ll prepare a project plan and estimate.</p>
        <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
        <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=UIUX%20Plan%20Inquiry">Request Quote</a>
      </div>
    </section>
  )
}
