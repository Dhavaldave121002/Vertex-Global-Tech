// src/App.jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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

import LogoPreloader from './components/UI/LogoPreloader'
import CookieConsent from './components/UI/CookieConsent'
import BackToTop from './components/UI/BackToTop'

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

const Portfolio = lazy(() => import('./pages/Portfolio'))
const Blog = lazy(() => import('./pages/Blog'))
const Maintenance = lazy(() => import('./pages/services/Maintenance'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))

/* Admin Suite (Next-Level) */
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminVerify = lazy(() => import('./pages/admin/AdminVerify'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const PricingManager = lazy(() => import('./pages/admin/PricingManager'))
const PortfolioManager = lazy(() => import('./pages/admin/PortfolioManager'))
const ReferralManager = lazy(() => import('./pages/admin/ReferralManager'))
const LeadManager = lazy(() => import('./pages/admin/LeadManager'))
const BrandManager = lazy(() => import('./pages/admin/BrandManager'))
const UserManager = lazy(() => import('./pages/admin/UserManager'))
const CareerManager = lazy(() => import('./pages/admin/CareerManager'))

import ScrollToTop from './components/UI/ScrollToTop'

export default function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading or wait for resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds preloader display
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main id="main" className="flex-grow-1">
          <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-[#030712]">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Services direct routes */}
              <Route path="/services/informative" element={<Informative />} />
              <Route path="/services/dynamic" element={<Dynamic />} />
              <Route path="/services/ecommerce" element={<Ecommerce />} />

              <Route path="/services/application" element={<Application />} />
              <Route path="/services/uiux" element={<UIUX />} />
              <Route path="/services/maintenance" element={<Maintenance />} />

              {/* Pricing direct routes */}
              <Route path="/pricing/website" element={<WebsitePricing />} />
              <Route path="/pricing/application" element={<ApplicationPricing />} />
              <Route path="/pricing/uiux" element={<UIUXPricing />} />

              {/* Other */}

              <Route path="/career" element={<Career />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />

              {/* Legal */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />

              {/* Admin Suite Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/verify" element={<AdminVerify />} />
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="pricing" element={<PricingManager />} />
                <Route path="portfolio" element={<PortfolioManager />} />
                <Route path="referrals" element={<ReferralManager />} />
                <Route path="leads" element={<LeadManager />} />
                <Route path="brands" element={<BrandManager />} />
                <Route path="users" element={<UserManager />} />
                <Route path="career" element={<CareerManager />} />
              </Route>

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <FloatingActions
          position="right"
          floatingButtonSize="medium"
          darkMode={true}
          zIndex={40}
          enablePulse={true}
          showCallButton={true}
          showEmailButton={true}
          enableRipple={true}
          showBadgeCount={false}
          autoClose={false}
          whatsappNumbers={[
            {
              number: '+919876543210',
              label: 'Sales Enquiry',
              icon: 'bi-whatsapp',
              description: 'Chat for new projects'
            },
            {
              number: '+919876543211',
              label: 'Technical Support',
              icon: 'bi-gear',
              description: 'Chat for existing projects'
            }
          ]}
          phoneNumbers={[
            {
              number: '+919876543210',
              label: 'Sales Department',
              icon: 'bi-telephone',
              description: 'Speak to sales'
            },
            {
              number: '+919876543211',
              label: 'Customer Care',
              icon: 'bi-headset',
              description: 'Get support'
            }
          ]}
        />
        <CookieConsent />
        <BackToTop />
      </div>

      <AnimatePresence>
        {loading && <LogoPreloader />}
      </AnimatePresence>
    </BrowserRouter>
  )
}