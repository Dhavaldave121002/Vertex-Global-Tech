// src/components/Pricing/Website/Tiers.jsx
import React from 'react'

export default function Tiers() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Choose a plan</h3>
          <p className="text-muted">Three common packages — each can be customised to your exact needs.</p>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="price-card p-4 text-center">
              <h5 className="mb-1">Informative</h5>
              <div className="price">₹12,000</div>
              <p className="small text-muted mb-3">Single page / small brochure site — fast & SEO friendly.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>✓ Responsive template</li>
                <li>✓ 5 pages</li>
                <li>✓ Basic SEO</li>
                <li>✓ Contact form</li>
              </ul>
              <a className="btn btn-primary" href="/contact">Get Started</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-4 text-center featured">
              <h5 className="mb-1">Dynamic</h5>
              <div className="price">₹40,000</div>
              <p className="small text-muted mb-3">CMS-powered website for blogs, content and moderate scale.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>✓ Headless / WordPress CMS</li>
                <li>✓ Up to 25 pages</li>
                <li>✓ SEO + Analytics</li>
                <li>✓ Admin panel & training</li>
              </ul>
              <a className="btn btn-primary" href="/contact">Choose Plan</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-4 text-center">
              <h5 className="mb-1">E-commerce</h5>
              <div className="price">₹75,000</div>
              <p className="small text-muted mb-3">Full e-commerce store with payments, shipping and product management.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>✓ Product catalog</li>
                <li>✓ Cart & Checkout</li>
                <li>✓ Payment & Shipping</li>
                <li>✓ Order management</li>
              </ul>
              <a className="btn btn-primary" href="/contact">Get Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
