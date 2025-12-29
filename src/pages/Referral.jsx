import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCopy, FaCheck, FaUserPlus, FaChartLine, FaGift, FaWhatsapp, FaTwitter } from 'react-icons/fa'

export default function Referral() {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [generatedCode, setGeneratedCode] = useState(null)
  const [codeLoading, setCodeLoading] = useState(false)

  // Lead Form State
  const [lead, setLead] = useState({
    referralCode: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    projectType: 'Website Development',
    notes: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  // Handlers
  const handleGenerateCode = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setCodeLoading(true)

    // Simulate API/Email delay
    setTimeout(() => {
      const code = `VTX-${formData.name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
      setGeneratedCode(code)
      setCodeLoading(false)
      // Auto-fill code in lead form
      setLead(prev => ({ ...prev, referralCode: code }))
    }, 1500)
  }

  const handleLeadSubmit = (e) => {
    e.preventDefault()
    setLeadSubmitting(true)
    // Simulate API
    setTimeout(() => {
      setLeadSubmitting(false)
      setLeadSuccess(true)
      // Reset after 3s
      setTimeout(() => {
        setLeadSuccess(false)
        setLead(prev => ({ ...prev, clientName: '', clientPhone: '', clientEmail: '', notes: '' }))
      }, 3000)
    }, 1500)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-20 overflow-hidden font-sans">

      {/* Hero Section */}
      <section className="relative px-6 mb-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Partner Program
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Refer & Earn up to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">₹1,500 Per Client</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Join our network of partners. Simple process, guaranteed payouts, and unlimited earning potential.
          </motion.p>

          {/* Tiers Visual */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#0f172a] p-8 rounded-2xl border border-white/10 relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10"><FaUserPlus className="text-8xl text-blue-500" /></div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Starter Tier</h3>
              <div className="text-4xl font-bold text-white mb-2">₹1,000 <span className="text-lg text-gray-500 font-normal">/ client</span></div>
              <p className="text-blue-400 text-sm font-semibold">For your first 3 referrals</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-2xl border border-blue-500/30 relative overflow-hidden shadow-lg shadow-blue-500/10 text-left"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20"><FaChartLine className="text-8xl text-purple-400" /></div>
              <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">UNLOCKED AFTER 3 SALES</div>
              <h3 className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Pro Partner</h3>
              <div className="text-5xl font-bold text-white mb-2">₹1,500 <span className="text-lg text-blue-200 font-normal">/ client</span></div>
              <p className="text-purple-300 text-sm font-semibold">For every referral after your 3rd</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* Left Col: Generate Code */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">1</span>
                Get Your Referral Code
              </h2>

              {!generatedCode ? (
                <form onSubmit={handleGenerateCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Your Full Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Enter email to receive code"
                    />
                  </div>
                  <button
                    disabled={codeLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {codeLoading ? 'Generating...' : 'Generate Code & Send to Email'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">We will send your unique code to your email.</p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">
                    <FaCheck />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Code Sent Successfully!</h3>
                  <p className="text-gray-400 text-sm mb-6">Check your email. Here is your code:</p>

                  <div className="bg-black/40 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between group cursor-pointer" onClick={copyCode}>
                    <code className="text-2xl font-mono text-blue-400 font-bold">{generatedCode}</code>
                    <FaCopy className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Click to copy</p>

                  <button
                    onClick={() => setGeneratedCode(null)}
                    className="mt-6 text-sm text-gray-400 hover:text-white underline"
                  >
                    Generate another code
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-6">
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><FaUserPlus /></div>
              <div>
                <h4 className="text-white font-bold">1. Find a Client</h4>
                <p className="text-gray-400 text-sm">Anyone looking for a website, app, or design.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><FaChartLine /></div>
              <div>
                <h4 className="text-white font-bold">2. Submit Lead</h4>
                <p className="text-gray-400 text-sm">Fill the form on the right with your code.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-400"><FaGift /></div>
              <div>
                <h4 className="text-white font-bold">3. Get Paid</h4>
                <p className="text-gray-400 text-sm">Once project starts, you receive payout.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Submit Lead */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FaUserPlus className="text-9xl text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">2</span>
            Submit a Lead
          </h2>
          <p className="text-gray-400 text-sm mb-8">Enter client details and your code to claim credit.</p>

          {!leadSuccess ? (
            <form onSubmit={handleLeadSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Referral Code <span className="text-red-500">*</span></label>
                <input
                  required
                  value={lead.referralCode}
                  onChange={e => setLead({ ...lead, referralCode: e.target.value })}
                  className="w-full bg-blue-900/10 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-300 font-mono font-bold placeholder-blue-700/50 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="e.g. VTX-JOH-8291"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Client Name</label>
                  <input required value={lead.clientName} onChange={e => setLead({ ...lead, clientName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" placeholder="Client Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Client Phone</label>
                  <input required type="tel" value={lead.clientPhone} onChange={e => setLead({ ...lead, clientPhone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" placeholder="Phone Number" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client Email (Optional)</label>
                <input type="email" value={lead.clientEmail} onChange={e => setLead({ ...lead, clientEmail: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" placeholder="client@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Interest</label>
                <select
                  value={lead.projectType}
                  onChange={e => setLead({ ...lead, projectType: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none"
                >
                  <option className="bg-[#0f172a]">Website Development</option>
                  <option className="bg-[#0f172a]">App Development</option>
                  <option className="bg-[#0f172a]">UI/UX Design</option>
                  <option className="bg-[#0f172a]">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
                <textarea
                  value={lead.notes}
                  onChange={e => setLead({ ...lead, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Additional details..."
                  rows="2"
                ></textarea>
              </div>

              <button
                disabled={leadSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
              >
                {leadSubmitting ? 'Submitting...' : 'Submit Lead'}
              </button>
            </form>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-4xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Lead Submitted!</h3>
              <p className="text-gray-400">We will verify the code and contact the client.</p>
              <button onClick={() => setLeadSuccess(false)} className="mt-8 text-blue-400 hover:text-white text-sm">Submit another</button>
            </div>
          )}

        </motion.div>

      </div>
    </div>
  )
}