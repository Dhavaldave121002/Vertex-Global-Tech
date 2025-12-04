// Process.jsx
import React from 'react'

export default function Process() {
  const steps = [
    { s: '1', t: 'Discovery & Scope', d: 'Business goals, catalog & KPIs.' },
    { s: '2', t: 'Design & Prototyping', d: 'Product pages & checkout UX.' },
    { s: '3', t: 'Build & Integrate', d: 'Payments, logistics, headless' },
    { s: '4', t: 'Test & QA', d: 'Order flows, security and load testing.' },
    { s: '5', t: 'Launch & Optimize', d: 'Monitor, optimise and iterate.' }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Our process</h3>
          <p className="text-muted">A pragmatic 5-step process to ship an e-commerce platform.</p>
        </div>

        <div className="row g-3">
          {steps.map((st, i) => (
            <div key={i} className="col-md-4">
              <div className="process p-3 text-center h-100">
                <div className="step">{st.s}</div>
                <h6 className="mt-2">{st.t}</h6>
                <p className="small text-muted">{st.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
