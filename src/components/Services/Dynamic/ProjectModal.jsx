// src/components/Services/Dynamic/ProjectModal.jsx
import React from 'react'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{project.title}</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img src={project.thumb} alt={project.title} className="img-fluid mb-3 rounded" />
            <p className="text-muted">{project.description || project.excerpt}</p>
            {project.stack && <p className="small text-muted">Tech: {Array.isArray(project.stack) ? project.stack.join(', ') : project.stack}</p>}
          </div>
          <div className="modal-footer">
            <a href="/contact" className="btn btn-primary">Enquire</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
