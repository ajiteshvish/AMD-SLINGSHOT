
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="features-section container" id="features">
      <div className="features-intro">
        <motion.div 
          className="section-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✨ Features
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Comprehensive <span className="text-gradient">AI Technology</span> Solutions<br/>for Modern Business Challenges
        </motion.h2>
        <motion.p 
          className="section-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI technologies to deliver powerful, scalable solutions that address your
          specific business needs and drive measurable results.
        </motion.p>
      </div>

      <motion.div 
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <GlassCard className="feature-card large-card">
            <div className="globe-graphic">
               {/* Abstract globe placeholder */}
               <div className="globe-wireframe"></div>
            </div>
            <div className="card-content">
              <h3>Top-level performance</h3>
              <p>Transform worldwide raw data into clear insights with AI analytics that reveal patterns and drive smarter decisions.</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="feature-card">
            <div className="card-content">
              <h3>Smarter Analytics</h3>
              <p>Accelerate your decision-making with AI tools that convert complex data into actionable intelligence — 40% faster.</p>
              <div className="visual-element-1">
                 <div className="floating-badge">40% Faster +</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="feature-card">
            <div className="card-content">
              <h3>Connected Intelligence</h3>
              <p>Leverage AI-powered analytics that integrate across platforms, identify key trends, and unlock better business outcomes.</p>
               <div className="visual-element-icons">
                 <span className="icon-circle">🍎</span>
                 <span className="icon-circle">+</span>
                 <span className="icon-circle">DE</span>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;

