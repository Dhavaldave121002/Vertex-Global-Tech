import React from 'react'
import './mock3d.css'

export default function Mock3D() {
  return (
    <div className="mock-3d" aria-hidden="true">
      <div className="mock-stack" role="img" aria-label="Product mockup">
        <div className="mock-card back" />
        <div className="mock-card mid" />
        <div className="mock-card front">
          <div className="front-top" />
          <div className="front-mid">
            <div className="fm-line" />
            <div className="fm-line short" />
            <div className="fm-line" />
          </div>
          <div className="front-cta" />
        </div>
      </div>

      <div className="robot-container">
        {/* stylized lightweight robot SVG */}
        <svg className="robot" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robot">
          <defs>
            <linearGradient id="rg" x1="0" x2="1">
              <stop offset="0" stopColor="#0dcaf0"/>
              <stop offset="1" stopColor="#0d6efd"/>
            </linearGradient>
            <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <ellipse cx="100" cy="200" rx="64" ry="10" fill="rgba(4,12,24,0.22)"/>

          <g transform="translate(40,28)">
            <rect x="20" y="40" width="120" height="96" rx="12" fill="#071428" stroke="url(#rg)" strokeWidth="2"/>
            <rect x="36" y="56" width="88" height="56" rx="8" fill="#041226"/>
            <rect x="44" y="64" width="72" height="12" rx="6" fill="url(#rg)"/>
            <circle cx="54" cy="76" r="4" fill="#0dcaf0"/>
            <circle cx="80" cy="76" r="4" fill="#0d6efd" opacity="0.95"/>
            <rect x="44" y="92" width="60" height="8" rx="4" fill="#12324a"/>
          </g>

          <circle cx="100" cy="60" r="88" fill="none" stroke="url(#rg)" strokeWidth="1.2" opacity="0.08" filter="url(#g)"/>
        </svg>
      </div>
    </div>
  )
}
