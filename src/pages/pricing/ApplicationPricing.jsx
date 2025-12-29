import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import PageHero from '../../components/UI/PageHero';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

export default function ApplicationPricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    { name: 'MVP', price: '$10,000', desc: 'Launch your core product quickly to validate the market.', features: ['Core Features', 'Mobile Responsive', 'Basic Admin Panel', '3 Months Support'] },
    { name: 'Growth', price: '$25,000', desc: 'Scale your user base with advanced features and performance.', features: ['Advanced Features', 'API Integration', 'Real-time Data', 'User Roles', 'Testing Suite'] },
    { name: 'Enterprise', price: 'Custom', desc: 'Mission-critical software for large organizations.', features: ['Microservices', 'SLA', 'On-premise Option', 'Security Audit', '24/7 Support'] }
  ];

  const tableFeatures = [
    {
      category: 'Architecture',
      items: [
        { name: 'Tech Stack', values: ['React/Node', 'MERN/Next.js', 'Custom Stack'] },
        { name: 'Database', values: ['Shared MongoDB', 'Dedicated Cluster', 'Multi-Region'] },
        { name: 'Cloud Provider', values: ['DigitalOcean', 'AWS / Google Cloud', 'Custom / Hybrid'] },
      ]
    },
    {
      category: 'Functionality',
      items: [
        { name: 'User Authentication', values: ['Email/Pass', 'Social Login', 'SSO/MFA'] },
        { name: 'Payment Integration', values: ['Stripe Basic', 'Stripe Connect', 'Multi-Gateway'] },
        { name: 'Real-time Features', values: [false, 'Socket.io', 'Advanced Pub/Sub'] },
        { name: 'Admin Dashboard', values: ['Basic', 'Advanced', 'Custom Analytics'] },
      ]
    },
    {
      category: 'Delivery',
      items: [
        { name: 'Timeline', values: ['4-6 Weeks', '8-12 Weeks', 'Custom'] },
        { name: 'QA Testing', values: ['Manual', 'Automated Unit', 'Full E2E Suite'] },
        { name: 'Warranty', values: ['1 Month', '3 Months', '1 Year'] },
      ]
    }
  ];

  const customFaqs = [
    { q: "What is an MVP?", a: "MVP stands for Minimum Viable Product. It includes the essential features needed to launch your idea and gather user feedback without over-investing initially." },
    { q: "Do I own the code?", a: "Yes, once the project is fully paid for, you own 100% of the source code and intellectual property." },
    { q: "How do you handle hosting?", a: "We can set up hosting on your preferred cloud provider (AWS, Google Cloud, etc.) and hand over the credentials, or manage it for you." },
  ];

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Application Development Pricing"
        description="Scalable pricing plans for web application development. From MVPs to Enterprise SaaS."
        keywords="app development cost, saas pricing, software development rates"
      />

      <div className="min-h-screen bg-[#030712]">

        <PageHero
          title="App Pricing"
          highlight="Pricing"
          badge="Pricing"
          subtitle="Invest in scalable software that grows with your business."
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
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${i === 1 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/5'} hover:border-red-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {i === 1 && <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Best Value</div>}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
                  <div className="text-4xl font-bold text-red-500 mb-8">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-center text-gray-300">
                        <span className="text-red-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-bold transition-all transform group-hover:scale-105 ${i === 1 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    Start Project
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="Application Pricing" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Application"
      />
    </>
  );
}
