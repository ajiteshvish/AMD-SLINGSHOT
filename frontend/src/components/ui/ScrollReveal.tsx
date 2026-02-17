import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

const ScrollReveal = ({ children, width = "100%", delay = 0 }: ScrollRevealProps) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
