import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="vg-footer" role="contentinfo">
      <div className="footer-top py-5">
        <div className="container">
          <div className="row gy-4">

            <div className="col-12 col-md-4">
              <Link to="/" className="footer-brand d-flex align-items-center mb-3">
                <span className="footer-mark" aria-hidden="true" />
                <div className="ms-3">
                  <div className="f-title">Vertex Global Tech</div>
                  <div className="f-sub">Design • Engineering • Scale</div>
                </div>
              </Link>

              <p className="f-desc">We design and build fast, secure, high-converting websites and apps. Production-ready engineering with clear timelines.</p>

              <p className="mb-1"><strong>Email:</strong> <a href="mailto:hello@vertexglobaltech.com">hello@vertexglobaltech.com</a></p>
              <p className="mb-0"><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
            </div>

            <div className="col-6 col-md-2">
              <h6 className="f-head">Company</h6>
              <ul className="list-unstyled f-links">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/career">Career</Link></li>
                <li><Link to="/referral">Referral</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3">
              <h6 className="f-head">Services</h6>
              <ul className="list-unstyled f-links">
                <li><Link to="/services/informative">Informative Website</Link></li>
                <li><Link to="/services/dynamic">Dynamic Website</Link></li>
                <li><Link to="/services/ecommerce">E-Commerce</Link></li>
                <li><Link to="/services/application">Application Dev</Link></li>
                <li><Link to="/services/uiux-web">UI/UX</Link></li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <h6 className="f-head">Newsletter</h6>
              <p className="text-muted">Join our updates — product releases and special offers. No spam.</p>

              <form className="d-flex" onSubmit={(e)=>e.preventDefault()} aria-label="Subscribe to newsletter">
                <input className="form-control f-input me-2" type="email" placeholder="Your work email" aria-label="Email" />
                <button className="btn f-btn" type="submit">Subscribe</button>
              </form>

              <div className="f-social mt-3" aria-hidden="true">
                <a className="social" href="#" tabIndex={-1}>LinkedIn</a>
                <a className="social ms-3" href="#" tabIndex={-1}>Twitter</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <small>© {year} Vertex Global Tech — All rights reserved.</small>
          <small>Built with care in Ahmedabad</small>
        </div>
      </div>
    </footer>
  )
}
