import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaTrash, FaEdit, FaCheck, FaTimes, FaCrown, FaChartLine, FaSearch, FaMoneyBillWave, FaTrophy, FaPlus } from 'react-icons/fa';

const ReferralManager = () => {
  const [referrals, setReferrals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tiers, setTiers] = useState([]); // Dynamic Tiers
  const [activeTab, setActiveTab] = useState('referrals'); // referrals, tiers
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', code: '', tier: 'Starter' });
  const [tierForm, setTierForm] = useState({ name: '', commission: '', description: '', color: 'blue' });

  useEffect(() => {
    const loadData = () => {
      const savedReferrals = localStorage.getItem('vgtw_referrals');
      const savedLeads = localStorage.getItem('vgtw_referral_leads');
      const savedTiers = localStorage.getItem('vgtw_referral_tiers');

      if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      if (savedTiers) {
        const parsed = JSON.parse(savedTiers);

        // Migration: Check if old percentage-based tiers exist and convert them
        const needsMigration = parsed.some(t =>
          (t.name === 'Starter' || t.name === 'Pro') &&
          parseInt(t.commission) < 100
        );

        if (needsMigration) {
          // Replace old tiers with new flat-rate tiers
          const migratedTiers = [
            { name: 'Bridge', commission: '1000', description: 'Standard entry level partner status.', color: 'blue' },
            { name: 'Nexus', commission: '1500', description: 'Elite partner status after 3 successful referrals.', color: 'purple' }
          ];
          setTiers(migratedTiers);
          localStorage.setItem('vgtw_referral_tiers', JSON.stringify(migratedTiers));
        } else {
          setTiers(parsed);
        }
      } else {
        const defaultTiers = [
          { name: 'Bridge', commission: '1000', description: 'Standard entry level partner status.', color: 'blue' },
          { name: 'Nexus', commission: '1500', description: 'Elite partner status after 3 successful referrals.', color: 'purple' }
        ];
        setTiers(defaultTiers);
        localStorage.setItem('vgtw_referral_tiers', JSON.stringify(defaultTiers));
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const saveReferrals = (data) => {
    localStorage.setItem('vgtw_referrals', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const saveLeads = (data) => {
    localStorage.setItem('vgtw_referral_leads', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const saveTiers = (data) => {
    localStorage.setItem('vgtw_referral_tiers', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddReferral = (e) => {
    e.preventDefault();
    const newReferral = {
      id: Date.now().toString(),
      ...formData,
      status: 'Active',
      referralCount: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString()
    };
    const updated = [newReferral, ...referrals];
    setReferrals(updated);
    saveReferrals(updated);
    setIsAdding(false);
    setFormData({ name: '', email: '', code: '', tier: tiers[0]?.name || 'Bridge' });
  };

  const handleUpdateReferral = (e) => {
    e.preventDefault();
    const updated = referrals.map(r => r.id === editingId ? { ...r, ...formData } : r);
    setReferrals(updated);
    saveReferrals(updated);
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', email: '', code: '', tier: tiers[0]?.name || 'Bridge' });
  };

  const handleUpdateTier = (e) => {
    e.preventDefault();
    let updated;
    if (editingId !== null) {
      updated = tiers.map((t, i) => i === editingId ? tierForm : t);
    } else {
      updated = [...tiers, tierForm];
    }
    setTiers(updated);
    saveTiers(updated);
    setIsAdding(false);
    setEditingId(null);
    setTierForm({ name: '', commission: '', description: '', color: 'blue' });
  };

  const startEdit = (referral) => {
    setFormData({
      name: referral.name,
      email: referral.email,
      code: referral.code,
      tier: referral.tier
    });
    setEditingId(referral.id);
    setIsAdding(true);
  };

  const deleteTier = (index) => {
    if (window.confirm('Protocol: PURGE PACKAGE NODE? This may affect existing partners.')) {
      const updated = tiers.filter((_, i) => i !== index);
      setTiers(updated);
      saveTiers(updated);
    }
  };

  const handleDeleteReferral = (id) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      const filtered = referrals.filter(r => r.id !== id);
      setReferrals(filtered);
      saveReferrals(filtered);
    }
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const filtered = leads.filter(l => l.id !== id);
      setLeads(filtered);
      saveLeads(filtered);
    }
  };

  const toggleReferralStatus = (id) => {
    const updated = referrals.map(r =>
      r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r
    );
    setReferrals(updated);
    saveReferrals(updated);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredReferrals = referrals.filter(r => {
    const matchesTier = filterTier === 'All' || r.tier === filterTier;
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const totalEarnings = referrals.reduce((sum, r) => sum + (r.totalEarnings || 0), 0);
  const totalReferrals = referrals.reduce((sum, r) => sum + (r.referralCount || 0), 0);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Referral <span className="text-blue-500">Engine</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Partner Network & Yield Controller</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => { setActiveTab('referrals'); setIsAdding(false); }}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'referrals' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              Partners
            </button>
            <button
              onClick={() => { setActiveTab('tiers'); setIsAdding(false); }}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'tiers' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              Packages
            </button>
          </div>
        </header>

        {activeTab === 'referrals' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                    <FaUser />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Partners</div>
                    <div className="text-2xl font-black text-white">{referrals.length}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-500">
                    <FaCrown />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Elite Partners</div>
                    <div className="text-2xl font-black text-white">{referrals.filter(r => r.tier === 'Nexus').length}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center text-green-500">
                    <FaChartLine />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Referrals</div>
                    <div className="text-2xl font-black text-white">{totalReferrals}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center text-yellow-500">
                    <FaMoneyBillWave />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Payouts</div>
                    <div className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', email: '', code: '', tier: tiers[0]?.name || 'Bridge' }); }}
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
              >
                <FaPlus /> Manual Add Partner
              </button>
            </div>

            {/* Add/Edit Partnership Form */}
            <AnimatePresence>
              {activeTab === 'referrals' && isAdding && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
                  <div className="bg-[#0f172a]/80 border border-blue-500/30 rounded-2xl p-6 relative">
                    <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes /></button>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">{editingId ? 'Edit Partner Node' : 'Initialize Partner Network Node'}</h3>
                    <form onSubmit={editingId ? handleUpdateReferral : handleAddReferral} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Partner Identity</label>
                        <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none uppercase font-black" placeholder="Identity Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Digital Link (Email)</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none" placeholder="email@domain.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Access Protocol (Code)</label>
                        <input required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none font-mono uppercase" placeholder="CODE-NODE-001" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Commission Logic (Tier)</label>
                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10 overflow-x-auto no-scrollbar">
                          {tiers.map((t) => (
                            <button key={t.name} type="button" onClick={() => setFormData({ ...formData, tier: t.name })} className={`flex-1 min-w-[100px] py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.tier === t.name ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>{t.name}</button>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-full flex gap-4 mt-2">
                        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">{editingId ? 'COMMIT CHANGES' : 'ONBOARD PARTNER'}</button>
                        <button type="button" onClick={() => setIsAdding(false)} className="px-10 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">ABORT</button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filters */}
            <div className="mb-8 p-4 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setFilterTier('All')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterTier === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>All</button>
                  {tiers.map(tier => (
                    <button key={tier.name} onClick={() => setFilterTier(tier.name)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterTier === tier.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{tier.name}</button>
                  ))}
                </div>
                <div className="relative w-full lg:w-72">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" placeholder="PROTOCOL: SEARCH PARTNERS..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-[10px] font-black focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 uppercase tracking-widest" />
                </div>
              </div>
            </div>

            {/* Referrals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredReferrals.map((referral) => (
                  <motion.div key={referral.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`group relative bg-[#0f172a]/40 backdrop-blur-xl border rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl ${referral.tier === 'Nexus' ? 'border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-blue-900/10' : 'border-white/5'}`}>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${referral.tier === 'Nexus' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' : 'bg-blue-600/20 text-blue-400 border-blue-500/30'}`}>{referral.tier}</div>
                      <button onClick={() => toggleReferralStatus(referral.id)} className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${referral.status === 'Active' ? 'bg-green-600/20 text-green-400 border-green-500/30' : 'bg-gray-600/20 text-gray-400 border-gray-500/30'}`}>{referral.status}</button>
                    </div>
                    <div className="mb-6 pr-24">
                      <div className="flex items-center gap-2 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active_Partner</span></div>
                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-none">{referral.name}</h3>
                      <code className="text-xs text-blue-500 font-mono font-bold tracking-wider">{referral.code}</code>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400"><FaEnvelope className="text-blue-500" /><a href={`mailto:${referral.email}`} className="hover:text-blue-400 transition-colors truncate">{referral.email}</a></div>
                      <div className="flex items-center gap-2 text-xs text-gray-400"><FaTrophy className="text-green-500" /><span>{referral.referralCount} Successful Referrals</span></div>
                      <div className="flex items-center gap-2 text-xs text-gray-400"><FaMoneyBillWave className="text-yellow-500" /><span>₹{referral.totalEarnings.toLocaleString()} Earned</span></div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-white/5">
                      <button onClick={() => startEdit(referral)} className="flex-1 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2">EDIT</button>
                      <button onClick={() => handleDeleteReferral(referral.id)} className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2">DELETE</button>
                    </div>
                    <div className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-4">Initialized {formatDate(referral.createdAt)}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Recent Leads Section */}
            {leads.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Inbound Referral Leads</h2>
                <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                      <thead className="bg-white/[0.02] border-b border-white/5">
                        <tr className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                          <th className="px-10 py-6 text-left">Origin Authority</th>
                          <th className="px-10 py-6 text-left">Access Protocol</th>
                          <th className="px-10 py-6 text-left">Target Sector</th>
                          <th className="px-10 py-6 text-left">Timestamp</th>
                          <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.slice(0, 10).map((lead, index) => (
                          <motion.tr
                            key={lead.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            <td className="px-10 py-6">
                              <div className="text-sm font-black text-white uppercase tracking-tight">{lead.clientName}</div>
                              <div className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">{lead.clientEmail || lead.clientPhone}</div>
                            </td>
                            <td className="px-10 py-6"><code className="text-[10px] text-blue-500 font-mono font-bold tracking-widest bg-blue-500/5 px-2 py-1 rounded">{lead.referralCode}</code></td>
                            <td className="px-10 py-6"><span className="text-[9px] font-black text-gray-400 border border-white/10 px-3 py-1 rounded-lg uppercase tracking-widest">{lead.projectType}</span></td>
                            <td className="px-10 py-6"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{formatDate(lead.submittedAt)}</span></td>
                            <td className="px-10 py-6 text-right"><button onClick={() => handleDeleteLead(lead.id)} className="p-3 hover:bg-red-600/20 text-gray-700 hover:text-red-500 rounded-xl transition-all"><FaTrash size={12} /></button></td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- TIERS TAB --- */}
        {activeTab === 'tiers' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Referral Packages</h2>
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setTierForm({ name: '', commission: '', description: '', color: 'blue' }); }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 active:scale-95 transition-all shadow-xl shadow-purple-900/20"
              >
                <FaPlus /> Initialize Package
              </button>
            </div>

            <AnimatePresence>
              {isAdding && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="bg-[#0f172a]/80 border border-purple-500/30 rounded-[2.5rem] p-10 relative mb-8">
                    <button onClick={() => setIsAdding(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><FaTimes /></button>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8 font-black">{editingId !== null ? 'MODIFY PACKAGE NODE' : 'INITIALIZE PACKAGE NODE'}</h3>
                    <form onSubmit={handleUpdateTier} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Package Designation</label>
                        <input required value={tierForm.name} onChange={e => setTierForm({ ...tierForm, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-purple-500 outline-none transition-all uppercase font-black" placeholder="e.g. VIP PARTNER" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Earning Amount (Flat)</label>
                        <input required type="number" value={tierForm.commission} onChange={e => setTierForm({ ...tierForm, commission: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-purple-500 outline-none transition-all font-black" placeholder="e.g. 1000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Accent Logic</label>
                        <select value={tierForm.color} onChange={e => setTierForm({ ...tierForm, color: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-[10px] font-black focus:border-purple-500 outline-none transition-all uppercase tracking-widest">
                          <option value="blue">Blue Spectrum</option>
                          <option value="purple">Purple Spectrum</option>
                          <option value="emerald">Emerald Spectrum</option>
                          <option value="amber">Amber Spectrum</option>
                          <option value="red">Red Spectrum</option>
                        </select>
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Package Intelligence</label>
                        <textarea value={tierForm.description} onChange={e => setTierForm({ ...tierForm, description: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-gray-400 text-sm h-32 focus:border-purple-500 outline-none transition-all resize-none font-medium" placeholder="Describe the benefits and eligibility protocols..." />
                      </div>
                      <div className="md:col-span-3 flex gap-4">
                        <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-purple-900/40 active:scale-95 transition-all">COMMIT PACKAGE NODE</button>
                        <button type="button" onClick={() => setIsAdding(false)} className="px-10 bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">ABORT</button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <motion.div key={idx} layout className="group bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 hover:border-purple-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                  <div className={`absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 text-${tier.color}-500`}><FaTrophy size={160} /></div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-${tier.color}-500 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}><FaCrown size={24} /></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(idx); setTierForm(tier); setIsAdding(true); }} className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaEdit size={12} /></button>
                      <button onClick={() => deleteTier(idx)} className="p-3 bg-white/5 hover:bg-red-600 rounded-xl text-gray-500 hover:text-white transition-all"><FaTrash size={12} /></button>
                    </div>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{tier.name}</h3>
                    <div className="flex items-center gap-4">
                      <div className={`text-5xl font-black text-${tier.color}-500 tracking-tighter`}>₹{tier.commission}</div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Flat Reward<br />Per Client</div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed pt-4 border-t border-white/5">{tier.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {tiers.length === 0 && <div className="py-40 text-center text-gray-700 font-black uppercase tracking-[0.5em] text-[10px]">No package nodes detected</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralManager;
