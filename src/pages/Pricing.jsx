import React from 'react'

function PriceCard({ title, price, items }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body">
        <h5>{title}</h5>
        <div className="display-6 fw-bold my-3">{price}</div>
        <ul className="list-unstyled text-muted">
          {items.map((i, idx) => <li key={idx} className="mb-2">• {i}</li>)}
        </ul>
        <a href="/contact" className="btn btn-primary mt-3">Start</a>
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section className="container py-5">
      <h2 className="mb-4">Plans & Pricing</h2>

      <div className="row g-4">
        <div className="col-12 col-md-4"><PriceCard title="Website Basic" price="₹15,000" items={['Informative site','Responsive','SEO basics']} /></div>
        <div className="col-12 col-md-4"><PriceCard title="Application Basic" price="₹45,000" items={['Android or iOS','Core features','Play store support']} /></div>
        <div className="col-12 col-md-4"><PriceCard title="UI / UX Basic" price="₹12,000" items={['UI kit','2 screens','Prototype']} /></div>
      </div>
    </section>
  )
}
