import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaArrowRight, FaSearch } from 'react-icons/fa'
import { JOBS } from '../components/Career/jobs-data'
import ApplyModal from '../components/Career/ApplyModal'
import RecruiterBox from '../components/Career/RecruiterBox'
import PageHero from '../components/UI/PageHero'

export default function Career() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [applyData, setApplyData] = useState({
    name: '', email: '', phone: '', message: '', jobId: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [errors, setErrors] = useState({})

  // Ensure background is dark even if CSS fails
  useEffect(() => {
    document.body.style.backgroundColor = '#030712';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const filters = ['All', 'Full-time', 'Part-time', 'Remote', 'Internship']

  const filteredJobs = JOBS.filter(j =>
    filter === 'All' ? true :
      filter === 'Remote' ? j.location.toLowerCase().includes('remote') :
        j.type === filter
  )

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans selection:bg-blue-500/30">

      {/* Dynamic Background Elements - FIXED position for consistent feel */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-20">

        <PageHero
          title="Join the Vertex Team"
          highlight="Vertex"
          subtitle="Be part of a team that's defining the future of digital experiences. We build with passion, precision, and purpose."
          badge="We are hiring"
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 sticky top-20 z-40 py-4 bg-[#030712]/80 backdrop-blur-xl border-y border-white/5 md:rounded-2xl md:border md:px-6">
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${filter === f
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/10 hover:text-white'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="hidden md:block text-gray-500 text-sm font-medium">
            Showing <span className="text-white">{filteredJobs.length}</span> open roles
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Job List */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode='wait'>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-blue-500/20 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                            <FaBriefcase className="text-blue-500" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                            <FaMapMarkerAlt className="text-purple-500" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                            <FaClock className="text-cyan-500" /> {job.seniority}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                        className="self-start px-4 py-2 text-sm font-medium text-blue-400 hover:text-white hover:bg-blue-600/10 rounded-lg transition-colors border border-transparent hover:border-blue-500/20"
                      >
                        {expanded === job.id ? 'Close Details' : 'View Details'}
                      </button>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {job.about}
                    </p>

                    <div className="flex items-center justify-between mt-4 md:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="text-xs font-semibold px-2 py-1 rounded-md bg-white/5 text-gray-500 border border-white/5">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white/5 text-gray-500 border border-white/5">
                            +{job.skills.length - 4}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setApplyData(d => ({ ...d, jobId: job.id, jobTitle: job.title }))
                          setModalOpen(true)
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 transition-all flex items-center gap-2"
                      >
                        Apply Now <FaArrowRight />
                      </button>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expanded === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-white/5 grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-500 rounded-full"></span> Key Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                    <span className="text-blue-500/50 mt-1.5 text-[10px]">●</span> {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-purple-500 rounded-full"></span> Requirements
                              </h4>
                              <ul className="space-y-2">
                                {job.qualifications.map((r, i) => (
                                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                    <span className="text-purple-500/50 mt-1.5 text-[10px]">●</span> {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                  <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                    <FaSearch className="text-2xl text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No positions found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={() => setFilter('All')}
                    className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <RecruiterBox />

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-white mb-2">Can't find your role?</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    We're always looking for exceptional talent. Send us your resume for future opportunities.
                  </p>
                  <Link to="/contact" className="inline-block w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-center text-white text-sm font-semibold transition-all">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ApplyModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        applyData={applyData}
        setApplyData={setApplyData}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  )
}
