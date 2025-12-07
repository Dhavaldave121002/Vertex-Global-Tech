// src/components/Career/JobList.jsx
import React from 'react'
import { JOBS } from './jobs-data'
import JobCard from './JobCard'
import '../../pages/career.css' // Import the new CSS

export default function JobList({ filter, expanded, setExpanded, applyData, setApplyData }) {

  const filtered = JOBS.filter(j =>
    filter === 'All'
      ? true
      : filter === 'Remote'
      ? j.location.toLowerCase().includes('remote')
      : j.type === filter
  )

  return (
    <section className="job-list-container">
      {filtered.map(job => (
        <JobCard
          key={job.id}
          job={job}
          expanded={expanded}
          setExpanded={setExpanded}
          applyData={applyData}
          setApplyData={setApplyData}
        />
      ))}

      {filtered.length === 0 && (
        <div className="alert alert-info">
          No roles match this filter. Email us at
          {' '}
          <a href="mailto:hr@vertexglobaltech.com">hr@vertexglobaltech.com</a>.
        </div>
      )}
    </section>
  )
}