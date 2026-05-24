import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo, navItems, isNavActive } from './Sidebar';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-16 lg:h-20 border-b border-white/10 bg-[#0b0f14]/70 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30"
    >
      <div className="flex items-center gap-4 min-w-0 h-full">
        <motion.button
          type="button"
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onMenuClick}
          whileTap={{ scale: 0.92 }}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
        
        <div className="flex-shrink-0 flex items-center">
          <BrandLogo />
        </div>
      </div>

      {/* Horizontal tabs for desktop */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full mx-6">
        {navItems.map((item) => {
          const active = isNavActive(location.pathname, item);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.to)}
              className={`relative px-3 xl:px-4 h-full flex items-center text-sm font-medium transition-all duration-200 ${
                active
                  ? 'text-[#00ffcc] bg-white/5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {item.label}
              {active && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] shadow-[0_0_8px_#00ffcc]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <motion.div
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ borderColor: 'rgba(0,255,204,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
          <span className="text-xs text-slate-400 hidden xs:inline">Live</span>
        </motion.div>
        <motion.button
          type="button"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff9ecd]" />
        </motion.button>
        <motion.div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#00ffcc]/40 to-neon-blue/30 border border-[#00ffcc]/40 flex items-center justify-center text-[#00ffcc] font-semibold text-sm shadow-glowGreen cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          U
        </motion.div>
      </div>
    </motion.header>
  );
}
