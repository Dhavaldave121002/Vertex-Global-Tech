import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'

// Assuming the image is two levels up from the component folder.
import VgLogo from '../../assets/vglogo.jpg' 

export default function Header(){
  return (
    <header className="vg-header" role="banner">
      <nav className="navbar navbar-expand-lg">
        {/* === CORE CHANGE: container-fluid for full width === */}
        <div className="container-fluid">

          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={VgLogo} 
              alt="Vertex Global Tech Logo"
              className="vg-logo"
            />
            <div className="vg-brand-text ms-3">
              <span className="title">Vertex Global Tech</span>
              <span className="subtitle">Design • Engineering • Scale</span>
            </div>
          </Link>

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
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">About</NavLink>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link btn-link dropdown-toggle"
                  id="vgServices"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside" 
                  aria-expanded="false"
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    Services
                  </div>
                </button>
                <ul className="dropdown-menu" aria-labelledby="vgServices">
                  <li><NavLink to="/services/informative" className="dropdown-item">Informative Website</NavLink></li>
                  <li><NavLink to="/services/dynamic" className="dropdown-item">Dynamic Website</NavLink></li>
                  <li><NavLink to="/services/ecommerce" className="dropdown-item">E-Commerce Website</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink to="/services/application" className="dropdown-item">Application Development</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink to="/services/uiux" className="dropdown-item">UI/UX Design</NavLink></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link btn-link dropdown-toggle"
                  id="vgPricing"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside" 
                  aria-expanded="false"
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    Plans & Pricing
                  </div>
                </button>
                <ul className="dropdown-menu" aria-labelledby="vgPricing">
                  <li><NavLink to="/pricing/website" className="dropdown-item">Website Pricing</NavLink></li>
                  <li><NavLink to="/pricing/application" className="dropdown-item">Application Pricing</NavLink></li>
                  <li><NavLink to="/pricing/uiux" className="dropdown-item">UI/UX Pricing</NavLink></li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink to="/referral" className="nav-link">Referral</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/career" className="nav-link">Career</NavLink>
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