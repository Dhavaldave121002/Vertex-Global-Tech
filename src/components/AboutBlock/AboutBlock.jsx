import React from 'react'
import { Link } from 'react-router-dom'
import './about.css'

export default function AboutBlock() {
  return (
    <section className="about-section container py-5">
      <div className="row align-items-center gx-5">
        <div className="col-12 col-lg-6">
          <p className="about-eyebrow">About Vertex Global Tech</p>
          <h2 className="about-title">We transform ideas into scalable digital products</h2>
          <p className="about-text">
            Vertex Global Tech is a modern technology company focused on building
            performant and reliable digital experiences. We blend UI/UX design, engineering,
            and product thinking to ship solutions that drive real results.
          </p>

          <Link to="/about" className="btn btn-primary btn-lg mt-3">More About Us</Link>
        </div>

        <div className="col-12 col-lg-6 text-center mt-4 mt-lg-0">
          <div className="about-img-wrap">
            <img src="/assets/about-tech.jpg" alt="Team at work" className="about-img" />
          </div>
        </div>
      </div>
    </section>
  )
}
