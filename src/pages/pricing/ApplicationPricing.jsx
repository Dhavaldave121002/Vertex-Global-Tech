// src/pages/pricing/ApplicationPricing.jsx
import React from 'react'
import './pricing.css'

import Hero from '../../components/Pricing/Application/Hero'
import Tiers from '../../components/Pricing/Application/Tiers'
import Comparison from '../../components/Pricing/Application/Comparison'
import FAQ from '../../components/Pricing/Application/FAQ'
import CTA from '../../components/Pricing/Application/CTA'

export default function ApplicationPricing(){
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
