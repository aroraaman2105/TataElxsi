import { useNavigate, useLocation } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { getNavSections, isNavActive } from '../config/routes';

export function BrandLogo({ onClose }) {
  const navigate = useNavigate();
  const { personaConfig } = usePersona();

  return (
    <button
      type="button"
      onClick={() => {
        onClose?.();
        navigate('/');
      }}
      className="flex items-center gap-3 group w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffcc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
      aria-label="TELIPORT AI home"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ffcc]/25 to-neon-blue/20 flex items-center justify-center border border-[#00ffcc]/35 shadow-glowGreen group-hover:scale-105 transition-transform">
        <span className="text-[#00ffcc] font-bold text-lg font-mono">T</span>
      </div>
      <div>
        <span className="font-semibold text-white text-lg tracking-tight group-hover:text-[#00ffcc] transition-colors block">
          TELIPORT AI
        </span>
        <span className="text-xs text-slate-500 block">
          {personaConfig ? personaConfig.shortLabel : 'Autism Platform'}
        </span>
      </div>
    </button>
  );
}

export { isNavActive };

function SidebarNavItem({ item, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = isNavActive(location.pathname, item);

  return (
    <button
      type="button"
      onClick={() => {
        onClose?.();
        navigate(item.to);
      }}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 text-left border ${
        active
          ? 'sidebar-nav-active'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/8 border-transparent'
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[var(--accent-primary)]" />
      )}
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
      </svg>
      <span className="font-medium text-sm">{item.label}</span>
    </button>
  );
}

export default function Sidebar({ mobileOpen = false, onClose }) {
  const { persona, personaConfig, clearPersona } = usePersona();
  const navigate = useNavigate();
  const { main: mainNav, shared: sharedNav } = getNavSections(persona);

  const handleSwitchRole = () => {
    onClose?.();
    clearPersona();
    navigate('/');
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0
        border-r border-[var(--app-border)] bg-[var(--app-nav-bg)] backdrop-blur-xl flex flex-col
        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-5 sm:p-6 border-b border-white/10">
        <BrandLogo onClose={onClose} />
      </div>

      {personaConfig && (
        <div className="px-4 pt-4">
          <div
            className="px-3 py-2 rounded-lg border text-xs font-semibold"
            style={{
              borderColor: `${personaConfig.accent}30`,
              background: personaConfig.accentDim,
              color: personaConfig.accent,
            }}
          >
            {personaConfig.title}
          </div>
        </div>
      )}

      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {mainNav.map((item) => (
          <SidebarNavItem key={item.to} item={item} onClose={onClose} />
        ))}

        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Shared
          </p>
        </div>
        {sharedNav.map((item) => (
          <SidebarNavItem key={item.to} item={item} onClose={onClose} />
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleSwitchRole}
          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/8 border border-transparent hover:border-white/10 transition-colors"
        >
          Switch role
        </button>
      </div>
    </aside>
  );
}
