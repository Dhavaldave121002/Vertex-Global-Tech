import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUser, FaArrowRight, FaFingerprint, FaCheckCircle, FaExclamationTriangle, FaTerminal, FaCircle } from 'react-icons/fa';
import logo from '../../assets/vglogo.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('idle'); // idle, authenticating, success, error
  const navigate = useNavigate();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const cardRotateX = useSpring(useTransform(mouseY, [-500, 500], [5, -5]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-500, 500], [-5, 5]), springConfig);

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
      // 1. Check if it's the Master Admin
      if (email === 'admin@vgt.tech' && password === 'admin123') {
        const masterSession = {
          id: 1,
          name: 'Admin Root',
          role: 'Super Admin',
          email: 'admin@vgt.tech',
          isMaster: true,
          clearance: 'L5'
        };
        localStorage.setItem('vgtw_admin_session', JSON.stringify(masterSession));
        setState('success');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
        return;
      }

      // 2. Check if it's a Provisioned User
      const storedUsers = JSON.parse(localStorage.getItem('vgtw_users') || '[]');
      const user = storedUsers.find(u => u.email === email);

      if (user && password === 'admin123') { // Using same mock password for all for now
        localStorage.setItem('vgtw_admin_session', JSON.stringify({ ...user, isMaster: false }));
        setState('success');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
    }, 2500);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30 font-sans"
    >
      {/* 1. CINEMATIC BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

        {/* Massive Background Typography - High Contrast Animated Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center pointer-events-none select-none">
          <motion.div
            animate={{ x: ['-25%', '0%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="opacity-[0.03] whitespace-nowrap"
          >
            <h1 className="text-[22vw] font-black uppercase tracking-tighter leading-none text-white italic">
              VERTEX GLOBAL TECH VERTEX GLOBAL TECH
            </h1>
          </motion.div>

          <motion.div
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="opacity-[0.02] whitespace-nowrap -mt-12"
          >
            <h1 className="text-[22vw] font-black uppercase tracking-tighter leading-none text-white">
              VERTEX GLOBAL TECH VERTEX GLOBAL TECH
            </h1>
          </motion.div>
        </div>

        {/* Dynamic Light Beams */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[140%] bg-gradient-to-r from-blue-600/10 via-transparent to-transparent blur-[120px] origin-top-left rotate-45"
        />

        {/* Digital Grain & Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <motion.div
        style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 2000 }}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[520px] relative z-20"
      >
        {/* MAIN TERMINAL CONTAINER */}
        <div className="relative bg-[#0a0a0f]/90 backdrop-blur-[40px] border border-white/10 rounded-[3rem] shadow-[0_50px_120px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Header Visuals */}
          <div className="relative p-12 text-center bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
            {/* Animated Logo Assembly */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block relative mb-10"
            >
              <div className="absolute -inset-6 border border-blue-500/10 rounded-full border-dashed" />
              <div className="absolute -inset-10 border border-purple-500/5 rounded-full" />
              <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />

              <img src={logo} alt="Vertex" className="w-24 h-24 rounded-3xl border border-white/20 relative z-10 shadow-2xl ring-1 ring-white/10" />

              <div className="absolute -bottom-2 -right-2 flex gap-1.5 p-1.5 bg-[#030712] rounded-full border border-white/10 shadow-xl">
                <FaCircle className="text-[8px] text-emerald-500 animate-pulse" />
                <FaCircle className="text-[8px] text-blue-500 animate-pulse delay-150" />
              </div>
            </motion.div>

            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-3">
              Vertex Global <span className="text-blue-500">Tech</span>
            </h2>

            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/30"></span>
              <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em] flex items-center gap-2">
                <FaShieldAlt className="text-xs" /> Secure Access Layer
              </p>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/30"></span>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="p-12 space-y-10">
            <form onSubmit={handleLogin} className="space-y-8">

              {/* Access Identity */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <FaTerminal className="text-blue-500 text-xs" /> Access Identity
                  </label>
                  <span className="text-[9px] font-bold text-blue-500/30 uppercase tracking-tighter">Auth Node 01</span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                    <FaUser className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vgt.tech"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-sm font-bold placeholder:text-gray-800 transition-all focus:outline-none focus:border-blue-500/40 focus:bg-black/60 focus:ring-[6px] focus:ring-blue-500/5 shadow-inner"
                  />
                </div>
              </div>

              {/* Security Key */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <FaLock className="text-blue-500 text-xs" /> Security Key
                  </label>
                  <span className="text-[9px] font-bold text-blue-500/30 uppercase tracking-tighter">Level-5 Clearance</span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                    <FaShieldAlt className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-sm font-bold placeholder:text-gray-800 transition-all focus:outline-none focus:border-blue-500/40 focus:bg-black/60 focus:ring-[6px] focus:ring-blue-500/5 shadow-inner"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={state !== 'idle'}
                  className={`w-full group relative py-6 rounded-2xl font-black uppercase text-xs tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-4 overflow-hidden
                    ${state === 'success' ? 'bg-emerald-600 shadow-emerald-500/40' :
                      state === 'error' ? 'bg-red-600 animate-shake' :
                        'bg-white text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-500/30 active:scale-95'}`}
                >
                  <AnimatePresence mode="wait">
                    {state === 'idle' && (
                      <motion.div key="idle" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-4">
                        <FaFingerprint className="text-xl" /> Authorize Uplink
                      </motion.div>
                    )}
                    {state === 'authenticating' && (
                      <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-5">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Syncing Node...
                      </motion.div>
                    )}
                    {state === 'success' && (
                      <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3 text-white">
                        <FaCheckCircle className="text-xl" /> Access Established
                      </motion.div>
                    )}
                    {state === 'error' && (
                      <motion.div key="error" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3 text-white">
                        <FaExclamationTriangle className="text-xl" /> Uplink Denied
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-30"
                    />
                  </div>
                </button>
              </div>
            </form>

            {/* Footer Metadata */}
            <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Node: VGT-MASTER</span>
                  <span className="text-[8px] font-bold text-blue-500/40 uppercase tracking-tighter">Encryption: AES-256</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest"
              >
                <span className="h-[1px] w-6 bg-white/10 group-hover:bg-blue-500 transition-colors"></span>
                Exit Gateway
                <FaArrowRight size={10} className="rotate-180 opacity-40 group-hover:opacity-100 transition-all group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Disclaimer */}
        <p className="mt-12 text-center text-[9px] font-black text-white/10 uppercase tracking-[1em] leading-relaxed select-none">
          Proprietary Vertex Tech Portal. Monitoring Active.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
