// src/pages/About.jsx
import React from 'react'
import './about.css'         // keep your existing styles here
import Hero from '../components/About/Hero'
import MissionVision from '../components/About/MissionVision'
import Values from '../components/About/Values'
import Timeline from '../components/About/Timeline'
import Team from '../components/About/Team'
import StatsCTA from '../components/About/StatsCTA'

export default function About() {
  return (
    <section className="vg-about">
      <div className="container">
        <Hero />
        <MissionVision />
        <Values />
        <Timeline />
        <Team />
        <StatsCTA />
      </div>
    </section>
  )
}
