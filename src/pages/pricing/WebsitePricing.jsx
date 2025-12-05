// src/pages/pricing/WebsitePricing.jsx
import React from 'react'
import './pricing.css'

import Hero from '../../components/Pricing/Website/Hero'
import Tiers from '../../components/Pricing/Website/Tiers'
import Comparison from '../../components/Pricing/Website/Comparison'
import FAQ from '../../components/Pricing/Website/FAQ'
import CTA from '../../components/Pricing/Website/CTA'

export default function WebsitePricing(){
  return (
    <main className="pricing-page">
      <Hero />
      <Tiers />
      <Comparison />
      <FAQ />
      <CTA />
    </main>
  )
}
