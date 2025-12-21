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

        {/* You can use either FloatingActions or FloatingActions, or both */}
        {/* Option 1: Use only FloatingActions (recommended - more feature-rich) */}
        <FloatingActions
          position="right"
          floatingButtonSize="medium"
          darkMode={false}
          zIndex={999999}
          enablePulse={true}
          showCallButton={true}
          showEmailButton={true}
          enableRipple={true}
          showBadgeCount={true}
          autoClose={true}
          whatsappNumbers={[
            { 
              number: '+919876543210', 
              label: 'Sales Team', 
              icon: '👔',
              description: 'For sales inquiries and pricing'
            },
            { 
              number: '+919876543211', 
              label: 'Support Team', 
              icon: '🛠️',
              description: 'For technical support'
            },
            { 
              number: '+919876543212', 
              label: 'General Inquiry', 
              icon: '💬',
              description: 'For general questions'
            }
          ]}
          phoneNumbers={[
            { 
              number: '+919876543210', 
              label: 'Sales Team', 
              icon: '📞',
              description: 'Mon-Fri, 9AM-6PM'
            },
            { 
              number: '+919876543211', 
              label: 'Support Team', 
              icon: '🔧',
              description: '24/7 support available'
            }
          ]}
          emailAddress="contact@vertexglobaltech.com"
          emailSubject="Inquiry from Website Visitor"
          whatsappMessage="Hello Vertex Global Tech! I am interested in your services and would like to know more information. Please contact me at your earliest convenience."
        />

        {/* Option 2: Use both components with different positions */}
        {/*
        <FloatingActions
          position="left"
          whatsappNumber="919876543210"
          whatsappMessage="Hi%20Vertex%20Global%20Tech!%20I%20am%20interested%20in%20your%20services."
        />
        
        <FloatingActions
          position="right"
          floatingButtonSize="medium"
          darkMode={false}
          zIndex={999998}
          enablePulse={true}
          showCallButton={true}
          showEmailButton={true}
          whatsappNumbers={[
            { number: '+919876543210', label: 'Support', icon: '🛠️' }
          ]}
          phoneNumbers={[
            { number: '+919876543210', label: 'Call Us', icon: '📞' }
          ]}
        />
        */}
      </div>
    </BrowserRouter>
  )
}