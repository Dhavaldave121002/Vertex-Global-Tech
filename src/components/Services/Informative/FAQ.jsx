// src/components/Services/Informative/FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <h3 className="mb-3">Frequently asked questions</h3>

        <div className="accordion" id="infFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">How long does an informative site take?</button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#infFaq">
              <div className="accordion-body text-muted">Usually 2–4 weeks for a Starter site depending on feedback and content readiness.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">Do you provide content & images?</button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#infFaq">
              <div className="accordion-body text-muted">We can help with copy and stock imagery for an extra fee or you can provide your own assets.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
