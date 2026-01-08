import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import logo from '../../assets/vglogo.jpg';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // EmailJS Configuration for Newsletter
    // Service ID: Using the same one from env
    // Template ID: User needs to create a NEW one "Newsletter Welcome" or reuse generic
    // We will use a generic approach or assume they create one.

    // Auto-Response Config:
    // We want to send an email TO the user.
    // So 'to_email' must be the user's email.

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // Ideally should be a different ID for Newsletter, but we can reuse if mapped correctly
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // We'll mimic the "Contact" flow but with type="Newsletter" so the template can handle it contextually
    // OR ideally, user sets up a specific "Welcome" template.
    // For now, we will send a payload that tries to force a welcome message if possible,
    // or just acknowledges receipt.

    const templateParams = {
      to_email: email, // The subscriber
      from_name: "Vertex Global Tech",
      type: "Newsletter Subscription",
      message: "Welcome to the inner circle using Vertex Global Tech.",
      otp_code: "", // Not needed, but preventing errors if reused template
      page_source: "Footer Newsletter"
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
    } catch (error) {
      console.error("Newsletter Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 overflow-hidden border-t border-white/5 font-sans">
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow delay-1000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- CTA SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-[2rem] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm -z-10"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Ready to Upgrade?</h2>
            <p className="text-gray-400 max-w-lg text-sm md:text-base">Let's build something extraordinary together. Join the digital revolution today.</p>
          </div>
          <Link to="/contact" className="group relative px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:bg-blue-500 hover:text-white hover:scale-105 active:scale-95 shadow-xl shadow-white/5 hover:shadow-blue-500/40 z-10 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">Start Project <FaArrowRight /></span>
          </Link>
        </motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/5 pb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* --- BRAND COLUMN (Span 4) --- */}
          <motion.div className="lg:col-span-4 space-y-8" variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={logo}
                  alt="Vertex Global Tech"
                  className="w-14 h-14 object-cover rounded-2xl border border-white/10 relative z-10 shadow-2xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight uppercase leading-none">Vertex</span>
                <span className="text-xs font-bold text-blue-500 tracking-[0.3em] uppercase">Global Tech</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Architecting the future of digital interaction with enterprise-grade web solutions and immersive experiences.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 text-sm text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="mt-1 min-w-[20px]"><FaMapMarkerAlt className="text-blue-500" /></div>
                <span className="leading-snug">123 Innovation Drive, Tech Valley,<br />Silicon Corridor, CA  94025</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="min-w-[20px]"><FaEnvelope className="text-blue-500" /></div>
                <span>hello@vgt.tech</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {[
                { icon: FaLinkedin, url: '#' },
                { icon: FaTwitter, url: '#' },
                { icon: FaGithub, url: '#' },
                { icon: FaInstagram, url: '#' }
              ].map((Social, index) => (
                <a
                  key={index}
                  href={Social.url}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Social.icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* --- LINKS COLUMN 1 (Span 2) --- */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:pl-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span> Services
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              {['Web Applications', 'UI/UX Design', 'E-Commerce', 'Dynamic Websites', 'Odoo ERP', 'Maintenance'].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 h-[1px] bg-blue-500"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- LINKS COLUMN 2 (Span 2) --- */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span> Company
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              {['About Us', 'Our Team', 'Portfolio', 'Careers', 'Blog & News', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 h-[1px] bg-purple-500"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- NEWSLETTER COLUMN (Span 4) --- */}
          <motion.div variants={itemVariants} className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/20 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700"></div>

            <h4 className="text-white font-black uppercase tracking-tight text-lg mb-2">Stay in the Loop</h4>
            <p className="text-gray-500 text-xs mb-6 max-w-xs leading-relaxed">
              Get the latest insights on tech trends, design systems, and digital innovation delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 relative">
              <AnimatePresence mode='wait'>
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-2"
                  >
                    <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-500 mb-2">
                      <FaCheckCircle size={24} />
                    </div>
                    <h5 className="text-white font-black uppercase text-sm">Welcome Aboard</h5>
                    <p className="text-emerald-400 text-xs">A confirmation has been sent to your inbox.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="relative group">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        disabled={status === 'loading'}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? <FaSpinner className="animate-spin" /> : 'Subscribe Now'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            <p className="text-gray-600 text-[10px] mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
          <p>&copy; {currentYear} Vertex Global Tech. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-blue-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;