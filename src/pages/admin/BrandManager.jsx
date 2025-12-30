import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaCloudUploadAlt, FaGripHorizontal, FaTimes, FaDatabase } from 'react-icons/fa';

const BrandManager = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: 'TechNova', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTUwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiPlRlY2hOb3ZhPC90ZXh0Pjwvc3ZnPg==' },
    { id: 2, name: 'GlobalStream', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTUwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiPkdsb2JhbFN0cmVhbTwvdGV4dD48L3N2Zz4=' },
    { id: 3, name: 'EcoPulse', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTUwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiPkVjb1B1bHNlPC90ZXh0Pjwvc3ZnPg==' },
    { id: 4, name: 'FutureLink', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTUwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiPkZ1dHVyZUxpbms8L3RleHQ+PC9zdmc+' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', logo: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const id = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    setBrands([...brands, { ...newBrand, id }]);
    setNewBrand({ name: '', logo: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('PROTOCOL: REMOVE PARTNER NODE?')) {
      setBrands(brands.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Brand <span className="text-blue-500">Partners</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Manage homepage partner logos and trust assets</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-4 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95"
          >
            <FaCloudUploadAlt /> Launch Asset Node
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
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Partner Identity</label>
                <input
                  type="text"
                  required
                  value={newBrand.name}
                  onChange={e => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  placeholder="e.g. Cyberdyne Systems"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Asset Vector URL</label>
                <input
                  type="text"
                  required
                  value={newBrand.logo}
                  onChange={e => setNewBrand({ ...newBrand, logo: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-blue-500 transition-all font-mono"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 md:col-span-2">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 transition-all uppercase tracking-widest">Commit Asset</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white/5 text-gray-500 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel p-8 border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <AnimatePresence>
            {brands.map((brand, i) => (
              <motion.div
                layout
                key={brand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 hover:border-blue-500/40 hover:bg-blue-600/[0.03] transition-all cursor-move shadow-inner"
              >
                <div className="absolute top-3 left-3 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaGripHorizontal size={10} />
                </div>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-xl backdrop-blur-md"
                >
                  <FaTimes size={10} />
                </button>
                <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                  <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100 duration-500" />
                </div>
                <p className="text-[10px] font-black uppercase text-gray-600 group-hover:text-blue-400 transition-colors tracking-widest">{brand.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {!isAdding && (
            <div
              onClick={() => setIsAdding(true)}
              className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 bg-white/[0.01] hover:bg-blue-600/[0.03] hover:border-blue-500/20 transition-all cursor-pointer group min-h-[140px]"
            >
              <FaPlus className="text-gray-700 group-hover:text-blue-500 transition-colors mb-2" />
              <span className="text-[9px] font-black text-gray-700 group-hover:text-white uppercase tracking-widest">Inject Node</span>
            </div>
          )}
        </div>

        {brands.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <FaDatabase className="mx-auto text-4xl text-white/5 animate-pulse" />
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">Network partner registry is empty</p>
          </div>
        )}

        <div className="mt-12 bg-blue-600/5 border border-blue-500/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <FaCloudUploadAlt size={80} />
          </div>
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
              <FaCloudUploadAlt />
            </div>
            <div>
              <h4 className="text-sm font-black text-white mb-2 uppercase tracking-widest">Asset Protocol Registry</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter">Recommended: Transparent SVG/PNG | Aspect 3:1 | Max 2MB per node | CDN replication active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandManager;
