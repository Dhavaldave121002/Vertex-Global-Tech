// src/components/Pricing/Website/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="pricing-hero py-6">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-lg-7">
            <p className="eyebrow">Website Plans</p>
            <h1 className="display-5">Website pricing, designed for growth</h1>
            <p className="lead text-muted">Clear, predictable packages for brochure sites, dynamic CMS sites and SEO-first e-commerce stores.</p>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-website.png" alt="Website pricing" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
