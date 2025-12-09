// src/pages/services/Ecommerce.jsx
import React, { useEffect, useState } from 'react'
import '../../components/Services/Ecommerce/ecommerce.css' // Import the new CSS

import Hero from '../../components/Services/Ecommerce/Hero'
import Features from '../../components/Services/Ecommerce/Features'
import ProjectsGrid from '../../components/Services/Ecommerce/ProjectsGrid'
import Process from '../../components/Services/Ecommerce/Process'
import Pricing from '../../components/Services/Ecommerce/Pricing'
import FAQ from '../../components/Services/Ecommerce/FAQ'
import ContactForm from '../../components/Services/Ecommerce/ContactForm'
import ProjectModal from '../../components/Services/Ecommerce/ProjectModal'

// small helper to fetch JSON from /public/data
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Fetch error ' + res.status)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function EcommerceService() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [projectModal, setProjectModal] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const pj = await fetchJson('/data/projects.json')
      if (!mounted) return
      setProjects(Array.isArray(pj) ? pj : [])
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <main className="ecom-service-page">
      <Hero />
      <Features />

      <section className="py-5 bg-soft">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Selected e-commerce projects</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loading ? <p>Loading projects…</p> : <ProjectsGrid projects={projects} onPreview={setProjectModal} />}
        </div>
      </section>

      <Process />
      <Pricing />
      <FAQ />

      <section id="contact" className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <h3>Request a quote</h3>
              <p className="text-muted">Share a few details and we’ll send a tailored proposal.</p>
              <ContactForm />
            </div>

            <aside className="col-lg-5">
              <div className="card p-3 contact-panel">
                <h6>Need help scoping?</h6>
                <p className="small text-muted mb-2">We provide scoping calls and a sample SOW for larger projects.</p>
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
