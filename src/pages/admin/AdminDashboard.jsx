import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  FaUsers, FaArrowUp, FaChartBar, FaGlobe,
  FaDollarSign, FaBolt, FaArrowRight, FaEllipsisV,
  FaDatabase, FaNetworkWired, FaShieldAlt, FaTerminal, FaCircle, FaStar, FaRoad, FaQuestionCircle,
  FaBriefcase, FaNewspaper, FaRocket, FaHandshake, FaMoneyBillWave, FaDownload, FaFilePdf, FaChartLine,
  FaCalendarAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane
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
      transition={{ delay: i * 0.05, duration: 0.8 }}
      style={{ rotateX, rotateY, scale, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#0f172a]/40 backdrop-blur-xl p-8 border border-white/5 group hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden rounded-[2.5rem] flex flex-col justify-between h-full shadow-2xl"
    >
      <motion.div
        style={{ x: useTransform(x, [-100, 100], [-10, 10]), y: useTransform(y, [-100, 100], [-10, 10]) }}
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"
      />

      <div className="flex items-start justify-between relative z-10 mb-8">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-all duration-500"
          style={{ color: stat.color }}
        >
          {stat.icon}
        </motion.div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 text-[8px] font-black tracking-[0.2em] text-white border border-white/5`}>
          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
          {stat.subtext || 'SECURED_NODE'}
        </div>
      </div>

      <div className="relative z-10 group-hover:translate-z-20 transition-transform duration-500">
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{stat.label}</p>
        <h3 className="text-3xl font-black text-white group-hover:tracking-wider transition-all duration-500 select-none uppercase tracking-tighter">{stat.value}</h3>
      </div>
    </motion.div>
  );
};

const PricingAnalytics = () => {
  const [pricingData, setPricingData] = useState({ website: [], application: [], uiux: [], odoo: [] });
  const [planStats, setPlanStats] = useState([]);

  useEffect(() => {
    const loadPricingData = () => {
      // Define defaults if not present to ensure "Real" dashboard even before manager visits
      const getStored = (key, def) => {
        const item = localStorage.getItem(key);
        if (!item) {
          localStorage.setItem(key, JSON.stringify(def));
          return def;
        }
        return JSON.parse(item);
      };

      const websitePlans = getStored('vgtw_pricing_plans', [
        { name: 'Starter', price: '$2,500', features: ['5 Pages', 'Responsive'], popular: false },
        { name: 'Business', price: '$5,000', features: ['15 Pages', 'CMS'], popular: true },
        { name: 'Enterprise', price: 'Custom', features: ['Unlimited', 'Support'], popular: false }
      ]);
      const appPlans = getStored('vgtw_app_pricing_plans', [
        { name: 'MVP Launch', price: '$10,000', features: ['Core', 'Dashboard'], popular: false },
        { name: 'Scale & Grow', price: '$25,000', features: ['Advanced', 'API'], popular: true },
        { name: 'Enterprise Platform', price: 'Custom', features: ['Microservices', '24/7'], popular: false }
      ]);
      const uiuxPlans = getStored('vgtw_uiux_pricing_plans', [
        { name: 'UX Audit', price: '$1,500', features: ['Evaluation', 'Accessibility'], popular: false },
        { name: 'Full Redesign', price: '$4,000', features: ['Research', 'UI Design'], popular: true },
        { name: 'Design System', price: '$8,000', features: ['Library', 'Docs'], popular: false }
      ]);
      const odooPlans = getStored('vgtw_odoo_pricing_plans', [
        { name: 'Essentials', price: '$5,000', features: ['Standard', 'CRM'], popular: false },
        { name: 'Business Pro', price: '$12,000', features: ['Custom', 'Inventory'], popular: true },
        { name: 'Infinite Suite', price: 'Custom', features: ['Infinite', 'Migration'], popular: false }
      ]);

      setPricingData({ website: websitePlans, application: appPlans, uiux: uiuxPlans, odoo: odooPlans });
      const allPlans = [
        ...websitePlans.map(p => ({ ...p, type: 'Website' })),
        ...appPlans.map(p => ({ ...p, type: 'Application' })),
        ...uiuxPlans.map(p => ({ ...p, type: 'UI/UX' })),
        ...odooPlans.map(p => ({ ...p, type: 'Odoo ERP' }))
      ];
      setPlanStats(allPlans.map(plan => ({ name: plan.name, type: plan.type, price: plan.price, features: plan.features?.length || 0, popular: plan.popular || false })));
    };
    loadPricingData();
    window.addEventListener('storage', loadPricingData);
    return () => window.removeEventListener('storage', loadPricingData);
  }, []);

  const totalPlans = planStats.length;

  return (
    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="p-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4">
            <FaDollarSign className="text-blue-500" />
            Pricing Matrix <span className="text-blue-500">Node</span>
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest pl-8">Tier deployment distribution</p>
            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
            <span className="text-[8px] text-blue-500/50 font-black uppercase tracking-widest">Last_Transmission {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </div>
        <div className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[10px] font-black text-blue-500 uppercase tracking-widest">
          {totalPlans} Active_Protocols
        </div>
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {[
            { label: 'Web Protocols', count: pricingData.website.length, color: 'blue', icon: <FaGlobe /> },
            { label: 'App Protocols', count: pricingData.application.length, color: 'purple', icon: <FaRocket /> },
            { label: 'UX Protocols', count: pricingData.uiux.length, color: 'emerald', icon: <FaStar /> },
            { label: 'ERP Protocols', count: pricingData.odoo.length, color: 'orange', icon: <FaShieldAlt /> }
          ].map((cat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`bg-[#030712]/60 border border-white/5 rounded-[2rem] p-8 shadow-xl group hover:border-${cat.color}-500/30 transition-all`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-${cat.color}-500/10 flex items-center justify-center text-${cat.color}-500 border border-${cat.color}-500/10 group-hover:scale-110 transition-transform`}>{cat.icon}</div>
                <span className={`text-[10px] font-black text-gray-500 group-hover:text-${cat.color}-500 uppercase tracking-widest transition-colors`}>{cat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-black text-white tracking-tighter">{cat.count}</div>
                <div className="text-right">
                  <div className={`text-2xl font-black text-${cat.color}-500`}>{totalPlans > 0 ? Math.round((cat.count / totalPlans) * 100) : 0}%</div>
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Protocol_Share</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div><h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Integrated_Tier_Log</h4></div>
          <div className="grid gap-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
            {planStats.map((plan, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-6 bg-black/20 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-6 flex-1">
                  <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse' : 'bg-gray-800'}`} />
                  <div>
                    <div className="flex items-center gap-4">
                      <h5 className="text-white font-black text-sm uppercase tracking-tight">{plan.name}</h5>
                      {plan.popular && <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[8px] font-black text-emerald-500 uppercase tracking-widest">Priority_Node</span>}
                    </div>
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-2">{plan.type} SYSTEM • {plan.features} SECTORS</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-500 tracking-tighter">{plan.price.startsWith('₹') || plan.price.startsWith('$') ? plan.price : `₹${plan.price}`}</div>
                  <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">Yield_Per_Deployment</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const loadMeetings = () => {
      const saved = localStorage.getItem('vgtw_meetings');
      if (saved) {
        const upcoming = JSON.parse(saved).filter(m => m.status !== 'Cancelled' && m.status !== 'Completed').sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)).slice(0, 5);
        setMeetings(upcoming);
      }
    };
    loadMeetings();
    window.addEventListener('storage', loadMeetings);
    return () => window.removeEventListener('storage', loadMeetings);
  }, []);

  const formatMeetingTime = (date, time) => {
    const meetingDate = new Date(date + 'T' + time);
    const today = new Date();
    if (meetingDate.toDateString() === today.toDateString()) return `Today @ ${time}`;
    return `${meetingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ ${time}`;
  };

  return (
    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="p-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4">
            <FaCalendarAlt className="text-purple-500" />
            Session <span className="text-purple-500">Links</span>
          </h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2 pl-8">Scheduled Synergy Protocol</p>
        </div>
        <div className="px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[10px] font-black text-purple-500 uppercase tracking-widest">
          {meetings.length} Scheduled_Nodes
        </div>
      </div>
      <div className="p-10 text-white">
        {meetings.length > 0 ? (
          <div className="space-y-4">
            {meetings.map((meeting, idx) => (
              <motion.div key={meeting.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-6 bg-black/20 border border-white/5 rounded-[2rem] hover:border-purple-500/30 transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-5 mb-3">
                    <h5 className="text-white font-black text-sm uppercase tracking-tight">{meeting.name}</h5>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black text-gray-500 uppercase tracking-widest">{meeting.service}</span>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black tracking-widest text-gray-500 uppercase italic">
                    <span className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> {meeting.email}</span>
                    {meeting.phone && <span className="flex items-center gap-2"><FaPhone className="text-purple-500" /> {meeting.phone}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-purple-500 font-black text-sm flex items-center justify-end gap-3 uppercase tracking-tighter mb-1"><FaClock className="animate-pulse" /> {formatMeetingTime(meeting.date, meeting.time)}</div>
                  <span className="text-[8px] text-gray-700 font-black uppercase tracking-widest">{meeting.status}_State</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-20"><FaCalendarAlt className="mx-auto text-6xl mb-6" /><p className="text-[10px] font-black uppercase tracking-[0.5em]">No synergy sessions detected</p></div>
        )}
      </div>
    </div>
  );
};

const GrowthChart = ({ financials }) => {
  const points = [15, 30, 25, 50, 45, 75, 70, 95, 85, 100];
  const maxY = 200; const maxX = 800;
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * maxX} ${maxY - (p / 100) * maxY}`).join(' ');
  const areaPath = `${pathData} L ${maxX} ${maxY} L 0 ${maxY} Z`;

  return (
    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="p-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4">
            <FaChartLine className="text-emerald-500" />
            Growth <span className="text-emerald-500">Velocity</span>
          </h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2 pl-8">Enterprise Momentum Analytics</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-black text-emerald-500 uppercase tracking-widest shadow-xl shadow-emerald-500/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Upward_Shift
        </div>
      </div>
      <div className="p-12 relative overflow-hidden h-[360px]">
        <svg viewBox={`0 0 ${maxX} ${maxY}`} className="w-full h-full overflow-visible">
          <defs><linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.3" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient></defs>
          {[0, 1, 2, 3].map(i => <line key={i} x1="0" y1={i * (maxY / 3)} x2={maxX} y2={i * (maxY / 3)} stroke="rgba(255,255,255,0.03)" strokeDasharray="8 8" />)}
          <motion.path d={areaPath} fill="url(#growthGradient)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} />
          <motion.path d={pathData} fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} style={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.4))' }} />
          {points.map((p, i) => <motion.circle key={i} cx={(i / (points.length - 1)) * maxX} cy={maxY - (p / 100) * maxY} r="4" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + (i * 0.1) }} />)}
        </svg>
        <div className="absolute top-12 left-12">
          <h4 className="text-5xl font-black text-white tracking-tighter mb-1">
            {financials.income > 0 ? `+${Math.round((financials.profit / financials.income) * 100)}%` : '+0%'}
          </h4>
          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.4em]">Yield_Margin_Node</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [stats, setStats] = useState([]);
  const [financials, setFinancials] = useState({ income: 0, expense: 0, profit: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTotal = (key) => { const data = localStorage.getItem(key); return data ? JSON.parse(data).length : 0; };
  const calculateStats = () => {
    const services = ['informative', 'ecommerce', 'application', 'uiux', 'maintenance', 'dynamic', 'odoo'];
    let totalFeatures = 0;
    services.forEach(s => totalFeatures += JSON.parse(localStorage.getItem(`vgtw_service_${s}`) || '{}').features?.length || 0);
    setStats([
      { label: 'Active Services', value: services.length.toString(), icon: <FaGlobe />, color: '#3b82f6' },
      { label: 'Service Sectors', value: totalFeatures.toString(), icon: <FaStar />, color: '#10b981' },
      { label: 'Project Nodes', value: calculateTotal('vgtw_projects').toString(), icon: <FaBriefcase />, color: '#a855f7' },
      { label: 'Job Applicants', value: calculateTotal('vgtw_applications').toString(), icon: <FaUsers />, color: '#f59e0b' },
      { label: 'Inbound Leads', value: calculateTotal('vgtw_leads').toString(), icon: <FaDownload />, color: '#10b981' },
      { label: 'Referral Nodes', value: calculateTotal('vgtw_referrals').toString(), icon: <FaHandshake />, color: '#ec4899' },
      { label: 'Brand Partners', value: calculateTotal('vgtw_brands').toString(), icon: <FaShieldAlt />, color: '#3b82f6' },
      { label: 'Total Contacts', value: calculateTotal('vgtw_contacts').toString(), icon: <FaEnvelope />, color: '#6366f1' },
      { label: 'Team Visionaries', value: calculateTotal('vgtw_team').toString(), icon: <FaUsers />, color: '#ec4899' },
      { label: 'Security Nodes', value: calculateTotal('vgtw_users').toString(), icon: <FaShieldAlt />, color: '#3b82f6' },
      { label: 'Content Streams', value: calculateTotal('vgtw_blog').toString(), icon: <FaNewspaper />, color: '#6366f1' },
      { label: 'Newsletter Nodes', value: calculateTotal('vgtw_newsletter').toString(), icon: <FaPaperPlane />, color: '#10b981' },
      { label: 'Testimonials', value: calculateTotal('vgtw_testimonials').toString(), icon: <FaQuestionCircle />, color: '#8b5cf6' },
      { label: 'Open Protocols', value: calculateTotal('vgtw_jobs').toString(), icon: <FaRocket />, color: '#ef4444' },
    ]);
    const acc = JSON.parse(localStorage.getItem('vgtw_accounting') || '[]');
    const inc = acc.filter(d => d.type === 'Income').reduce((a, c) => a + cleanNum(c.amount), 0);
    const exp = acc.filter(d => d.type === 'Expense').reduce((a, c) => a + cleanNum(c.amount), 0);
    setFinancials({ income: inc, expense: exp, profit: inc - exp });
  };

  useEffect(() => {
    calculateStats();
    window.addEventListener('storage', calculateStats);
    return () => window.removeEventListener('storage', calculateStats);
  }, []);

  const cleanNum = (val) => Number(val?.toString().replace(/[^0-9.]/g, '')) || 0;

  const handleExportPDF = async () => {
    setIsExporting(true); setExportProgress(10);
    try {
      const jsPDF = (await import('jspdf')).default; const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF(); setExportProgress(40);
      doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 50, 'F'); doc.setTextColor(255, 255, 255);
      doc.setFontSize(24); doc.text('VERTEX GLOBAL TECH', 15, 25); doc.setFontSize(10); doc.text('INTELLIGENCE_DEPLOYMENT_REPORT | SYSTEM_STATUS_ONLINE', 15, 38);
      setExportProgress(70);
      autoTable(doc, { startY: 60, head: [['Identifier', 'Node_Count']], body: stats.map(s => [s.label, s.value]), theme: 'grid', headStyles: { fillColor: [59, 130, 246] } });
      doc.save('VGTW_Intelligence_Report.pdf');
    } catch (e) { alert("Deployment Error: Protocol Export Failed"); }
    finally { setExportProgress(100); setTimeout(() => setIsExporting(false), 1000); }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans space-y-10">
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-10">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-3 font-['Montserrat']">Command <span className="text-blue-500">Node</span></h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 font-medium uppercase tracking-[0.4em] text-[10px]">Operations Intelligence</p>
              <div className="w-px h-3 bg-white/10"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System_Online</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-[24px] font-black text-white/90 tracking-tighter leading-none">{currentTime.toLocaleTimeString([], { hour12: false })}</div>
            <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mt-1">{currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
        <button onClick={handleExportPDF} disabled={isExporting} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-blue-900/40 active:scale-95 disabled:grayscale flex items-center gap-4"><FaFilePdf size={18} /> {isExporting ? `SYNCHRONIZING ${exportProgress}%` : 'GENERATE_INTELLIGENCE_REPORT'}</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active_Revenue', val: financials.income, color: 'emerald', icon: <FaMoneyBillWave /> },
          { label: 'Operational_Out', val: financials.expense, color: 'red', icon: <FaArrowUp className="rotate-180" /> },
          { label: 'Net_Yield', val: financials.profit, color: 'blue', icon: <FaChartBar /> }
        ].map((fin, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`bg-[#0f172a]/40 backdrop-blur-xl border border-${fin.color}-500/20 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group`}>
            <div className={`absolute -right-4 -bottom-4 text-${fin.color}-500 opacity-5 group-hover:opacity-10 transition-all duration-700 rotate-12`}><fin.icon.type size={120} /></div>
            <div className={`text-${fin.color}-500 mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]`}><div className={`w-2 h-2 rounded-full bg-${fin.color}-500 animate-pulse`}></div> {fin.label}</div>
            <div className="text-4xl font-black text-white tracking-tighter select-none">₹{fin.val.toLocaleString()}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <GrowthChart financials={financials} />
        <UpcomingMeetings />
      </div>

      {/* Quick Outreach Node */}
      {JSON.parse(localStorage.getItem('vgtw_admin_session') || '{}').isMaster && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/60 backdrop-blur-2xl border border-purple-500/20 p-10 rounded-[2.5rem] shadow-3xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none rotate-12">
            <FaRocket size={150} className="text-purple-500" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                <span className="text-purple-400 font-black text-[10px] uppercase tracking-[0.4em]">Propulsion_Node</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Quick Outreach</h3>
              <p className="text-gray-500 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Deploy service briefings instantly</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:min-w-[500px]">
              <input
                type="email"
                placeholder="TARGET_CLIENT_IDENTITY"
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder-gray-800 focus:border-purple-500 outline-none transition-all font-black text-[10px] uppercase tracking-widest"
                id="quick-outreach-email"
              />
              <button
                onClick={async () => {
                  const emailInput = document.getElementById('quick-outreach-email');
                  const val = emailInput.value;
                  if (!val) return;
                  const btn = document.getElementById('quick-outreach-btn');
                  const originalText = btn.innerHTML;
                  btn.innerHTML = 'SYNCING...';
                  btn.disabled = true;
                  try {
                    const emailjs = (await import('@emailjs/browser')).default;
                    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_MARKETING_TEMPLATE_ID', { to_email: val, subject: 'Transforming Your Digital Vision | Vertex Global Tech' }, 'YOUR_PUBLIC_KEY');
                    alert('DEPLOYMENT_SUCCESSFUL: PAYLOAD_DELIVERED');
                    emailInput.value = '';
                  } catch (e) {
                    alert('SYSTEM_ERROR: PROTOCOL_ABORTED');
                  } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                  }
                }}
                id="quick-outreach-btn"
                className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 whitespace-nowrap"
              >
                Dispatch_Brief
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <PricingAnalytics />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} i={i} />)}
      </div>
    </div>
  );
};

export default AdminDashboard;
