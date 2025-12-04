// FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">Frequently asked questions</h3>

        <div className="accordion" id="ecomFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse1" aria-expanded="false">How long does an e-commerce site take?</button>
            </h2>
            <div id="ecollapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-muted">Starter: 4–6 weeks; Business: 8–12 weeks depending on integrations.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse2" aria-expanded="false">Do you handle payment & tax setup?</button>
            </h2>
            <div id="ecollapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-muted">Yes — we integrate payment gateways and configure tax rules.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
