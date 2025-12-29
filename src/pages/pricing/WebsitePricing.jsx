import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import PageHero from '../../components/UI/PageHero';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

export default function WebsitePricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    { name: 'Starter', price: '$2,500', desc: 'Perfect for small businesses establishing a digital presence.', features: ['Custom Design', '5 Pages', 'Basic SEO', 'form Integration'] },
    { name: 'Business', price: '$5,000', desc: 'Comprehensive solution for growing companies.', features: ['CMS Integration', '15 Pages', 'Advanced SEO', 'Blog Setup', 'Analytics'] },
    { name: 'Enterprise', price: 'Custom', desc: 'Full-scale digital platforms with custom functionality.', features: ['Custom Web App', 'Unlimited Pages', 'Priority Support', 'SLA', 'Security Suite'] }
  ];

  const tableFeatures = [
    {
      category: 'Development',
      items: [
        { name: 'Number of Pages', values: ['5', '15', 'Unlimited'] },
        { name: 'Responsive Design', values: [true, true, true] },
        { name: 'CMS Integration', values: [false, 'WordPress/Strapi', 'Custom/Headless'] },
        { name: 'Custom Animations', values: ['Basic', 'Advanced', 'Premium 3D'] },
      ]
    },
    {
      category: 'Marketing & SEO',
      items: [
        { name: 'SEO Setup', values: ['Basic', 'Advanced', 'Enterprise'] },
        { name: 'Google Analytics', values: [true, true, true] },
        { name: 'Social Media Integration', values: [true, true, true] },
        { name: 'Conversion Optimization', values: [false, true, true] },
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Post-Launch Support', values: ['2 Weeks', '1 Month', '3 Months'] },
        { name: 'Training Session', values: [false, '1 Hour', 'Unlimited'] },
        { name: 'Dedicated Manager', values: [false, true, true] },
      ]
    }
  ];

  const customFaqs = [
    { q: "What is included in the Starter plan?", a: "The Starter plan includes a custom-designed 5-page website, mobile responsiveness, basic SEO setup, and a contact form. It's ideal for brochures or portfolio sites." },
    { q: "Can I upgrade later?", a: "Yes, you can upgrade your plan at any time. We'll simply charge the difference and implement the additional features." },
    { q: "Do you use templates?", a: "No, all our websites are custom-designed to match your brand identity. We do not use generic templates." },
    { q: "What are the payment terms?", a: "We typically require a 50% deposit to start, with the remaining 50% due upon launch." }
  ];

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Website Pricing"
        description="Transparent pricing for professional web development services. Choose the plan that fits your business needs."
        keywords="website pricing, web design cost, website development rates"
      />

      <div className="min-h-screen bg-[#030712]">

        <PageHero
          title="Website Pricing"
          highlight="Pricing"
          badge="Pricing"
          subtitle="Transparent investments for high-performance digital assets."
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
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${i === 1 ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/5'} hover:border-blue-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {i === 1 && <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Recommended</div>}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
                  <div className="text-4xl font-bold text-blue-400 mb-8">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-center text-gray-300">
                        <span className="text-blue-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-bold transition-all transform group-hover:scale-105 ${i === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    Choose Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="Pricing" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Website"
      />
    </>
  );
}
