import React from 'react'
import { Link } from 'react-router-dom'
import '../service-pricing.css'

export default function Android() {
  return (
    <>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-breadcrumb"><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <Link to="/services/application">Application</Link> / Android</p>
          <h1 className="sp-section-title">Android App Development</h1>
          <p className="text-muted">Native Android apps with Kotlin, modern architecture and Play Store deployment.</p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="sp-card">
              <h3>What we deliver</h3>
              <ul className="sp-feature-list">
                <li>Kotlin-based architecture</li>
                <li>Material Design UI & accessibility</li>
                <li>Play Store submission & maintenance</li>
              </ul>
              <div className="sp-cta">
                <Link to="/pricing/application" className="btn btn-primary">View App Plans</Link>
                <Link to="/contact" className="btn btn-outline-light ms-2">Start a Project</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sp-card">
              <h5>Common use-cases</h5>
              <ul className="sp-feature-list">
                <li>Consumer apps</li>
                <li>Enterprise tools</li>
                <li>Offline-capable apps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
