// src/components/Pricing/Website/FAQ.jsx
import React from 'react'

export default function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">Frequently asked</h3>
        <div className="accordion" id="webPricingFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="wfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcollapse1" aria-expanded="false" aria-controls="wcollapse1">
                How long does a dynamic site take?
              </button>
            </h2>
            <div id="wcollapse1" className="accordion-collapse collapse" aria-labelledby="wfaq1" data-bs-parent="#webPricingFaq">
              <div className="accordion-body text-muted">Dynamic sites usually take 4–8 weeks depending on scope and integrations.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="wfaq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcollapse2" aria-expanded="false" aria-controls="wcollapse2">
                Do you provide hosting?
              </button>
            </h2>
            <div id="wcollapse2" className="accordion-collapse collapse" aria-labelledby="wfaq2" data-bs-parent="#webPricingFaq">
              <div className="accordion-body text-muted">We can provision hosting (managed) or hand over to your provider. We recommend CDN + automated deploys for best performance.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
