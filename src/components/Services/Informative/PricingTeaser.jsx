// src/components/Services/Informative/PricingTeaser.jsx
import React from 'react'

function PriceCard({ title, price, bullets = [], featured }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className={`price-card h-100 p-3 ${featured ? 'featured' : ''}`}>
        <h5>{title}</h5>
        <div className="price display-6">{price}</div>
        <ul className="list-unstyled mt-2 mb-3">
          {bullets.map((b, i) => <li key={i} className="small text-muted">• {b}</li>)}
        </ul>
        <a href="/contact" className="btn btn-sm btn-primary">Choose</a>
      </div>
    </div>
  )
}

export default function PricingTeaser() {
  return (
    <section id="pricing" className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Simple pricing</h3>
          <p className="text-muted">Transparent packages for brochure websites. Custom quotes available for complex projects.</p>
        </div>

        <div className="row g-3 justify-content-center">
          <PriceCard title="Starter" price="₹12,000" bullets={['Up to 5 pages','Responsive','Basic SEO']} />
          <PriceCard title="Business" price="₹25,000" featured bullets={['Up to 12 pages','CMS','Contact forms','Analytics']} />
          <PriceCard title="Enterprise" price="Custom" bullets={['Large sites','Integrations','Priority support']} />
        </div>
      </div>
    </section>
  )
}
