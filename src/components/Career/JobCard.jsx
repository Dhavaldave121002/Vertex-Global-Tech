// src/components/Career/JobCard.jsx
import React from 'react'
import '../../pages/career.css' // Import the new CSS

export default function JobCard({ job, expanded, setExpanded, setApplyData }) {
  return (
    <article className="job-card p-3 mb-3">
      <div className="d-flex align-items-start">

        <div className="me-3 job-meta">
          <span className="job-type">{job.type}</span>
          <div className="job-location mt-2">{job.location}</div>
        </div>

        <div className="flex-grow-1">

          <div className="d-flex align-items-start">
            <h5 className="job-title mb-1">{job.title}</h5>
            <small className="ms-auto text-muted">{job.seniority}</small>
          </div>

          <p className="text-muted mb-2 small">{job.about}</p>

          <div className="d-flex flex-wrap gap-2 mb-2">
            {job.skills.map(s => (
              <span className="skill-chip" key={s}>{s}</span>
            ))}
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setApplyData(d => ({ ...d, jobId: job.id, jobTitle: job.title })) // Pass title too
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
              }}
            >
              Apply
            </button>

            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setExpanded(prev => prev === job.id ? null : job.id)}
            >
              {expanded === job.id ? 'Hide details' : 'View details'}
            </button>
          </div>

          {expanded === job.id && (
            <div className="job-details mt-3">
              <div className="row">

                <div className="col-md-6">
                  <h6>Responsibilities</h6>
                  <ul className="small text-muted">
                    {job.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-6">
                  <h6>Qualifications</h6>
                  <ul className="small text-muted">
                    {job.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                </ul>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  )
}