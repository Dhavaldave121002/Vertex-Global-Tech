// src/pages/Career.jsx
import React, { useState } from 'react'
import './career.css'
import { Link } from 'react-router-dom'

const JOBS = [
  {
    id: 'fe-dev',
    title: 'Frontend Developer (React)',
    type: 'Full-time',
    location: 'Ahmedabad (Hybrid)',
    seniority: 'Mid-level',
    skills: ['React', 'Bootstrap', 'HTML', 'CSS', 'JS'],
    about: 'Build pixel-perfect, accessible UI and reusable components for client projects.',
    responsibilities: [
      'Develop responsive UI components with React & Bootstrap',
      'Collaborate with designers & backend engineers',
      'Write tests and maintain documentation'
    ],
    qualifications: ['2+ years in frontend', 'Strong JS & CSS knowledge', 'Portfolio or GitHub']
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Developer (Flutter)',
    type: 'Full-time',
    location: 'Remote',
    seniority: 'Mid-level',
    skills: ['Flutter', 'Dart', 'APIs', 'CI/CD'],
    about: 'Build cross-platform mobile apps using Flutter with focus on performance and UX.',
    responsibilities: [
      'Develop features in Flutter for Android & iOS',
      'Integrate REST/GraphQL APIs',
      'Work on app performance & release pipelines'
    ],
    qualifications: ['1.5+ years Flutter experience', 'Published apps preferred']
  },
  {
    id: 'uiux',
    title: 'UI / UX Designer',
    type: 'Part-time',
    location: 'Ahmedabad / Remote',
    seniority: 'Junior to Mid',
    skills: ['Figma', 'Prototyping', 'User Research'],
    about: 'Design interfaces that convert — prototypes, design systems and usability testing.',
    responsibilities: [
      'Create wireframes, prototypes and handoffs',
      'Run usability sessions and iterate on insights',
      'Build design system components'
    ],
    qualifications: ['Strong Figma portfolio', 'Understanding of accessibility & UX patterns']
  }
]

export default function Career() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [applyData, setApplyData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    jobId: ''
  })
  const [errors, setErrors] = useState({})

  const filteredJobs = JOBS.filter(j => filter === 'All' ? true : (filter === 'Remote' ? j.location.toLowerCase().includes('remote') : j.type === filter))

  function toggleExpand(id) {
    setExpanded(prev => prev === id ? null : id)
  }

  function handleApplyChange(e) {
    const { name, value } = e.target
    setApplyData(d => ({ ...d, [name]: value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  function validateApply() {
    const err = {}
    if (!applyData.name.trim()) err.name = 'Name required'
    if (!applyData.email.trim()) err.email = 'Email required'
    else if (!/^\S+@\S+\.\S+$/.test(applyData.email)) err.email = 'Enter valid email'
    if (!applyData.jobId) err.jobId = 'Select a job'
    if (!applyData.message.trim()) err.message = 'Add a short message / cover note'
    return err
  }

  function submitApply(e) {
    e.preventDefault()
    const err = validateApply()
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }

    // Build mailto body
    const job = JOBS.find(j => j.id === applyData.jobId)
    const subject = encodeURIComponent(`Job Application: ${job ? job.title : 'Application'}`)
    const bodyLines = [
      `Name: ${applyData.name}`,
      `Email: ${applyData.email}`,
      `Phone: ${applyData.phone || '-'}`,
      `Position: ${job ? job.title : applyData.jobId}`,
      '',
      `Cover note:`,
      applyData.message,
      '',
      'Resume: (please attach your resume to the email before sending)'
    ]
    const body = encodeURIComponent(bodyLines.join('\n'))

    // Open user's mail client
    window.location.href = `mailto:hr@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="career-page py-5">
      <div className="container">

        {/* HERO */}
        <header className="career-hero text-center mb-4">
          <p className="eyebrow">Work with us</p>
          <h1>Join Vertex Global Tech</h1>
          <p className="lead text-muted">We hire curious engineers and designers who care about craftsmanship and product outcomes.</p>
        </header>

        {/* Filters */}
        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
          <div className="btn-group" role="group" aria-label="Filter jobs">
            {['All', 'Full-time', 'Part-time', 'Remote'].map(f => (
              <button
                key={f}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-light'}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>

          <div className="ms-auto">
            <Link to="/contact" className="btn btn-sm btn-outline-light">Contact HR</Link>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            {/* JOB LIST */}
            <section aria-label="Open positions">
              {filteredJobs.map(job => (
                <article className="job-card p-3 mb-3" key={job.id}>
                  <div className="d-flex align-items-start">
                    <div className="me-3 job-meta">
                      <span className="job-type">{job.type}</span>
                      <div className="job-location mt-2">{job.location}</div>
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start">
                        <h5 className="mb-1 job-title">{job.title}</h5>
                        <small className="ms-auto text-muted">{job.seniority}</small>
                      </div>
                      <p className="text-muted mb-2 small">{job.about}</p>

                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {job.skills.map(s => <span className="skill-chip" key={s}>{s}</span>)}
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-primary" onClick={() => { setApplyData(d => ({ ...d, jobId: job.id })); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }}>
                          Apply
                        </button>
                        <button className="btn btn-sm btn-outline-light" onClick={() => toggleExpand(job.id)}>
                          {expanded === job.id ? 'Hide details' : 'View details'}
                        </button>
                      </div>

                      {expanded === job.id && (
                        <div className="job-details mt-3">
                          <div className="row">
                            <div className="col-md-6">
                              <h6>Responsibilities</h6>
                              <ul className="small text-muted">
                                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h6>Qualifications</h6>
                              <ul className="small text-muted">
                                {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </article>
              ))}

              {filteredJobs.length === 0 && (
                <div className="alert alert-info">No roles match this filter — check back soon or contact us at <a href="mailto:hr@vertexglobaltech.com">hr@vertexglobaltech.com</a>.</div>
              )}
            </section>
          </div>

          {/* APPLY FORM */}
          <aside className="col-lg-5">
            <div className="card apply-card p-4">
              <h4 className="mb-2">Apply now</h4>
              <p className="text-muted small mb-3">Fill the form and we will open your email client to send the application. Please attach your resume to the email before sending.</p>

              <form onSubmit={submitApply} noValidate>
                <div className="mb-2">
                  <label className="form-label small">Position</label>
                  <select name="jobId" value={applyData.jobId} onChange={e => setApplyData(d => ({ ...d, jobId: e.target.value }))} className={`form-select form-select-sm ${errors.jobId ? 'is-invalid' : ''}`}>
                    <option value="">Select a position...</option>
                    {JOBS.map(j => <option key={j.id} value={j.id}>{j.title} — {j.type}</option>)}
                  </select>
                  {errors.jobId && <div className="invalid-feedback">{errors.jobId}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Full name</label>
                  <input name="name" value={applyData.name} onChange={handleApplyChange} className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} placeholder="Your full name" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Email</label>
                  <input name="email" type="email" value={applyData.email} onChange={handleApplyChange} className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`} placeholder="you@company.com" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Phone (optional)</label>
                  <input name="phone" value={applyData.phone} onChange={handleApplyChange} className="form-control form-control-sm" placeholder="+91 98765 43210" />
                </div>

                <div className="mb-2">
                  <label className="form-label small">Short message / cover note</label>
                  <textarea name="message" value={applyData.message} onChange={handleApplyChange} className={`form-control form-control-sm ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Why are you a good fit?"></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label small">Resume</label>
                  <input className="form-control form-control-sm" type="file" aria-label="Upload resume (optional)" />
                  <div className="form-text small">Note: resume file cannot be attached automatically to the email. Attach manually in the mail client when it opens.</div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <button className="btn btn-primary btn-sm" type="submit">Apply — open email</button>
                  <a className="btn btn-outline-light btn-sm" href="mailto:hr@vertexglobaltech.com?subject=General%20Inquiry%20about%20Careers">Email HR</a>
                </div>
              </form>
            </div>

            <div className="card recruiter-card p-3 mt-3">
              <h6 className="mb-1">Referrals & recruiters</h6>
              <p className="small text-muted mb-2">For bulk hiring or agency partnerships, email <a href="mailto:talent@vertexglobaltech.com">talent@vertexglobaltech.com</a>.</p>
              <p className="small mb-0"><strong>Response time:</strong> We usually reply within 3–5 business days.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
