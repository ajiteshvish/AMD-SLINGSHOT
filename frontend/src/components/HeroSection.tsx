
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      
      <div className="hero-content container">
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ New Version Of Launch UI Is Out!
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Unlock The Power Of <span className="text-gradient">Artificial<br />
          Intelligence</span> To Automate Processes
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Comprehensive AI solutions for businesses and individuals, from machine learning models
          to intelligent automation systems that revolutionize how you work.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn btn-glow">Get Started</button>
          <button className="btn btn-secondary">Get a demo</button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

