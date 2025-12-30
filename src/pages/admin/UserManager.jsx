import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaUserShield, FaKey, FaTrash, FaUserEdit, FaCircle, FaSearch, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const UserManager = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Root', role: 'Super Admin', email: 'admin@vgt.tech', status: 'Online', clearance: 'L5' },
    { id: 2, name: 'Sarah Miller', role: 'Editor', email: 'sarah@vgt.tech', status: 'Offline', clearance: 'L3' },
    { id: 3, name: 'Mike Tech', role: 'Support', email: 'mike@vgt.tech', status: 'Online', clearance: 'L2' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Editor', clearance: 'L3' });

  const handleAdd = (e) => {
    e.preventDefault();
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id, status: 'Offline' }]);
    setNewUser({ name: '', email: '', role: 'Editor', clearance: 'L3' });
    setIsAdding(false);
  };

  const handleRevoke = (id) => {
    if (window.confirm('PROTOCOL: REVOKE ALL PRIVILEGES FOR THIS NODE?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleResetKey = (name) => {
    alert(`SECURITY: NEW ACCESS TOKEN GENERATED FOR ${name.toUpperCase()}. REPLICATION COMPLETE.`);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Access <span className="text-blue-500">Control</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Manage administrative privileges and team security</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
          >
            <FaUserPlus /> Provision User Node
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
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Email Identity</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Authority Role</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 transition-all uppercase tracking-widest">Authorize</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white/5 text-gray-500 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel p-6 border-white/5 bg-white/[0.01]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 px-5 py-3 bg-black/40 border border-white/5 rounded-2xl w-full md:w-96 group focus-within:border-blue-500/50 transition-all">
            <FaSearch className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH SECURITY NODES..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full uppercase tracking-[0.2em] font-black"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">System Load</p>
              <p className="text-xs font-black text-blue-500">NORMAL</p>
            </div>
            <div className="w-px h-8 bg-white/5"></div>
            <div className="flex flex-col items-end">
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Encrypted</p>
              <p className="text-xs font-black text-emerald-500">AES-256</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user, i) => (
              <motion.div
                layout
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel p-8 border-white/5 relative group hover:border-blue-500/40 hover:bg-blue-600/[0.03] transition-all overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute -bottom-6 -right-6 text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors rotate-12">
                  <FaShieldAlt size={120} />
                </div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl shadow-xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <FaUserShield />
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-[9px] font-black uppercase tracking-widest ${user.status === 'Online' ? 'text-emerald-400 border-emerald-500/20' : 'text-gray-600'}`}>
                    <FaCircle className={`text-[6px] ${user.status === 'Online' ? 'animate-pulse' : ''}`} />
                    {user.status}
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{user.name}</h3>
                    <span className="text-[9px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded border border-blue-500/20 font-black">{user.clearance}</span>
                  </div>
                  <p className="text-[10px] text-blue-500/60 font-black uppercase tracking-widest">{user.role}</p>
                  <p className="text-[11px] text-gray-500 lowercase font-mono pt-4 group-hover:text-gray-300 transition-colors">{user.email}</p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                  <div className="flex gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                      <FaUserEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleResetKey(user.name)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                    >
                      <FaKey size={14} />
                    </button>
                  </div>
                  {user.id !== 1 && (
                    <button
                      onClick={() => handleRevoke(user.id)}
                      className="text-red-500/50 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredUsers.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <FaDatabase className="mx-auto text-4xl text-white/5 mb-4 animate-pulse" />
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">No security nodes matching this query</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-900/10 border border-amber-500/20 rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <FaShieldAlt size={100} />
        </div>
        <div className="flex items-start gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-inner">
            <FaUserShield size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-500 mb-2 tracking-widest uppercase italic">Security Directive 402-B</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter max-w-2xl">
              All administrative actions are logged in the global audit trail. Provisioning new users requires Level-5 clearance. Password policies are enforced via SHA-256 standard protocols. Multi-factor authentication is mandatory for all access nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
