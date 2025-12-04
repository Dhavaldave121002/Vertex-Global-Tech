// src/components/Services/Application/FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <h3 className="mb-3">FAQ</h3>

        <div className="accordion" id="appFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqA1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse1" aria-expanded="false">What platform should I choose?</button>
            </h2>
            <div id="acollapse1" className="accordion-collapse collapse" aria-labelledby="faqA1" data-bs-parent="#appFaq">
              <div className="accordion-body text-muted">We evaluate product needs: native for deep features & performance; React Native/Flutter for faster delivery & shared code.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqA2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse2" aria-expanded="false">Do you publish apps to stores?</button>
            </h2>
            <div id="acollapse2" className="accordion-collapse collapse" aria-labelledby="faqA2" data-bs-parent="#appFaq">
              <div className="accordion-body text-muted">Yes — we prepare assets, handle submission, address review feedback and set up CI pipelines for future releases.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
