// src/pages/pricing/WebsitePricing.jsx
import React from 'react'
import './pricing.css'

export default function WebsitePricing(){
  return (
    <main className="pricing-page">
      <section className="pricing-hero py-6">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-lg-7">
              <p className="eyebrow">Website Plans</p>
              <h1 className="display-5">Website pricing, designed for growth</h1>
              <p className="lead text-muted">Clear, predictable packages for brochure sites, dynamic CMS sites and SEO-first e-commerce stores.</p>
            </div>

            <div className="col-lg-5 text-center">
              <img src="/assets/pricing-website.png" alt="Website pricing" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Choose a plan</h3>
            <p className="text-muted">Three common packages — each can be customised to your exact needs.</p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">Informative</h5>
                <div className="price">₹12,000</div>
                <p className="small text-muted mb-3">Single page / small brochure site — fast & SEO friendly.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Responsive template</li>
                  <li>✓ 5 pages</li>
                  <li>✓ Basic SEO</li>
                  <li>✓ Contact form</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Get Started</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center featured">
                <h5 className="mb-1">Dynamic</h5>
                <div className="price">₹40,000</div>
                <p className="small text-muted mb-3">CMS-powered website for blogs, content and moderate scale.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Headless / WordPress CMS</li>
                  <li>✓ Up to 25 pages</li>
                  <li>✓ SEO + Analytics</li>
                  <li>✓ Admin panel & training</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Choose Plan</a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="price-card p-4 text-center">
                <h5 className="mb-1">E-commerce</h5>
                <div className="price">₹75,000</div>
                <p className="small text-muted mb-3">Full e-commerce store with payments, shipping and product management.</p>
                <ul className="list-unstyled text-start mb-3">
                  <li>✓ Product catalog</li>
                  <li>✓ Cart & Checkout</li>
                  <li>✓ Payment & Shipping</li>
                  <li>✓ Order management</li>
                </ul>
                <a className="btn btn-primary" href="/contact">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-3">
            <h4>Feature comparison</h4>
            <p className="text-muted">Quick glance at what each plan includes.</p>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless pricing-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Informative</th>
                  <th>Dynamic</th>
                  <th>E-commerce</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Pages</td><td>Up to 5</td><td>Up to 25</td><td>Unlimited (catalog)</td></tr>
                <tr><td>CMS</td><td>—</td><td>Included</td><td>Included</td></tr>
                <tr><td>Payment</td><td>—</td><td>—</td><td>Included</td></tr>
                <tr><td>SEO</td><td>Basic</td><td>Advanced</td><td>Advanced</td></tr>
                <tr><td>Support</td><td>Email</td><td>Priority</td><td>Priority + SLA</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="py-5 bg-soft">
        <div className="container text-center">
          <h4>Ready to get started?</h4>
          <p className="text-muted">Contact us with brief details and we’ll send a tailored proposal.</p>
          <a className="btn btn-primary me-2" href="/contact">Contact Sales</a>
          <a className="btn btn-outline-light" href="mailto:hello@vertexglobaltech.com?subject=Website%20Plan%20Inquiry">Request Quote</a>
        </div>
      </section>
    </main>
  )
}
