import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[#030712] opacity-90"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm tracking-wide">
          NEXT-GEN DIGITAL SOLUTIONS
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-8 leading-tight">
          Transforming Ideas into <br />
          <span className="text-blue-500">
            <Typewriter text="Digital Reality" speed={80} delay={0.5} />
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          We create stunning websites, powerful apps, and software that grows with your business. Simple, effective, and built for success.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transform hover:-translate-y-1"
          >
            Start Your Project
          </Link>
          <Link
            to="/portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-gray-700 hover:border-blue-500 text-white font-semibold text-lg transition-all hover:bg-blue-500/10"
          >
            View Our Work
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-2xl bg-[#0f172a]/50 border border-white/5 hover:border-blue-500/30 backdrop-blur-sm transition-all hover:-translate-y-2 group"
  >
    <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:bg-blue-500/20 transition-colors">
      <i className={`bi bi-${icon}`}></i>
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const AboutIntroSection = () => (
  <section className="py-24 bg-[#030712] relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Right: Modern Tech Image (Now Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
              alt="Vertex Collaboration"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 p-4 bg-[#0f172a]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">System Active</span>
              </div>
              <div className="text-white font-mono text-xs">
                &gt; Deploying...<br />
                &gt; Optimization: 100%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Left: Text Content (Now Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Innovating at the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Speed of Thought</span>
          </h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            At Vertex Global Tech, we solve complex problems with simple, elegant solutions. We are a team of passionate experts dedicated to helping your business thrive in the digital world.
          </p>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            From the first line of code to the final launch, we focus on quality, speed, and user experience.
          </p>

          <Link
            to="/about"
            className="group relative inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold tracking-wide overflow-hidden shadow-lg shadow-blue-900/40 transition-all hover:scale-105 hover:shadow-blue-600/60"
          >
            <span className="relative z-10">Read Our Full Story</span>
            <i className="bi bi-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-24 bg-[#030712] relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Expertise</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We combine cutting-edge technology with industry best practices to deliver superior results.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon="speedometer2"
          title="Fast & Efficient"
          desc="We build websites that load instantly and run smoothly on any device."
          delay={0.1}
        />
        <FeatureCard
          icon="shield-check"
          title="Top-Tier Security"
          desc="Your data is safe with us. We use the latest security standards to protect your business."
          delay={0.2}
        />
        <FeatureCard
          icon="layers"
          title="Built for Growth"
          desc="Start small and grow big. Our solutions scale effortlessly as your business expands."
          delay={0.3}
        />
        <FeatureCard
          icon="palette"
          title="Modern Design"
          desc="Beautiful, award-winning designs that capture attention and drive engagement."
          delay={0.4}
        />
        <FeatureCard
          icon="phone"
          title="Mobile First"
          desc="Perfectly responsive layouts that look great on phones, tablets, and desktops."
          delay={0.5}
        />
        <FeatureCard
          icon="cloud"
          title="Cloud Ready"
          desc="Reliable and accessible from anywhere in the world using modern cloud technology."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

import Counter from '../components/UI/Counter';

const StatsSection = () => (
  <section className="py-20 bg-[#061021] border-y border-white/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { to: 500, suffix: "+", label: "Projects Completed" },
          { to: 98, suffix: "%", label: "Client Satisfaction" },
          { to: 10, suffix: "+", label: "Years Experience" },
          { to: 24, suffix: "/7", label: "Expert Support" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-6"
          >
            <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
              <Counter from={0} to={stat.to} suffix={stat.suffix} />
            </div>
            <div className="text-gray-400 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Digital Presence?</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Join hundreds of successful businesses that have partnered with Vertex Global Tech. Let's build something extraordinary together.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-4 rounded-full bg-white text-blue-900 font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
        >
          Get Free Consultation
        </Link>
      </motion.div>
    </div>
  </section>
);

import TestimonialCarousel from '../components/UI/TestimonialCarousel';
import Typewriter from '../components/UI/Typewriter';
import BrandCarousel from '../components/UI/BrandCarousel';

const TestimonialsSection = () => (
  <section className="py-24 bg-[#030712] relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Client Success Stories</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our partners have to say.
        </p>
      </div>
      <TestimonialCarousel />
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Vertex Global Tech - Premium Digital Solutions, Web Development, and Corporate Branding services. We build the future of digital experience."
        keywords="web development, app development, digital agency, vertex global tech, software solutions"
      />
      <div className="bg-[#030712] min-h-screen overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <BrandCarousel />
        <AboutIntroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}

