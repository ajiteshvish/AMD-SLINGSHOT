import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="dotted-pattern"></div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]"
          />
        </div>

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="container relative z-20 mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-blue-200">New Version Of Trustora Is Out!</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-tight max-w-5xl"
          >
            Unlock The Power Of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Trust Intelligence
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light"
          >
            Comprehensive AI solutions for seller verification and risk assessment. Revolutionize how you evaluate trust in online marketplaces without compromising privacy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/register" className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Get Started
            </Link>
            <Link to="/dashboard" className="px-8 py-4 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              View Dashboard
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex items-center gap-4 text-sm text-gray-400"
          >
            <div className="flex gap-1 text-yellow-500 text-lg">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span>4.8/5.0 Based On 4,563 Reviews • GDPR Compliant</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide"
            >
              Enterprise-Grade Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mt-6 mb-6 tracking-tight"
            >
              Real Results from <br/>Trust Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-400"
            >
              Success stories from organizations that have embraced AI-powered trust verification to transform their operations and achieve remarkable outcomes.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1 (Large spans 2 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 relative group rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-end transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-8 top-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                🛡️
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 relative z-10">AI Trust Scoring</h3>
              <p className="text-gray-400 max-w-md relative z-10">Multi-dimensional analysis of seller reliability with real-time risk assessment driven by deep learning models.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-end transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="absolute right-8 top-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                📊
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Live Monitoring</h3>
              <p className="text-gray-400">Track seller performance and detect anomalies instantly.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-end transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="absolute right-8 top-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                ⚠️
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Fraud Detection</h3>
              <p className="text-gray-400">Get notified about suspicious behavior and fraud patterns.</p>
            </motion.div>

            {/* Feature 4 (Large spans 2 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 relative group rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-end transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-8 top-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                🔍
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 relative z-10">Deep Analytics</h3>
              <p className="text-gray-400 max-w-md relative z-10">Comprehensive insights into seller metrics, trends, and historical performance with beautiful data visualization.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Get Free Trust Intelligence Workflow</h2>
            <p>In our weekly newsletter.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Trustora</h3>
              <p>AI-powered trust intelligence for online marketplaces</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/register">Get Started</Link>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Trustora. All Rights Reserved.</p>
            <div className="footer-legal">
              <Link to="/">Terms and conditions</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
