import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Create floating particles
    const particleCount = 20;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 15 + 5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);

    return () => setMounted(false);
  }, []);

  return (
    <div className="not-found-container">
      {/* Animated background elements */}
      <div className="animated-background">
        {particles.map(p => (
          <div
            key={p.id}
            className="floating-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div className="grid-overlay" />
      </div>

      <section className={`container py-5 text-center ${mounted ? 'mounted' : ''}`}>
        {/* Skeleton animation for 404 */}
        <div className="error-code-container">
          <h1 className="display-1 error-code">
            <span className="digit skeleton-animate">4</span>
            <span className="digit skeleton-animate" style={{ animationDelay: '0.2s' }}>0</span>
            <span className="digit skeleton-animate" style={{ animationDelay: '0.4s' }}>4</span>
          </h1>
          <div className="glitch" data-text="404">404</div>
        </div>

        {/* Animated text */}
        <div className="message-container">
          <p className="lead main-message">
            <span className="skeleton-text">Page lost in the digital void</span>
          </p>
          <p className="sub-message">
            <span className="skeleton-text" style={{ animationDelay: '0.3s' }}>
              The content you're looking for has drifted into cyberspace
            </span>
          </p>
        </div>

        {/* Animated search illustration */}
        <div className="search-illustration">
          <div className="magnifying-glass">
            <div className="glass-circle skeleton-animate" />
            <div className="glass-handle skeleton-animate" style={{ animationDelay: '0.2s' }} />
          </div>
          <div className="search-beam skeleton-animate" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Action buttons with animations */}
        <div className="action-buttons">
          <Link to="/" className="btn-home skeleton-animate">
            <span className="btn-content">
              <span className="btn-icon">⌂</span>
              <span className="btn-text">Return Home</span>
            </span>
            <div className="btn-shine"></div>
          </Link>
          
          <Link to="/" className="btn-secondary skeleton-animate" style={{ animationDelay: '0.2s' }}>
            <span className="btn-content">
              <span className="btn-icon">⟲</span>
              <span className="btn-text">Go Back</span>
            </span>
          </Link>
        </div>

        {/* Navigation suggestions */}
        <div className="navigation-suggestions">
          <h3 className="suggestion-title skeleton-text" style={{ animationDelay: '0.5s' }}>
            Quick Navigation
          </h3>
          <div className="suggestion-links">
            {['Home', 'Explore', 'About', 'Contact'].map((item, index) => (
              <Link 
                key={item} 
                to="/" 
                className="suggestion-link skeleton-animate"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative corner elements */}
      <div className="corner-decor corner-top-left skeleton-animate" />
      <div className="corner-decor corner-top-right skeleton-animate" style={{ animationDelay: '0.1s' }} />
      <div className="corner-decor corner-bottom-left skeleton-animate" style={{ animationDelay: '0.2s' }} />
      <div className="corner-decor corner-bottom-right skeleton-animate" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}