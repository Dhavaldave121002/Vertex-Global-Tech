import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaBuilding, FaCrown, FaArrowRight } from 'react-icons/fa';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const PricingCard = ({ title, price, icon: Icon, features, delay, recommended, tag }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`group relative p-10 rounded-[2.5rem] bg-white/[0.02] border transition-all duration-500 overflow-hidden flex flex-col h-full
      ${recommended ? 'border-blue-500/30 bg-blue-500/[0.02]' : 'border-white/5 hover:border-blue-500/20'}`}
  >
    {recommended && (
      <div className="absolute top-8 right-[-35px] rotate-45 bg-blue-600 text-white text-[10px] font-black py-1 px-12 uppercase tracking-[0.2em] shadow-lg z-20">
        Best Value
      </div>
    )}

    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
          ${recommended ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-400 group-hover:bg-blue-500/10 transition-colors'}`}>
          <Icon />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-blue-400/60 font-black uppercase tracking-widest mt-1">{tag}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-black text-white">{price}</span>
          <span className="text-gray-500 text-sm font-bold">Onwards</span>
        </div>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item">
            <FaCheckCircle className={`mt-1 text-sm ${recommended ? 'text-blue-500' : 'text-gray-700 group-hover:text-blue-500 transition-colors'}`} />
            <span className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors">{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3 group/btn
        ${recommended ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
        Choose Plan
        <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export default function Pricing() {
  const [plans, setPlans] = useState([
    {
      title: "Website Basic",
      tag: "Startup Essential",
      price: "15,000",
      icon: FaRocket,
      features: [
        "Up to 5 Responsive Pages",
        "Modern Glassmorphic UI",
        "SEO Core Optimization",
        "Contact Form Integration",
        "1 Month Support",
        "SSL Certificate Support"
      ],
      delay: 0.1,
      recommended: false,
      key: 'vgtw_pricing_plans'
    },
    {
      title: "Application Pro",
      tag: "Growth Focused",
      price: "45,000",
      icon: FaCrown,
      features: [
        "Android / iOS Solutions",
        "Dynamic Content Management",
        "Advanced User Authentication",
        "Push Notification System",
        "Cloud Data Synchronization",
        "3 Months Premium Support"
      ],
      delay: 0.2,
      recommended: true,
      key: 'vgtw_app_pricing_plans'
    },
    {
      title: "Enterprise Suite",
      tag: "Scale Ready",
      price: "95,000",
      icon: FaBuilding,
      features: [
        "Full-Stack Web & Mobile",
        "Custom CRM Integration",
        "Advanced Analytics Engine",
        "Dedicated Account Manager",
        "Infinite Scale Architecture",
        "Lifetime Critical Support"
      ],
      delay: 0.3,
      recommended: false,
      key: 'vgtw_odoo_pricing_plans' // Or a dedicated enterprise key if exists
    }
  ]);

  useEffect(() => {
    const loadPlans = () => {
      setPlans(prev => prev.map(plan => {
        const saved = localStorage.getItem(plan.key);
        if (saved) {
          const data = JSON.parse(saved);
          // PricingManager stores plans as an array. We pick the most relevant one or map carefully.
          // For simplicity in the overview, we'll try to match by name or just take the first few.
          const matchingPlan = data.find(p => p.name.toLowerCase().includes(plan.title.split(' ')[0].toLowerCase()));
          if (matchingPlan) {
            return {
              ...plan,
              title: matchingPlan.name,
              price: matchingPlan.price,
              features: matchingPlan.features || plan.features,
              recommended: matchingPlan.isPopular || plan.recommended
            };
          }
        }
        return plan;
      }));
    };

    loadPlans();
    window.addEventListener('storage', loadPlans);
    return () => window.removeEventListener('storage', loadPlans);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      <SEO
        title="Plans & Pricing"
        description="Transparent pricing for high-end digital solutions. Choose the plan that fits your vision and scale."
        keywords="web development pricing, app development cost, uiux design price"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Investment in Future Ready Technology"
          highlight="Technology"
          subtitle="Transparent, value-driven pricing models designed to empower businesses of all sizes to innovate and transform."
          badge="Pricing Plans"
        />

        <div className="container mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
