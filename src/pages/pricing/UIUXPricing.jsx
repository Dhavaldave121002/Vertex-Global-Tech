// src/pages/pricing/UIUXPricing.jsx
import React from 'react'
import './pricing.css'

import Hero from '../../components/Pricing/UIUX/Hero'
import Tiers from '../../components/Pricing/UIUX/Tiers'
import Comparison from '../../components/Pricing/UIUX/Comparison'
import FAQ from '../../components/Pricing/UIUX/FAQ'
import CTA from '../../components/Pricing/UIUX/CTA'

export default function UIUXPricing(){
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
