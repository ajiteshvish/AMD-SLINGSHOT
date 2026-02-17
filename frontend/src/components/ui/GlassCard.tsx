import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
