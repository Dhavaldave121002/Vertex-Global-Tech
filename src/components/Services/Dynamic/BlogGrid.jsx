// src/components/Services/Dynamic/BlogGrid.jsx
import React from 'react'

export default function BlogGrid({ posts = [], onRead, page, totalPages, setPage }) {
  return (
    <>
      <div className="row g-3">
        {posts.map(p => (
          <div key={p.id} className="col-md-6 col-lg-3">
            <article className="card post-card h-100">
              <img src={p.thumb} alt={p.title} className="card-img-top" />
              <div className="card-body">
                <h6 className="mb-1">{p.title}</h6>
                <small className="text-muted">{new Date(p.date).toLocaleDateString()}</small>
                <p className="text-muted small mt-2 mb-2">{p.excerpt}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => onRead(p)}>Read</button>
                  <a className="btn btn-sm btn-outline-light" href={`/blog/${p.slug}`}>Open</a>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Blog pages">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${page===1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.max(1,p-1))}>Prev</button></li>
            {Array.from({length: totalPages}).map((_, i) => (
              <li key={i} className={`page-item ${page===i+1 ? 'active' : ''}`}><button className="page-link" onClick={() => setPage(i+1)}>{i+1}</button></li>
            ))}
            <li className={`page-item ${page===totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.min(totalPages,p+1))}>Next</button></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
