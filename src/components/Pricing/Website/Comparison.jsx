// src/components/Pricing/Website/Comparison.jsx
import React from 'react'

export default function Comparison() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-3">
          <h4>Feature comparison</h4>
          <p className="text-muted">Quick glance at what each plan includes.</p>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless pricing-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Informative</th>
                <th>Dynamic</th>
                <th>E-commerce</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Pages</td><td>Up to 5</td><td>Up to 25</td><td>Unlimited (catalog)</td></tr>
              <tr><td>CMS</td><td>—</td><td>Included</td><td>Included</td></tr>
              <tr><td>Payment</td><td>—</td><td>—</td><td>Included</td></tr>
              <tr><td>SEO</td><td>Basic</td><td>Advanced</td><td>Advanced</td></tr>
              <tr><td>Support</td><td>Email</td><td>Priority</td><td>Priority + SLA</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
