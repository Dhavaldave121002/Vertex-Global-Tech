// src/components/Career/Filters.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Filters({ filter, setFilter }) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
      <div className="btn-group">
        {['All', 'Full-time', 'Part-time', 'Remote'].map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="ms-auto">
        <Link to="/contact" className="btn btn-sm btn-outline-light">
          Contact HR
        </Link>
      </div>
    </div>
  )
}
