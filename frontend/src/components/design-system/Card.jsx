import { motion } from 'framer-motion';

const glassStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
};

export default function Card({
  children,
  className = '',
  padding = true,
  glow = false,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -3,
        borderColor: 'rgba(0, 255, 204, 0.22)',
        boxShadow:
          '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 28px rgba(0, 255, 204, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.995 }}
      className={`rounded-xl backdrop-blur-md overflow-hidden interactive-lift glow-border ${
        glow ? 'is-active shadow-glowGreen' : ''
      } ${padding ? 'p-5' : ''} ${className}`}
      style={glassStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
}
