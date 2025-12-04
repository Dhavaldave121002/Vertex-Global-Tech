// src/components/Services/Dynamic/PostModal.jsx
import React from 'react'

export default function PostModal({ post, onClose }) {
  if (!post) return null
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.title}</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img src={post.thumb} alt={post.title} className="img-fluid mb-3 rounded" />
            <p className="text-muted small">Published: {new Date(post.date).toLocaleDateString()}</p>
            <div className="post-body text-muted">{post.content || post.excerpt}</div>
          </div>
          <div className="modal-footer">
            <a className="btn btn-outline-light" href={`/blog/${post.slug}`}>Open in blog</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
