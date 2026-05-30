import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo, isNavActive } from './Sidebar';
import { usePersona } from '../context/PersonaContext';
import { getNavItemsForPersona } from '../config/personas';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { persona, personaConfig, clearPersona } = usePersona();
  const navItems = getNavItemsForPersona(persona);

  const handleSwitchRole = () => {
    clearPersona();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-16 lg:h-20 border-b border-[var(--app-border)] bg-[var(--app-nav-bg)] backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30 transition-colors duration-300"
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

        {personaConfig && (
          <div
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-medium ml-1"
            style={{
              borderColor: `${personaConfig.accent}35`,
              background: personaConfig.accentDim,
              color: personaConfig.accent,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: personaConfig.accent }}
            />
            {personaConfig.shortLabel}
          </div>
        )}
      </div>

      <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full mx-4 xl:mx-6 overflow-x-auto">
        {navItems.map((item) => {
          const active = isNavActive(location.pathname, item);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.to)}
              className={`relative px-3 xl:px-4 h-full flex items-center text-sm font-medium rounded-lg whitespace-nowrap ${
                active ? 'nav-tab-active' : 'nav-tab'
              }`}
            >
              {item.label}
              {active && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 left-0 right-0 h-0.5 nav-tab-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <motion.button
          type="button"
          onClick={handleSwitchRole}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
          whileTap={{ scale: 0.96 }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Switch role
        </motion.button>

        <motion.div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)]">
          <span className="w-2 h-2 rounded-full status-live-dot animate-pulse" />
          <span className="text-xs text-slate-400 hidden xs:inline">Live</span>
        </motion.div>

        <motion.div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-sm shadow-glowGreen cursor-default border"
          style={
            personaConfig
              ? {
                  color: personaConfig.accent,
                  borderColor: `${personaConfig.accent}50`,
                  background: personaConfig.accentDim,
                }
              : {
                  color: '#00ffcc',
                  borderColor: 'rgba(0,255,204,0.4)',
                  background: 'linear-gradient(135deg, rgba(0,255,204,0.4), rgba(0,212,255,0.3))',
                }
          }
          title={personaConfig?.title}
        >
          {personaConfig?.shortLabel?.charAt(0) ?? 'U'}
        </motion.div>
      </div>
    </motion.header>
  );
}
