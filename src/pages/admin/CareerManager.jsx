import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaCheckCircle, FaClock, FaTimesCircle, FaUserTie, FaChevronRight } from 'react-icons/fa';

const CareerManager = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior React Developer', department: 'Engineering', type: 'Full-time', status: 'Active', applicants: 12 },
    { id: 2, title: 'UI/UX Designer', department: 'Design', type: 'Remote', status: 'Active', applicants: 8 },
    { id: 3, title: 'Backend Architect', department: 'Engineering', type: 'Full-time', status: 'Closed', applicants: 24 },
  ]);

  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Prashant Patel', role: 'React Developer', score: '92%', status: 'Interview', date: '2023-12-28' },
    { id: 2, name: 'Meera Sharma', role: 'UI/UX Designer', score: '88%', status: 'Reviewing', date: '2023-12-30' },
  ]);

  const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', type: 'Full-time', status: 'Active' });

  const handleAddJob = (e) => {
    e.preventDefault();
    const id = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
    setJobs([...jobs, { ...newJob, id, applicants: 0 }]);
    setNewJob({ title: '', department: 'Engineering', type: 'Full-time', status: 'Active' });
    setIsAdding(false);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('PROTOCOL: TERMINATE POSITION NODE?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const handleDeleteApplicant = (id) => {
    if (window.confirm('PROTOCOL: REMOVE CANDIDATE RECORD?')) {
      setApplicants(applicants.filter(a => a.id !== id));
    }
  };

  const toggleApplicantStatus = (id) => {
    const statuses = ['Reviewing', 'Interview', 'Hired', 'Rejected'];
    setApplicants(applicants.map(a => {
      if (a.id === id) {
        const currentIndex = statuses.indexOf(a.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return { ...a, status: statuses[nextIndex] };
      }
      return a;
    }));
  };

  const filteredItems = (activeTab === 'jobs' ? jobs : applicants).filter(item => {
    const searchStr = activeTab === 'jobs' ? item.title : item.name;
    return searchStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Career <span className="text-blue-500">Pipeline</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Management of global talent acquisition</p>
        </div>
        {!isAdding && activeTab === 'jobs' && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
          >
            <FaPlus /> Launch Position Node
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-px mb-8">
        {['jobs', 'applicants'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setIsAdding(false); }}
            className={`px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-blue-500 bg-blue-500/5' : 'text-gray-500 hover:text-white'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="career-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, height: 0 }}
            animate={{ opacity: 1, scale: 1, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.95, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="glass-panel p-8 border-blue-500/20 bg-blue-600/[0.02]">
              <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="md:col-span-1 space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Position Title</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                    placeholder="e.g. Lead Dev"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Department</label>
                  <select
                    value={newJob.department}
                    onChange={e => setNewJob({ ...newJob, department: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Growth">Growth</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Node Type</label>
                  <select
                    value={newJob.type}
                    onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 transition-all uppercase tracking-widest">Initialize Node</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white/5 text-gray-500 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/5 rounded-xl w-full md:w-96 group focus-within:border-blue-500/50 transition-all">
            <FaSearch className="text-gray-600 text-xs group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder={`FILTER ${activeTab.toUpperCase()}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full uppercase tracking-[0.2em] font-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mr-2">Status:</span>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] text-emerald-400 font-black uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  {activeTab === 'jobs' ? 'Position Protocol' : 'Candidate Identity'}
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  {activeTab === 'jobs' ? 'Department' : 'Assigned Node'}
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  {activeTab === 'jobs' ? 'Capacity' : 'Probability'}
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">State</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode='popLayout'>
                {filteredItems.map((item, i) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    key={item.id}
                    className="hover:bg-blue-600/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:bg-blue-600/20 transition-all overflow-hidden relative">
                          {activeTab === 'jobs' ? <FaBriefcase size={14} /> : <FaUserTie size={14} />}
                          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                            {activeTab === 'jobs' ? item.title : item.name}
                          </span>
                          {activeTab === 'applicants' && <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">{item.date}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border border-white/5 px-3 py-1 rounded-lg">
                        {activeTab === 'jobs' ? item.department : item.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-white font-black group-hover:text-blue-500 transition-colors tracking-tighter">
                          {activeTab === 'jobs' ? `${item.applicants} NODES` : item.score}
                        </span>
                        <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activeTab === 'jobs' ? `${Math.min(item.applicants * 5, 100)}%` : item.score }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => activeTab === 'applicants' && toggleApplicantStatus(item.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${item.status === 'Active' || item.status === 'Interview' || item.status === 'Hired'
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                            : item.status === 'Closed' || item.status === 'Rejected'
                              ? 'bg-red-500/5 text-red-400 border-red-500/20 hover:bg-red-500/10'
                              : 'bg-amber-500/5 text-amber-400 border-amber-500/20 hover:bg-amber-500/10'
                          } ${activeTab === 'applicants' ? 'cursor-pointer' : 'cursor-default'}`}>
                        {item.status === 'Active' || item.status === 'Hired' ? <FaCheckCircle size={8} /> :
                          item.status === 'Pending' || item.status === 'Reviewing' || item.status === 'Interview' ? <FaClock size={8} /> :
                            <FaTimesCircle size={8} />}
                        {item.status}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-blue-600/20 text-gray-500 hover:text-blue-400 rounded-xl transition-all border border-transparent hover:border-blue-500/30">
                          <FaEye size={12} />
                        </button>
                        <button
                          onClick={() => activeTab === 'jobs' ? handleDeleteJob(item.id) : handleDeleteApplicant(item.id)}
                          className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-400 rounded-xl transition-all border border-transparent hover:border-red-500/30"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="py-24 text-center">
              <FaBriefcase className="mx-auto text-4xl text-white/5 mb-4 animate-pulse" />
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">No talent nodes located in this sector</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
            <FaUserTie />
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Active Seekers</p>
            <h4 className="text-xl font-black text-white">{applicants.length}</h4>
          </div>
        </div>
        <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-emerald-600/5 to-transparent flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Open Sectors</p>
            <h4 className="text-xl font-black text-white">{jobs.filter(j => j.status === 'Active').length}</h4>
          </div>
        </div>
        <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-purple-600/5 to-transparent flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-500 border border-purple-500/20">
            <FaChevronRight />
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Conversion Rate</p>
            <h4 className="text-xl font-black text-white">4.2%</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerManager;
