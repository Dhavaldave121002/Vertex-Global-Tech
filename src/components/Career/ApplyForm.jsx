import React, { useEffect, useRef } from 'react'
import { JOBS } from './jobs-data'

export default function ApplyForm({ applyData, setApplyData, errors, setErrors, inModal = false }) {
  const nameRef = useRef(null)

  useEffect(() => {
    if (!applyData) return
    if (inModal) {
      nameRef.current?.focus()
      return
    }

    if (applyData && applyData.jobId) {
      const el = document.getElementById('apply-form')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      nameRef.current?.focus()
    }
  }, [applyData?.jobId, inModal]) // Simplified dependency

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

    // Handle resume file
    const resumeInput = document.querySelector('input[type="file"]');
    const resumeFile = resumeInput?.files[0];

    if (resumeFile) {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = function (event) {
        saveApplication(event.target.result, resumeFile.name, job);
      };
      reader.readAsDataURL(resumeFile);
    } else {
      saveApplication(null, null, job);
    }
  }

  function saveApplication(resumeData, resumeFileName, job) {
    // Save application to localStorage
    const application = {
      id: Date.now(),
      ...applyData,
      jobTitle: job.title,
      jobType: job.type,
      resumeData,
      resumeFileName,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    const existingApplications = JSON.parse(localStorage.getItem('vgtw_applications') || '[]');
    existingApplications.unshift(application);
    localStorage.setItem('vgtw_applications', JSON.stringify(existingApplications));
    window.dispatchEvent(new Event('storage'));

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

  const inputClasses = `w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`
  const labelClasses = "block text-sm font-medium text-gray-400 mb-1.5"
  const errorClasses = "text-red-500 text-xs mt-1"

  return (
    <div id="apply-form" className="w-full">
      {!inModal && <h4 className="text-xl font-bold text-white mb-4">Apply now</h4>}

      <p className="text-gray-400 text-sm mb-6">
        Fill the form. Your email client will open — attach your resume and send.
      </p>

      <form onSubmit={submit} noValidate className="space-y-4">

        <div>
          <label className={labelClasses}>Position</label>
          <div className="relative">
            <select
              name="jobId"
              value={applyData.jobId}
              onChange={update}
              className={`${inputClasses} appearance-none cursor-pointer ${errors.jobId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="" className="bg-gray-900 text-gray-400">Select a position…</option>
              {JOBS.map(j => (
                <option key={j.id} value={j.id} className="bg-gray-900 text-white">{j.title} — {j.type}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
          </div>
          {errors.jobId && <div className={errorClasses}>{errors.jobId}</div>}
        </div>

        <div>
          <label className={labelClasses}>Full name</label>
          <input
            id="apply-name"
            ref={nameRef}
            name="name"
            value={applyData.name}
            onChange={update}
            className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Your name"
          />
          {errors.name && <div className={errorClasses}>{errors.name}</div>}
        </div>

        <div>
          <label className={labelClasses}>Email</label>
          <input
            name="email"
            type="email"
            value={applyData.email}
            onChange={update}
            className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
            placeholder="you@company.com"
          />
          {errors.email && <div className={errorClasses}>{errors.email}</div>}
        </div>

        <div>
          <label className={labelClasses}>Phone (optional)</label>
          <input
            name="phone"
            value={applyData.phone}
            onChange={update}
            className={inputClasses}
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label className={labelClasses}>Message</label>
          <textarea
            name="message"
            rows="4"
            value={applyData.message}
            onChange={update}
            className={`${inputClasses} ${errors.message ? 'border-red-500' : ''}`}
            placeholder="Short cover note"
          ></textarea>
          {errors.message && <div className={errorClasses}>{errors.message}</div>}
        </div>

        <div>
          <label className={labelClasses}>Resume</label>
          <input
            className={inputClasses}
            type="file"
            accept=".pdf,.doc,.docx"
          />
          <div className="text-xs text-blue-400 mt-1.5 font-medium">
            Upload your resume (PDF or DOC). It will be saved with your application.
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 mt-2"
          type="submit"
        >
          Apply — open email
        </button>

      </form>
    </div>
  )
}
