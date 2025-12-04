// Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="uiux-hero py-6">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <p className="eyebrow">UI / UX Design</p>
            <h1 className="display-5">Designing interfaces people love to use</h1>
            <p className="lead text-muted">
              Research-driven, conversion-focused UI/UX for web & mobile. Wireframes, prototypes and design systems.
            </p>

            <div className="mt-3 d-flex gap-2">
              <a href="#contact" className="btn btn-primary btn-lg">Request Proposal</a>
              <a href="#process" className="btn btn-outline-light btn-lg">See Process</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/uiux-hero.png" alt="UI/UX mock" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
