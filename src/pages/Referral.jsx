// src/pages/Referral.jsx
import React, { useState } from 'react'
import './referral.css'

export default function Referral() {
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}` : 'https://vertexglobaltech.com'

  // form state for submitting a referral (you can also send to backend or open mailto)
  const [ref, setRef] = useState({ name: '', email: '', phone: '', candidateName: '', candidateEmail: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // shareable link / code
  const [creatorName, setCreatorName] = useState('')
  const [shareCode, setShareCode] = useState('')
  const [copied, setCopied] = useState(false)

  // earnings calc
  const [projectValue, setProjectValue] = useState('')
  const tiers = [
    { name: 'Website (Basic)', percent: 6 },
    { name: 'Website (E-Commerce)', percent: 8 },
    { name: 'Application', percent: 10 },
    { name: 'UI/UX', percent: 5 }
  ]

  function validateReferralForm() {
    const e = {}
    if (!ref.name.trim()) e.name = 'Your name is required'
    if (!/^\S+@\S+\.\S+$/.test(ref.email)) e.email = 'Valid email required'
    if (!ref.candidateName.trim()) e.candidateName = 'Candidate name required'
    if (!/^\S+@\S+\.\S+$/.test(ref.candidateEmail)) e.candidateEmail = 'Valid candidate email required'
    return e
  }

  function onSubmit(e) {
    e.preventDefault()
    const eobj = validateReferralForm()
    if (Object.keys(eobj).length) { setErrors(eobj); return }
    setSubmitting(true)

    // open mailto with prefilled body as a fallback / easy capture
    const subject = encodeURIComponent(`Referral: ${ref.candidateName} (via ${ref.name})`)
    const body = encodeURIComponent([
      `Referrer: ${ref.name}`,
      `Referrer Email: ${ref.email}`,
      `Referrer Phone: ${ref.phone || '-'}`,
      `Candidate: ${ref.candidateName}`,
      `Candidate Email: ${ref.candidateEmail}`,
      `Notes: ${ref.notes || '-'}`,
      '',
      `Referral Code (optional): ${shareCode || '-'}`,
    ].join('\n\n'))

    // Replace the mailto address as needed
    window.location.href = `mailto:referrals@vertexglobaltech.com?subject=${subject}&body=${body}`

    // small UI feedback
    setTimeout(() => {
      setSubmitting(false)
      setRef({ name: '', email: '', phone: '', candidateName: '', candidateEmail: '', notes: '' })
      setErrors({})
    }, 900)
  }

  // Create a short share code (base64-like) — not secure; if you have backend, create server-side codes
  function generateShareCode() {
    const name = (creatorName || 'referral').trim()
    if (!name) { setShareCode(''); return }
    const payload = `${name.toLowerCase().replace(/\s+/g,'_')}_${Date.now().toString(36)}`
    // make it URL-safe
    const code = btoa(payload).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_').slice(0, 22)
    setShareCode(code)
    setCopied(false)
  }

  async function copyLink() {
    if (!shareCode) return
    const link = `${baseUrl}/?ref=${shareCode}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select & prompt
      const el = document.createElement('textarea')
      el.value = link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function shareWhatsApp() {
    if (!shareCode) return
    const link = `${baseUrl}/?ref=${shareCode}`
    const text = encodeURIComponent(`Check out Vertex Global Tech — they build websites & apps. Use this link: ${link}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  function shareTwitter() {
    if (!shareCode) return
    const link = `${baseUrl}/?ref=${shareCode}`
    const text = encodeURIComponent(`I recommend Vertex Global Tech for websites & apps — ${link}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  function shareLinkedIn() {
    if (!shareCode) return
    const link = `${baseUrl}/?ref=${shareCode}`
    const text = encodeURIComponent(`I recommend Vertex Global Tech — ${link}`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank')
  }

  function calculateEarning(percent) {
    const value = parseFloat(projectValue)
    if (Number.isNaN(value) || value <= 0) return '—'
    const earn = (value * percent) / 100
    // format currency (INR)
    return `₹${Math.round(earn).toLocaleString('en-IN')}`
  }

  return (
    <main className="referral-page py-5">
      <div className="container">

        {/* HERO */}
        <header className="row align-items-center mb-4">
          <div className="col-md-7">
            <p className="eyebrow">Referral Program</p>
            <h1>Earn for Referrals — partner with Vertex Global Tech</h1>
            <p className="lead text-muted">Recommend clients or candidates and earn rewards when they convert. Clear tiers, transparent payouts.</p>
          </div>
          <div className="col-md-5 text-md-end mt-3 mt-md-0">
            <a className="btn btn-primary me-2" href="#form">Refer someone</a>
            <a className="btn btn-outline-light" href="#share">Get share link</a>
          </div>
        </header>

        <div className="row g-4">
          {/* Left: Program details + calculator */}
          <section className="col-lg-7">

            <article className="card p-4 sp-card mb-3">
              <h4>How it works</h4>
              <p className="text-muted">Send a qualified lead (company/client) or candidate. When the lead converts (signed contract) we pay the referral as per the tier. Payments are processed after the first successful invoice and project onboarding.</p>

              <div className="row mt-3">
                <div className="col-12 col-md-6">
                  <h6>Client Referrals (example tiers)</h6>
                  <ul className="list-unstyled tier-list">
                    <li><strong>Website (Basic)</strong> — 6% of project value</li>
                    <li><strong>Website (E-commerce)</strong> — 8% of project value</li>
                    <li><strong>Application</strong> — 10% of project value</li>
                    <li><strong>UI/UX</strong> — 5% of project value</li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <h6>Candidate referrals</h6>
                  <p className="text-muted mb-0">Refer engineering or design candidates. For successful hires, we pay a finder’s fee depending on role & seniority — contact HR for details.</p>
                </div>
              </div>
            </article>

            <article className="card p-4 sp-card mb-3">
              <h5>Referral earnings calculator</h5>
              <p className="text-muted">Enter an expected project value to see potential earnings by tier.</p>

              <div className="row align-items-center g-2">
                <div className="col-8 col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Project value (eg. 150000)"
                    value={projectValue}
                    onChange={e => setProjectValue(e.target.value)}
                  />
                </div>
                <div className="col-4 col-md-6 text-md-end">
                  <button className="btn btn-outline-light" onClick={() => setProjectValue('')}>Clear</button>
                </div>

                <div className="col-12 mt-3">
                  <div className="row g-2">
                    {tiers.map(t => (
                      <div key={t.name} className="col-6 col-md-3">
                        <div className="earn-box p-2 text-center">
                          <div className="earn-title">{t.name}</div>
                          <div className="earn-amt">{calculateEarning(t.percent)}</div>
                          <div className="earn-sub text-muted small">{t.percent}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="card p-4 sp-card mb-3">
              <h5>Referral status & FAQs</h5>

              <details className="mb-2">
                <summary>When do I get paid?</summary>
                <p className="text-muted small mb-0">Payments are processed within 30 days after the client’s first invoice is paid and the project onboarding completes.</p>
              </details>

              <details className="mb-2">
                <summary>Who qualifies as a valid referral?</summary>
                <p className="text-muted small mb-0">Valid referrals are new clients or candidates not previously in our pipeline. For clients, introduction must be in writing (email) before we contact them.</p>
              </details>

              <details className="mb-2">
                <summary>Terms & conditions</summary>
                <p className="text-muted small mb-0">See full program terms below. By participating you agree to our referral program terms. Vertex Global Tech reserves the right to modify terms with notice.</p>
              </details>
            </article>

            <article className="card p-4 sp-card mb-3">
              <h5>Program Terms (Short)</h5>
              <ol className="text-muted small">
                <li>Referral is valid only for new clients not previously contacted by Vertex Global Tech.</li>
                <li>Referral payout is a percentage of the first project invoice (as per tier).</li>
                <li>Payout occurs after invoice payment and project onboarding.</li>
                <li>We may request supporting details to verify referral.</li>
              </ol>
            </article>

          </section>

          {/* Right: Share / Form */}
          <aside className="col-lg-5">

            {/* SHARE */}
            <div id="share" className="card p-4 sp-card mb-3">
              <h5>Create & share your referral link</h5>
              <p className="text-muted small">Generate a short share code and share it — we will track referrals based on the code or the email introduction.</p>

              <div className="mb-2">
                <label className="form-label small">Your name (for code)</label>
                <input className="form-control form-control-sm" value={creatorName} onChange={e => setCreatorName(e.target.value)} placeholder="Your name (eg. Rahul Sharma)" />
              </div>

              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary btn-sm" onClick={generateShareCode}>Generate code</button>
                <button className="btn btn-outline-light btn-sm" onClick={() => { setCreatorName(''); setShareCode(''); setCopied(false) }}>Reset</button>
              </div>

              {shareCode && (
                <>
                  <div className="share-link mb-2">
                    <input readOnly className="form-control" value={`${baseUrl}/?ref=${shareCode}`} />
                  </div>

                  <div className="d-flex gap-2 mb-2">
                    <button className="btn btn-sm btn-outline-light" onClick={copyLink}>{copied ? 'Copied!' : 'Copy link'}</button>
                    <button className="btn btn-sm btn-success" onClick={shareWhatsApp}>WhatsApp</button>
                    <button className="btn btn-sm btn-outline-info" onClick={shareTwitter}>Twitter</button>
                    <button className="btn btn-sm btn-outline-primary" onClick={shareLinkedIn}>LinkedIn</button>
                  </div>

                  <div className="text-muted small">Share your link in messages or social channels. We recommend sharing a short note about the services you recommend.</div>
                </>
              )}
            </div>

            {/* SUBMIT REFERRAL FORM */}
            <div id="form" className="card p-4 sp-card mb-3">
              <h5>Submit a referral</h5>
              <p className="text-muted small mb-2">Use this form to introduce a client or candidate. We will follow up — or open your mail client to send the introduction immediately.</p>

              <form onSubmit={onSubmit} noValidate>
                <div className="mb-2">
                  <label className="form-label small">Your name</label>
                  <input name="name" value={ref.name} onChange={e => setRef(r => ({ ...r, name: e.target.value }))} className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} />
                  {errors.name && <div className="invalid-feedback small">{errors.name}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Your email</label>
                  <input name="email" type="email" value={ref.email} onChange={e => setRef(r => ({ ...r, email: e.target.value }))} className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`} />
                  {errors.email && <div className="invalid-feedback small">{errors.email}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Your phone (optional)</label>
                  <input name="phone" value={ref.phone} onChange={e => setRef(r => ({ ...r, phone: e.target.value }))} className="form-control form-control-sm" />
                </div>

                <hr />

                <div className="mb-2">
                  <label className="form-label small">Candidate / Client name</label>
                  <input name="candidateName" value={ref.candidateName} onChange={e => setRef(r => ({ ...r, candidateName: e.target.value }))} className={`form-control form-control-sm ${errors.candidateName ? 'is-invalid' : ''}`} />
                  {errors.candidateName && <div className="invalid-feedback small">{errors.candidateName}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Candidate / Client email</label>
                  <input name="candidateEmail" type="email" value={ref.candidateEmail} onChange={e => setRef(r => ({ ...r, candidateEmail: e.target.value }))} className={`form-control form-control-sm ${errors.candidateEmail ? 'is-invalid' : ''}`} />
                  {errors.candidateEmail && <div className="invalid-feedback small">{errors.candidateEmail}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small">Notes (optional)</label>
                  <textarea name="notes" value={ref.notes} onChange={e => setRef(r => ({ ...r, notes: e.target.value }))} className="form-control form-control-sm" rows="3"></textarea>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <button className="btn btn-primary btn-sm" type="submit" disabled={submitting}>{submitting ? 'Preparing email…' : 'Send introduction (Email)'}</button>
                  <button className="btn btn-outline-light btn-sm" type="button" onClick={() => { setRef({ name:'', email:'', phone:'', candidateName:'', candidateEmail:'', notes:'' }); setErrors({}) }}>Clear</button>
                </div>
              </form>
            </div>

            <div className="card p-3 sp-card">
              <h6 className="mb-1">Quick tips</h6>
              <ul className="small text-muted">
                <li>Introduce via email and include your referral code (if you have one).</li>
                <li>For client leads, include a short note about scope & timeline.</li>
                <li>For candidate referrals, attach a CV when emailing from your client.</li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </main>
  )
}
