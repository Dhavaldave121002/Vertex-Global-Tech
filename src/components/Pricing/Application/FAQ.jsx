// src/components/Pricing/Application/FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">Frequently asked</h3>
        <div className="accordion" id="appPricingFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="apfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse1" aria-expanded="false" aria-controls="acollapse1">
                How do you handle store submissions?
              </button>
            </h2>
            <div id="acollapse1" className="accordion-collapse collapse" aria-labelledby="apfaq1" data-bs-parent="#appPricingFaq">
              <div className="accordion-body text-muted">We support Play Store & App Store submission including assets, privacy policy and handling review feedback.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
