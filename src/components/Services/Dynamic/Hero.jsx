// src/components/Services/Dynamic/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="dyn-hero py-6">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-md-7">
            <p className="eyebrow">Dynamic Websites</p>
            <h1 className="display-5">Powerful, CMS-driven websites & web apps</h1>
            <p className="lead text-muted">WordPress, Headless CMS, Next.js / React — content-first, fast and extensible. Admin panels, roles, eCommerce integrations, APIs and more.</p>

            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-primary btn-lg" href="#contact">Request Quote</a>
              <a className="btn btn-outline-light btn-lg" href="#pricing">Pricing</a>
            </div>
          </div>

          <div className="col-md-5 text-center">
            <img src="/assets/dyn-hero.png" alt="Dynamic site mock" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
