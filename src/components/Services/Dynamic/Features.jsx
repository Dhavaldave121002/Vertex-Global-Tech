// src/components/Services/Dynamic/Features.jsx
import React from 'react'

export default function Features() {
  const features = [
    {t:'Headless CMS', d:'Content-first editing with Strapi / Sanity / Contentful.'},
    {t:'SEO & SSR', d:'Server-side rendering for SEO & fast first paint.'},
    {t:'Authentication', d:'User accounts, gated content, protected routes.'},
    {t:'Integrations', d:'Payments, CRM, analytics, marketing automations.'},
    {t:'eCommerce', d:'Product catalogs, cart, checkout integrations.'},
    {t:'Performance', d:'CDN, caching, image optimisation and monitoring.'}
  ]
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Features of our dynamic sites</h3>
          <p className="text-muted">Admin dashboard, content workflows, user roles, third-party integrations and scalable hosting.</p>
        </div>

        <div className="row g-3">
          {features.map((f,i) => (
            <div key={i} className="col-md-4">
              <div className="feature-card p-3 h-100">
                <h5 className="mb-1">{f.t}</h5>
                <p className="text-muted small mb-0">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
