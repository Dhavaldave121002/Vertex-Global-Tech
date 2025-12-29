import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiPostgresql } from 'react-icons/si';
import PageHero from '../components/UI/PageHero';

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

      {/* Background Ambience - Fixed to match Career/Blog */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <PageHero
          title="Building the Future"
          highlight="Future"
          subtitle="A showcase of our most ambitious projects, featuring cutting-edge interfaces, robust architectures, and transformative digital experiences."
          badge="Our Work"
        />

        {/* Tech Stack Carousel Section */}
        <section className="py-16 border-y border-white/5 bg-[#080c18] overflow-hidden">
          <div className="container mx-auto px-6 mb-8 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Powering Innovation With</p>
          </div>

          {/* Infinite Slider Container */}
          <div className="relative w-full overflow-hidden mask-linear-fade">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#080c18] to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#080c18] to-transparent z-10"></div>

            {/* Scrolling Track */}
            <div className="flex gap-16 items-center whitespace-nowrap animate-infinite-scroll w-max hover:pause">
              {/* Original Set */}
              {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                <div key={`${tech.name}-${index}`} className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100 min-w-[100px]">
                  <tech.icon className={`text-5xl md:text-6xl ${tech.color} filter drop-shadow-lg`} />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Completed Projects</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="h-64 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-60"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 relative z-20 -mt-12">
                    <div className="inline-block px-3 py-1 bg-blue-600 font-bold text-[10px] uppercase tracking-wider text-white rounded-full mb-4 shadow-lg">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold text-gray-400 bg-white/5 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Overlay Link */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm pointer-events-none">
                    <span className="px-6 py-2 border border-white/30 rounded-full text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all">View Case Study</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
