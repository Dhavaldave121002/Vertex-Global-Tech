// src/pages/pricing/ApplicationPricing.jsx
import React from 'react'
import './pricing.css'

export default function ApplicationPricing(){
  return (
    <main className="pricing-page">
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

      {/* Tiers */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>App packages</h3>
            <p className="text-muted">Transparent starting prices. Final costs vary with integrations, platforms and backend needs.</p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">Prototype</h5>
                <div className="price">₹60,000</div>
                <p className="small text-muted mb-3">Clickable prototype or small MVP demo app.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Prototype screens</li>
                  <li>✓ Basic backend mock</li>
                  <li>✓ Usability testing</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Request</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center featured">
                <h5 className="mb-1">Startup</h5>
                <div className="price">₹1,80,000</div>
                <p className="small text-muted mb-3">Production-ready app (Android + iOS) with backend and analytics.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Native or cross-platform</li>
                  <li>✓ Backend & APIs</li>
                  <li>✓ Store submission</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Choose</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">Enterprise</h5>
                <div className="price">Custom</div>
                <p className="small text-muted mb-3">Large-scale app with integrations, SSO, offline sync and SLAs.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Advanced security</li>
                  <li>✓ Multi-region backend</li>
                  <li>✓ Dedicated support</li>
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
            <h4>What's included?</h4>
            <p className="text-muted">High-level comparison of core deliverables.</p>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless pricing-table">
              <thead>
                <tr><th>Feature</th><th>Prototype</th><th>Startup</th><th>Enterprise</th></tr>
              </thead>
              <tbody>
                <tr><td>Platforms</td><td>Single / Demo</td><td>Android + iOS</td><td>Multi-region</td></tr>
                <tr><td>Backend</td><td>Mock</td><td>API + DB</td><td>HA & scaling</td></tr>
                <tr><td>Testing</td><td>Basic</td><td>Automated & manual</td><td>Full QA</td></tr>
                <tr><td>Store submission</td><td>—</td><td>Included</td><td>Included + support</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <h3 className="mb-3">Frequently asked</h3>
          <div className="accordion" id="appPricingFaq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="apfaq1">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse1" aria-expanded="false" aria-controls="acollapse1">
                  How do you handle store submissions?
                </button>
              </h2>
              <div id="acollapse1" className="accordion-collapse collapse" aria-labelledby="apfaq1" data-bs-parent="#appPricingFaq">
                <div className="accordion-body text-muted">We support Play Store & App Store submission including assets, privacy policy and handling review feedback.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-soft">
        <div className="container text-center">
          <h4>Start your app project</h4>
          <p className="text-muted">Share your brief and we’ll send a project plan and estimate.</p>
          <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
          <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=App%20Plan%20Inquiry">Request Quote</a>
        </div>
      </section>
    </main>
  )
}
