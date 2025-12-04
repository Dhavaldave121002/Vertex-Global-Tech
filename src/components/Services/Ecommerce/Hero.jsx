// Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="ecom-hero py-5">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <p className="eyebrow">E-commerce Websites</p>
            <h1 className="display-5">Scalable, secure & conversion-first e-commerce platforms</h1>
            <p className="lead text-muted">
              Headless commerce, Shopify/WooCommerce, custom storefronts — we build storefronts that convert and scale.
            </p>
            <div className="mt-3 d-flex gap-2">
              <a href="#pricing" className="btn btn-primary btn-lg">See Pricing</a>
              <a href="#contact" className="btn btn-outline-light btn-lg">Request Quote</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/ecom-hero-mock.png" alt="E-commerce mockup" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
