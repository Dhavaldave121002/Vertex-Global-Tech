import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../components/UI/Counter';
import PageHero from '../components/UI/PageHero';

const About = () => {
  const stats = [
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 98, suffix: "%" },
    { label: "Team Members", value: 25, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background Ambience - Fixed to match Career/Blog */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-20 relative z-10">

        <PageHero
          title="Pioneering the Digital Future"
          highlight="Digital Future"
          subtitle="We are a collective of visionaries, engineers, and creatives dedicated to transforming complex challenges into elegant digital solutions."
          badge="About Us"
        />

        {/* Stats Section */}
        <section className="py-16 border-y border-white/5 bg-[#050b14]/50 backdrop-blur-md rounded-2xl mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <Counter from={0} to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-blue-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-10 space-y-24">

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <div className="h-1 w-20 bg-blue-500 mb-8"></div>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                To empower businesses with enterprise-grade technology that is scalable, secure, and stunningly designed. We believe that true innovation happens at the intersection of robust engineering and creative excellence.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you're a startup looking to disrupt the market or an established enterprise seeking digital transformation, Vertex Global Tech is your strategic partner in growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-[#0f172a] border border-white/10 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "rocket-takeoff", title: "Innovation", desc: "Pushing boundaries", color: "text-blue-400" },
                    { icon: "shield-check", title: "Integrity", desc: "Transparent process", color: "text-purple-400" },
                    { icon: "people", title: "Collaboration", desc: "Client partnership", color: "text-cyan-400" },
                    { icon: "trophy", title: "Excellence", desc: "Top-tier quality", color: "text-yellow-400" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-white/5 rounded-xl transition-colors hover:bg-white/10"
                    >
                      <motion.div
                        initial={{ rotateY: 0 }}
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-block mb-3 ${item.color}`}
                      >
                        <i className={`bi bi-${item.icon} text-3xl block`}></i>
                      </motion.div>
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vision - Reversed Layout */}
          {/* Vision - Reversed Layout */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Vision"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <div className="h-1 w-20 bg-cyan-500 mb-8"></div>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                To be the global standard for digital excellence, creating a future where technology amplifies human potential without complexity. We envision a world where every business, regardless of size, has access to world-class digital tools.
              </p>
              <ul className="space-y-4">
                {[
                  "Global Reach, Local Impact",
                  "Sustainable Tech Practices",
                  "User-Centric First Mindset"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </section >

        {/* Team Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Leadership</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Meet the Visionaries</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Driven by passion, guided by expertise. Our leadership team steers Vertex Global Tech towards new horizons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "James Anderson",
                role: "CEO & Founder",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
                bio: "Visionary leader with 15+ years driving digital transformation."
              },
              {
                name: "Sarah Lin",
                role: "CTO",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
                bio: "Cloud architecture expert passionate about AI innovation."
              },
              {
                name: "Michael Chen",
                role: "Lead Developer",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                bio: "Full-stack wizard specializing in scalable enterprise solutions."
              },
              {
                name: "Emily Davis",
                role: "Head of Design",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
                bio: "Award-winning designer creating intuitive user experiences."
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden text-center hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-90"></div>
                  </div>
                  <div className="p-6 -mt-12 relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-500 font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow">{member.bio}</p>
                    <div className="flex justify-center gap-3 mt-auto">
                      {['linkedin', 'twitter', 'envelope'].map(icon => (
                        <button key={icon} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                          <i className={`bi bi-${icon} text-sm`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
