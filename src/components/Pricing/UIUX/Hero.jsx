// src/components/Pricing/UIUX/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="pricing-hero py-6">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-lg-7">
            <p className="eyebrow">UI / UX Packages</p>
            <h1 className="display-5">Design services & pricing</h1>
            <p className="lead text-muted">Workshops, product design and scalable design systems — priced for startups and enterprises.</p>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-uiux.png" alt="UIUX pricing" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
