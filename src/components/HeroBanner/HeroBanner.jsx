import React from 'react'
import { Link } from 'react-router-dom'
import Mock3D from '../Mock3D/Mock3D'
import './hero.css'

export default function HeroBanner() {
  return (
    <header className="hero-wrap" role="banner" aria-label="Hero banner showcasing services">
      <div className="container">
        <div className="row align-items-center gx-4 gy-5"> {/* Added gy-5 for mobile spacing */}

          {/* LEFT content */}
          <div className="col-12 col-lg-6">
            <p className="eyebrow">Vertex Global Tech</p>

            <h1 className="hero-heading">
              Build fast, beautiful digital products for real users.
              <span className="hero-em">Design • Performance • Scale</span>
            </h1>

            <p className="hero-lead">
              We design and engineer high-performing websites and mobile apps for startups and enterprises. Fast load times, accessible UI and measurable growth — that’s our promise.
            </p>

            <div className="d-flex gap-3 mt-4"> {/* Increased gap for better spacing */}
              <Link to="/services" className="btn btn-primary btn-lg hero-cta-primary">Our Services</Link>
              <Link to="/pricing" className="btn btn-outline-light btn-lg hero-cta-secondary">Pricing</Link>
            </div>

            <div className="hero-metrics d-flex gap-4 mt-5 pt-3 border-top" aria-hidden="true"> {/* Added border-top and increased top margin */}
              <div className="metric"><strong>120+</strong><small>Projects Delivered</small></div>
              <div className="metric"><strong>0.8s</strong><small>Avg Load Time</small></div>
              <div className="metric"><strong>99.9%</strong><small>Uptime Guarantee</small></div>
            </div>
          </div>

          {/* RIGHT visual */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <Mock3D />
          </div>
        </div>
      </div>
    </header>
  )
}