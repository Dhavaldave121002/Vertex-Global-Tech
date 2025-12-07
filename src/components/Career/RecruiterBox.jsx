// src/components/Career/RecruiterBox.jsx
import React from 'react'
import '../../pages/career.css' // Import the new CSS

export default function RecruiterBox() {
  return (
    <div className="card recruiter-card p-3 mt-3">
      <h6 className="mb-1">Referrals & recruiters</h6>
      <p className="small text-muted mb-2">
        For agency partnerships or bulk hiring, email
        {' '}
        <a href="mailto:talent@vertexglobaltech.com">talent@vertexglobaltech.com</a>.
      </p>
      <p className="small mb-0"><strong>Response time:</strong> 3–5 business days.</p>
    </div>
  )
}