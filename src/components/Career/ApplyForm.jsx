// src/components/Career/ApplyForm.jsx
import React from 'react'
import { JOBS } from './jobs-data'
import '../../pages/career.css' // Import the new CSS

export default function ApplyForm({ applyData, setApplyData, errors, setErrors }) {

  function validate() {
    const err = {}
    if (!applyData.name.trim()) err.name = 'Name required'
    if (!applyData.email.trim()) err.email = 'Email required'
    else if (!/^\S+@\S+\.\S+$/.test(applyData.email)) err.email = 'Invalid email'
    if (!applyData.jobId) err.jobId = 'Select a job'
    if (!applyData.message.trim()) err.message = 'Write a short message'
    return err
  }

  function submit(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }

    const job = JOBS.find(j => j.id === applyData.jobId)
    const subject = encodeURIComponent(`Job Application — ${job.title}`)
    const body = encodeURIComponent(`
Name: ${applyData.name}
Email: ${applyData.email}
Phone: ${applyData.phone}

Position: ${job.title}

Message:
${applyData.message}

(Attach your resume manually before sending)
    `)

    window.location.href = `mailto:hr@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  function update(e) {
    setApplyData(d => ({ ...d, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  return (
    <div className="card apply-card p-4">
      <h4 className="mb-2">Apply now</h4>

      <p className="text-muted small mb-3">
        Fill the form. Your email client will open — attach your resume and send.
      </p>

      <form onSubmit={submit} noValidate>

        <div className="mb-2">
          <label className="form-label small">Position</label>
          <select
            name="jobId"
            value={applyData.jobId}
            onChange={update}
            className={`form-select form-select-sm ${errors.jobId ? 'is-invalid' : ''}`}
          >
            <option value="">Select a position…</option>
            {JOBS.map(j => (
              <option key={j.id} value={j.id}>{j.title} — {j.type}</option>
            ))}
          </select>
          {errors.jobId && <div className="invalid-feedback">{errors.jobId}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label small">Full name</label>
          <input
            name="name"
            value={applyData.name}
            onChange={update}
            className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Your name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label small">Email</label>
          <input
            name="email"
            type="email"
            value={applyData.email}
            onChange={update}
            className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
            placeholder="you@company.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label small">Phone (optional)</label>
          <input
            name="phone"
            value={applyData.phone}
            onChange={update}
            className="form-control form-control-sm"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="mb-2">
          <label className="form-label small">Message</label>
          <textarea
            name="message"
            rows="4"
            value={applyData.message}
            onChange={update}
            className={`form-control form-control-sm ${errors.message ? 'is-invalid' : ''}`}
            placeholder="Short cover note"
          ></textarea>
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label small">Resume</label>
          <input className="form-control form-control-sm" type="file" disabled /> {/* Disabled to prevent misleading users */}
          <div className="form-text small">
            You must attach the file **manually** when your email client opens.
          </div>
        </div>

        <button className="btn btn-primary btn-sm" type="submit">
          Apply — open email
        </button>

      </form>
    </div>
  )
}