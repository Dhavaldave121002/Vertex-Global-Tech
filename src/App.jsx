// src/App.jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FloatingActions from './components/FloatingActions/FloatingActions'
import './index.css'

/*
  NOTE -> Make sure the files below actually exist.
  Common Vite error: "Failed to resolve import './pages/SomePage' " happens when a file is missing.
  If you haven't created a page yet, either:
    - create the file (e.g. src/pages/services/Informative.jsx), or
    - point the import to an existing file, or
    - add a tiny placeholder component to avoid build errors.
*/

// Lazy pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

/* Services pages (direct) */
const Informative = lazy(() => import('./pages/services/Informative'))
const Dynamic = lazy(() => import('./pages/services/Dynamic'))
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'))
const Application = lazy(() => import('./pages/services/Application'))
const UIUX = lazy(() => import('./pages/services/UIUX')) // single UI/UX page

/* Pricing pages (direct) */
const WebsitePricing = lazy(() => import('./pages/pricing/WebsitePricing'))
const ApplicationPricing = lazy(() => import('./pages/pricing/ApplicationPricing'))
const UIUXPricing = lazy(() => import('./pages/pricing/UIUXPricing'))

/* Other pages */
const Career = lazy(() => import('./pages/Career'))
const Referral = lazy(() => import('./pages/Referral'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main id="main" className="flex-grow-1">
          <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Services direct routes */}
              <Route path="/services/informative" element={<Informative />} />
              <Route path="/services/dynamic" element={<Dynamic />} />
              <Route path="/services/ecommerce" element={<Ecommerce />} />
              <Route path="/services/application" element={<Application />} />
              <Route path="/services/uiux" element={<UIUX />} />

              {/* Pricing direct routes */}
              <Route path="/pricing/website" element={<WebsitePricing />} />
              <Route path="/pricing/application" element={<ApplicationPricing />} />
              <Route path="/pricing/uiux" element={<UIUXPricing />} />

              {/* Other */}
              <Route path="/career" element={<Career />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <FloatingActions
          whatsappNumber="919876543210"
          whatsappMessage="Hi%20Vertex%20Global%20Tech!%20I%20am%20interested%20in%20your%20services."
        />
      </div>
    </BrowserRouter>
  )
}
