import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaUser, FaBriefcase, FaImage, FaCheck, FaTimes, FaQuoteLeft } from 'react-icons/fa';

const DEFAULT_TEAM = [
  { id: 1, name: "James Anderson", role: "CEO & Founder", bio: "Visionary leader with 15+ years driving digital transformation.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", linkedin: "#", twitter: "#", instagram: "#", facebook: "#" },
  { id: 2, name: "Sarah Lin", role: "CTO", bio: "Cloud architecture expert passionate about AI innovation.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", linkedin: "#", twitter: "#", instagram: "#", facebook: "#" },
  { id: 3, name: "Michael Chen", role: "Lead Developer", bio: "Full-stack wizard specializing in scalable enterprise solutions.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", linkedin: "#", twitter: "#", instagram: "#", facebook: "#" },
  { id: 4, name: "Emily Davis", role: "Head of Design", bio: "Award-winning designer creating intuitive user experiences.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", linkedin: "#", twitter: "#", instagram: "#", facebook: "#" }
];

const TeamManager = () => {
  const [team, setTeam] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({ id: '', name: '', role: '', bio: '', image: '', linkedin: '', twitter: '', instagram: '', facebook: '' });

  useEffect(() => {
    const saved = localStorage.getItem('vgtw_team');
    if (saved) setTeam(JSON.parse(saved));
    else { setTeam(DEFAULT_TEAM); localStorage.setItem('vgtw_team', JSON.stringify(DEFAULT_TEAM)); }
  }, []);

  const saveToStorage = (data) => { localStorage.setItem('vgtw_team', JSON.stringify(data)); window.dispatchEvent(new Event('storage')); };

  const handleSave = (e) => {
    e.preventDefault();
    let newTeam;
    if (currentMember.id) newTeam = team.map(m => m.id === currentMember.id ? currentMember : m);
    else newTeam = [...team, { ...currentMember, id: Date.now() }];
    setTeam(newTeam); saveToStorage(newTeam); resetForm();
  };

  const handleDelete = (id) => { if (window.confirm('Wipe this visionary from the collective?')) { const filtered = team.filter(m => m.id !== id); setTeam(filtered); saveToStorage(filtered); } };
  const handleEdit = (member) => { setCurrentMember(member); setIsEditing(true); };
  const resetForm = () => { setCurrentMember({ id: '', name: '', role: '', bio: '', image: '', linkedin: '', twitter: '', instagram: '', facebook: '' }); setIsEditing(false); };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Team <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Visionary Directory Management</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/20 active:scale-95"><FaPlus /> Provision New Member</button>
        </header>

        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetForm} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10">{currentMember.id ? 'Modify Identity' : 'Provision Identity'}</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Identity</label>
                      <div className="relative group"><FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" /><input type="text" required value={currentMember.name} onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-black uppercase placeholder-white/10 focus:outline-none focus:border-blue-500 transition-all" /></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Core Position</label>
                      <div className="relative group"><FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" /><input type="text" required value={currentMember.role} onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-black uppercase placeholder-white/10 focus:outline-none focus:border-blue-500 transition-all" /></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Visual Link (URL)</label>
                    <div className="relative group"><FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" /><input type="url" required value={currentMember.image} onChange={(e) => setCurrentMember({ ...currentMember, image: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-black outline-none focus:border-blue-500 transition-all" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Mission Log (Bio)</label>
                    <div className="relative group"><FaQuoteLeft className="absolute left-5 top-6 text-gray-600 group-focus-within:text-blue-500 transition-colors" /><textarea required rows="3" value={currentMember.bio} onChange={(e) => setCurrentMember({ ...currentMember, bio: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-blue-500 transition-all resize-none" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Network Links</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['linkedin', 'twitter', 'instagram', 'facebook'].map(plat => (
                        <div key={plat} className="relative group"><i className={`bi bi-${plat} absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors`}></i><input type="url" value={currentMember[plat]} onChange={(e) => setCurrentMember({ ...currentMember, [plat]: e.target.value })} placeholder={`${plat.charAt(0).toUpperCase() + plat.slice(1)} URL`} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[10px] focus:outline-none focus:border-blue-500 transition-all" /></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2rem] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40"><FaCheck /> {currentMember.id ? 'Authorize Update' : 'Initialize Node'}</button>
                    <button type="button" onClick={resetForm} className="px-10 bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2rem] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3"><FaTimes /> Abort</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative"
            >
              {/* Premium ID Card Container (Admin) */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#0f172a] border border-white/10 hover:border-blue-500/50 transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] group-hover:-translate-y-2">

                {/* Image */}
                <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                {/* Admin Controls - Top Right */}
                <div className="absolute top-4 right-4 z-30 flex gap-2">
                  <button onClick={() => handleEdit(member)} className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"><FaEdit size={10} /></button>
                  <button onClick={() => handleDelete(member.id)} className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"><FaTrash size={10} /></button>
                </div>

                {/* Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full pointer-events-none">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors truncate">{member.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-[2px] w-6 bg-blue-500 transition-all duration-500 group-hover:w-12"></div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{member.role}</p>
                    </div>

                    {/* Social Hub - Always Visible (Admin) */}
                    <div className="flex gap-3 mt-4">
                      {['linkedin', 'twitter', 'github'].map(plat => (
                        <a key={plat} href={member[plat]} target="_blank" rel="noreferrer" className={`text-lg transition-all hover:scale-110 ${member[plat] ? 'text-blue-400' : 'text-white/20'}`}>
                          <i className={`bi bi-${plat}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <button onClick={() => setIsEditing(true)} className="group h-auto min-h-[500px] flex flex-col items-center justify-center gap-6 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[2.5rem] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-blue-500/5"><FaPlus size={24} /></div>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-blue-500 transition-colors">Invoke_Visionary</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamManager;
