// src/pages/Home.jsx
import React from 'react'

// Hero + visual mock
import HeroBanner from '../components/HeroBanner/HeroBanner'

// Feature sections
import ServicesHighlights from '../components/Sections/ServicesHighlights'
import ExpertiseCards from '../components/Expertise/ExpertiseCards'
import AboutBlock from '../components/AboutBlock/AboutBlock'
import PricingTeaser from '../components/Sections/PricingTeaser'
import TechStack from '../components/Sections/TechStack'
import Testimonials from '../components/Sections/Testimonials'
import ContactCTA from '../components/Sections/ContactCTA'

export default function Home() {
  return (
    <>
      {/* 1 - Hero */}
      <HeroBanner />

      <main>
        {/* 2 - Quick services highlights */}
        <ServicesHighlights />

        {/* 3 - Expertise (flipping cards) */}
        <div className="container">
          <ExpertiseCards />
        </div>

        {/* 4 - About block (placed here to build trust after features) */}
        <AboutBlock />

        {/* 5 - Pricing teaser */}
        <PricingTeaser />

        {/* 6 - Tech stack / logos */}
        <TechStack />

        {/* 7 - Testimonials */}
        <Testimonials />

        {/* 8 - Final call to action */}
        <ContactCTA />
      </main>
    </>
  )
}
