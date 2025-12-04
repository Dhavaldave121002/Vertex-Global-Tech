// ContactForm.jsx
import React, { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', company:'', budget:'', message:'' })
  const [errors, setErrors] = useState({})

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email required'
    if (!form.message.trim()) err.message = 'Please add a short brief'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    const subject = encodeURIComponent(`UI/UX Inquiry — ${form.company || 'No company'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || '-'}`,
      '',
      `Brief:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <form className="row g-2" onSubmit={sendQuote} noValidate>
      <div className="col-md-6">
        <input name="name" value={form.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your name" />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-6">
        <input name="email" value={form.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="col-md-6">
        <input name="company" value={form.company} onChange={change} className="form-control" placeholder="Company (optional)" />
      </div>

      <div className="col-md-6">
        <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated budget (optional)" />
      </div>

      <div className="col-12">
        <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Short brief (users, goals, pages)"></textarea>
        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
      </div>

      <div className="col-12">
        <button className="btn btn-primary">Request proposal</button>
        <a className="btn btn-outline-light ms-2" href="/contact">Contact sales</a>
      </div>
    </form>
  )
}
