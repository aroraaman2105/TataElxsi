import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const darkVariants = {
  primary: {
    background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2) 0%, rgba(0, 212, 255, 0.12) 100%)',
    border: '1px solid rgba(0, 255, 204, 0.4)',
    color: '#00ffcc',
    boxShadow: '0 0 20px rgba(0, 255, 204, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
  primaryHover: {
    background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.3) 0%, rgba(0, 212, 255, 0.18) 100%)',
    border: '1px solid rgba(0, 255, 204, 0.55)',
    boxShadow: '0 0 28px rgba(0, 255, 204, 0.35), 0 0 56px rgba(0, 255, 204, 0.1)',
    scale: 1.03,
    y: -1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  primaryTap: { scale: 0.97, y: 0 },
  secondary: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#e2e8f0',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  secondaryHover: {
    background: 'rgba(255, 255, 255, 0.09)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    scale: 1.02,
    y: -1,
    transition: { duration: 0.2 },
  },
  secondaryTap: { scale: 0.98 },
  ghost: {
    background: 'transparent',
    border: '1px solid transparent',
    color: '#00ffcc',
  },
  ghostHover: {
    background: 'rgba(0, 255, 204, 0.1)',
    border: '1px solid rgba(0, 255, 204, 0.2)',
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  ghostTap: { scale: 0.98 },
};

const lightVariants = {
  primary: {
    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    border: '1px solid #1d4ed8',
    color: '#ffffff',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06), 0 4px 14px rgba(37, 99, 235, 0.28)',
  },
  primaryHover: {
    background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
    border: '1px solid #1e40af',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
    scale: 1.02,
    y: -1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  primaryTap: { scale: 0.98, y: 0 },
  secondary: {
    background: '#f1f5f9',
    border: '1px solid #e5e7eb',
    color: '#374151',
    boxShadow: 'none',
  },
  secondaryHover: {
    background: '#eef2f6',
    border: '1px solid #d1d5db',
    scale: 1.01,
    y: 0,
    transition: { duration: 0.2 },
  },
  secondaryTap: { scale: 0.99 },
  ghost: {
    background: 'transparent',
    border: '1px solid transparent',
    color: '#2563eb',
  },
  ghostHover: {
    background: '#dbeafe',
    border: '1px solid #bfdbfe',
    scale: 1.01,
    transition: { duration: 0.2 },
  },
  ghostTap: { scale: 0.99 },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const { theme } = useTheme();
  const variants = theme === 'light' ? lightVariants : darkVariants;
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const baseStyle = isPrimary ? variants.primary : isSecondary ? variants.secondary : variants.ghost;
  const hoverStyle = isPrimary ? variants.primaryHover : isSecondary ? variants.secondaryHover : variants.ghostHover;
  const tapStyle = isPrimary ? variants.primaryTap : isSecondary ? variants.secondaryTap : variants.ghostTap;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      initial={false}
      whileHover={disabled ? {} : hoverStyle}
      whileTap={disabled ? {} : tapStyle}
      className={`
        relative font-medium rounded-lg outline-none overflow-hidden btn-glow
        focus-visible:ring-2 focus-visible:ring-[#00ffcc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${sizeClasses[size]} ${className}
      `}
      style={baseStyle}
      {...props}
    >
      {isPrimary && !disabled && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
