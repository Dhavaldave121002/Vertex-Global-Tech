// src/components/Services/Informative/Benefits.jsx
import React from 'react'

function Benefit({ title, text }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="benefit-card p-3 h-100">
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}

export default function Benefits() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>Why choose an Informative Website?</h3>
          <p className="text-muted">Fast to launch, low maintenance, clear messaging — ideal for lead generation and brand presence.</p>
        </div>

        <div className="row g-3">
          <Benefit title="Clear Messaging" text="Crafted info architecture and copy that clarifies what you do and why customers should trust you." />
          <Benefit title="SEO & Performance" text="Optimised for search and fast load times so users find you and stay." />
          <Benefit title="Mobile-first" text="Responsive layouts and touch-friendly interactions across all devices." />
          <Benefit title="Easy Editing" text="Simple CMS / admin or static site with easy content updates." />
        </div>
      </div>
    </section>
  )
}
