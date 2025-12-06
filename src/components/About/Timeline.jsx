// src/components/About/Timeline.jsx
import React from 'react'
import './about.css' // Import the new CSS

function TimelineItem({ year, title, text }) {
  return (
    <div className="timeline-item d-flex align-items-start mb-3">
      <div className="timeline-year me-3">{year}</div>
      <div>
        <h5 className="mb-1">{title}</h5>
        <p className="text-white mb-0 small">{text}</p>
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <div className="timeline-wrap mt-5">
      <div className="text-center mb-4">
        <h3>Journey so far</h3>
        <p className="text-white">Small team, big impact — selected milestones.</p>
      </div>

      <div className="timeline-list">
        <TimelineItem year="2021" title="Founded" text="Started with a small web dev & design team, focusing on high-performance websites." />
        <TimelineItem year="2022" title="50+ Projects" text="Successfully delivered websites & apps for startups and SMEs across various sectors." />
        <TimelineItem year="2023" title="Expanded Services" text="Officially added dedicated mobile app development and in-depth UX research to our offering." />
        <TimelineItem year="2024" title="Enterprise Clients" text="Onboarded larger partners, established comprehensive Service Level Agreements (SLAs), and focused on complex architecture." />
      </div>
    </div>
  )
}