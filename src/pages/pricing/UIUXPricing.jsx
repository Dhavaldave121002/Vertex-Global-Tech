// src/pages/pricing/UIUXPricing.jsx
import React from 'react'
import './pricing.css'

export default function UIUXPricing(){
  return (
    <main className="pricing-page">
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

      {/* Tiers */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Design packages</h3>
            <p className="text-muted">Simplified pricing to help you choose the right project scope.</p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">Workshop</h5>
                <div className="price">₹25,000</div>
                <p className="small text-muted mb-3">Discovery workshop, personas and quick UX recommendations.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Stakeholder workshop</li>
                  <li>✓ Persona & flow</li>
                  <li>✓ 1-page plan</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Book</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center featured">
                <h5 className="mb-1">Product Design</h5>
                <div className="price">₹95,000</div>
                <p className="small text-muted mb-3">End-to-end product design, prototype & handoff for a single product.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Wireframes & prototype</li>
                  <li>✓ UI kit</li>
                  <li>✓ Dev-ready assets</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">Design System</h5>
                <div className="price">Custom</div>
                <p className="small text-muted mb-3">Design tokens, components and documentation for scaling teams.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Tokens & tokens</li>
                  <li>✓ Component library</li>
                  <li>✓ Documentation</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-3">
            <h4>Deliverables at a glance</h4>
            <p className="text-muted">What to expect with each package.</p>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless pricing-table">
              <thead>
                <tr><th>Deliverable</th><th>Workshop</th><th>Product</th><th>System</th></tr>
              </thead>
              <tbody>
                <tr><td>Discovery</td><td>Included</td><td>Included</td><td>Included</td></tr>
                <tr><td>Wireframes</td><td>—</td><td>Included</td><td>Included</td></tr>
                <tr><td>Prototype</td><td>—</td><td>Clickable</td><td>Design tokens</td></tr>
                <tr><td>Dev Handoff</td><td>—</td><td>Figma/Zeplin</td><td>Component library</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <h3 className="mb-3">FAQ</h3>
          <div className="accordion" id="uiuxPricingFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="uipfaq1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uipcollapse1" aria-expanded="false" aria-controls="uipcollapse1">
                  How do handoffs work?
                </button>
              </h2>
              <div id="uipcollapse1" className="accordion-collapse collapse" aria-labelledby="uipfaq1" data-bs-parent="#uiuxPricingFaq">
                <div className="accordion-body text-muted">We deliver Figma files, component specs, tokens and a handoff doc for developers. We also provide code snippets where required.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-soft">
        <div className="container text-center">
          <h4>Need a tailored plan?</h4>
          <p className="text-muted">Contact us with your goals and we’ll prepare a project plan and estimate.</p>
          <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
          <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=UIUX%20Plan%20Inquiry">Request Quote</a>
        </div>
      </section>
    </main>
  )
}
