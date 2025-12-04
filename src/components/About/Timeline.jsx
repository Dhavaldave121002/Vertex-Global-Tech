// src/components/About/Timeline.jsx
import React from 'react'

function TimelineItem({ year, title, text }) {
  return (
    <div className="timeline-item d-flex align-items-start mb-3">
      <div className="timeline-year me-3">{year}</div>
      <div>
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted mb-0 small">{text}</p>
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
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
  )
}
