// src/components/Pricing/UIUX/Comparison.jsx
import React from 'react'

export default function Comparison() {
  return (
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
  )
}
