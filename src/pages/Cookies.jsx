import React from 'react'
import { motion } from 'framer-motion'

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cookie Policy</h1>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-400 font-medium">Last updated: December 28, 2025</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                This Cookie Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use,
                or the information We collect using Cookies and how that information is used.
              </p>
            </div>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">1. Interpretation and Definitions</h2>
              <p className="text-gray-400">
                The words of which the initial letter is capitalized have meanings defined under the following conditions.
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-6">2. The Use of the Cookies</h2>
              <p className="text-gray-400 mb-6">
                We use Cookies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts
                to collect and track information and to improve and analyze Our Service.
              </p>

              <h3 className="text-xl font-bold text-white mb-4">Type of Cookies We Use</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5"></span>
                  <div>
                    <strong className="text-white block">Necessary / Essential Cookies</strong>
                    <span className="text-sm text-gray-400">Type: Session Cookies. Administered by: Us. Purpose: These Cookies are essential to provide You with services available through the Website.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-2.5"></span>
                  <div>
                    <strong className="text-white block">Functionality Cookies</strong>
                    <span className="text-sm text-gray-400">Type: Persistent Cookies. Administered by: Us. Purpose: These Cookies allow us to remember choices You make when You use the Website.</span>
                  </div>
                </li>
              </ul>
            </section>

            <div className="text-gray-500 italic text-sm">
              [This is a placeholder for the full Cookie Policy content.]
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
