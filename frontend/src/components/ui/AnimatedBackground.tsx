import { motion } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-container">
      {/* Moving Gradient Orbs with enhanced animations */}
      <motion.div 
        className="bg-blob blob-1"
        animate={{
          x: [0, 150, -100, 50, 0],
          y: [0, -80, 120, -50, 0],
          scale: [1, 1.3, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="bg-blob blob-2"
        animate={{
          x: [0, -120, 80, -40, 0],
          y: [0, 100, -60, 80, 0],
          scale: [1, 1.2, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
       <motion.div 
        className="bg-blob blob-3"
        animate={{
          x: [0, 80, -120, 60, 0],
          y: [0, -60, 90, -40, 0],
          scale: [1, 0.85, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="bg-blob blob-4"
        animate={{
          x: [0, -90, 110, -50, 0],
          y: [0, 70, -80, 60, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Grid Overlay */}
      <div className="bg-grid-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;

