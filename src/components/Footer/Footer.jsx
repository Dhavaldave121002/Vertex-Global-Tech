import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/vglogo.jpg';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative bg-[#050b14] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16 border-b border-white/5 pb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div className="space-y-6 lg:border-r border-white/10 lg:pr-12" variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Vertex Global Tech"
                className="w-12 h-12 object-contain rounded-xl shadow-lg shadow-blue-900/10"
              />
              <span className="text-2xl font-bold text-white tracking-tight">Vertex Global Tech</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Pioneering digital transformation with enterprise-grade web solutions, immersive 3D experiences, and scalable cloud architectures. We build the future of digital interaction.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { icon: 'linkedin', url: 'https://linkedin.com' },
                { icon: 'twitter-x', url: 'https://twitter.com' },
                { icon: 'github', url: 'https://github.com' },
                { icon: 'instagram', url: 'https://instagram.com' }
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1"
                >
                  <i className={`bi bi-${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Column - Services */}
          <motion.div variants={itemVariants} className="lg:px-12 lg:border-r border-white/10 mt-12 lg:mt-0">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/services/application" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Web Applications</Link></li>
              <li><Link to="/services/uiux" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">UI/UX Design</Link></li>
              <li><Link to="/services/ecommerce" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">E-Commerce</Link></li>
              <li><Link to="/services/dynamic" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Dynamic Websites</Link></li>
              <li><Link to="/services/informative" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Informative Sites</Link></li>
              <li><Link to="/services/maintenance" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Maintenance & Support</Link></li>
              <li><Link to="/services/odoo" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Odoo Customization</Link></li>
            </ul>
          </motion.div>

          {/* Links Column - Company */}
          <motion.div variants={itemVariants} className="lg:pl-12 mt-12 lg:mt-0">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Portfolio</Link></li>
              <li><Link to="/career" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Careers</Link></li>
              <li><Link to="/referral" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Referral Program</Link></li>
              <li><Link to="/blog" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Blog & Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Contact Support</Link></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} Vertex Global Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;