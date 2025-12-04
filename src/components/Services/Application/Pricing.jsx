// src/components/Services/Application/Pricing.jsx
import React from 'react'

export default function Pricing() {
  return (
    <section id="pricing" className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Pricing (indicative)</h3>
          <p className="text-muted">Representative packages. Final cost depends on integrations, features and platform choices.</p>
        </div>

        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Prototype</h5>
              <div className="price">₹60,000</div>
              <p className="small text-muted">MVP prototype, basic flows, demo-ready.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Get Started</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center featured">
              <h5>Startup</h5>
              <div className="price">₹1,80,000</div>
              <p className="small text-muted">Full app, backend & store submission.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Enterprise</h5>
              <div className="price">Custom</div>
              <p className="small text-muted">Scaled architecture, integrations, SLAs.</p>
              <a className="btn btn-sm btn-primary" href="#contact">Get Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
