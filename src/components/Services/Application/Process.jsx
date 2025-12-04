// src/components/Services/Application/Process.jsx
import React from 'react'

export default function Process() {
  const steps = [
    { title: 'Discover', desc: 'Requirements, users, metrics & tech choices.' },
    { title: 'Design', desc: 'Interaction design, prototypes & usability testing.' },
    { title: 'Build', desc: 'Modular code, automated tests & CI.' },
    { title: 'QA', desc: 'Security, performance and real-device testing.' },
    { title: 'Launch', desc: 'Store submission, monitoring and rollout.' }
  ]

  return (
    <section id="process" className="py-5 bg-soft">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Our process</h3>
          <p className="text-muted">From discovery to launch — a practical, test-driven approach.</p>
        </div>

        <div className="row g-3">
          {steps.map((s, i) => (
            <div key={i} className="col-md-4">
              <div className="process-card p-3 h-100 text-center">
                <div className="process-number">{i + 1}</div>
                <h6 className="mt-2">{s.title}</h6>
                <p className="small text-muted mb-0">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
