import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUser, FaArrowRight, FaFingerprint, FaCheckCircle, FaExclamationTriangle, FaCircle } from 'react-icons/fa';
import logo from '../../assets/vglogo.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('idle'); // idle, authenticating, success, error
  const navigate = useNavigate();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cardRotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-300, 300], [20, 80]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-300, 300], [20, 80]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setState('authenticating');

    setTimeout(() => {
      if (email === 'admin@vgt.tech' && password === 'admin123') {
        setState('success');
        setTimeout(() => navigate('/admin/dashboard'), 800);
      } else {
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
    }, 1500);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-['Inter'] selection:bg-blue-500/30"
    >

      {/* 1. Cinematic Foundation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]"></div>
        <motion.div
          style={{ x: useTransform(mouseX, [-500, 500], [50, -50]), y: useTransform(mouseY, [-500, 500], [50, -50]) }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_transparent_60%)] opacity-40 md:opacity-50"
        />
        {/* Animated Static Node Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
        </div>
      </div>

      <motion.div
        style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 1000 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Integrated Branding Card */}
        <div className="relative bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-1 shadow-2xl overflow-hidden group">

          {/* Interactive Dynamic Glow */}
          <motion.div
            style={{ left: `${glowX}%`, top: `${glowY}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors"
          />

          {/* Header Section */}
          <div className="bg-white/[0.03] border-b border-white/10 p-8 md:p-10 text-center rounded-t-[2.4rem] md:rounded-t-[2.9rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block relative mb-6 md:mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-blue-500/10 rounded-full"
              />
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-2xl opacity-30"></div>
              <img src={logo} alt="Vertex" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-white/20 relative z-10 shadow-lg" />

              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#020617] rounded-full p-0.5 z-20">
                <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            <h2 className="text-white text-xl md:text-2xl font-black tracking-tight mb-2 uppercase font-['Montserrat']">Vertex Global Tech</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-6 bg-blue-500/40"></span>
              <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.4em]">Auth Protocol : Active</p>
              <span className="h-[1px] w-6 bg-blue-500/40"></span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Access Protocol</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500 group-focus-within/input:text-blue-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vgt.tech"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all duration-300 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Key Authorization</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500 group-focus-within/input:text-blue-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all duration-300 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={state !== 'idle'}
                  className={`w-full relative py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.5em] transition-all duration-500 shadow-2xl overflow-hidden flex items-center justify-center gap-4 active:scale-95 disabled:grayscale 
                    ${state === 'success' ? 'bg-emerald-600' : state === 'error' ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/60'}`}
                >
                  <AnimatePresence mode="wait">
                    {state === 'idle' && (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                        <FaFingerprint className="text-lg" />
                        Authorize Access
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                    {state === 'authenticating' && (
                      <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </motion.div>
                    )}
                    {state === 'success' && (
                      <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3">
                        <FaCheckCircle className="text-lg" /> Access Granted
                      </motion.div>
                    )}
                    {state === 'error' && (
                      <motion.div key="error" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3">
                        <FaExclamationTriangle className="text-lg" /> Access Denied
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{ left: ['100%', '-100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <FaCircle size={4} className="text-blue-500" />
                  <FaCircle size={4} className="text-gray-700" />
                  <FaCircle size={4} className="text-gray-700" />
                </div>
                <span className="text-[7px] font-black text-blue-500/60 tracking-[0.2em] uppercase">Auth Node: 0x9F</span>
              </div>
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 text-[8px] font-black text-gray-500 hover:text-white transition-colors tracking-[0.3em] uppercase"
              >
                <FaShieldAlt className="text-blue-500/30 group-hover:text-blue-500 transition-colors" />
                Exit node
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[7px] text-gray-600 font-bold uppercase tracking-[0.5em] opacity-40 leading-relaxed md:block hidden">
          Strictly for authorized Vertex Personnel only. <br />
          Internal Node 76-Beta. System Monitoring Active.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
