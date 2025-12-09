// src/components/Pricing/Website/Comparison.jsx
import React from 'use client'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Comparison() {
    const Check = <span className="comparison-check">✓</span>
    const Dash = <span className="comparison-text">—</span>
    const Basic = <span className="comparison-text">Basic</span>
    const Advanced = <span className="comparison-highlight">Advanced</span>

  return (
    <section className="website-comparison-section" id="comparison-table">
      <div className="container">
        <div className="text-center mb-4">
          <h4>Feature Comparison Matrix 📊</h4>
          <p className="lead text-white">A quick glance at the key features, differentiating the functionality of each website plan.</p>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless pricing-table text-center">
            <thead>
              <tr>
                <th>Core Feature</th>
                <th>Informative</th>
                <th>Dynamic</th>
                <th>E-commerce</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Maximum Pages</td><td>Up to 5</td><td>Up to 25</td><td className='comparison-highlight'>Unlimited (CMS)</td></tr>
              <tr><td>Content Management System (CMS)</td><td>{Dash}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>Custom Blog Functionality</td><td>{Dash}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>E-commerce & Payment Gateway</td><td>{Dash}</td><td>{Dash}</td><td>{Check}</td></tr>
              <tr><td>SEO Optimization</td><td>{Basic}</td><td>{Advanced}</td><td>{Advanced}</td></tr>
              <tr><td>SSL Certificate (Security)</td><td>{Check}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>Post-Launch Support</td><td>Email</td><td>Priority</td><td className='comparison-highlight'>Priority + SLA</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}