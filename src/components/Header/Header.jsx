import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './header.css';
import VgLogo from '../../assets/vglogo.jpg';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);

  // Handle scroll effect for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle scroll effect
      setScrolled(currentScrollY > 50);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Handle hide/show header on scroll with debounce
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
          setIsVisible(false); // Hide on scroll down
        } else {
          setIsVisible(true); // Show on scroll up
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      
      // Debounce scroll events
      timeoutRef.current = setTimeout(() => {
        // Additional scroll logic if needed
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Handle dropdown toggle with better state management
  const handleDropdownToggle = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  // Services dropdown items
  const servicesItems = [
    { path: '/services/informative', label: 'Informative Website', icon: 'bi-globe' },
    { path: '/services/dynamic', label: 'Dynamic Website', icon: 'bi-code-slash' },
    { path: '/services/ecommerce', label: 'E-Commerce Website', icon: 'bi-cart' },
    { path: '/services/application', label: 'Application Development', icon: 'bi-phone' },
    { path: '/services/uiux', label: 'UI/UX Design', icon: 'bi-palette' }
  ];

  // Pricing dropdown items
  const pricingItems = [
    { path: '/pricing/website', label: 'Website Pricing', icon: 'bi-cash-coin' },
    { path: '/pricing/application', label: 'Application Pricing', icon: 'bi-cash-stack' },
    { path: '/pricing/uiux', label: 'UI/UX Pricing', icon: 'bi-currency-dollar' }
  ];

  // Main navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: 'bi-house' },
    { path: '/about', label: 'About Us', icon: 'bi-people' },
    { path: '/referral', label: 'Referral', icon: 'bi-share' },
    { path: '/career', label: 'Careers', icon: 'bi-briefcase' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`vg-header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      role="banner"
      aria-label="Main navigation"
    >
      <nav className="vg-navbar" aria-label="Primary navigation">
        <div className="vg-container">
          
          {/* Logo/Brand Section */}
          <Link to="/" className="vg-brand" aria-label="Vertex Global Tech Home">
            <div className="vg-logo-wrapper">
              <div className="vg-logo-container">
                <img
                  src={VgLogo}
                  alt="Vertex Global Tech Logo"
                  className="vg-logo"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentNode.querySelector('.vg-logo-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="vg-logo-fallback">
                  <i className="bi bi-rocket-takeoff fallback-icon"></i>
                </div>
                <div className="vg-logo-glow"></div>
                <div className="vg-logo-pulse"></div>
              </div>
              <div className="vg-brand-text">
                <h1 className="vg-title">Vertex Global Tech</h1>
                <p className="vg-subtitle">Design • Engineering • Scale</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="vg-nav-desktop">
            <ul className="vg-nav-list">
              {navItems.map((item) => (
                <li className="vg-nav-item" key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `vg-nav-link ${isActive ? 'active' : ''}`
                    }
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    <i className={`bi ${item.icon} nav-icon`}></i>
                    <span className="nav-text">{item.label}</span>
                    <span className="nav-underline"></span>
                  </NavLink>
                </li>
              ))}

              {/* Services Dropdown */}
              <li 
                className={`vg-nav-item dropdown ${activeDropdown === 'services' ? 'active' : ''}`}
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => {
                  // Small delay to prevent accidental closing
                  setTimeout(() => {
                    if (activeDropdown === 'services') {
                      setActiveDropdown(null);
                    }
                  }, 100);
                }}
              >
                <button
                  className="vg-nav-link dropdown-trigger"
                  onClick={() => handleDropdownToggle('services')}
                  aria-expanded={activeDropdown === 'services'}
                  aria-haspopup="true"
                >
                  <i className="bi bi-code-slash nav-icon"></i>
                  <span className="nav-text">Services</span>
                  <i 
                    className={`bi bi-chevron-down dropdown-arrow ${activeDropdown === 'services' ? 'rotate' : ''}`}
                    aria-hidden="true"
                  ></i>
                </button>
                <div 
                  className={`vg-dropdown-menu services-dropdown ${activeDropdown === 'services' ? 'show' : ''}`}
                  role="menu" 
                  aria-label="Services submenu"
                >
                  <div className="dropdown-header">
                    <i className="bi bi-rocket-takeoff header-icon" aria-hidden="true"></i>
                    <div>
                      <h3 className="dropdown-title">Our Services</h3>
                      <p className="dropdown-subtitle">Complete digital solutions</p>
                    </div>
                  </div>
                  <div className="dropdown-grid">
                    {servicesItems.map((service) => (
                      <NavLink 
                        to={service.path} 
                        className={({ isActive }) => 
                          `dropdown-item ${isActive ? 'active' : ''}`
                        }
                        key={service.path}
                        onClick={() => setActiveDropdown(null)}
                        role="menuitem"
                      >
                        <div className="dropdown-item-icon" aria-hidden="true">
                          <i className={`bi ${service.icon}`}></i>
                        </div>
                        <div className="dropdown-item-content">
                          <span className="dropdown-item-title">{service.label}</span>
                          <span className="dropdown-item-arrow" aria-hidden="true">
                            <i className="bi bi-chevron-right"></i>
                          </span>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </li>

              {/* Pricing Dropdown */}
              <li 
                className={`vg-nav-item dropdown ${activeDropdown === 'pricing' ? 'active' : ''}`}
                onMouseEnter={() => setActiveDropdown('pricing')}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (activeDropdown === 'pricing') {
                      setActiveDropdown(null);
                    }
                  }, 100);
                }}
              >
                <button
                  className="vg-nav-link dropdown-trigger"
                  onClick={() => handleDropdownToggle('pricing')}
                  aria-expanded={activeDropdown === 'pricing'}
                  aria-haspopup="true"
                >
                  <i className="bi bi-cash-coin nav-icon"></i>
                  <span className="nav-text">Pricing</span>
                  <i 
                    className={`bi bi-chevron-down dropdown-arrow ${activeDropdown === 'pricing' ? 'rotate' : ''}`}
                    aria-hidden="true"
                  ></i>
                </button>
                <div 
                  className={`vg-dropdown-menu pricing-dropdown ${activeDropdown === 'pricing' ? 'show' : ''}`}
                  role="menu" 
                  aria-label="Pricing submenu"
                >
                  <div className="dropdown-header">
                    <i className="bi bi-graph-up-arrow header-icon" aria-hidden="true"></i>
                    <div>
                      <h3 className="dropdown-title">Pricing Plans</h3>
                      <p className="dropdown-subtitle">Transparent & flexible</p>
                    </div>
                  </div>
                  {pricingItems.map((pricing) => (
                    <NavLink 
                      to={pricing.path} 
                      className={({ isActive }) => 
                        `dropdown-item ${isActive ? 'active' : ''}`
                      }
                      key={pricing.path}
                      onClick={() => setActiveDropdown(null)}
                      role="menuitem"
                    >
                      <div className="dropdown-item-icon" aria-hidden="true">
                        <i className={`bi ${pricing.icon}`}></i>
                      </div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">{pricing.label}</span>
                        <span className="dropdown-item-arrow" aria-hidden="true">
                          <i className="bi bi-chevron-right"></i>
                        </span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </li>

              {/* CTA Button */}
              <li className="vg-nav-item cta-item">
                <Link 
                  to="/contact" 
                  className="vg-cta-button"
                  aria-label="Get in touch with Vertex Global Tech"
                >
                  <span className="cta-text">Contact Us</span>
                  <span className="cta-icon" aria-hidden="true">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  <span className="cta-glow"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`vg-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="menu-toggle-line"></span>
            <span className="menu-toggle-line"></span>
            <span className="menu-toggle-line"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`vg-nav-mobile ${mobileMenuOpen ? 'active' : ''}`} 
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="mobile-nav-header">
            <h3 className="mobile-nav-title">Navigation</h3>
            <button 
              className="mobile-nav-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>
          
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li className="mobile-nav-item" key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMobileMenu}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  <i className={`bi ${item.icon} mobile-nav-icon`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                  <i className="bi bi-chevron-right mobile-nav-arrow" aria-hidden="true"></i>
                </NavLink>
              </li>
            ))}

            {/* Services in Mobile */}
            <li className="mobile-nav-item dropdown">
              <button 
                className="mobile-nav-link"
                onClick={() => handleDropdownToggle('mobile-services')}
                aria-expanded={activeDropdown === 'mobile-services'}
                aria-haspopup="true"
              >
                <i className="bi bi-code-slash mobile-nav-icon" aria-hidden="true"></i>
                <span>Services</span>
                <i 
                  className={`bi bi-chevron-down mobile-dropdown-arrow ${activeDropdown === 'mobile-services' ? 'rotate' : ''}`}
                  aria-hidden="true"
                ></i>
              </button>
              {activeDropdown === 'mobile-services' && (
                <div className="mobile-dropdown" role="menu">
                  {servicesItems.map((service) => (
                    <NavLink 
                      to={service.path} 
                      className="mobile-dropdown-item"
                      key={service.path}
                      onClick={closeMobileMenu}
                      role="menuitem"
                    >
                      <i className={`bi ${service.icon} mobile-dropdown-icon`} aria-hidden="true"></i>
                      <span>{service.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </li>

            {/* Pricing in Mobile */}
            <li className="mobile-nav-item dropdown">
              <button 
                className="mobile-nav-link"
                onClick={() => handleDropdownToggle('mobile-pricing')}
                aria-expanded={activeDropdown === 'mobile-pricing'}
                aria-haspopup="true"
              >
                <i className="bi bi-cash-coin mobile-nav-icon" aria-hidden="true"></i>
                <span>Pricing</span>
                <i 
                  className={`bi bi-chevron-down mobile-dropdown-arrow ${activeDropdown === 'mobile-pricing' ? 'rotate' : ''}`}
                  aria-hidden="true"
                ></i>
              </button>
              {activeDropdown === 'mobile-pricing' && (
                <div className="mobile-dropdown" role="menu">
                  {pricingItems.map((pricing) => (
                    <NavLink 
                      to={pricing.path} 
                      className="mobile-dropdown-item"
                      key={pricing.path}
                      onClick={closeMobileMenu}
                      role="menuitem"
                    >
                      <i className={`bi ${pricing.icon} mobile-dropdown-icon`} aria-hidden="true"></i>
                      <span>{pricing.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </li>

            {/* Mobile CTA */}
            <li className="mobile-nav-item cta-mobile">
              <Link 
                to="/contact" 
                className="mobile-cta-button"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-arrow-right cta-button-icon" aria-hidden="true"></i>
                <span>Get in Touch</span>
              </Link>
            </li>
          </ul>
          
          <div className="mobile-nav-footer">
            <p className="mobile-footer-text">
              Ready to transform your digital presence?
            </p>
            <div className="mobile-contact-info">
              <a href="tel:+1234567890" className="mobile-phone">
                <i className="bi bi-telephone" aria-hidden="true"></i>
                <span>+1 (234) 567-890</span>
              </a>
              <a href="mailto:contact@vertexglobaltech.com" className="mobile-email">
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <span>contact@vertexglobaltech.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="vg-mobile-overlay"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}