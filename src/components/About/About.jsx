import React from 'react'
import { Link } from 'react-router-dom'
import './about.css'

export default function About() {
  return (
    <section className="vg-about">
      <div className="container">

        {/* HERO */}
        <div className="row align-items-center gy-4 about-hero">
          <div className="col-lg-6">
            <p className="eyebrow">About Vertex Global Tech</p>
            <h1 className="hero-title">We design & engineer high-impact digital products</h1>
            <p className="lead text-muted hero-sub">
              Fast, secure and maintainable websites, mobile apps and design systems — built for growth.
              We blend product thinking, modern engineering and measurable UX to deliver results.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
              <Link to="/services/informative" className="btn btn-outline-light btn-lg">Our Services</Link>
            </div>
          </div>

          <div className="col-lg-6 text-center hero-visual-wrap">
            <img src="/assets/about-hero.png" alt="Team collaborating" className="img-fluid hero-visual" />
          </div>
        </div>

        {/* MISSION / VISION */}
        <div className="row gy-4 mt-5 mission-vision">
          <div className="col-md-6">
            <article className="card sp-card p-4 h-100">
              <h3 className="mb-2">Our Mission</h3>
              <p className="text-muted">Build digital products that perform, convert and scale — delivered with clarity and ownership.</p>
              <ul className="sp-feature-list">
                <li>Performance-first engineering</li>
                <li>Design with empathy</li>
                <li>Secure & maintainable systems</li>
              </ul>
            </article>
          </div>

          <div className="col-md-6">
            <article className="card sp-card p-4 h-100">
              <h3 className="mb-2">Our Vision</h3>
              <p className="text-muted">Be the trusted partner for product-driven companies — from MVP to multi-million-user scale.</p>
              <p className="mb-0"><strong>Focus:</strong> maintainability, measurable outcomes, and delightful UX.</p>
            </article>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="values-wrap mt-5">
          <div className="text-center mb-4">
            <h3>Core values</h3>
            <p className="text-muted">Principles that guide our work and culture.</p>
          </div>

          <div className="row g-3">
            <ValueCard title="Ownership" desc="We take responsibility and deliver results." />
            <ValueCard title="Craftsmanship" desc="High-quality code and pixel-perfect design." />
            <ValueCard title="Simplicity" desc="Clear solutions that scale." />
            <ValueCard title="Customer-first" desc="Decisions based on real user outcomes." />
          </div>
        </div>

        {/* TIMELINE */}
        <div className="timeline-wrap mt-5">
          <div className="text-center mb-4">
            <h3>Journey so far</h3>
            <p className="text-muted">Small team, big impact — selected milestones.</p>
          </div>

          <div className="timeline-list">
            <TimelineItem year="2021" title="Founded" text="Started with a small web dev & design team." />
            <TimelineItem year="2022" title="50+ Projects" text="Delivered websites & apps for startups and SMEs." />
            <TimelineItem year="2023" title="Expanded Services" text="Added mobile apps and UX research to our offering." />
            <TimelineItem year="2024" title="Enterprise Clients" text="Onboarded larger partners and SLAs." />
          </div>
        </div>

        {/* TEAM */}
        <div className="team-wrap mt-5 bg-soft p-4 rounded-3">
          <div className="text-center mb-4">
            <h3>Meet the team</h3>
            <p className="text-muted">Small, focused team — experts in product and engineering.</p>
          </div>

          <div className="row g-4">
            <TeamCard name="Dhaval Dave" role="Founder & Tech Lead" img="/assets/team-dhaval.jpg" />
            <TeamCard name="Amit Patel" role="Product Manager" img="/assets/team-amit.jpg" />
            <TeamCard name="Nisha Sharma" role="Lead Designer" img="/assets/team-nisha.jpg" />
            <TeamCard name="Ravi Singh" role="Senior Engineer" img="/assets/team-ravi.jpg" />
          </div>
        </div>

        {/* STATS + CTA */}
        <div className="row mt-5 align-items-center gy-4 stats-cta">
          <div className="col-md-8">
            <div className="row text-center g-3">
              <Stat number="120+" label="Projects" />
              <Stat number="95%" label="Satisfaction" />
              <Stat number="0.8s" label="Avg Load" />
              <Stat number="24/7" label="Support" />
            </div>
          </div>

          <div className="col-md-4 text-md-end text-center">
            <Link to="/contact" className="btn btn-lg btn-primary">Start a Project</Link>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ----------------------------
   small internal subcomponents
   ---------------------------- */

function ValueCard({ title, desc }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="value-card p-3 h-100">
        <div className="value-icon" aria-hidden="true">●</div>
        <h5 className="mt-2 mb-1">{title}</h5>
        <p className="text-muted mb-0 small">{desc}</p>
      </div>
    </div>
  )
}

function TimelineItem({ year, title, text }) {
  return (
    <div className="timeline-item d-flex align-items-start">
      <div className="timeline-year me-3">{year}</div>
      <div>
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted mb-0 small">{text}</p>
      </div>
    </div>
  )
}

function TeamCard({ name, role, img }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="team-card text-center p-3 h-100">
        <img src={img} alt={name} className="team-img rounded-circle mb-3" />
        <h6 className="mb-1">{name}</h6>
        <small className="text-muted">{role}</small>
      </div>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="col-6 col-sm-3">
      <div className="stat-box p-3 rounded-2">
        <div className="stat-number">{number}</div>
        <div className="stat-label text-muted">{label}</div>
      </div>
    </div>
  )
}
