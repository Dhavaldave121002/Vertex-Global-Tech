// src/components/Services/Application/Platforms.jsx
import React from 'react'

export default function Platforms() {
  return (
    <section className="py-5 bg-soft">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-md-6">
            <h3>Platforms & approaches</h3>
            <p className="text-muted">We select the right platform based on product needs, performance, time-to-market and maintainability.</p>

            <ul className="list-unstyled fw-bold">
              <li>• Native Android — Kotlin, Jetpack</li>
              <li>• Native iOS — Swift, SwiftUI</li>
              <li>• Cross-platform — React Native, Flutter</li>
              <li>• Backend & APIs — Node / .NET / Firebase / GraphQL</li>
              <li>• DevOps — CI/CD, Test automation, Play/App Store pipelines</li>
            </ul>
          </div>

          <div className="col-md-6 text-center">
            <img src="/assets/app-platforms.png" alt="Platforms" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
  )
}
