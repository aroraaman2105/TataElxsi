import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

const sessions = [
  { id: 1, patient: 'Child A', type: 'Screening', date: 'Mar 17, 2025', duration: '25 min', status: 'Completed' },
  { id: 2, patient: 'Child B', type: 'Therapy', date: 'Mar 16, 2025', duration: '45 min', status: 'Completed' },
  { id: 3, patient: 'Child C', type: 'Screening', date: 'Mar 15, 2025', duration: '—', status: 'Scheduled' },
];

function StatusPill({ status }) {
  const isCompleted = status === 'Completed';
  return (
    <span
      className={
        isCompleted
          ? 'status-pill status-pill-success'
          : 'status-pill status-pill-info'
      }
    >
      {status}
    </span>
  );
}

export default function Sessions() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Sessions</h1>
        <p className="text-[var(--app-text-muted)] mt-1">View and manage therapy and screening sessions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="search"
            placeholder="Search sessions..."
            className="theme-input px-4 py-2.5 rounded-lg placeholder:text-[var(--app-text-muted)] w-full sm:max-w-xs text-sm"
          />
          <Button size="md" className="whitespace-nowrap shrink-0">
            New session
          </Button>
        </div>

        <ul className="space-y-3">
          {sessions.map((session, i) => (
            <motion.li
              key={session.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="theme-list-row flex flex-wrap items-center gap-x-4 gap-y-2 py-4 px-4 rounded-lg"
            >
              <span className="font-medium text-[var(--app-text-primary)] w-24">{session.patient}</span>
              <span className="text-[var(--app-text-muted)] text-sm">{session.type}</span>
              <span className="text-[var(--app-text-muted)] text-sm">{session.date}</span>
              <span className="text-[var(--app-text-muted)] text-sm">{session.duration}</span>
              <span className="ml-auto">
                <StatusPill status={session.status} />
              </span>
              <button
                type="button"
                className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors"
              >
                View
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
