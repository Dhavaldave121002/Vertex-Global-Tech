// src/pages/services/UIUX.jsx
import React, { useEffect, useState } from 'react'
import '../../components/Services/UIUX/uiux.css' // Import the new CSS

import Hero from '../../components/Services/UIUX/Hero'
import Offerings from '../../components/Services/UIUX/Offerings'
import Process from '../../components/Services/UIUX/Process'
import CaseStudies from '../../components/Services/UIUX/CaseStudies'
import Pricing from '../../components/Services/UIUX/Pricing'
import FAQ from '../../components/Services/UIUX/FAQ'
import ContactForm from '../../components/Services/UIUX/ContactForm'
import ProjectModal from '../../components/Services/UIUX/ProjectModal'

// small fetch helper
async function fetchJson(path) {
  try {
    const r = await fetch(path)
    if (!r.ok) throw new Error('Fetch failed: ' + r.status)
    return await r.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function UIUX() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalProject, setModalProject] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      const filtered = Array.isArray(pj)
        ? pj.filter(p => ((p.tags||[]).join(' ').toLowerCase().includes('ui') || (p.tags||[]).join(' ').toLowerCase().includes('design') || (p.categories||[]).join(' ').toLowerCase().includes('design')))
        : []
      setProjects(filtered)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <main className="uiux-page">
      <Hero />
      <Offerings />
      <Process />
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Selected UI/UX work</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>
          <CaseStudies projects={projects} loading={loading} onPreview={setModalProject} />
        </div>
      </section>

      <Pricing />
      <FAQ />

      <section id="contact" className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <h3>Request a UI/UX proposal</h3>
              <p className="text-muted">Share a few details and we'll prepare a scoped proposal and timeline.</p>
              <ContactForm />
            </div>

            <aside className="col-md-5">
              <div className="card p-3 contact-panel">
                <h6>Design audits</h6>
                <p className="small text-muted mb-2">We offer quick design audits; attach a URL in the brief and we'll evaluate UX at a glance.</p>
                <a className="btn btn-outline-light btn-sm" href="/contact">Contact Sales</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </main>
  )
}
