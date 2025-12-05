// src/components/Pricing/UIUX/Tiers.jsx
import React from 'react'

export default function Tiers() {
  return (
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
  )
}
