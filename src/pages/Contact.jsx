import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheck, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaArrowRight } from 'react-icons/fa';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

export default function Contact() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') === 'schedule' ? 'schedule' : 'message';
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: 'Web Application Development',
    message: '',
    date: '',
    time: ''
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Save to localStorage
    const submission = {
      id: Date.now(),
      type: activeTab, // 'message' or 'schedule'
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    if (activeTab === 'schedule') {
      // Save to meetings
      const existingMeetings = JSON.parse(localStorage.getItem('vgtw_meetings') || '[]');
      existingMeetings.unshift(submission);
      localStorage.setItem('vgtw_meetings', JSON.stringify(existingMeetings));
    } else {
      // Save to contacts
      const existingContacts = JSON.parse(localStorage.getItem('vgtw_contacts') || '[]');
      existingContacts.unshift(submission);
      localStorage.setItem('vgtw_contacts', JSON.stringify(existingContacts));
    }

    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setStatus('success');
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          service: 'Web Application Development',
          message: '',
          date: '',
          time: ''
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans">
      <SEO
        title="Contact Us"
        description="Get in touch with Vertex Global Tech. Schedule a consultation or send us a message to start your digital transformation."
        keywords="contact us, schedule consultation, project inquiry, tech support"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Let's Connect and Build Together"
          highlight="Connect"
          subtitle="Ready to transform your digital presence? Reach out via message or schedule a direct consultation with our team."
          badge="Get In Touch"
        />

        <section className="relative px-6 pb-32">
          <div className="container mx-auto relative z-10 max-w-6xl">
            <div className="text-center mb-16">
              {/* Toggle */}
              <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10 mx-auto relative">
                <LayoutGroup>
                  {['message', 'schedule'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-6 py-2.5 rounded-lg text-sm font-bold transition-colors z-10 ${activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 rounded-lg shadow-lg ${tab === 'schedule' ? 'bg-purple-600' : 'bg-blue-600'
                            }`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-20">
                        {tab === 'message' ? 'Send Message' : 'Schedule Consultation'}
                      </span>
                    </button>
                  ))}
                </LayoutGroup>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-[#0f172a]/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl flex flex-col justify-between h-full min-h-[500px]">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

                    <div className="space-y-8">
                      {[
                        { icon: FaMapMarkerAlt, title: "Our HQ", desc: <>123 Innovation Drive,<br />Silicon Valley, CA 94025</>, color: "blue", link: "#" },
                        { icon: FaEnvelope, title: "Email Us", desc: <>info@vertexglobal.tech<br />support@vertexglobal.tech</>, color: "purple", link: "mailto:info@vertexglobal.tech" },
                        { icon: FaPhoneAlt, title: "Call Us", desc: <>+1 (888) 123-4567<br /><span className="text-gray-500 text-[10px] uppercase tracking-wider font-black">Mon-Fri 9am-6pm PST</span></>, color: "cyan", link: "tel:+18881234567" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + (index * 0.1) }}
                          className="flex items-start gap-5 group"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 text-xl group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-${item.color}-500/5`}>
                            <item.icon />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                            <p className="text-gray-400 leading-relaxed font-medium text-sm">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Connect With Us</h4>
                    <div className="flex gap-4">
                      {[
                        { icon: FaTwitter, href: '#' },
                        { icon: FaLinkedin, href: '#' },
                        { icon: FaGithub, href: '#' },
                        { icon: FaInstagram, href: '#' }
                      ].map((Social, index) => (
                        <a key={index} href={Social.href} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all transform hover:-translate-y-1">
                          <Social.icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <AnimatePresence mode='wait'>
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-24"
                      >
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-5xl">
                          <FaCheck />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Request Received!</h3>
                        <p className="text-gray-400 text-lg">We'll be in touch shortly to confirm details.</p>
                        <button
                          onClick={() => setStatus('idle')}
                          className="mt-10 text-blue-400 font-bold hover:text-white transition-colors underline"
                        >
                          Start New Request
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 space-y-5"
                        onSubmit={handleSubmit}
                      >
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="Jane Doe" />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="+1 (555) 000-0000" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Email</label>
                          <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="jane@company.com" />
                        </div>

                        {activeTab === 'schedule' && (
                          <div className="grid md:grid-cols-2 gap-5 p-5 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                            <div>
                              <label className="block text-blue-300 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2"><FaCalendarAlt /> Preferred Date</label>
                              <input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-sm"
                                style={{ colorScheme: 'dark' }}
                              />
                            </div>
                            <div>
                              <label className="block text-blue-300 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2"><FaClock /> Preferred Time</label>
                              <input
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-sm"
                                style={{ colorScheme: 'dark' }}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Service</label>
                          <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                            <option>Informative Website</option>
                            <option>Dynamic Website</option>
                            <option>E-Commerce Solution</option>
                            <option>Web Application</option>
                            <option>UI/UX Design</option>
                            <option>Maintenance & Support</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Message</label>
                          <textarea name="message" value={formData.message} onChange={handleChange} required rows={activeTab === 'schedule' ? 2 : 4} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm" placeholder={activeTab === 'schedule' ? "Any specific topics for the call?" : "Tell us about your project..."}></textarea>
                        </div>

                        <button disabled={status === 'submitting'} className={`w-full font-black uppercase text-[11px] tracking-[0.3em] py-5 rounded-xl shadow-lg transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 ${activeTab === 'schedule' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'}`}>
                          {status === 'submitting' ? 'Processing...' : (activeTab === 'schedule' ? 'Confirm Schedule' : 'Send Message')}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}