// src/components/Services/Dynamic/Pricing.jsx
import React from 'react'

export default function Pricing() {
  return (
    <section id="pricing" className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Dynamic Website Pricing (teaser)</h3>
          <p className="text-muted">Estimates — final price depends on integrations, pages and custom work.</p>
        </div>

        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Starter CMS</h5>
              <div className="price">₹35,000</div>
              <p className="small text-muted">Small business + admin, blog, contact forms</p>
              <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center featured">
              <h5>Business</h5>
              <div className="price">₹75,000</div>
              <p className="small text-muted">Multi-page, CMS, analytics, 3rd-party integrations</p>
              <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Custom / Enterprise</h5>
              <div className="price">Custom</div>
              <p className="small text-muted">Complex platforms, apps, eCommerce & integrations</p>
              <a className="btn btn-sm btn-primary" href="/contact">Get Quote</a>
            </div>
          </div>
        </div>

        <div className="mt-4 table-responsive">
          <table className="table table-borderless table-sm dynamic-feat-table">
            <thead>
              <tr><th>Feature</th><th>Starter</th><th>Business</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>CMS</td><td>Basic</td><td>Advanced</td><td>Custom</td></tr>
              <tr><td>Pages</td><td>Up to 10</td><td>Up to 40</td><td>Unlimited</td></tr>
              <tr><td>Integrations</td><td>2</td><td>5</td><td>Custom</td></tr>
              <tr><td>Support</td><td>Email</td><td>Priority</td><td>Dedicated</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
