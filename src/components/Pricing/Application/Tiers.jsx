// src/components/Pricing/Application/Tiers.jsx
import React from 'react'

export default function Tiers() {
  return (
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
  )
}
