import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../components/UI/Counter';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const About = () => {
  const stats = [
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 98, suffix: "%" },
    { label: "Team Members", value: 25, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans">
      <SEO
        title="About Us"
        description="Learn about Vertex Global Tech's mission to innovate and transform the digital landscape. Meet our expert team."
        keywords="about vertex global tech, digital agency team, software experts, company mission"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Building Your Digital Future"
          highlight="Digital Future"
          subtitle="We are a collective of thinkers and makers. We turn complex business challenges into simple, effective digital solutions."
          badge="About Us"
        />

        <div className="container mx-auto px-6">
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
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Montserrat']">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] text-blue-400 uppercase tracking-widest font-black">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="pb-32 space-y-32">
            {/* Mission */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Our Mission</h2>
                <div className="h-1.5 w-20 bg-blue-600 mb-8 rounded-full"></div>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  We empower businesses with technology that works. We believe that great software should be powerful, secure, and easy to use.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Whether you are a startup taking your first steps or a large company looking to modernize, we are here to help you grow.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-2xl opacity-40"></div>
                <div className="relative bg-[#0f172a] border border-white/10 p-10 rounded-3xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: "bi-rocket-takeoff", title: "Innovation", desc: "Pushing boundaries", color: "text-blue-400" },
                      { icon: "bi-shield-check", title: "Integrity", desc: "Transparent process", color: "text-purple-400" },
                      { icon: "bi-people", title: "Collaboration", desc: "Client partnership", color: "text-cyan-400" },
                      { icon: "bi-trophy", title: "Excellence", desc: "Top-tier quality", color: "text-yellow-400" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <i className={`${item.icon} text-3xl mb-3 block ${item.color} group-hover:scale-110 transition-transform`}></i>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Vision */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 md:order-1"
              >
                <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-2xl opacity-40"></div>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                    alt="Team Vision"
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Our Vision</h2>
                <div className="h-1.5 w-20 bg-purple-600 mb-8 rounded-full"></div>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  To create a world where top-tier technology is accessible to everyone. We want to be the partner that helps you unlock your full potential through digital tools.
                </p>
                <div className="space-y-4">
                  {[
                    "Global Reach, Local Impact",
                    "Sustainable Tech Practices",
                    "User-Centric First Mindset"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Leadership Section */}
          <section className="pb-32">
            <div className="text-center mb-20">
              <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Leadership</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight font-['Montserrat']">Meet the Visionaries</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "James Anderson", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", bio: "Visionary leader with 15+ years driving digital transformation." },
                { name: "Sarah Lin", role: "CTO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", bio: "Cloud architecture expert passionate about AI innovation." },
                { name: "Michael Chen", role: "Lead Developer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", bio: "Full-stack wizard specializing in scalable enterprise solutions." },
                { name: "Emily Davis", role: "Head of Design", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", bio: "Award-winning designer creating intuitive user experiences." }
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative bg-[#0f172a] border border-white/10 rounded-[2rem] overflow-hidden text-center hover:border-blue-500/40 transition-all duration-500 shadow-2xl h-full flex flex-col">
                    <div className="h-72 overflow-hidden relative">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                    </div>
                    <div className="p-8 relative z-10 flex-grow flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{member.name}</h3>
                      <p className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{member.bio}</p>
                      <div className="flex justify-center gap-4">
                        {['linkedin', 'twitter'].map(icon => (
                          <button key={icon} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                            <i className={`bi bi-${icon}`}></i>
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
    </div>
  );
};

export default About;
