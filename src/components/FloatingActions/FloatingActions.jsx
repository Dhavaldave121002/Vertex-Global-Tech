import React, { useEffect, useState } from 'react'
import './floating-actions.css'

export default function FloatingActions({
  whatsappNumber = '919876543210',
  whatsappMessage = 'Hi%20Vertex%20Global%20Tech!%20I%20am%20interested%20in%20your%20services.',
  bottomOffset = 20
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* SCROLL LOGIC: Show when scrolled past 160px */
    const onScroll = () => setVisible(window.scrollY > 160)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Accessibility focus to the main content after scroll
    const main = document.querySelector('main') || document.body
    if (main) main.setAttribute('tabindex', '-1'), main.focus({ preventScroll: true })
    setTimeout(() => main && main.removeAttribute('tabindex'), 1000)
  }

  const waHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="vg-floating-actions" style={{ bottom: `${bottomOffset}px` }}>
      {/* WhatsApp Button */}
      <a 
        className="vg-float-btn vg-float-whatsapp" 
        href={waHref} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat with us on WhatsApp" 
        title="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21.7 2.3A11.9 11.9 0 0012 0C5.4 0 .3 5.1.3 11.7c0 2.1.6 4.1 1.8 5.9L0 24l6.7-1.7c1.7 1 3.7 1.5 5.6 1.5 6.6 0 11.7-5.1 11.7-11.7 0-3.1-1.2-6-3.7-8.8z" fill="#25D366"/>
          <path d="M17.4 14.2c-.3-.2-1.8-.9-2.1-.9-.3 0-.5.2-1.2.9-.7.7-1.2.9-2.2.6-.9-.3-2.2-1-3.7-3.3-.8-1.3.8-1.2 1.1-3.6.2-1-.6-1.1-.9-1.1-.3 0-.7 0-1 .1-.3.1-1 .4-1.4 1.1-.4.7-1.6 2.6-1.6 6 0 3.4 2 6.5 4.5 7.5 2.5.9 4.9.6 6.6-.5 1.7-1.1 3.2-3.3 3.2-6 0-.9-.3-1.1-.7-1.3z" fill="#fff"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      <button 
        className={`vg-float-btn vg-float-top ${visible ? 'visible' : 'hidden'}`} 
        onClick={scrollToTop} 
        aria-label="Scroll to top" 
        title="Back to top"
      >
        {/* Arrow Up SVG Icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  )
}