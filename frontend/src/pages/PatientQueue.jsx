import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const queue = [
  { name: 'Emma L.', age: '3y 2m', risk: 'Moderate', wait: '2 days', status: 'Awaiting review' },
  { name: 'Noah K.', age: '4y 1m', risk: 'Low', wait: '5 days', status: 'Screening complete' },
  { name: 'Sophia M.', age: '2y 8m', risk: 'Elevated', wait: '1 day', status: 'Priority' },
];

const riskColor = { Low: '#00ffcc', Moderate: '#fbbf24', Elevated: '#f87171', Priority: '#f87171' };

export default function PatientQueue() {
  return (
    <div className="space-y-6">
      <PageHeader title="Patient Queue" subtitle="Children awaiting clinical review" />
      <div className="space-y-3">
        {queue.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="theme-list-row flex flex-wrap items-center gap-4 py-4 px-4 rounded-lg"
          >
            <span className="font-medium text-[var(--app-text-primary)] w-28">{p.name}</span>
            <span className="text-sm text-[var(--app-text-muted)]">{p.age}</span>
            <span className="text-sm font-medium" style={{ color: riskColor[p.risk] || riskColor.Priority }}>
              {p.risk} risk
            </span>
            <span className="text-sm text-[var(--app-text-muted)]">Wait: {p.wait}</span>
            <span className="ml-auto text-sm text-[var(--app-text-muted)]">{p.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
