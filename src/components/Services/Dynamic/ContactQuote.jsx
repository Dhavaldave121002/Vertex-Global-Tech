// src/components/Services/Dynamic/ContactQuote.jsx
import React, { useState } from 'react'

export default function ContactQuote({ inline = false }) {
  const [form, setForm] = useState({ name:'', email:'', website:'', message:'', budget:''})
  function onChange(e){ setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  function sendQuote(e){
    e?.preventDefault()
    const subject = encodeURIComponent(`Dynamic Website Inquiry — ${form.website || 'No website'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Website: ${form.website}`,
      `Estimated budget: ${form.budget}`,
      '',
      `Message:`,
      form.message
    ].join('\n'))
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  if (inline) {
    return (
      <div className="row g-4 align-items-center">
        <div className="col-md-7">
          <h3>Request a quote</h3>
          <p className="text-muted">Tell us briefly about your project and we'll propose a plan and timeline.</p>
          <form className="row g-2" onSubmit={sendQuote} noValidate>
            <div className="col-md-6"><input className="form-control" name="name" placeholder="Your name" value={form.name} onChange={onChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required /></div>
            <div className="col-md-6"><input className="form-control" name="website" placeholder="Website (optional)" value={form.website} onChange={onChange} /></div>
            <div className="col-md-6"><input className="form-control" name="budget" placeholder="Estimated budget (eg. 50000)" value={form.budget} onChange={onChange} /></div>
            <div className="col-12"><textarea className="form-control" name="message" rows="4" placeholder="Short brief" value={form.message} onChange={onChange} required></textarea></div>
            <div className="col-12"><button className="btn btn-primary">Send request</button></div>
          </form>
        </div>

        <aside className="col-md-5">
          <div className="card p-3 contact-panel">
            <h6>Need help choosing?</h6>
            <p className="small text-muted mb-2">Schedule a quick call for scoping and recommendations.</p>
            <a className="btn btn-outline-light btn-sm" href="/contact">Contact Sales</a>
          </div>
        </aside>
      </div>
    )
  }

  return (
    <div className="text-center my-5">
      <div className="d-flex justify-content-center gap-2">
        <a className="btn btn-primary btn-lg" href="#contact">Request Quote</a>
        <a className="btn btn-outline-light btn-lg" href="#pricing">See Pricing</a>
      </div>
    </div>
  )
}
