import React from 'react'

function ServiceCard({ title, subtitle }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{subtitle}</p>
        <a href="/contact" className="stretched-link">Get in touch</a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="container py-5">
      <h2 className="mb-4">Services</h2>

      <div className="row g-4">
        <div className="col-12 col-md-4"><ServiceCard title="Informative Website" subtitle="Fast, SEO-friendly brochure websites." /></div>
        <div className="col-12 col-md-4"><ServiceCard title="Dynamic Website" subtitle="CMS-powered or custom dashboards & portals." /></div>
        <div className="col-12 col-md-4"><ServiceCard title="E-Commerce Website" subtitle="High-converting online stores." /></div>
        <div className="col-12 col-md-4"><ServiceCard title="Application Development" subtitle="Android & iOS native apps and cross-platform." /></div>
        <div className="col-12 col-md-4"><ServiceCard title="UI / UX — Website" subtitle="Design systems, prototypes, and UI kits." /></div>
        <div className="col-12 col-md-4"><ServiceCard title="UI / UX — Application" subtitle="Mobile-first UX with performance in mind." /></div>
      </div>
    </section>
  )
}
