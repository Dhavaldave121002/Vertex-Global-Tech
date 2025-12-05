// src/components/Pricing/Application/Comparison.jsx
import React from 'react'

export default function Comparison() {
  return (
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
  )
}
