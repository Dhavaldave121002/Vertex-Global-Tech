// Offerings.jsx
import React from 'react'

export default function Offerings() {
  const items = [
    { t: 'User Research', d: 'Persona workshops, interviews and usability studies.' },
    { t: 'Interaction Design', d: 'Wireframes, flows and micro-interactions.' },
    { t: 'Visual Design', d: 'High-fidelity UI, brand alignment & accessibility.' },
    { t: 'Prototyping', d: 'Clickable prototypes for testing.' },
    { t: 'Design Systems', d: 'Components, tokens and docs.' },
    { t: 'Usability Testing', d: 'Remote & in-person sessions with synthesis.' }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Our design offerings</h3>
          <p className="text-muted">End-to-end product design from research to high-fidelity prototypes and systems.</p>
        </div>

        <div className="row g-3">
          {items.map((o, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="offering-card p-3 h-100">
                <h5 className="mb-1">{o.t}</h5>
                <p className="text-muted small mb-0">{o.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
