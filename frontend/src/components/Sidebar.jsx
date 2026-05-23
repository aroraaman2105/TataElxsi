import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/dashboard/masim', label: 'MASIM Screening', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { to: '/dashboard/therapy', label: 'Therapy Planning', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { to: '/dashboard/assessments', label: 'Assessments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { to: '/dashboard/sessions', label: 'Sessions', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 flex-shrink-0 border-r border-white/10 bg-white/5 backdrop-blur-md flex flex-col"
    >
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ffcc]/20 to-neon-blue/20 flex items-center justify-center border border-[#00ffcc]/30 shadow-glowGreen group-hover:border-[#00ffcc]/50 transition-colors">
            <span className="text-[#00ffcc] font-bold text-lg font-mono">T</span>
          </div>
          <div>
            <h1 className="font-semibold text-white text-lg tracking-tight">TELIPORT AI</h1>
            <p className="text-xs text-slate-400">Autism Platform</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20 shadow-glow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3 rounded-lg border-neon-blue/20">
          <p className="text-xs text-slate-400">AI Assistant</p>
          <p className="text-sm text-neon-blue font-medium">Ready</p>
        </div>
      </div>
    </motion.aside>
  );
}
