import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  FaUsers, FaArrowUp, FaChartBar, FaGlobe,
  FaDollarSign, FaBolt, FaArrowRight, FaEllipsisV,
  FaDatabase, FaNetworkWired, FaShieldAlt, FaTerminal, FaCircle
} from 'react-icons/fa';

const StatCard = ({ stat, i }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
    scale.set(1.02);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      style={{ rotateX, rotateY, scale, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel p-6 border-white/10 group hover:border-blue-500/60 transition-all duration-500 relative overflow-hidden bg-white/[0.02]"
    >
      <motion.div
        style={{ x: useTransform(x, [-100, 100], [-10, 10]), y: useTransform(y, [-100, 100], [-10, 10]) }}
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"
      />

      <div className="flex items-start justify-between relative z-10 transition-transform duration-500 group-hover:translate-z-10">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-all duration-500"
          style={{ color: stat.color === 'blue' ? '#60a5fa' : stat.color === 'emerald' ? '#34d399' : stat.color === 'purple' ? '#c084fc' : '#fbbf24' }}
        >
          {stat.icon}
        </motion.div>
        <div className={`px-3 py-1.5 rounded-lg bg-black/60 text-[10px] font-black tracking-[0.2em] ${stat.change.includes('+') ? 'text-emerald-400' : 'text-blue-400'} border border-white/10 shadow-lg`}>
          {stat.change}
        </div>
      </div>

      <div className="mt-8 relative z-10 group-hover:translate-z-20 transition-transform duration-500">
        <p className="text-blue-400/80 text-[10px] font-black uppercase tracking-[0.3em] font-['Montserrat']">{stat.label}</p>
        <h3 className="text-3xl font-black text-white mt-1 group-hover:tracking-wider transition-all duration-500 select-none">{stat.value}</h3>
      </div>

      <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-60 transition-all duration-500">
        <FaNetworkWired size={18} className="text-blue-500" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center shadow-[0_0_15px_#3b82f6]"></div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);

  useEffect(() => {
    const lines = [
      'SYSTEM_INIT_AUTH_01 SUCCESS',
      'ENCRYPTING_NODE_REGISTRY...',
      'SECURE_LAYER_5_ACTIVE',
      'DNS_SYNC_COMPLETE_0x4F',
      'PACKET_STREAM_NOMINAL',
      'TELEMETRY_RX_STABLE'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setTerminalLines(prev => [...prev.slice(-4), lines[i % lines.length]]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = (type) => {
    setIsExporting(true);
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const stats = [
    { label: 'Global Traffic', value: '1.2M+', change: '+24.5%', icon: <FaGlobe />, color: 'blue' },
    { label: 'Active Leads', value: '842', change: '+12.1%', icon: <FaUsers />, color: 'emerald' },
    { label: 'Net Revenue', value: '$240.2K', change: '+18.2%', icon: <FaDollarSign />, color: 'purple' },
    { label: 'Auth Success', value: '99.9%', change: 'Nominal', icon: <FaShieldAlt />, color: 'blue' },
  ];

  return (
    <div className="space-y-6 md:space-y-10 font-['Inter'] relative min-h-screen pb-20 px-4 md:px-8">
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,b,b,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(59,130,246,0.1),rgba(59,130,246,0.05),rgba(59,130,246,0.1))] bg-[length:100%_4px,3px:100%]"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
        <svg width="100%" height="100%" className="opacity-[0.08]">
          <pattern id="dashboard-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2" fill="#3b82f6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
        </svg>

        <div className="absolute top-24 right-10 hidden lg:flex flex-col items-end opacity-[0.1] select-none text-[9px] font-black text-blue-400 gap-2 font-mono">
          <AnimatePresence>
            {terminalLines.map((line, idx) => (
              <motion.div
                key={idx + line}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <span className="text-blue-500/60">[{new Date().toLocaleTimeString()}]</span>
                <span>{line}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 py-8 border-b border-white/10 relative bg-white/[0.02] rounded-b-[2rem] px-6 mt-[-40px]">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase flex items-center gap-4 flex-wrap font-['Montserrat']">
              <span className="bg-gradient-to-r from-white via-white to-blue-500 bg-clip-text text-transparent">Command</span>
              <span className="text-blue-600 relative">
                Hub
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute -right-4 -top-1 text-xs text-blue-400"
                >
                  <FaCircle size={6} />
                </motion.span>
              </span>
            </h1>
          </motion.div>
          <div className="flex items-center gap-5 mt-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-black uppercase tracking-widest rounded-xl shadow-inner">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]"></div>
              System Authorized
            </div>
            <div className="h-4 w-[1px] bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] font-mono">
              <FaTerminal className="text-blue-500/60" />
              NODE: <span className="text-white">0x9F_PRO</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleExport('SYS_TELEMETRY')}
            disabled={isExporting}
            className="group px-8 py-5 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all disabled:opacity-50 relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <FaDatabase className={isExporting ? "animate-bounce" : "group-hover:rotate-12 transition-transform"} />
              {isExporting ? `PULLING: ${exportProgress}%` : 'Pull System Logs'}
            </span>
            {isExporting && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${exportProgress}%` }}
                className="absolute bottom-0 left-0 h-[3px] bg-blue-600 shadow-[0_0_15px_#2563eb]"
              />
            )}
          </button>
          <button
            onClick={() => handleExport('EXECUTIVE_SUMMARY')}
            disabled={isExporting}
            className="px-8 py-5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 active:scale-95 disabled:grayscale group"
          >
            <span className="flex items-center justify-center gap-3 font-['Montserrat']">
              Generate Intelligence
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} i={i} />
        ))}
      </div>

      <div className="grid xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <div className="glass-panel p-1 border-white/10 overflow-hidden group shadow-2xl bg-white/[0.01]">
            <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 bg-white/[0.03] gap-4">
              <div className="space-y-1">
                <h3 className="text-white font-black text-sm uppercase tracking-[0.3em] flex items-center gap-3 font-['Montserrat']">
                  <FaChartBar className="text-blue-500" />
                  Neural Traffic Flux
                </h3>
                <p className="text-[10px] text-blue-400/60 font-black uppercase tracking-widest pl-7 font-mono">Active Monitoring Node: Edge-7</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-black/60 rounded-xl text-blue-500 border border-white/20 hover:border-blue-500/50 transition-all">
                  <FaEllipsisV size={12} />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-12 h-[350px] md:h-[500px] relative flex items-end justify-between gap-4 md:gap-8 overflow-x-auto custom-scrollbar">
              {[45, 60, 35, 90, 65, 50, 80, 55, 100, 75, 40, 85].map((h, i) => (
                <div key={i} className="min-w-[24px] md:min-w-0 flex-1 flex flex-col items-center gap-5 group/bar relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full bg-gradient-to-t from-blue-900/40 via-blue-500/60 to-blue-400 rounded-t-xl relative shadow-[0_0_25px_rgba(59,130,246,0.15)] group-hover/bar:to-white transition-all duration-500 border-t border-white/30"
                  >
                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover/bar:opacity-100 transition-opacity blur-xl"></div>
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all translate-y-2 group-hover/bar:translate-y-0 shadow-2xl z-30 pointer-events-none uppercase">
                      {h * 123}v
                    </div>
                  </motion.div>
                  <span className="text-[8px] md:text-[10px] text-blue-300 font-black uppercase tracking-tighter opacity-40 group-hover/bar:text-white group-hover/bar:opacity-100 transition-all font-mono">NODE-{i + 1}</span>
                </div>
              ))}
              <div className="absolute inset-x-6 md:inset-x-12 inset-y-10 md:inset-y-14 flex flex-col justify-between pointer-events-none opacity-[0.1]">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="w-full h-[1px] bg-blue-500"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-8 border-white/10 flex items-center gap-8 group hover:border-emerald-500/50 transition-all shadow-xl bg-white/[0.01]"
            >
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin-slow flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                <span className="text-white text-base font-black tracking-tighter">98%</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors font-['Montserrat']">Network Integrity</h4>
                <p className="text-[10px] text-blue-300/60 font-bold tracking-widest leading-relaxed uppercase font-mono">128 Secure Nodes<br />Status: Optimal</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-8 border-white/10 flex items-center gap-8 group hover:border-blue-500/50 transition-all shadow-xl bg-white/[0.01]"
            >
              <div className="w-20 h-20 rounded-full border-4 border-blue-500/10 border-r-blue-500 animate-spin-slow flex items-center justify-center relative shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                <span className="text-white text-base font-black tracking-tighter">42ms</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors font-['Montserrat']">Global Latency</h4>
                <p className="text-[10px] text-blue-300/60 font-bold tracking-widest leading-relaxed uppercase font-mono">Edge Optimized<br />Loss: 0.00%</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="glass-panel border-white/10 flex-1 p-1 overflow-hidden shadow-2xl bg-black/40">
            <div className="p-8 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 font-['Montserrat']">
                  <FaBolt className="text-amber-400" />
                  Activity Matrix
                </h3>
                <p className="text-[10px] text-blue-400/60 font-black uppercase tracking-widest pl-7 font-mono">Real-time Node Verifier</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-ping"></div>
            </div>

            <div className="p-8 space-y-10">
              {[
                { type: 'Lead', msg: 'System initialized node 0x9F', time: '2m', color: 'blue' },
                { type: 'Alert', msg: 'Traffic shift detected @ Edge-1', time: '14m', color: 'amber' },
                { type: 'Node', msg: 'Secure layer 7 synchronized', time: '1h', color: 'purple' },
                { type: 'System', msg: 'Backup completed successfully', time: '12h', color: 'emerald' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="flex items-start gap-5 group cursor-crosshair relative pb-4 border-b border-white/[0.03] last:border-0"
                >
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full shadow-[0_0_12px] group-hover:scale-150 transition-all`}
                    style={{
                      backgroundColor: item.color === 'blue' ? '#3b82f6' : item.color === 'amber' ? '#f59e0b' : item.color === 'purple' ? '#a855f7' : '#10b981',
                      boxShadow: `0 0 10px ${item.color === 'blue' ? '#3b82f6' : item.color === 'amber' ? '#f59e0b' : item.color === 'purple' ? '#a855f7' : '#10b981'}`
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-[13px] text-white/80 group-hover:text-white transition-colors leading-tight font-bold uppercase tracking-tight">{item.msg}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/5 border border-white/10" style={{ color: item.color === 'blue' ? '#60a5fa' : item.color === 'amber' ? '#fbbf24' : item.color === 'purple' ? '#c084fc' : '#34d399' }}>{item.type}</span>
                      <span className="text-[9px] text-gray-500 font-black uppercase font-mono">{item.time} ago</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-white/10 bg-black/60">
              <button className="w-full py-5 bg-blue-600/10 border border-blue-500/40 text-[10px] text-white font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:border-blue-500 transition-all rounded-2xl shadow-inner active:scale-95 group">
                <span className="flex items-center justify-center gap-3 font-['Montserrat']">
                  Full Archive
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
