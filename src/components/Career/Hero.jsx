// src/components/Career/Hero.jsx
import React from 'react'
import '../../pages/career.css' // Import the new CSS

export default function Hero() {
  return (
    <header className="career-hero text-center mb-4">
      <p className="eyebrow">Work with us</p>
      <h1>Join Vertex Global Tech</h1>
      <p className="lead text-muted">
        We hire curious engineers and designers who care about craftsmanship and product outcomes.
      </p>
    </header>
  )
}