// src/pages/About.jsx
import React from 'react'
import About from '../components/About/About'    // re-uses the component
import '../components/About/about.css'           // make sure styles are loaded (if not imported inside component)

export default function AboutPage(){
  return <About />
}
