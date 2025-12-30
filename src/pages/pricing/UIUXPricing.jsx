import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import PageHero from '../../components/UI/PageHero';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

export default function UIUXPricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    { name: 'UX Audit', price: '$1,500', desc: 'Expert review to uncover usability issues and quick wins.', features: ['Heuristic Evaluation', 'Expert Audit Report', 'Accessibility Check', 'Improvement Roadmap', '1-Hour Strategy Call'] },
    { name: 'Full Redesign', price: '$4,000', desc: 'Complete visual and experience overhaul for your core flow.', features: ['User Research & Analysis', 'Custom Wireframes', 'High-Fidelity UI Design', 'Interactive Prototype', 'Developer Spec Sheets'] },
    { name: 'Design System', price: '$8,000', desc: 'Scalable component library for large innovative teams.', features: ['Atomic Design System', 'Component Library (Figma)', 'Usage Documentation', 'Developer Handoff Support', 'Brand Style Guide'] }
  ];

  const tableFeatures = [
    {
      category: 'Research',
      items: [
        { name: 'User Interviews', values: [false, '5 Users', '10 Users'] },
        { name: 'Competitor Analysis', values: [true, true, true] },
        { name: 'User Personas', values: [false, true, true] },
      ]
    },
    {
      category: 'Design',
      items: [
        { name: 'Screens', values: ['N/A', 'Up to 10', 'Up to 25'] },
        { name: 'Revisions', values: ['1 Round', '3 Rounds', 'Unlimited'] },
        { name: 'Mobile Adaptation', values: [false, true, true] },
        { name: 'Design Source File', values: [false, 'Figma', 'Figma + Storybook'] },
      ]
    },
    {
      category: 'Deliverables',
      items: [
        { name: 'Interactive Prototype', values: [false, true, true] },
        { name: 'Developer Handoff', values: [false, true, true] },
        { name: 'Asset Export', values: [false, true, true] },
      ]
    }
  ];

  const customFaqs = [
    { q: "What is a UX Audit?", a: "A UX audit allows us to analyze your current product to find usability issues and areas for improvement without a full redesign." },
    { q: "What tools do you use?", a: "We primarily use Figma for interface design and prototyping. For design systems, we can also set up Storybook." },
    { q: "Do you ignore development?", a: "No, we design with development feasibility in mind and provide detailed specs (redlines) for your engineering team." },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="UI/UX Design Cost"
        description="Professional UI/UX design packages. Audits, Redesigns, and Design Systems using Figma."
        keywords="ui design pricing, ux audit cost, figma design rates, web design pricing"
      />

      <div className="min-h-screen bg-[#030712]">

        <PageHero
          title="UI/UX Design Packages"
          highlight="Pricing"
          badge="Design Excellence"
          subtitle="World-class design for high-converting digital products."
        />

        {/* Pricing Cards */}
        <section className="py-20 bg-[#0f172a]/30">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${i === 1 ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'border-white/5'} hover:border-pink-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {i === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
                  <div className="text-4xl font-bold text-pink-500 mb-8">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-center text-gray-300">
                        <span className="text-pink-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-bold transition-all transform group-hover:scale-105 ${i === 1 ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-900/40' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 border border-transparent'}`}
                  >
                    Select Package
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="UI/UX Pricing" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="UI/UX"
      />
    </>
  );
}
