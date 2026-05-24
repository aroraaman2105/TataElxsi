import { useNavigate, useLocation } from 'react-router-dom';

export function BrandLogo({ onClose }) {
  const navigate = useNavigate();

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
        <span className="text-xs text-slate-500 block">Autism Platform</span>
      </div>
    </button>
  );
}

export const navItems = [
  { to: '/dashboard', label: 'Dashboard', end: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/dashboard/masim', label: 'MASIM Screening', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { to: '/dashboard/therapy', label: 'Therapy Planning', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { to: '/dashboard/parent', label: 'Parent Dashboard', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { to: '/dashboard/agents', label: 'Agentic AI', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { to: '/dashboard/assessments', label: 'Assessments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { to: '/dashboard/sessions', label: 'Sessions', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export function isNavActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

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
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 text-left ${
        active
          ? 'bg-[#00ffcc]/12 text-[#00ffcc] border border-[#00ffcc]/25 shadow-glowGreen'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/8 border border-transparent'
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#00ffcc] shadow-[0_0_12px_#00ffcc]" />
      )}
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
      </svg>
      <span className="font-medium text-sm">{item.label}</span>
    </button>
  );
}

export default function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0
        border-r border-white/10 bg-[#0b0f14]/95 backdrop-blur-xl flex flex-col
        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-5 sm:p-6 border-b border-white/10">
        <BrandLogo onClose={onClose} />
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarNavItem key={item.label} item={item} onClose={onClose} />
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3 rounded-xl border border-[#00d4ff]/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
            <p className="text-xs text-slate-500">AI Assistant</p>
          </div>
          <p className="text-sm text-neon-blue font-medium mt-1">Ready for demo</p>
        </div>
      </div>
    </aside>
  );
}
