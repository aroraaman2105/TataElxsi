import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const stats = [
  { label: 'Active patients', value: '12', color: '#a78bfa' },
  { label: 'Sessions this week', value: '28', color: '#00ffcc' },
  { label: 'Avg. engagement', value: '84%', color: '#00d4ff' },
];

export default function TherapistHome() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Your therapy caseload at a glance" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5 rounded-xl"
          >
            <p className="text-xs text-[var(--app-text-muted)] uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="glass-card p-5 rounded-xl">
        <h3 className="font-semibold text-[var(--app-text-primary)] mb-3">Today&apos;s focus</h3>
        <ul className="space-y-2 text-sm text-[var(--app-text-muted)]">
          <li>· Emma — speech therapy, 10:00 AM</li>
          <li>· Noah — motor skills, 2:30 PM</li>
          <li>· Review RL-adapted plan for Child C</li>
        </ul>
      </div>
    </div>
  );
}
