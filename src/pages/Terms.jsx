import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans text-gray-300">
      <SEO
        title="Terms of Service"
        description="Vertex Global Tech Terms of Service."
        type="article"
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-400 font-medium">Last updated: December 28, 2025</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                Please read these terms and conditions carefully before using Our Service. These are the Terms and Conditions governing
                the use of this Service and the agreement that operates between You and the Company.
              </p>
            </div>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acknowledgment</h2>
              <p className="text-gray-400">
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.
                These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">2. Links to Other Websites</h2>
              <p className="text-gray-400">
                Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
                The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">3. Termination</h2>
              <p className="text-gray-400">
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if You breach these Terms and Conditions.
              </p>
            </section>

            <div className="text-gray-500 italic text-sm">
              [This is a placeholder for the full Terms of Service content. In a real application, this should be comprehensive.]
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
