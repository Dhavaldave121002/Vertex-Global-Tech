// src/components/Career/Filters.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../pages/career.css' // Import the new CSS

export default function Filters({ filter, setFilter }) {
  return (
    <div className="filters-wrap d-flex flex-wrap align-items-center gap-3 mb-4">
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
        {/* Use the same outline style for consistency */}
        <Link to="/contact" className="btn btn-sm btn-outline-light"> 
          Contact HR
        </Link>
      </div>
    </div>
  )
}