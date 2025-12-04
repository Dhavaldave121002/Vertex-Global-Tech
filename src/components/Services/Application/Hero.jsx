// src/components/Services/Application/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="app-hero">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <p className="eyebrow">Application Development</p>
            <h1 className="display-5">Native & cross-platform apps that scale</h1>
            <p className="lead text-muted">Android, iOS and cross-platform (React Native & Flutter) — performant apps with clean code and delightful UX.</p>
            <div className="mt-3 d-flex gap-2">
              <a href="#contact" className="btn btn-primary btn-lg">Request Quote</a>
              <a href="#process" className="btn btn-outline-light btn-lg">Our Process</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/app-hero-mock.png" alt="App mockups" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
