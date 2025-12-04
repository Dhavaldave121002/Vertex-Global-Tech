// src/pages/services/Informative.jsx
import React, { useState } from 'react'
import '../../pages/informative.css'   // ensure this path/file exists

import Hero from '../../components/Services/Informative/Hero'
import Benefits from '../../components/Services/Informative/Benefits'
import ServicesBreakdown from '../../components/Services/Informative/ServicesBreakdown'
import Portfolio from '../../components/Services/Informative/Portfolio'
import Process from '../../components/Services/Informative/Process'
import PricingTeaser from '../../components/Services/Informative/PricingTeaser'
import FAQ from '../../components/Services/Informative/FAQ'
import CTAForm from '../../components/Services/Informative/CTAForm'
import PortfolioModal from '../../components/Services/Informative/PortfolioModal'

import { PORTFOLIO as RAW_PORTFOLIO } from '../../components/Services/Informative/data'

const PORTFOLIO = Array.isArray(RAW_PORTFOLIO) ? RAW_PORTFOLIO : []

export default function Informative() {
  const [modalItem, setModalItem] = useState(null)

  return (
    <main className="informative-page">
      <Hero />
      <Benefits />
      <ServicesBreakdown />
      <Portfolio items={PORTFOLIO} onPreview={setModalItem} />
      <Process />
      <PricingTeaser />
      <FAQ />
      <CTAForm />
      {modalItem && <PortfolioModal item={modalItem} onClose={() => setModalItem(null)} />}
    </main>
  )
}
