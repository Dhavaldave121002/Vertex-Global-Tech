// Pricing.jsx
import React from 'react'

export default function Pricing() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>UI/UX packages</h3>
          <p className="text-muted">Packages for startups and enterprises — tailored scope and deliverables.</p>
        </div>

        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Workshop</h5>
              <div className="price">₹25,000</div>
              <p className="small text-muted">Discovery workshop + 1-page plan.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center featured">
              <h5>Product</h5>
              <div className="price">₹95,000</div>
              <p className="small text-muted">Full design, prototype & handoff.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Design System</h5>
              <div className="price">Custom</div>
              <p className="small text-muted">Components, tokens & docs.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Get Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
