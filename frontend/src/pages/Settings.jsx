import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings() {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Settings</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Configure your TELIPORT AI platform</p>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-2xl"
      >
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-[var(--app-text-primary)] mb-1">Appearance</h3>
          <p className="text-sm text-[var(--app-text-muted)] mb-5">
            Choose light or dark theme. Your choice is saved and applied across the app.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ThemeToggle />
            <p className="text-xs text-[var(--app-text-muted)]">
              Current: <span className="text-[var(--accent-primary)] font-medium capitalize">{theme}</span> mode
            </p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-[var(--app-text-primary)] mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--app-text-muted)] mb-1">Display name</label>
              <input
                type="text"
                defaultValue="Clinician"
                className="theme-input w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--app-text-muted)] mb-1">Email</label>
              <input
                type="email"
                defaultValue="user@teliport.ai"
                className="theme-input w-full px-4 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-[var(--app-text-primary)] mb-4">Notifications</h3>
          <div className="flex items-center justify-between py-2">
            <span className="text-[var(--app-text-secondary)]">Email notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="theme-toggle-track w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-[var(--app-border)]">
            <span className="text-[var(--app-text-secondary)]">Session reminders</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="theme-toggle-track w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-[var(--app-text-primary)] mb-4">API & Integrations</h3>
          <p className="text-[var(--app-text-muted)] text-sm mb-4">Connect external tools and access API keys.</p>
          <button type="button" className="theme-btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Manage API keys
          </button>
        </div>
      </motion.div>
    </div>
  );
}
