import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      const cats = ['All', ...new Set(projects.map(p => p.category || p.type || 'Other'))];
      setCategories(cats);
    }
  }, [projects]);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => (p.category || p.type) === filter));
    }
  }, [filter, projects]);

  useEffect(() => {
    const loadData = () => {
      // Load Projects
      const savedProjects = localStorage.getItem('vgtw_projects');
      if (savedProjects && JSON.parse(savedProjects).length > 0) {
        setProjects(JSON.parse(savedProjects));
      } else {
        const defaults = [
          {
            id: 1,
            title: 'Crypto Wallet v2',
            type: 'FinTech',
            img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800',
            logo: 'https://cdn-icons-png.flaticon.com/512/825/825540.png',
            liveUrl: '#'
          },
          {
            id: 2,
            title: 'Nexus E-Commerce',
            type: 'SaaS',
            img: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800',
            logo: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
            liveUrl: '#'
          },
          {
            id: 3,
            title: 'HealthSync App',
            type: 'Mobile',
            img: 'https://images.unsplash.com/photo-1576091160550-217359f48f4c?q=80&w=800',
            logo: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
            liveUrl: '#'
          },
          {
            id: 4,
            title: 'Global ERP Sync',
            type: 'Odoo ERP',
            img: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=800',
            logo: 'https://cdn-icons-png.flaticon.com/512/3767/3767094.png',
            liveUrl: '#'
          }
        ];
        setProjects(defaults);
        // Optional: Persist defaults to fix admin view sync
        // localStorage.setItem('vgtw_projects', JSON.stringify(defaults));
      }

      // Load Tech Stack
      const savedTech = localStorage.getItem('vgtw_tech_stack');
      if (savedTech) {
        setTechnologies(JSON.parse(savedTech));
      } else {
        setTechnologies([
          { id: '1', name: "React", icon: "FaReact", color: "text-blue-400" },
          { id: '2', name: "Node.js", icon: "FaNodeJs", color: "text-green-500" },
          { id: '3', name: "TypeScript", icon: "SiTypescript", color: "text-blue-600" },
          { id: '4', name: "AWS", icon: "FaAws", color: "text-orange-500" },
          { id: '5', name: "Docker", icon: "FaDocker", color: "text-blue-500" },
          { id: '6', name: "Next.js", icon: "SiNextdotjs", color: "text-white" },
          { id: '7', name: "Python", icon: "FaPython", color: "text-yellow-400" },
          { id: '8', name: "GraphQL", icon: "SiGraphql", color: "text-pink-500" },
        ]);
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Helper to get Icon Component from string
  const getIcon = (iconName) => {
    if (FaIcons[iconName]) return FaIcons[iconName];
    if (SiIcons[iconName]) return SiIcons[iconName];
    return FaIcons.FaRocket; // Fallback
  };

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-gray-300 relative overflow-hidden">
      <SEO
        title="Our Portfolio"
        description="Explore Vertex Global Tech's portfolio of successful projects. See our work in web development, mobile apps, and enterprise software."
        keywords="portfolio, case studies, vertex global tech projects, software development work"
      />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Building the Digital Future"
          highlight="Future"
          subtitle="A showcase of our most ambitious projects, featuring cutting-edge interfaces, robust architectures, and transformative digital experiences."
          badge="Our Portfolio"
        />

        {/* Tech Stack Horizontal Scroll */}
        <section className="py-16 border-y border-white/5 bg-[#080c18]/50 backdrop-blur-xl mb-32 overflow-hidden">
          <div className="container mx-auto px-6 mb-12 text-center">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Powering Innovation With</span>
          </div>

          <div className="relative w-full">
            <div className="flex gap-16 items-center whitespace-nowrap animate-infinite-scroll w-max pr-16 hover:pause transition-all">
              {[...technologies, ...technologies, ...technologies].map((tech, index) => {
                const Icon = getIcon(tech.icon);
                return (
                  <div key={`${tech.id}-${index}`} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default group">
                    <Icon className={`text-5xl ${tech.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xl font-bold text-white uppercase tracking-tighter">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 pb-60">
          <div className="text-center mb-20">
            <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Archive</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Completed Works</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-12"></div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 relative overflow-hidden group ${filter === cat
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/25'
                      : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {filter === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-blue-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id || index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#0f172a]/50 border border-white/10 hover:border-blue-500/30 rounded-[2.5rem] overflow-hidden transition-all duration-500 aspect-square w-full"
                >
                  <div className="absolute inset-0">
                    <img src={project.image || project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent opacity-90 z-10"></div>

                    {/* Company Logo Overlay - Top Left */}
                    {project.logo && (
                      <div className="absolute top-6 left-6 z-30 pointer-events-none">
                        <div className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 p-2 flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-2xl">
                          <img
                            src={project.logo}
                            alt="Company logo"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.parentElement.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="transition-all duration-500 transform translate-y-0 group-hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 shadow-lg shadow-blue-900/10">
                          {project.category || project.type}
                        </span>
                      </div>

                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 group-hover:text-blue-500 transition-colors leading-none drop-shadow-2xl">
                        {project.title}
                      </h3>

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <a
                          href={project.liveUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 bg-white text-black hover:bg-blue-600 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] active:scale-95 group/btn"
                        >
                          Visit_Live_Node <FaIcons.FaExternalLinkAlt size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
