import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default function Header(){
  return (
    <header className="vg-header" role="banner">
      <nav className="navbar navbar-expand-lg">
        <div className="container">

          {/* Brand + Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">

            {/* FIXED LOGO PATH */}
            <img
              src="src/assets/vglogo.jpg"
              alt="Vertex Global Tech Logo"
              className="vg-logo"
            />

            <div className="vg-brand-text ms-3">
              <span className="title">Vertex Global Tech</span>
              <span className="subtitle">Design • Engineering • Scale</span>
            </div>
          </Link>

          {/* toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#vgNav"
            aria-controls="vgNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="vgNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>

              {/* Services dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn-link dropdown-toggle"
                  id="vgServices"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </button>

                <ul className="dropdown-menu" aria-labelledby="vgServices">
                  <li><Link to="/services/informative" className="dropdown-item">Informative Website</Link></li>
                  <li><Link to="/services/dynamic" className="dropdown-item">Dynamic Website</Link></li>
                  <li><Link to="/services/ecommerce" className="dropdown-item">E-Commerce Website</Link></li>

                  <li><hr className="dropdown-divider" /></li>

                  <li><Link to="/services/application" className="dropdown-item">Application Development</Link></li>

                  <li><hr className="dropdown-divider" /></li>

                  <li><Link to="/services/uiux" className="dropdown-item">UI/UX Design</Link></li>
                </ul>
              </li>

              {/* Pricing */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn-link dropdown-toggle"
                  id="vgPricing"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Plans & Pricing
                </button>

                <ul className="dropdown-menu" aria-labelledby="vgPricing">
                  <li><Link to="/pricing/website" className="dropdown-item">Website Pricing</Link></li>
                  <li><Link to="/pricing/application" className="dropdown-item">Application Pricing</Link></li>
                  <li><Link to="/pricing/uiux" className="dropdown-item">UI/UX Pricing</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/referral" className="nav-link">Referral</Link>
              </li>

              <li className="nav-item">
                <Link to="/career" className="nav-link">Career</Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link nav-cta">Contact</Link>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </header>
  )
}
