// src/components/Pricing/UIUX/FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">FAQ</h3>
        <div className="accordion" id="uiuxPricingFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="uipfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uipcollapse1" aria-expanded="false" aria-controls="uipcollapse1">
                How do handoffs work?
              </button>
            </h2>
            <div id="uipcollapse1" className="accordion-collapse collapse" aria-labelledby="uipfaq1" data-bs-parent="#uiuxPricingFaq">
              <div className="accordion-body text-muted">We deliver Figma files, component specs, tokens and a handoff doc for developers. We also provide code snippets where required.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
