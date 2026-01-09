import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSave, FaUndo, FaList, FaExchangeAlt, FaQuestionCircle, FaLayerGroup, FaEnvelope, FaUser, FaPhone, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

// ... (skipping defaults for brevity if replacing whole block, but here I can target the top imports)
// Wait, I should target specifically the top lines to add the import, and then the hook usage.

// EDIT 1: Add Import
// EDIT 2: Fix Hook usage.

// Let's do a multi-replace or just rewrite the top section.
// The file is huge, replacing the top lines is safer.

// Default Data (Fallbacks)
const DEFAULT_PLANS = [
  { id: 1, name: 'Starter', price: '$2,500', desc: 'Perfect for small businesses establishing a digital presence.', features: ['Unique 5-Page Design', 'Mobile-Responsive', 'Google Search Setup', 'Contact Form Integration', 'Fast Loading Speed'], isPopular: false },
  { id: 2, name: 'Business', price: '$5,000', desc: 'Comprehensive solution for growing companies.', features: ['Easy-to-Edit Dashboard', '15 Pages', 'Rank Higher Package', 'Blog / News Section', 'Visitor Analytics', 'Social Media Sync'], isPopular: true },
  { id: 3, name: 'Enterprise', price: 'Custom', desc: 'Full-scale digital platforms with custom functionality.', features: ['Fully Custom Functionality', 'Unlimited Pages', 'Priority VIP Support', 'Guaranteed Uptime', 'Advanced Security Suite', 'Dedicated Manager'], isPopular: false }
];

const DEFAULT_COMP = [
  { category: 'Development', items: [{ name: 'Number of Pages', values: ['5', '15', 'Unlimited'] }, { name: 'Responsive Design', values: [true, true, true] }, { name: 'CMS Integration', values: [false, 'WordPress/Strapi', 'Custom/Headless'] }] },
  { category: 'Support', items: [{ name: 'Post-Launch Support', values: ['2 Weeks', '1 Month', '3 Months'] }, { name: 'Dedicated Manager', values: [false, true, true] }] }
];

const DEFAULT_FAQS = [
  { id: 1, q: "What is included in the Starter plan?", a: "The Starter plan includes a custom-designed 5-page website, mobile responsiveness, basic SEO setup, and a contact form." },
  { id: 2, q: "Can I upgrade later?", a: "Yes, you can upgrade your plan at any time. We'll simply charge the difference." },
];

const DEFAULT_APP_PLANS = [
  { id: 1, name: 'MVP Launch', price: '$10,000', desc: 'Validate your idea with a core product built for speed.', features: ['Core Feature Set', 'Mobile Responsive', 'Admin Dashboard', '3 Months Support', 'Basic Analytics'], isPopular: false },
  { id: 2, name: 'Scale & Grow', price: '$25,000', desc: 'Secure, high-performance platform for growing user bases.', features: ['Advanced Features', 'API Integration', 'Real-time Datasets', 'Role-Based Access', 'Automated Testing Suite'], isPopular: true },
  { id: 3, name: 'Enterprise Platform', price: 'Custom', desc: 'Mission-critical infrastructure for large organizations.', features: ['Microservices Architecture', '99.9% SLA', 'On-premise / Hybrid', 'Full Security Audit', '24/7 Dedicated Support'], isPopular: false }
];
const DEFAULT_APP_COMP = [
  { category: 'Architecture', items: [{ name: 'Tech Stack', values: ['React/Node', 'MERN/Next.js', 'Custom Stack'] }, { name: 'Database', values: ['Shared MongoDB', 'Dedicated Cluster', 'Multi-Region'] }, { name: 'Cloud Provider', values: ['DigitalOcean', 'AWS / Google Cloud', 'Custom / Hybrid'] }] },
  { category: 'Functionality', items: [{ name: 'User Authentication', values: ['Email/Pass', 'Social Login', 'SSO/MFA'] }, { name: 'Payment Integration', values: ['Stripe Basic', 'Stripe Connect', 'Multi-Gateway'] }, { name: 'Real-time Features', values: [false, 'Socket.io', 'Advanced Pub/Sub'] }] }
];
const DEFAULT_APP_FAQS = [
  { id: 1, q: "What is an MVP?", a: "MVP stands for Minimum Viable Product. It includes the essential features needed to launch your idea and gather user feedback without over-investing initially." },
  { id: 2, q: "Do I own the code?", a: "Yes, once the project is fully paid for, you own 100% of the source code and intellectual property." }
];

const DEFAULT_UIUX_PLANS = [
  { id: 1, name: 'UX Audit', price: '$1,500', desc: 'Expert review to uncover usability issues and quick wins.', features: ['Heuristic Evaluation', 'Expert Audit Report', 'Accessibility Check', 'Improvement Roadmap', '1-Hour Strategy Call'], isPopular: false },
  { id: 2, name: 'Full Redesign', price: '$4,000', desc: 'Complete visual and experience overhaul for your core flow.', features: ['User Research & Analysis', 'Custom Wireframes', 'High-Fidelity UI Design', 'Interactive Prototype', 'Developer Spec Sheets'], isPopular: true },
  { id: 3, name: 'Design System', price: '$8,000', desc: 'Scalable component library for large innovative teams.', features: ['Atomic Design System', 'Component Library (Figma)', 'Usage Documentation', 'Developer Handoff Support', 'Brand Style Guide'], isPopular: false }
];
const DEFAULT_UIUX_COMP = [
  { category: 'Research', items: [{ name: 'User Interviews', values: [false, '5 Users', '10 Users'] }, { name: 'Competitor Analysis', values: [true, true, true] }, { name: 'User Personas', values: [false, true, true] }] },
  { category: 'Design', items: [{ name: 'Screens', values: ['N/A', 'Up to 10', 'Up to 25'] }, { name: 'Revisions', values: ['1 Round', '3 Rounds', 'Unlimited'] }, { name: 'Mobile Adaptation', values: [false, true, true] }] }
];
const DEFAULT_UIUX_FAQS = [
  { id: 1, q: "What is a UX Audit?", a: "A UX audit allows us to analyze your current product to find usability issues and areas for improvement without a full redesign." },
  { id: 2, q: "What tools do you use?", a: "We primarily use Figma for interface design and prototyping. For design systems, we can also set up Storybook." }
];

const DEFAULT_ODOO_PLANS = [
  { id: 1, name: 'Essentials', price: '$5,000', desc: 'Core Odoo setup for startups and small businesses.', features: ['Standard Modules Config', 'Standard CRM & Sales', 'Basic Invoicing', '3 Users Included', 'Remote Training'], isPopular: false },
  { id: 2, name: 'Business Pro', price: '$12,000', desc: 'Customized ERP solution for growing enterprises.', features: ['Custom Module (1 Unit)', 'Inventory & Manufacturing', 'Advanced Accounting', 'Multi-Company Support', 'On-site Training'], isPopular: true },
  { id: 3, name: 'Infinite Suite', price: 'Custom', desc: 'Full-scale digital transformation with total Odoo mastery.', features: ['Infinite Customization', 'Legacy Data Migration', 'External API Sync', 'Dedicated ERP Manager', '24/7 Priority Support'], isPopular: false }
];
const DEFAULT_ODOO_COMP = [
  { category: 'Architecture', items: [{ name: 'Hosting Type', values: ['Odoo Online', 'Odoo.sh', 'Dedicated Server'] }, { name: 'Support Level', values: ['Ticketing', 'Priority Support', 'Dedicated Manager'] }] },
  { category: 'Modules', items: [{ name: 'Custom Modules', values: [false, 'Optional', 'Infinite'] }, { name: 'Accounting', values: ['Standard', 'Advanced', 'Multi-Country'] }] }
];
const DEFAULT_ODOO_FAQS = [
  { id: 1, q: "Odoo Online vs Odoo.sh?", a: "Odoo Online is SaaS-based and doesn't allow custom code. Odoo.sh is a cloud platform that allows full customization and Git integration." },
  { id: 2, q: "How long does implementation take?", a: "A standard implementation takes 4-8 weeks, while complex migrations can take 3-6 months depending on data volume." }
];

const PricingManager = () => {
  const [pricingType, setPricingType] = useState('website'); // 'website' | 'application' | 'uiux' | 'odoo'
  const [activeTab, setActiveTab] = useState('plans'); // plans, comparison, faq, inquiries

  const [plans, setPlans] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  // Role Access Guard
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('vgtw_admin_session') || 'null');
      if (!session || !session.isMaster) {
        navigate('/admin/dashboard');
      }
    } catch (e) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // --- Helpers to get keys/defaults ---
  const getKeys = (type) => {
    if (type === 'application') return { plans: 'vgtw_app_pricing_plans', comp: 'vgtw_app_pricing_comparison', faq: 'vgtw_app_pricing_faq' };
    if (type === 'uiux') return { plans: 'vgtw_uiux_pricing_plans', comp: 'vgtw_uiux_pricing_comparison', faq: 'vgtw_uiux_pricing_faq' };
    if (type === 'odoo') return { plans: 'vgtw_odoo_pricing_plans', comp: 'vgtw_odoo_pricing_comparison', faq: 'vgtw_odoo_pricing_faq' };
    return { plans: 'vgtw_pricing_plans', comp: 'vgtw_pricing_comparison', faq: 'vgtw_pricing_faq' };
  };

  const getDefaults = (type) => {
    if (type === 'application') return { plans: DEFAULT_APP_PLANS, comp: DEFAULT_APP_COMP, faq: DEFAULT_APP_FAQS };
    if (type === 'uiux') return { plans: DEFAULT_UIUX_PLANS, comp: DEFAULT_UIUX_COMP, faq: DEFAULT_UIUX_FAQS };
    if (type === 'odoo') return { plans: DEFAULT_ODOO_PLANS, comp: DEFAULT_ODOO_COMP, faq: DEFAULT_ODOO_FAQS };
    return { plans: DEFAULT_PLANS, comp: DEFAULT_COMP, faq: DEFAULT_FAQS };
  };

  // --- LOAD DATA ---
  useEffect(() => {
    const keys = getKeys(pricingType);
    const defaults = getDefaults(pricingType);

    const loadedPlans = localStorage.getItem(keys.plans);
    setPlans(loadedPlans ? JSON.parse(loadedPlans) : defaults.plans);
    if (!loadedPlans) localStorage.setItem(keys.plans, JSON.stringify(defaults.plans));

    const loadedComp = localStorage.getItem(keys.comp);
    setComparisonData(loadedComp ? JSON.parse(loadedComp) : defaults.comp);
    if (!loadedComp) localStorage.setItem(keys.comp, JSON.stringify(defaults.comp));

    const loadedFaqs = localStorage.getItem(keys.faq);
    setFaqs(loadedFaqs ? JSON.parse(loadedFaqs) : defaults.faq);
    if (!loadedFaqs) localStorage.setItem(keys.faq, JSON.stringify(defaults.faq));
  }, [pricingType]);

  // --- SAVE DATA ---
  useEffect(() => {
    if (plans.length > 0) {
      const keys = getKeys(pricingType);
      localStorage.setItem(keys.plans, JSON.stringify(plans));
      window.dispatchEvent(new Event('storage'));
    }
  }, [plans, pricingType]);

  useEffect(() => {
    if (comparisonData.length > 0) {
      const keys = getKeys(pricingType);
      localStorage.setItem(keys.comp, JSON.stringify(comparisonData));
      window.dispatchEvent(new Event('storage'));
    }
  }, [comparisonData, pricingType]);

  useEffect(() => {
    if (faqs.length > 0) {
      const keys = getKeys(pricingType);
      localStorage.setItem(keys.faq, JSON.stringify(faqs));
      window.dispatchEvent(new Event('storage'));
    }
  }, [faqs, pricingType]);

  useEffect(() => {
    const saved = localStorage.getItem('vgtw_pricing_inquiries');
    if (saved) {
      const allInquiries = JSON.parse(saved);
      const filtered = allInquiries.filter(inq => {
        const plan = inq.selectedPlan.toLowerCase();
        if (pricingType === 'website') return plan.includes('website');
        if (pricingType === 'application') return plan.includes('application') || plan.includes('app');
        if (pricingType === 'uiux') return plan.includes('ui/ux') || plan.includes('uiux');
        if (pricingType === 'odoo') return plan.includes('odoo');
        return true;
      });
      setInquiries(filtered);
    }
  }, [pricingType]);

  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [editFaqForm, setEditFaqForm] = useState(null);

  const handleAddFaq = (e) => {
    e.preventDefault();
    const id = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
    setFaqs([...faqs, { ...newFaq, id }]);
    setNewFaq({ q: '', a: '' });
  };
  const deleteFaq = (id) => setFaqs(faqs.filter(f => f.id !== id));
  const startEditFaq = (faq) => { setEditingFaqId(faq.id); setEditFaqForm({ ...faq }); };
  const saveFaq = () => { setFaqs(faqs.map(f => f.id === editingFaqId ? editFaqForm : f)); setEditingFaqId(null); };

  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editPlanForm, setEditPlanForm] = useState(null);

  const handleAddNewPlan = () => {
    const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    const newPlan = { id: newId, name: 'New Plan', price: '$0', desc: 'Description here', features: ['Feature 1'], isPopular: false };
    setPlans([...plans, newPlan]);
    setEditingPlanId(newId);
    setEditPlanForm(newPlan);
  };

  const handleDeletePlan = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const startEditPlan = (plan) => { setEditingPlanId(plan.id); setEditPlanForm({ ...plan }); };
  const savePlan = () => { setPlans(plans.map(p => p.id === editingPlanId ? editPlanForm : p)); setEditingPlanId(null); setEditPlanForm(null); };
  const updateFeature = (index, value) => { const newFeatures = [...editPlanForm.features]; newFeatures[index] = value; setEditPlanForm({ ...editPlanForm, features: newFeatures }); };
  const removeFeature = (index) => { const newFeatures = editPlanForm.features.filter((_, i) => i !== index); setEditPlanForm({ ...editPlanForm, features: newFeatures }); };
  const addFeature = () => { setEditPlanForm({ ...editPlanForm, features: [...editPlanForm.features, 'New Feature'] }); };

  const updateCompItemName = (catIndex, itemIndex, val) => { setComparisonData(prev => prev.map((cat, cIdx) => cIdx === catIndex ? { ...cat, items: cat.items.map((item, iIdx) => iIdx === itemIndex ? { ...item, name: val } : item) } : cat)); };
  const updateCompItemValue = (catIndex, itemIndex, valIndex, rawVal) => {
    let val = rawVal; if (val === 'true') val = true; else if (val === 'false') val = false;
    setComparisonData(prev => prev.map((cat, cIdx) => cIdx === catIndex ? { ...cat, items: cat.items.map((item, iIdx) => iIdx === itemIndex ? { ...item, values: item.values.map((v, vIdx) => vIdx === valIndex ? val : v) } : item) } : cat));
  };
  const addCompCategory = () => { setComparisonData(prev => [...prev, { category: 'New Category', items: [] }]); };
  const deleteCompCategory = (index) => { if (window.confirm('Delete this entire category?')) { setComparisonData(prev => prev.filter((_, i) => i !== index)); } };
  const updateCategoryName = (index, val) => { setComparisonData(prev => prev.map((cat, i) => i === index ? { ...cat, category: val } : cat)); };
  const addCompItem = (catIndex) => { setComparisonData(prev => prev.map((cat, i) => i === catIndex ? { ...cat, items: [...cat.items, { name: 'New Feature', values: new Array(plans.length).fill(false) }] } : cat)); };
  const deleteCompItem = (catIndex, itemIndex) => { setComparisonData(prev => prev.map((cat, i) => i === catIndex ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) } : cat)); };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Price <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Financial Structure Configurator</p>
          </div>

          <div className="bg-[#0f172a] p-1 rounded-2xl flex border border-white/10 shadow-xl overflow-x-auto no-scrollbar">
            {['website', 'application', 'uiux', 'odoo'].map((type) => (
              <button
                key={type}
                onClick={() => setPricingType(type)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${pricingType === type ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div className="flex gap-4 mb-12 border-b border-white/5 pb-6 overflow-x-auto custom-scrollbar no-scrollbar">
          {[
            { id: 'plans', label: 'Service Packages', icon: <FaLayerGroup /> },
            { id: 'comparison', label: 'Feature Matrix', icon: <FaExchangeAlt /> },
            { id: 'faq', label: 'Support Knowledge', icon: <FaQuestionCircle /> },
            { id: 'inquiries', label: 'Direct Leads', icon: <FaEnvelope /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap shadow-lg active:scale-95 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-blue-900/40' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'plans' && (
          <div className="space-y-8">
            <div className="flex justify-end mb-8">
              <button onClick={handleAddNewPlan} className="px-8 py-3 bg-emerald-600 text-white text-[10px] font-black rounded-xl hover:bg-emerald-500 transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-emerald-900/20">
                <FaPlus /> Deploy New Node
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <motion.div
                  layout
                  key={plan.id}
                  className={`group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl ${editingPlanId === plan.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {editingPlanId === plan.id ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Editor_Active</span>
                        <div className="flex gap-2">
                          <button onClick={savePlan} className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg"><FaSave size={14} /></button>
                          <button onClick={() => setEditingPlanId(null)} className="p-3 bg-white/5 text-gray-500 rounded-xl hover:bg-white/10 transition-all"><FaUndo size={14} /></button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Plan Identity</label>
                        <input value={editPlanForm.name} onChange={(e) => setEditPlanForm({ ...editPlanForm, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Price Point</label>
                        <input value={editPlanForm.price} onChange={(e) => setEditPlanForm({ ...editPlanForm, price: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 text-sm font-black outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Briefing</label>
                        <textarea value={editPlanForm.desc} onChange={(e) => setEditPlanForm({ ...editPlanForm, desc: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1 flex justify-between">Specs <button onClick={addFeature} className="text-blue-500"><FaPlus size={8} /></button></label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                          {editPlanForm.features.map((feat, i) => (
                            <div key={i} className="flex gap-2">
                              <input value={feat} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-gray-300 text-[10px] outline-none focus:border-blue-500 transition-all" />
                              <button onClick={() => removeFeature(i)} className="text-red-500/30 hover:text-red-500 p-2"><FaTimes size={10} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <input type="checkbox" checked={editPlanForm.isPopular} onChange={(e) => setEditPlanForm({ ...editPlanForm, isPopular: e.target.checked })} className="w-5 h-5 rounded-lg bg-black/40 border-white/10 text-blue-600 focus:ring-0 transition-all" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover/check:text-gray-300 transition-colors">Flag as Priority</span>
                      </label>
                    </div>
                  ) : (
                    <>
                      {plan.isPopular && <div className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40">Priority_Node</div>}
                      <div className="mb-10">
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-2">Package_Tier</span>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{plan.name}</h3>
                        <div className="text-blue-500 font-black text-3xl tracking-tighter">{plan.price}</div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-10 min-h-[4em]">{plan.desc}</p>
                      <div className="space-y-3 mb-12">
                        {plan.features.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                            <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> {f}
                          </div>
                        ))}
                        {plan.features.length > 4 && <div className="text-[8px] text-gray-600 uppercase tracking-widest pl-4">+{plan.features.length - 4} System_Specs</div>}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => startEditPlan(plan)} className="flex-1 py-4 bg-white/5 hover:bg-blue-600 text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"><FaEdit size={12} /> Configure</button>
                        <button onClick={() => handleDeletePlan(plan.id)} className="px-5 py-4 bg-white/5 hover:bg-red-600 text-white rounded-2xl transition-all shadow-xl group-hover:bg-red-900/10"><FaTrash size={12} /></button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="flex justify-end mb-8">
              <button onClick={addCompCategory} className="px-8 py-3 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 shadow-blue-900/20">
                <FaPlus /> New Matrix Category
              </button>
            </div>
            <div className="space-y-12">
              {comparisonData.map((category, catIndex) => (
                <div key={catIndex} className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl overflow-hidden relative group/cat">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-10">
                    <div className="flex-1">
                      <label className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-2">Category_Identifier</label>
                      <input value={category.category} onChange={(e) => updateCategoryName(catIndex, e.target.value)} className="bg-transparent border-none text-white font-black text-2xl uppercase tracking-tighter w-full focus:outline-none focus:bg-white/5 rounded-xl px-4 py-2 -ml-4 transition-all" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => addCompItem(catIndex)} className="text-[10px] bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"><FaPlus /> Add Node</button>
                      <button onClick={() => deleteCompCategory(catIndex)} className="text-[10px] bg-white/5 text-gray-500 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"><FaTrash /> Purge</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black">
                          <th className="pb-8 pl-4 w-1/4">Spec_Name</th>
                          {plans.map((p, i) => <th key={i} className="pb-8 px-4 text-center">{p.name}</th>)}
                          <th className="pb-8 w-16"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="group/row transition-all hover:bg-white/[0.02]">
                            <td className="py-6 pr-6">
                              <input value={item.name} onChange={(e) => updateCompItemName(catIndex, itemIndex, e.target.value)} className="bg-transparent border border-transparent hover:border-white/10 focus:border-blue-500 rounded-xl text-white font-bold text-sm w-full px-4 py-3 focus:outline-none transition-all" placeholder="Feature..." />
                            </td>
                            {plans.map((_, valIndex) => {
                              const val = item.values[valIndex] !== undefined ? item.values[valIndex] : false;
                              return (
                                <td key={valIndex} className="py-6 px-4">
                                  <input value={val.toString()} onChange={(e) => updateCompItemValue(catIndex, itemIndex, valIndex, e.target.value)} className={`bg-black/40 border border-white/5 rounded-xl px-4 py-3 w-full text-center text-[10px] font-black uppercase focus:border-blue-500 outline-none transition-all ${val === true ? 'text-emerald-500' : val === false ? 'text-gray-600' : 'text-blue-400'}`} />
                                </td>
                              );
                            })}
                            <td className="py-6 text-right pr-4">
                              <button onClick={() => deleteCompItem(catIndex, itemIndex)} className="text-white/10 hover:text-red-500 p-3 transition-all"><FaTimes /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-8">
            <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl border-l-4 border-l-blue-600">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-6">New_Entry_Protocol</span>
              <form onSubmit={handleAddFaq} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Input Question</label>
                  <input value={newFaq.q} onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-4">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">System Response</label>
                    <input value={newFaq.a} onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <button type="submit" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95">Sync</button>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all duration-500 shadow-xl relative group">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 font-black">?</div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditFaq(faq)} className="p-3 text-white/20 hover:text-blue-500 transition-all"><FaEdit size={14} /></button>
                      <button onClick={() => deleteFaq(faq.id)} className="p-3 text-white/20 hover:text-red-500 transition-all"><FaTrash size={14} /></button>
                    </div>
                  </div>
                  {editingFaqId === faq.id ? (
                    <div className="space-y-6">
                      <input value={editFaqForm.q} onChange={(e) => setEditFaqForm({ ...editFaqForm, q: e.target.value })} className="w-full bg-black/40 border border-blue-500/50 rounded-xl px-4 py-3 text-white text-sm font-black uppercase" />
                      <textarea value={editFaqForm.a} onChange={(e) => setEditFaqForm({ ...editFaqForm, a: e.target.value })} className="w-full bg-black/40 border border-blue-500/50 rounded-xl px-4 py-4 text-gray-400 text-xs h-32 resize-none" />
                      <div className="flex gap-3">
                        <button onClick={saveFaq} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase">Authorize Sync</button>
                        <button onClick={() => setEditingFaqId(null)} className="px-6 py-3 bg-white/5 text-gray-500 rounded-xl font-black text-[10px] uppercase">Abort</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-white font-black text-lg uppercase tracking-tight mb-4">{faq.q}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Inquiry <span className="text-blue-500">Log</span></h3>
                <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px] mt-2">Incoming Data Transmission</p>
              </div>
              <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{inquiries.length} Active_Nodes</span>
              </div>
            </div>
            <div className="overflow-x-auto no-scrollbar -mx-10 px-10">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left border-b border-white/5">
                    <th className="pb-8 pr-12">Timestamp</th>
                    <th className="pb-8 pr-12">Identity</th>
                    <th className="pb-8 pr-12">Comm_Link</th>
                    <th className="pb-8 pr-12">Request_Tiers</th>
                    <th className="pb-8">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry, idx) => (
                    <tr key={idx} className="group/row transition-all hover:bg-white/[0.02] border-b border-white/5 last:border-0">
                      <td className="py-8 pr-12">
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase">
                          <FaCalendarAlt className="text-blue-500" /> {new Date(inquiry.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-8 pr-12">
                        <span className="text-white font-black text-sm uppercase tracking-tight">{inquiry.name}</span>
                      </td>
                      <td className="py-8 pr-12">
                        <div className="space-y-1">
                          <div className="text-gray-300 text-xs font-medium">{inquiry.email}</div>
                          <div className="text-gray-500 text-[10px] font-black uppercase">{inquiry.phone}</div>
                        </div>
                      </td>
                      <td className="py-8 pr-12">
                        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest">{inquiry.selectedPlan}</span>
                      </td>
                      <td className="py-8">
                        <button onClick={() => { if (window.confirm('Wipe this record?')) { const all = JSON.parse(localStorage.getItem('vgtw_pricing_inquiries') || '[]'); const updated = all.filter((_, i) => i !== idx); localStorage.setItem('vgtw_pricing_inquiries', JSON.stringify(updated)); setInquiries(inquiries.filter((_, i) => i !== idx)); } }} className="p-3 text-white/10 hover:text-red-500 transition-all"><FaTrash size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingManager;
