// src/components/Pricing/Website/CTA.jsx
import React from 'react'

export default function CTA() {
  return (
    <section className="py-5 bg-soft">
      <div className="container text-center">
        <h4>Ready to get started?</h4>
        <p className="text-muted">Contact us with brief details and we’ll send a tailored proposal.</p>
        <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
        <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=Website%20Plan%20Inquiry">Request Quote</a>
      </div>
    </section>
  )
}
