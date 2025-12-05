// src/components/Pricing/Application/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="pricing-hero py-6">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-lg-7">
            <p className="eyebrow">Application Plans</p>
            <h1 className="display-5">App pricing — prototypes to enterprise</h1>
            <p className="lead text-muted">Pricing examples for mobile apps — MVPs, user-ready apps and enterprise-grade solutions with integrations and SLAs.</p>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-app.png" alt="App pricing" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
