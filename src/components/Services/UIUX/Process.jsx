// Process.jsx
import React from 'react'

export default function Process() {
  const steps = [
    { n: '1', title: 'Discovery', text: 'Workshops, analytics & research.' },
    { n: '2', title: 'Structure', text: 'IA, flows and wireframes.' },
    { n: '3', title: 'Design', text: 'High-fidelity UI and tokens.' },
    { n: '4', title: 'Prototype', text: 'Interactive prototypes for testing.' },
    { n: '5', title: 'Validate', text: 'Usability testing & handoff.' }
  ]

  return (
    <section id="process" className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Design process</h3>
          <p className="text-muted">A collaborative process focused on outcomes.</p>
        </div>

        <div className="row g-3">
          {steps.map((s, i) => (
            <div className="col-md-4" key={i}>
              <div className="process p-3 text-center h-100">
                <div className="step">{s.n}</div>
                <h6 className="mt-2">{s.title}</h6>
                <p className="small text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
