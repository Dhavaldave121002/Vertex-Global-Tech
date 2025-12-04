// Features.jsx
import React from 'react'

export default function Features() {
  const items = [
    { t: 'Product Catalog & Search', d: 'Fast browsing, faceted search and variants.' },
    { t: 'Secure Payments', d: 'Stripe, Razorpay, PayPal integrations.' },
    { t: 'Checkout & Cart', d: 'Optimised checkout flows & abandoned cart recovery.' },
    { t: 'Inventory & Orders', d: 'Admin panels for stock, order management.' },
    { t: 'Shipping & Tax', d: 'Carrier integration, live rates and tax rules.' },
    { t: 'Performance & SEO', d: 'Image optimization, CDN, SSR & SEO.' }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>What we deliver</h3>
          <p className="text-muted">From catalog to conversion: UX, inventory, payments, shipping and analytics.</p>
        </div>

        <div className="row g-3">
          {items.map((it, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="ecom-feature p-3 h-100">
                <h5 className="mb-1">{it.t}</h5>
                <p className="text-muted small mb-0">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
