import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaExternalLinkAlt, FaImage, FaGripVertical, FaTrash, FaEdit, FaSave, FaUndo, FaSearch } from 'react-icons/fa';

const PortfolioManager = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Crypto Wallet v2', type: 'FinTech', img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=300' },
    { id: 2, title: 'Nexus E-Commerce', type: 'SaaS', img: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=300' },
    { id: 3, title: 'HealthSync App', type: 'Mobile', img: 'https://images.unsplash.com/photo-1576091160550-217359f48f4c?q=80&w=300' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProj, setNewProj] = useState({ title: '', type: 'FinTech', img: '' });
  const [editProj, setEditProj] = useState({ title: '', type: 'FinTech', img: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { ...newProj, id }]);
    setNewProj({ title: '', type: 'FinTech', img: '' });
    setIsAdding(false);
  };

  const handleEdit = (proj) => {
    setEditingId(proj.id);
    setEditProj({ ...proj });
  };

  const handleSaveEdit = () => {
    setProjects(projects.map(p => p.id === editingId ? { ...editProj } : p));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('PROTOCOL: DESTRUCT PROJECT NODE?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700 text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Project <span className="text-blue-500">Portfolio</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Curate and manage global showcase initiatives</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
          >
            <FaPlus /> Deploy New Node
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
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProj.title}
                  onChange={e => setNewProj({ ...newProj, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Type</label>
                <input
                  type="text"
                  required
                  value={newProj.type}
                  onChange={e => setNewProj({ ...newProj, type: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Image URL</label>
                <input
                  type="text"
                  required
                  value={newProj.img}
                  onChange={e => setNewProj({ ...newProj, img: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div className="flex gap-3 md:col-span-3">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 transition-all uppercase tracking-widest">Authorize Deployment</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white/5 text-gray-500 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Abort</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <motion.div
            layout
            key={proj.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-panel group border-white/5 hover:border-blue-500/40 overflow-hidden relative ${editingId === proj.id ? 'ring-2 ring-blue-500/50' : ''}`}
          >
            {editingId === proj.id ? (
              <div className="p-6 space-y-4 bg-blue-600/5">
                <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.title} onChange={e => setEditProj({ ...editProj, title: e.target.value })} placeholder="Title" />
                <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.type} onChange={e => setEditProj({ ...editProj, type: e.target.value })} placeholder="Type" />
                <input className="w-full bg-black/60 border border-blue-500/50 rounded p-2 text-white text-xs font-mono" value={editProj.img} onChange={e => setEditProj({ ...editProj, img: e.target.value })} placeholder="Img URL" />
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="flex-1 py-2 bg-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"><FaSave /> Save</button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-white/10 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"><FaUndo /> Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-56 relative overflow-hidden">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80"></div>

                  <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button onClick={() => handleEdit(proj)} className="p-3 bg-black/80 backdrop-blur-xl rounded-xl text-white hover:text-blue-400 transition-all border border-white/10 hover:border-blue-500/40">
                      <FaEdit size={14} />
                    </button>
                    <button onClick={() => handleDelete(proj.id)} className="p-3 bg-black/80 backdrop-blur-xl rounded-xl text-white hover:text-red-400 transition-all border border-white/10 hover:border-red-500/40">
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-[9px] font-black uppercase text-blue-400 tracking-widest">
                      {proj.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors uppercase tracking-tighter">
                    {proj.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span>Node Secured</span>
                    </div>
                    <button className="text-blue-500 hover:text-white transition-colors flex items-center gap-2 px-3 py-1 bg-blue-500/5 rounded-lg border border-blue-500/10">
                      Live <FaExternalLinkAlt size={8} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}

        {!isAdding && (
          <div
            onClick={() => setIsAdding(true)}
            className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 bg-white/[0.01] hover:bg-blue-600/[0.03] hover:border-blue-500/20 transition-all cursor-pointer group min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gray-600 mb-6 group-hover:text-blue-500 group-hover:border-blue-500/40 transition-all shadow-inner">
              <FaPlus size={20} />
            </div>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] group-hover:text-white transition-colors">Import Project Node</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;
