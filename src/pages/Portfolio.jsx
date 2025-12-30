import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiPostgresql } from 'react-icons/si';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const Portfolio = () => {
  const projects = [
    {
      title: "FinTech Dashboard",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tags: ["React", "D3.js", "Node.js"]
    },
    {
      title: "E-Commerce Platform",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
      tags: ["Next.js", "Stripe", "PostgreSQL"]
    },
    {
      title: "HealthTech Mobile App",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      tags: ["React Native", "Firebase", "HealthKit"]
    },
    {
      title: "Real Estate VR",
      category: "Immersive",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      tags: ["Three.js", "WebGL", "React"]
    },
    {
      title: "Logistics ERP",
      category: "Enterprise",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      tags: ["Angular", "Spring Boot", "AWS"]
    },
    {
      title: "Social Network",
      category: "Web Platform",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      tags: ["Vue", "GraphQL", "Socket.io"]
    }
  ];

  const technologies = [
    { name: "React", icon: FaReact, color: "text-blue-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "AWS", icon: FaAws, color: "text-orange-500" },
    { name: "Docker", icon: FaDocker, color: "text-blue-500" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "Python", icon: FaPython, color: "text-yellow-400" },
    { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-gray-300 relative overflow-hidden">
      <SEO
        title="Our Portfolio"
        description="Explore Vertex Global Tech's portfolio of successful projects. See our work in web development, mobile apps, and enterprise software."
        keywords="portfolio, case studies, vertex global tech projects, software development work"
      />

      {/* Background Ambience */}
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
            <div className="flex gap-16 items-center whitespace-nowrap animate-infinite-scroll w-max pr-16">
              {[...technologies, ...technologies].map((tech, index) => (
                <div key={index} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <tech.icon className={`text-5xl ${tech.color}`} />
                  <span className="text-xl font-bold text-white uppercase tracking-tighter">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 pb-32">
          <div className="text-center mb-20">
            <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Archive</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Completed Works</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0f172a]/50 border border-white/10 hover:border-blue-500/30 rounded-[2.5rem] overflow-hidden transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80 z-10"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/10 backdrop-blur-sm z-20">
                    <button className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      View Project
                    </button>
                  </div>
                </div>

                <div className="p-10 relative z-30 -mt-24 pointer-events-none">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 mb-4 inline-block">{project.category}</span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-500 font-bold border border-white/5 px-3 py-1 rounded-lg bg-white/[0.02]">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
