import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSave, FaUndo, FaCode, FaQuestionCircle, FaList, FaLayerGroup, FaRoad } from 'react-icons/fa';

// --- DEFAULTS ---
const DEFAULT_TECH_STACK = [
  { name: 'React', icon: 'bi-filetype-jsx', color: 'text-cyan-400' },
  { name: 'Node.js', icon: 'bi-filetype-js', color: 'text-green-500' },
  { name: 'Python', icon: 'bi-filetype-py', color: 'text-yellow-400' },
  { name: 'AWS', icon: 'bi-cloud', color: 'text-orange-500' },
  { name: 'Docker', icon: 'bi-box-seam', color: 'text-blue-500' },
  { name: 'MongoDB', icon: 'bi-database', color: 'text-green-600' },
  { name: 'Next.js', icon: 'bi-layers', color: 'text-white' },
];

const DEFAULT_GLOBAL_FAQS = [
  { q: "How long does a typical project take?", a: "Timelines vary by complexity. A standard website takes 2-4 weeks, while custom SaaS applications can take 8-12 weeks." },
  { q: "Do you provide post-launch support?", a: "Yes, we offer complimentary 30-day support after launch." },
];

const DEFAULT_PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'We start by understanding your business goals and requirements.', icon: 'bi-search' },
  { num: '02', title: 'Design', desc: 'Creating intuitive wireframes and prototypes aligned with your brand.', icon: 'bi-palette' },
  { num: '03', title: 'Development', desc: 'Building your solution using modern tech stacks with regular sprints.', icon: 'bi-code-slash' },
  { num: '04', title: 'Launch', desc: 'Rigorous testing followed by a smooth deployment and support.', icon: 'bi-rocket-takeoff' }
];

const SERVICE_DEFAULTS = {
  informative: {
    name: 'Informative Website',
    features: [
      { title: 'Responsive Design', icon: 'bi-phone', desc: 'Looks stunning on every device, from mobile to 4K desktops.' },
      { title: 'Search Engine Ready', icon: 'bi-graph-up', desc: 'Built to rank higher on Google so customers can find you.' },
      { title: 'Easy Management', icon: 'bi-window-sidebar', desc: 'Update text and images yourself with no coding needed.' },
      { title: 'Fast Performance', icon: 'bi-lightning-charge', desc: 'Loads instantly to keep visitors happy.' },
      { title: 'Secure & Reliable', icon: 'bi-shield-check', desc: 'Protected against threats with industry-best security.' },
      { title: 'Visitor Insights', icon: 'bi-bar-chart', desc: 'See who visits your site and what they do.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  ecommerce: {
    name: 'E-Commerce',
    features: [
      { title: 'Secure Checkouts', icon: 'bi-shield-lock', desc: 'PCI-DSS compliant payment processing for peace of mind.' },
      { title: 'Inventory Management', icon: 'bi-box-seam', desc: 'Real-time stock tracking and automated alerts.' },
      { title: 'Sales Analytics', icon: 'bi-graph-up-arrow', desc: 'Detailed dashboards for revenue, conversion, and traffic.' },
      { title: 'Mobile First', icon: 'bi-phone', desc: 'Optimized shopping experience for mobile users.' },
      { title: 'SEO Rankings', icon: 'bi-search', desc: 'Product schema markup to help you rank on Google Shopping.' },
      { title: 'Global Selling', icon: 'bi-globe', desc: 'Multi-currency and multi-language support built-in.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  application: {
    name: 'Web Application',
    features: [
      { title: 'Scalable Platforms', icon: 'bi-cloud', desc: 'Growth-ready systems that handle thousands of users effortlessly.' },
      { title: 'Seamless Connections', icon: 'bi-code-square', desc: 'We connect your apps to other services for smooth data flow.' },
      { title: 'Instant Updates', icon: 'bi-arrow-repeat', desc: 'See changes immediately without refreshing the page.' },
      { title: 'Bank-Grade Security', icon: 'bi-shield-lock', desc: 'Top-tier encryption and protections to keep data safe.' },
      { title: 'Modular Design', icon: 'bi-diagram-2', desc: 'Built in blocks, so we can upgrade parts without breaking the whole.' },
      { title: 'Automated Releases', icon: 'bi-infinity', desc: 'We deploy updates faster and with fewer errors.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  uiux: {
    name: 'UI/UX Design',
    features: [
      { title: 'User Research', icon: 'bi-people', desc: 'We study your audience to know exactly what they want.' },
      { title: 'Blueprints', icon: 'bi-grid-1x2', desc: 'Simple sketches to test ideas before building.' },
      { title: 'Visual Design', icon: 'bi-palette', desc: 'Stunning, on-brand looks that wow your customers.' },
      { title: 'Design Library', icon: 'bi-collection', desc: 'A set of reusable elements to keep everything consistent.' },
      { title: 'Interactions', icon: 'bi-cursor', desc: 'Fun animations and feedback that make the app feel alive.' },
      { title: 'User Testing', icon: 'bi-clipboard-check', desc: 'Real people test the design to ensure it is easy to use.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  maintenance: {
    name: 'Maintenance',
    features: [
      { title: 'Security Updates', icon: 'bi-shield-check', desc: 'We keep your site safe from the latest viruses and hackers.' },
      { title: 'Always Online', icon: 'bi-activity', desc: 'We watch your site 24/7 to make sure it never goes down.' },
      { title: 'Speed Optimization', icon: 'bi-speedometer2', desc: 'We make your site load faster so visitors stay longer.' },
      { title: 'Content Updates', icon: 'bi-pencil-square', desc: 'Need to change a photo or text? We do it for you.' },
      { title: 'Daily Backups', icon: 'bi-hdd', desc: 'We save a copy of your site every day, just in case.' },
      { title: 'Quick Fixes', icon: 'bi-bug', desc: 'If something breaks, we fix it right away.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  dynamic: {
    name: 'Dynamic Solutions',
    features: [
      { title: 'Engaging Interfaces', icon: 'bi-cursor-fill', desc: 'Smooth, animated elements that keep users interested.' },
      { title: 'Connect Everything', icon: 'bi-hdd-network', desc: 'Link your website to other tools and data systems easily.' },
      { title: 'Live Updates', icon: 'bi-activity', desc: 'See stock prices, notifications, or chats happen instantly.' },
      { title: 'User Dashboards', icon: 'bi-person-badge', desc: 'Private areas for users to manage their profile and data.' },
      { title: 'Smart Workflows', icon: 'bi-diagram-3', desc: 'Automate complex business tasks to save time.' },
      { title: 'Cloud Powered', icon: 'bi-cloud-fill', desc: 'Hosted on powerful servers that grow with your traffic.' },
    ],
    techStack: DEFAULT_TECH_STACK,
    faqs: DEFAULT_GLOBAL_FAQS,
    process: DEFAULT_PROCESS_STEPS
  },
  odoo: {
    name: 'Odoo Customization',
    features: [
      { title: 'ERP Setup & Config', icon: 'bi-gear-wide-connected', desc: 'Seamless Odoo ERP installation tailored to your unique business architecture.' },
      { title: 'Module Development', icon: 'bi-puzzle', desc: 'Creating custom Odoo modules and enhancing existing features for better utility.' },
      { title: 'Workflow Automation', icon: 'bi-robot', desc: 'Optimizing business processes with intelligent, automated Odoo workflows.' },
      { title: 'ERP Integration', icon: 'bi-link-45deg', desc: 'Connecting your website and external platforms directly with your Odoo ecosystem.' },
      { title: 'Data Migration', icon: 'bi-database-up', desc: 'Securely moving your business data into Odoo with zero loss and full integrity.' },
      { title: 'Training & Support', icon: 'bi-headset', desc: 'Comprehensive user training and ongoing Odoo maintenance for peak performance.' },
    ],
    techStack: [
      { name: 'Python', icon: 'bi-filetype-py', color: 'text-yellow-400' },
      { name: 'Odoo Framework', icon: 'bi-box-seam', color: 'text-purple-500' },
      { name: 'PostgreSQL', icon: 'bi-database', color: 'text-blue-400' },
      { name: 'XML/QWeb', icon: 'bi-file-earmark-code', color: 'text-orange-400' },
      { name: 'JavaScript', icon: 'bi-filetype-js', color: 'text-yellow-300' },
      { name: 'Docker', icon: 'bi-box-seam', color: 'text-blue-500' }
    ],
    faqs: [
      { q: "What is Odoo?", a: "Odoo is an all-in-one business software that includes CRM, website/e-commerce, billing, accounting, manufacturing, warehouse - and project management, and inventory." },
      { q: "Can Odoo be customized for my industry?", a: "Absolutely. Odoo's modular structure allows us to customize everything from workflows to reports specifically for your industry's needs." }
    ],
    process: [
      { num: '01', title: 'Consultation', desc: 'Analyze your business workflows to map out Odoo requirements.', icon: 'bi-chat-dots' },
      { num: '02', title: 'Configuration', desc: 'Setting up the core Odoo environment and standard modules.', icon: 'bi-sliders' },
      { num: '03', title: 'Customization', desc: 'Developing bespoke modules and automating your specific business logic.', icon: 'bi-tools' },
      { num: '04', title: 'Quality Check', desc: 'Testing data integrity and workflow accuracy across the system.', icon: 'bi-patch-check' },
      { num: '05', title: 'Deployment', desc: 'Go-live and staff training for a smooth transition to your new ERP.', icon: 'bi-rocket' }
    ]
  }
};

const ServiceManager = () => {
  const [selectedService, setSelectedService] = useState('informative');
  const [activeTab, setActiveTab] = useState('features'); // features, tech, faq, process

  const [serviceData, setServiceData] = useState(SERVICE_DEFAULTS.informative);

  // --- LOAD DATA ---
  useEffect(() => {
    const key = `vgtw_service_${selectedService}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setServiceData(JSON.parse(saved));
    } else {
      // Fallback for previous data without process
      const defaults = SERVICE_DEFAULTS[selectedService];
      setServiceData({ ...defaults, ...JSON.parse(localStorage.getItem(key) || '{}') });
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(defaults));
    }
  }, [selectedService]);

  // --- SAVE DATA ---
  useEffect(() => {
    const key = `vgtw_service_${selectedService}`;
    localStorage.setItem(key, JSON.stringify(serviceData));
    window.dispatchEvent(new Event('storage'));
  }, [serviceData, selectedService]);

  // --- HANDLERS ---
  const handleUpdateFeature = (index, field, value) => {
    const newFeatures = [...serviceData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setServiceData({ ...serviceData, features: newFeatures });
  };
  const addFeature = () => {
    setServiceData({ ...serviceData, features: [...serviceData.features, { title: 'New Feature', icon: 'bi-star', desc: 'Description here.' }] });
  };
  const deleteFeature = (index) => {
    if (window.confirm('Delete this feature?')) {
      setServiceData({ ...serviceData, features: serviceData.features.filter((_, i) => i !== index) });
    }
  };

  const handleUpdateTech = (index, field, value) => {
    const newStack = [...serviceData.techStack];
    newStack[index] = { ...newStack[index], [field]: value };
    setServiceData({ ...serviceData, techStack: newStack });
  };
  const addTech = () => setServiceData({ ...serviceData, techStack: [...serviceData.techStack, { name: 'New Tech', icon: 'bi-code', color: 'text-white' }] });
  const deleteTech = (index) => setServiceData({ ...serviceData, techStack: serviceData.techStack.filter((_, i) => i !== index) });

  const handleUpdateFaq = (index, field, value) => {
    const newFaqs = [...serviceData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setServiceData({ ...serviceData, faqs: newFaqs });
  };
  const addFaq = () => setServiceData({ ...serviceData, faqs: [...serviceData.faqs, { q: 'New Question?', a: 'Answer here.' }] });
  const deleteFaq = (index) => setServiceData({ ...serviceData, faqs: serviceData.faqs.filter((_, i) => i !== index) });

  const handleUpdateProcess = (index, field, value) => {
    const newProcess = [...(serviceData.process || [])];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setServiceData({ ...serviceData, process: newProcess });
  };
  const addProcess = () => setServiceData({ ...serviceData, process: [...(serviceData.process || []), { num: '00', title: 'New Step', desc: 'Step description.', icon: 'bi-circle' }] });
  const deleteProcess = (index) => setServiceData({ ...serviceData, process: serviceData.process.filter((_, i) => i !== index) });

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Service <span className="text-blue-500">Node</span></h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Content System Configuration</p>
          </div>

          <div className="relative group">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="appearance-none bg-[#0f172a] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest pl-6 pr-12 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all shadow-xl hover:bg-[#1e293b]"
            >
              {Object.entries(SERVICE_DEFAULTS).map(([key, val]) => (
                <option key={key} value={key} className="bg-gray-900">{val.name}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
              <FaLayerGroup size={12} />
            </div>
          </div>
        </header>

        <div className="flex gap-4 mb-12 border-b border-white/5 pb-6 overflow-x-auto custom-scrollbar no-scrollbar">
          {[
            { id: 'features', label: 'Feature Matrix', icon: <FaList /> },
            { id: 'process', label: 'Development Flow', icon: <FaRoad /> },
            { id: 'tech', label: 'Tech Stack', icon: <FaCode /> },
            { id: 'faq', label: 'Knowledge Base', icon: <FaQuestionCircle /> },
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

        {/* --- FEATURES TAB --- */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="flex justify-end"><button onClick={addFeature} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Feature</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.features?.map((feat, i) => (
                <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">Standard_Node</span>
                    </div>
                    <button onClick={() => deleteFeature(i)} className="p-2 text-white/20 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Title</label>
                      <input value={feat.title} onChange={(e) => handleUpdateFeature(i, 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Icon Class</label>
                      <div className="flex gap-3">
                        <div className="w-11 h-11 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-blue-500"><i className={`bi ${feat.icon}`}></i></div>
                        <input value={feat.icon} onChange={(e) => handleUpdateFeature(i, 'icon', e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 text-xs font-mono outline-none focus:border-blue-500 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Detail</label>
                      <textarea value={feat.desc} onChange={(e) => handleUpdateFeature(i, 'desc', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-32 outline-none focus:border-blue-500 transition-all resize-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PROCESS TAB --- */}
        {activeTab === 'process' && (
          <div className="space-y-6">
            <div className="flex justify-end"><button onClick={addProcess} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Step</button></div>
            <div className="space-y-6">
              {serviceData.process?.map((step, i) => (
                <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex gap-8 items-start">
                  <div className="w-24">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center block mb-2">Node_ID</label>
                    <input value={step.num} onChange={(e) => handleUpdateProcess(i, 'num', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 text-blue-500 font-black text-center text-xl outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Flow Name</label>
                        <input value={step.title} onChange={(e) => handleUpdateProcess(i, 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Icon Class</label>
                        <input value={step.icon} onChange={(e) => handleUpdateProcess(i, 'icon', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-[10px] font-mono outline-none focus:border-blue-500 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Internal Procedure</label>
                      <textarea value={step.desc} onChange={(e) => handleUpdateProcess(i, 'desc', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                    </div>
                  </div>
                  <button onClick={() => deleteProcess(i)} className="text-white/20 hover:text-red-500 p-3 mt-6 transition-colors"><FaTrash size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TECH STACK TAB --- */}
        {activeTab === 'tech' && (
          <div className="space-y-6">
            <div className="flex justify-end"><button onClick={addTech} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add Tech</button></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {serviceData.techStack?.map((tech, i) => (
                <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex flex-col items-center gap-4">
                  <button onClick={() => deleteTech(i)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <i className={`bi ${tech.icon} text-4xl ${tech.color}`}></i>
                  </div>
                  <div className="w-full space-y-2">
                    <input value={tech.name} onChange={(e) => handleUpdateTech(i, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white text-[10px] font-black uppercase text-center outline-none focus:border-blue-500 transition-all" />
                    <input value={tech.icon} onChange={(e) => handleUpdateTech(i, 'icon', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-gray-500 text-[8px] font-mono text-center outline-none focus:border-blue-500 transition-all" />
                    <input value={tech.color} onChange={(e) => handleUpdateTech(i, 'color', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-gray-500 text-[8px] font-mono text-center outline-none focus:border-blue-500 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- FAQ TAB --- */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex justify-end"><button onClick={addFaq} className="bg-emerald-600 active:scale-95 transition-all text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-900/20"><FaPlus /> Add FAQ</button></div>
            <div className="space-y-6">
              {serviceData.faqs?.map((faq, i) => (
                <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl flex gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">Client Question</label>
                      <input value={faq.q} onChange={(e) => handleUpdateFaq(i, 'q', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-black uppercase tracking-tight focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1">System Response</label>
                      <textarea value={faq.a} onChange={(e) => handleUpdateFaq(i, 'a', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-5 text-gray-400 text-xs h-24 outline-none focus:border-blue-500 transition-all resize-none" />
                    </div>
                  </div>
                  <button onClick={() => deleteFaq(i)} className="self-start text-white/20 hover:text-red-500 p-3 mt-8 transition-colors"><FaTrash size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceManager;
