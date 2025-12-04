// src/pages/services/Application.jsx
import React, { useEffect, useState } from 'react'
import '../../pages/application.css'

import Hero from '../../components/Services/Application/Hero'
import Features from '../../components/Services/Application/Features'
import Platforms from '../../components/Services/Application/Platforms'
import CaseStudies from '../../components/Services/Application/CaseStudies'
import Process from '../../components/Services/Application/Process'
import Pricing from '../../components/Services/Application/Pricing'
import FAQ from '../../components/Services/Application/FAQ'
import ContactForm from '../../components/Services/Application/ContactForm'
import ProjectModal from '../../components/Services/Application/ProjectModal'

// simple JSON fetch util for optional case studies stored in /public/data/projects.json
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Fetch failed: ' + res.status)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function Application() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projectModal, setProjectModal] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoadingProjects(true)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      const filtered = Array.isArray(pj) ? pj.filter(p => (p.tags||[]).join(' ').toLowerCase().includes('app') || (p.categories||[]).join(' ').toLowerCase().includes('app')) : []
      setProjects(filtered)
      setLoadingProjects(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <main className="app-page">
      <Hero />
      <Features />
      <Platforms />
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Case studies</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>
          <CaseStudies projects={projects} loading={loadingProjects} onPreview={setProjectModal} />
        </div>
      </section>

      <Process />
      <Pricing />
      <FAQ />

      <section id="contact" className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <h3>Request a quote</h3>
              <p className="text-muted">Tell us about your app idea and we’ll create a tailored proposal.</p>
              <ContactForm />
            </div>

            <aside className="col-md-5">
              <div className="card p-3 contact-panel">
                <h6>Project scoping</h6>
                <p className="small text-muted mb-2">We offer a scoping call and a sample SOW for complex projects — ask for details in the brief.</p>
                <a className="btn btn-outline-light btn-sm" href="/contact">Contact Sales</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {projectModal && <ProjectModal project={projectModal} onClose={() => setProjectModal(null)} />}
    </main>
  )
}
