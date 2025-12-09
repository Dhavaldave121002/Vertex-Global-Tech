// src/pages/services/Dynamic.jsx
import React, { useEffect, useState } from 'react'
import '../../components/Services/Dynamic/dynamic.css' // Import the new CSS

import Hero from '../../components/Services/Dynamic/Hero'
import Features from '../../components/Services/Dynamic/Features'
import ProjectsGrid from '../../components/Services/Dynamic/ProjectsGrid'
import BlogGrid from '../../components/Services/Dynamic/BlogGrid'
import Pricing from '../../components/Services/Dynamic/Pricing'
import ContactQuote from '../../components/Services/Dynamic/ContactQuote'
import ProjectModal from '../../components/Services/Dynamic/ProjectModal'
import PostModal from '../../components/Services/Dynamic/PostModal'

// Utility: fetch JSON from /public/data
async function fetchJson(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Failed to fetch ' + path)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export default function Dynamic() {
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [projectModal, setProjectModal] = useState(null)
  const [postModal, setPostModal] = useState(null)

  // Blog pagination/search state
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 4

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [pj, pb] = await Promise.all([
        fetchJson('/data/projects.json'),
        fetchJson('/data/blog.json')
      ])
      if (!mounted) return
      setProjects(Array.isArray(pj) ? pj : [])
      setPosts(Array.isArray(pb) ? pb.sort((a,b) => new Date(b.date) - new Date(a.date)) : [])
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  // filtered posts logic reused by BlogGrid
  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.excerpt && p.excerpt.toLowerCase().includes(query.toLowerCase()))
  )
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PER_PAGE))
  const visiblePosts = filteredPosts.slice((page-1)*PER_PAGE, (page-1)*PER_PAGE + PER_PAGE)

  return (
    <main className="dynamic-page">

      <Hero />

      <Features />

      <section className="py-5 bg-soft">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Case studies & projects</h3>
            <a href="/portfolio" className="link-primary">View all projects →</a>
          </div>

          {loading ? <p>Loading projects…</p> : (
            <ProjectsGrid projects={projects} onPreview={setProjectModal} />
          )}
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3>Latest articles (CMS)</h3>
            <div className="d-flex gap-2">
              <input className="form-control form-control-sm" placeholder="Search posts…" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} />
              <a href="/blog" className="btn btn-sm btn-outline-light">All Posts</a>
            </div>
          </div>

          {loading ? <p>Loading posts…</p> : (
            <BlogGrid
              posts={visiblePosts}
              onRead={setPostModal}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </div>
      </section>

      <Pricing />

      <ContactQuote onRequest={() => window.location.hash = '#contact'} />

      {/* Contact section with the form */}
      <section id="contact" className="py-5">
        <div className="container">
          <ContactQuote inline />
        </div>
      </section>

      {projectModal && <ProjectModal project={projectModal} onClose={() => setProjectModal(null)} />}
      {postModal && <PostModal post={postModal} onClose={() => setPostModal(null)} />}

    </main>
  )
}
