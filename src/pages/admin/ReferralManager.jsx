import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaArrowRight, FaClock, FaUserAlt, FaChartPie, FaCheckCircle, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const ReferralManager = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [referrals, setReferrals] = useState([
    { id: 'REF-001', name: 'Rahul Sharma', email: 'rahul@vgt.tech', target: 'John Doe (Web Dev)', status: 'Pending', reward: '₹5,000' },
    { id: 'REF-002', name: 'Ankita Singh', email: 'ankita@tech.co', target: 'V-Tech Solution', status: 'Converted', reward: '₹12,400' },
    { id: 'REF-003', name: 'Mike Ross', email: 'mike@pearson.co', target: 'Harvey (UI Audit)', status: 'Paid', reward: '₹2,500' },
  ]);

  const stats = [
    { label: 'Total Rewards', value: '₹42,800', desc: 'Global Payout Volume', color: 'blue' },
    { label: 'Conversion', value: '14.2%', desc: 'Site Avg: 10.5%', color: 'purple' },
    { label: 'Network Nodes', value: '184', desc: '+12 This Month', color: 'emerald' },
  ];

  const handleProcess = (id) => {
    setReferrals(referrals.map(ref => {
      if (ref.id === id) {
        if (ref.status === 'Pending') return { ...ref, status: 'Converted' };
        if (ref.status === 'Converted') return { ...ref, status: 'Paid' };
        return ref;
      }
      return ref;
    }));
  };

  const filteredReferrals = referrals.filter(ref => {
    const matchesTab = activeTab === 'All' || ref.status === activeTab;
    const matchesSearch = ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Referral <span className="text-blue-500">Monitor</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Track affiliate performance and reward payouts</p>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
          {['All', 'Pending', 'Converted', 'Paid'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${activeTab === tab
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats HUD */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="glass-panel p-8 border-white/5 relative group overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-${card.color}-600/5 rounded-full blur-3xl group-hover:bg-${card.color}-600/10 transition-all duration-700`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-${card.color}-400 border border-white/5 group-hover:border-${card.color}-500/30 transition-all`}>
                <FaChartPie className="text-xl" />
              </div>
              <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Sector 0{i + 1}</div>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">{card.label}</p>
            <h3 className="text-3xl font-black text-white mt-1 relative z-10 tracking-tighter">{card.value}</h3>
            <p className="text-gray-600 text-[9px] font-bold mt-3 flex items-center gap-2 uppercase tracking-tight relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-4 px-5 py-3 bg-black/40 border border-white/5 rounded-2xl w-full md:w-96 group focus-within:border-blue-500/50 transition-all">
            <FaSearch className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH PARTNER OR ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full font-black uppercase tracking-[0.2em]"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl">
              <FaShieldAlt className="text-blue-500 text-[10px]" />
              <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Payout Ledger: Secure</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                <th className="px-8 py-5">Node ID</th>
                <th className="px-8 py-5">Partner Profile</th>
                <th className="px-8 py-5">Assigned Target</th>
                <th className="px-8 py-5">Quantum Reward</th>
                <th className="px-8 py-5 text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode='popLayout'>
                {filteredReferrals.map((ref) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={ref.id}
                    className="hover:bg-blue-600/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-blue-500/60 font-black tracking-widest bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 w-fit">{ref.id}</span>
                        <span className={`text-[8px] font-black uppercase mt-1 tracking-widest ${ref.status === 'Paid' ? 'text-emerald-500' :
                            ref.status === 'Converted' ? 'text-blue-400' : 'text-amber-500'
                          }`}>{ref.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-blue-400 border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 transition-all">
                          <FaUserAlt className="text-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white leading-none uppercase tracking-tight group-hover:text-blue-400 transition-colors">{ref.name}</p>
                          <p className="text-[10px] text-gray-600 lowercase mt-1.5 font-mono">{ref.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{ref.target}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-mono text-emerald-400 font-black text-base tracking-tighter">
                        <FaMoneyBillWave className="text-xs opacity-40" />
                        {ref.reward}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {ref.status !== 'Paid' ? (
                        <button
                          onClick={() => handleProcess(ref.id)}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all group-hover:translate-x-[-4px] shadow-lg shadow-blue-900/20 active:scale-95 flex items-center gap-2 ml-auto"
                        >
                          Execute <FaArrowRight />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest ml-auto w-fit bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                          <FaCheckCircle /> Finalized
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredReferrals.length === 0 && (
            <div className="py-24 text-center">
              <FaChartPie className="mx-auto text-4xl text-white/5 mb-4 animate-pulse" />
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">No referral data in this sector</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralManager;
