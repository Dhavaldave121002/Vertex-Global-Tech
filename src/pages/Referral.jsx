import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCopy, FaCheck, FaUserPlus, FaChartLine, FaGift, FaWhatsapp, FaTwitter, FaCrown, FaEnvelope } from 'react-icons/fa'
import SEO from '../components/SEO'
import emailjs from '@emailjs/browser';

export default function Referral() {
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

  // Tiers from localStorage
  const [tiers, setTiers] = useState([])

  React.useEffect(() => {
    const loadTiers = () => {
      const savedTiers = localStorage.getItem('vgtw_referral_tiers')
      if (savedTiers) {
        const parsed = JSON.parse(savedTiers)

        // Migration: Check if old percentage-based tiers exist and convert them
        const needsMigration = parsed.some(t =>
          (t.name === 'Starter' || t.name === 'Pro') &&
          parseInt(t.commission) < 100
        )

        if (needsMigration) {
          // Replace old tiers with new flat-rate tiers
          const migratedTiers = [
            { name: 'Bridge', commission: '1000', description: 'Standard entry level partner status.', color: 'blue' },
            { name: 'Nexus', commission: '1500', description: 'Elite partner status after 3 successful referrals.', color: 'purple' }
          ]
          setTiers(migratedTiers)
          localStorage.setItem('vgtw_referral_tiers', JSON.stringify(migratedTiers))
        } else {
          setTiers(parsed)
        }
      } else {
        const defaultTiers = [
          { name: 'Bridge', commission: '1000', description: 'Standard entry level partner status.', color: 'blue' },
          { name: 'Nexus', commission: '1500', description: 'Elite partner status after 3 successful referrals.', color: 'purple' }
        ]
        setTiers(defaultTiers)
        localStorage.setItem('vgtw_referral_tiers', JSON.stringify(defaultTiers))
      }
    };

    loadTiers();
    window.addEventListener('storage', loadTiers);
    return () => window.removeEventListener('storage', loadTiers);
  }, [])

  // Handlers
  const isGeneratingRef = React.useRef(false);

  const handleGenerateCode = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (codeLoading || isGeneratingRef.current) return; // Prevent double firing

    isGeneratingRef.current = true;
    setCodeLoading(true)

    // Generate unique code first
    const code = `VTX-${formData.name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    console.log("Generating Referral Code:", code);

    // EmailJS Configuration
    // EmailJS Configuration (Marketing Service)
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_MARKETING_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_MARKETING_TEMPLATE_REFERRAL;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_MARKETING_PUBLIC_KEY;

    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      referral_code: code,
      message: `Your exclusive partner referral code is: ${code}`
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);

        // Save referral to localStorage only on success
        const referral = {
          id: Date.now(),
          code,
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
          tier: tiers[0]?.name || 'Starter',
          referralCount: 0,
          totalEarnings: 0,
          status: 'Active'
        };

        const existingReferrals = JSON.parse(localStorage.getItem('vgtw_referrals') || '[]');
        existingReferrals.unshift(referral);
        localStorage.setItem('vgtw_referrals', JSON.stringify(existingReferrals));
        window.dispatchEvent(new Event('storage'));

        setGeneratedCode(code)
        setCodeLoading(false)
        isGeneratingRef.current = false;
        setLead(prev => ({ ...prev, referralCode: code }))

      }, (err) => {
        console.log('FAILED...', err);
        alert('Failed to send email. Please check your internet connection or try again.');
        setCodeLoading(false);
        isGeneratingRef.current = false;
      });
  }

  const handleLeadSubmit = (e) => {
    e.preventDefault()

    // Optional Email Validation
    if (lead.clientEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lead.clientEmail)) {
        alert("Please enter a valid client email address.");
        return;
      }
    }

    setLeadSubmitting(true)
    // Simulate API
    setTimeout(() => {
      // Save lead to localStorage
      const leadData = {
        id: Date.now(),
        ...lead,
        submittedAt: new Date().toISOString(),
        status: 'New'
      };

      const existingLeads = JSON.parse(localStorage.getItem('vgtw_referral_leads') || '[]'); // Fixed naming consistency
      existingLeads.unshift(leadData);
      localStorage.setItem('vgtw_referral_leads', JSON.stringify(existingLeads));

      // Update referral count
      const referrals = JSON.parse(localStorage.getItem('vgtw_referrals') || '[]');
      const referralIndex = referrals.findIndex(r => r.code === lead.referralCode);
      if (referralIndex !== -1) {
        referrals[referralIndex].referralCount++;

        // Find current tier object to get commission
        // Find current tier object to get flat earning
        const currentTier = tiers.find(t => t.name === referrals[referralIndex].tier) || tiers[0];
        const flatEarning = currentTier ? parseInt(currentTier.commission) : 1000;

        // Apply flat earning
        referrals[referralIndex].totalEarnings += flatEarning;

        // Auto-upgrade logic: upgrade to Nexus (1500) after 3 referrals
        if (referrals[referralIndex].referralCount >= 3) {
          const nexusTier = tiers.find(t => t.name === 'Nexus') || tiers[1];
          if (nexusTier) {
            referrals[referralIndex].tier = nexusTier.name;
          }
        }

        localStorage.setItem('vgtw_referrals', JSON.stringify(referrals));
      }

      window.dispatchEvent(new Event('storage'));

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
      <SEO
        title="Partner Program"
        description="Refer clients to Vertex Global Tech and earn rewards. Join our partner program today."
        keywords="referral program, partner program, earn money online, tech affiliate"
      />
      {/* Hero Section */}
      <section className="relative px-6 mb-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Partner Engine
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9] uppercase tracking-tighter"
          >
            Revolutionize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Earnings Yield</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto uppercase tracking-[0.2em] font-medium"
          >
            Join our elite partner network and monetize your professional bridge.
          </motion.p>

          {/* Tiers Visual Dynamic */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {tiers.map((tier, idx) => {
              // Auto-detect premium tier (highest commission or "Nexus")
              const isPremium = tier.name === 'Nexus' ||
                parseInt(tier.commission) === Math.max(...tiers.map(t => parseInt(t.commission)))

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`backdrop-blur-xl p-8 rounded-[2.5rem] border relative overflow-hidden text-left group ${isPremium
                    ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-[#0f172a]/60 border-purple-500/30 shadow-2xl shadow-purple-500/10'
                    : 'bg-[#0f172a]/60 border-white/5'
                    }`}
                >
                  <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 text-blue-400`}><FaCrown size={120} /></div>
                  <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{tier.name} Status</h3>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">₹{tier.commission} <span className="text-xs text-gray-500 font-black uppercase tracking-widest">Per Node</span></div>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{tier.description}</p>
                </motion.div>
              )
            })}
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
                  <h3 className="text-white font-bold text-xl mb-2">Code Generated!</h3>
                  <p className="text-gray-400 text-sm mb-6">Your exclusive partner code is ready.</p>

                  <div className="bg-black/40 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-black/60 transition-colors" onClick={copyCode}>
                    <code className="text-3xl font-mono text-blue-400 font-bold tracking-wider">{generatedCode}</code>
                    <FaCopy className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider mb-6">Click to copy to clipboard</p>

                  <div className="flex flex-col gap-3">
                    <div className="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-lg" />
                        <span>Email Dispatched!</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Sent to: {formData.email}</span>
                    </div>

                    <button
                      onClick={() => setGeneratedCode(null)}
                      className="text-xs text-gray-500 hover:text-white transition-colors py-2 mt-4"
                    >
                      Generate New Code
                    </button>
                  </div>
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