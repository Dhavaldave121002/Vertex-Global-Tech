// src/components/About/Values.jsx
import React from 'react'

function ValueCard({ title, desc }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="value-card p-3 h-100">
        <div className="value-icon" aria-hidden="true">●</div>
        <h5 className="mt-2 mb-1">{title}</h5>
        <p className="text-muted mb-0 small">{desc}</p>
      </div>
    </div>
  )
}

export default function Values() {
  return (
    <div className="values-wrap mt-5">
      <div className="text-center mb-4">
        <h3>Core values</h3>
        <p className="text-muted">Principles that guide our work and culture.</p>
      </div>

      <div className="row g-3">
        <ValueCard title="Ownership" desc="We take responsibility and deliver results." />
        <ValueCard title="Craftsmanship" desc="High-quality code and pixel-perfect design." />
        <ValueCard title="Simplicity" desc="Clear solutions that scale." />
        <ValueCard title="Customer-first" desc="Decisions based on real user outcomes." />
      </div>
    </div>
  )
}
