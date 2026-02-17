import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Enhanced hover detection logic
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12, // slightly smaller offset for better centering
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "transparent",
      border: "2px solid var(--accent-primary)",
      mixBlendMode: "normal" as any,
    },
    hover: {
      x: mousePosition.x - 30, // Adjust for larger size
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "transparent",
      mixBlendMode: "difference" as any, // Invert colors for better visibility
    }
  };

  const centerDotVariants = {
    default: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      opacity: 0 // Fade out dot on hover
    }
  };

  return (
    <>
      <motion.div
        className="cursor-ring"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 250, // Higher stiffness for faster response
          damping: 20,   // Higher damping for less wobble "smoothness"
          mass: 0.5
        }}
      />
      <motion.div 
        className="cursor-dot"
        variants={centerDotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ duration: 0.1 }} // Fast fade
      />
    </>
  );
};

export default CustomCursor;
