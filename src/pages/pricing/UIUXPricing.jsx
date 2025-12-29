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
    { name: 'Audit', price: '$1,500', desc: 'Expert review of your existing product to identify issues.', features: ['Heuristic Evaluation', 'UX Audit Report', 'Quick Wins List', 'Accessibility Check'] },
    { name: 'Redesign', price: '$4,000', desc: 'Complete visual overhaul of your core flow.', features: ['User Research', 'Wireframes', 'High-Fidelity UI', 'Interactive Prototype', 'Style Guide'] },
    { name: 'System', price: '$8,000', desc: 'Comprehensive design system for scaling teams.', features: ['Full Design System', 'Component Library', 'Documentation', 'Handoff Support', 'Consulting'] }
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

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="UI/UX Design Pricing"
        description="Professional UI/UX design packages. Audit, Redesign, or Full Design Systems."
        keywords="ui design cost, ux audit pricing, figma design rates"
      />

      <div className="min-h-screen bg-[#030712]">

        <PageHero
          title="UI/UX Pricing"
          highlight="Pricing"
          badge="Pricing"
          subtitle="World-class design for digital products."
        />

        {/* Pricing Cards */}
        <section className="py-20 bg-[#0f172a]/30">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${i === 1 ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'border-white/5'} hover:border-pink-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {i === 1 && <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>}

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
                    className={`w-full block text-center py-4 rounded-xl font-bold transition-all transform group-hover:scale-105 ${i === 1 ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    Select Package
                  </button>
                </motion.div>
              ))}
            </div>
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
