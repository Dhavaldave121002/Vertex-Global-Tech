// FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">FAQ</h3>

        <div className="accordion" id="uiuxFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="q1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u1" aria-expanded="false" aria-controls="u1">
                How do you handoff designs to devs?
              </button>
            </h2>
            <div id="u1" className="accordion-collapse collapse" aria-labelledby="q1" data-bs-parent="#uiuxFaq">
              <div className="accordion-body text-muted">We provide Figma links, component specs, tokens and code snippets to make handoff frictionless.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="q2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u2" aria-expanded="false" aria-controls="u2">
                Do you include usability testing?
              </button>
            </h2>
            <div id="u2" className="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#uiuxFaq">
              <div className="accordion-body text-muted">Yes — moderated or unmoderated tests, with synthesis and recommendations.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
