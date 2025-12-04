// src/components/Services/Application/Features.jsx
import React from 'react'

export default function Features() {
  const items = [
    { t: 'Native Android', d: 'Kotlin/Jetpack implementation for performance and deep platform integration.' },
    { t: 'Native iOS', d: 'Swift + SwiftUI/Combine for smooth, native user experiences.' },
    { t: 'Cross-platform', d: 'React Native & Flutter to accelerate delivery while keeping native feel.' },
    { t: 'Offline & Sync', d: 'Offline-first patterns, background sync and conflict resolution.' },
    { t: 'Auth & Security', d: 'OAuth, JWT, biometric auth and secure storage best-practices.' },
    { t: 'Analytics & Crash', d: 'Integrations with analytics, A/B testing and crash reporting.' }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3>What we build</h3>
          <p className="text-muted">Consumer apps, enterprise apps, SaaS mobile frontends, and marketplaces — tailored to business goals.</p>
        </div>

        <div className="row g-3">
          {items.map((it, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="feature-card p-3 h-100">
                <h5 className="mb-1">{it.t}</h5>
                <p className="text-muted small mb-0">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
