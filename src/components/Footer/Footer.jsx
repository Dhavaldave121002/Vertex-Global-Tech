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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Vertex Global Tech"
                className="w-10 h-10 object-contain rounded-lg shadow-lg"
              />
              <span className="text-xl font-bold text-white">Vertex Global Tech</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering digital transformation with enterprise-grade web solutions, 3D experiences, and scalable architectures.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <i className="bi bi-linkedin text-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <i className="bi bi-twitter-x text-lg"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <i className="bi bi-github text-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <i className="bi bi-instagram text-lg"></i>
              </a>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services/application" className="hover:text-blue-400 transition-colors">Web Applications</Link></li>
              <li><Link to="/services/uiux" className="hover:text-blue-400 transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services/ecommerce" className="hover:text-blue-400 transition-colors">E-Commerce</Link></li>
              <li><Link to="/services/maintenance" className="hover:text-blue-400 transition-colors">Maintenance</Link></li>
            </ul>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/career" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/referral" className="hover:text-blue-400 transition-colors">Referral Program</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest tech insights.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20">
                Subscribe
              </button>
            </form>
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