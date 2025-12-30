import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaClock, FaCommentDots, FaUserCheck, FaTrash, FaCheckDouble, FaDatabase, FaFilter } from 'react-icons/fa';

const LeadManager = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Jessica Miller', service: 'E-Commerce', date: 'Oct 24, 2023', status: 'New', priority: 'High', email: 'jessica@example.com' },
    { id: 2, name: 'CloudScale Inc', service: 'Cloud App', date: 'Oct 23, 2023', status: 'In Review', priority: 'Medium', email: 'ops@cloudscale.io' },
    { id: 3, name: 'David Beckham', service: 'UI/UX Design', date: 'Oct 22, 2023', status: 'Resolved', priority: 'Low', email: 'david@legend.com' },
  ]);

  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    if (window.confirm('PROTOCOL: PURGE LEAD NODE FROM REGISTRY?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setLeads(leads.map(l => {
      if (l.id === id) {
        const statuses = ['New', 'In Review', 'Resolved'];
        const nextIdx = (statuses.indexOf(l.status) + 1) % statuses.length;
        return { ...l, status: statuses[nextIdx] };
      }
      return l;
    }));
  };

  const filteredLeads = leads.filter(l => filter === 'All' || l.status === filter);

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter text-white">Lead <span className="text-blue-500">Commander</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Unify and manage global client inquiries</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
            <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">{leads.filter(l => l.status === 'New').length} ACTIVE INQUIRIES</span>
          </div>
        </div>
      </div>

      <div className="glass-panel border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-600 text-xs" />
            <div className="flex gap-2">
              {['All', 'New', 'In Review', 'Resolved'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-white/5 text-gray-500 hover:text-white'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] border-b border-white/5">
                <th className="px-8 py-5">Inquiry Origin</th>
                <th className="px-8 py-5">Requested Service</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Priority</th>
                <th className="px-8 py-5 text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode='popLayout'>
                {filteredLeads.map((lead) => (
                  <motion.tr
                    layout
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-blue-500 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                          <FaEnvelope />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{lead.name}</p>
                          <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase font-mono">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-gray-400 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 uppercase tracking-widest">
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => toggleStatus(lead.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20' :
                            lead.status === 'In Review' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20' :
                              'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                          }`}>
                        <div className={`w-1 h-1 rounded-full ${lead.status === 'New' ? 'bg-blue-500 animate-pulse' : lead.status === 'In Review' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        {lead.status}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${lead.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                          lead.priority === 'Medium' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
                          }`}></div>
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{lead.priority}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => alert(`INITIATING DIRECT COMMS WITH ${lead.email}...`)}
                        className="p-3 rounded-xl bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-600/10 border border-white/10 hover:border-blue-500/30 transition-all active:scale-95"
                      >
                        <FaCommentDots size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-3 rounded-xl bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-600/10 border border-white/10 hover:border-red-500/30 transition-all active:scale-95"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-24 text-center space-y-4">
            <FaDatabase className="mx-auto text-4xl text-white/5 animate-pulse" />
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">No lead nodes detected in current data stream</p>
          </div>
        )}

        <div className="p-8 border-t border-white/5 bg-white/[0.01]">
          <button
            onClick={() => setLeads(leads.map(l => ({ ...l, status: 'Resolved' })))}
            className="text-[10px] font-black uppercase text-gray-600 hover:text-blue-500 transition-colors tracking-[0.3em] flex items-center justify-center gap-3 mx-auto group"
          >
            <FaCheckDouble className="group-hover:scale-110 transition-transform" /> Audit and Resolve All Pending Nodes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadManager;
