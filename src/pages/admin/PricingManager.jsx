import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheck, FaTimes, FaTags, FaSave, FaUndo } from 'react-icons/fa';

const PricingManager = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Website', category: 'Website', price: '4,999', status: 'Active' },
    { id: 2, name: 'Growth App', category: 'Application', price: '14,999', status: 'Active' },
    { id: 3, name: 'Design Audit', category: 'UI/UX', price: '999', status: 'Draft' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const [newPlan, setNewPlan] = useState({ name: '', category: 'Website', price: '', status: 'Active' });
  const [editPlan, setEditPlan] = useState({ name: '', category: 'Website', price: '', status: 'Active' });

  const handleAdd = (e) => {
    e.preventDefault();
    const id = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    setPlans([{ ...newPlan, id }, ...plans]);
    setNewPlan({ name: '', category: 'Website', price: '', status: 'Active' });
    setIsAdding(false);
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setEditPlan({ ...plan });
  };

  const handleSaveEdit = () => {
    setPlans(plans.map(p => p.id === editingId ? { ...editPlan } : p));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('CRITICAL: CONFIRM DELETION OF THIS PRICING NODE?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const filteredPlans = plans.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Pricing <span className="text-blue-500">Matrix</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Real-time control of global service packages</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
          >
            <FaPlus /> Initialize New Node
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="glass-panel p-8 border-blue-500/20 bg-blue-600/[0.02]"
          >
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Node Name</label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  placeholder="e.g. Enterprise App"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Classification</label>
                <select
                  value={newPlan.category}
                  onChange={e => setNewPlan({ ...newPlan, category: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono uppercase"
                >
                  <option value="Website">Website</option>
                  <option value="Application">Application</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Base Value (INR)</label>
                <input
                  type="text"
                  required
                  value={newPlan.price}
                  onChange={e => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  placeholder="e.g. 24,999"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-emerald-600 transition-all uppercase tracking-widest">Commit</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-3 bg-white/5 text-gray-400 text-[10px] font-black rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-all uppercase tracking-widest">Abort</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel overflow-hidden border-white/5">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-4 px-4 py-3 bg-black/40 rounded-xl border border-white/5 w-96 max-w-full">
            <FaSearch className="text-gray-600 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="FILTER MATRIX DATA..."
              className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full font-mono uppercase tracking-[0.2em] placeholder:text-gray-700 p-0"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Website', 'Application', 'UI/UX'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-white/5 text-gray-500 border-transparent hover:text-white hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] border-b border-white/5">
                <th className="px-8 py-5">Node Identity</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Value Registry</th>
                <th className="px-8 py-5">Integrity</th>
                <th className="px-8 py-5 text-right">Ops_Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPlans.map((plan) => (
                <motion.tr
                  layout
                  key={plan.id}
                  className={`transition-colors group ${editingId === plan.id ? 'bg-blue-600/5' : 'hover:bg-white/[0.02]'}`}
                >
                  <td className="px-8 py-6">
                    {editingId === plan.id ? (
                      <input
                        className="bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs w-full focus:outline-none"
                        value={editPlan.name}
                        onChange={e => setEditPlan({ ...editPlan, name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-inner">
                          <FaTags className="text-sm" />
                        </div>
                        <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{plan.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {editingId === plan.id ? (
                      <select
                        className="bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs w-full focus:outline-none uppercase"
                        value={editPlan.category}
                        onChange={e => setEditPlan({ ...editPlan, category: e.target.value })}
                      >
                        <option value="Website">Website</option>
                        <option value="Application">Application</option>
                        <option value="UI/UX">UI/UX</option>
                      </select>
                    ) : (
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border border-white/5 px-3 py-1 bg-white/[0.02] rounded-md">{plan.category}</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {editingId === plan.id ? (
                      <input
                        className="bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs w-full focus:outline-none font-mono"
                        value={editPlan.price}
                        onChange={e => setEditPlan({ ...editPlan, price: e.target.value })}
                      />
                    ) : (
                      <span className="text-sm font-black text-emerald-400">₹{plan.price}</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {editingId === plan.id ? (
                      <select
                        className="bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs w-full focus:outline-none uppercase"
                        value={editPlan.status}
                        onChange={e => setEditPlan({ ...editPlan, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                    ) : (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${plan.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                        <div className={`w-1 h-1 rounded-full ${plan.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        {plan.status}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {editingId === plan.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all">
                            <FaSave size={14} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-2.5 rounded-lg bg-white/5 text-gray-500 border border-white/5 hover:bg-red-600/20 hover:text-red-400 transition-all">
                            <FaUndo size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(plan)} className="p-2.5 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-blue-600/20 transition-all border border-white/5 group-hover:border-blue-500/30">
                            <FaEdit size={14} />
                          </button>
                          <button onClick={() => handleDelete(plan.id)} className="p-2.5 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-600/20 transition-all border border-white/5 group-hover:border-red-500/30">
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlans.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <FaDatabase className="mx-auto text-4xl text-white/5 animate-pulse" />
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">No data nodes found matching current filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingManager;
