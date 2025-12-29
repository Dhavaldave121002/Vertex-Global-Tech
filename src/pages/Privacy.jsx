import React from 'react'
import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-400 font-medium">Last updated: December 28, 2025</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information
                when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
            </div>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">1. Collecting and Using Your Personal Data</h2>
              <p className="text-gray-400 mb-4">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3 className="text-xl font-bold text-white mb-2">Personal Data</h3>
              <p className="text-gray-400">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4">2. Security of Your Personal Data</h2>
              <p className="text-gray-400">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet,
                or method of electronic storage is 100% secure.
              </p>
            </section>

            <div className="text-gray-500 italic text-sm">
              [This is a placeholder for the full Privacy Policy content. In a real application, this should be comprehensive.]
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
