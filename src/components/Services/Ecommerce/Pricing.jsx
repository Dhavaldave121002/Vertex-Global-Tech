// Pricing.jsx
import React from 'react'

export default function Pricing() {
  return (
    <section id="pricing" className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>E-commerce pricing (estimates)</h3>
          <p className="text-muted">Representative packages — final quote depends on catalog size and integrations.</p>
        </div>

        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Starter Shop</h5>
              <div className="price">₹55,000</div>
              <p className="small text-muted">Small catalog, payment & shipping, admin panel.</p>
              <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center featured">
              <h5>Business Store</h5>
              <div className="price">₹1,25,000</div>
              <p className="small text-muted">Advanced integrations & marketing stack.</p>
              <a className="btn btn-sm btn-primary" href="/contact">Choose</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center">
              <h5>Enterprise</h5>
              <div className="price">Custom</div>
              <p className="small text-muted">Headless commerce, multi-store.</p>
              <a className="btn btn-sm btn-primary" href="/contact">Get Quote</a>
            </div>
          </div>
        </div>

        <div className="mt-4 table-responsive">
          <table className="table table-borderless table-sm ecom-feat-table">
            <thead>
              <tr><th>Feature</th><th>Starter</th><th>Business</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>Catalog size</td><td>Up to 500 SKUs</td><td>Up to 10k SKUs</td><td>Unlimited</td></tr>
              <tr><td>Integrations</td><td>Payments, Shipping</td><td>ERP, CRM</td><td>Custom</td></tr>
              <tr><td>Performance</td><td>CDN & caching</td><td>Optimised</td><td>Enterprise SRE</td></tr>
              <tr><td>Support</td><td>Email</td><td>Priority</td><td>Dedicated</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
