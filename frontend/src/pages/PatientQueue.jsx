import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

const QUEUE = [
  { id: 1, name: 'Emma L.', age: '4y', risk: 'Medium', wait: '12 min', reason: 'Follow-up screening' },
  { id: 2, name: 'Noah K.', age: '3y', risk: 'High', wait: '28 min', reason: 'New referral' },
  { id: 3, name: 'Sophia M.', age: '5y', risk: 'Low', wait: '45 min', reason: 'Therapy review' },
  { id: 4, name: 'Liam R.', age: '6y', risk: 'Medium', wait: '1h 05m', reason: 'Diagnostic consult' },
];

function RiskPill({ risk }) {
  const styles = {
    Low: 'status-pill-success',
    Medium: 'status-pill-info',
    High: 'status-pill-warning',
  };
  return <span className={`status-pill ${styles[risk] ?? 'status-pill-info'}`}>{risk}</span>;
}

export default function PatientQueue() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Patient Queue</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Patients waiting for clinical review today</p>
      </motion.div>

      <div className="glass-card p-6 rounded-xl">
        <ul className="space-y-3">
          {QUEUE.map((patient, i) => (
            <motion.li
              key={patient.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="theme-list-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl"
            >
              <div>
                <p className="font-medium text-[var(--app-text-primary)]">{patient.name}</p>
                <p className="text-sm text-[var(--app-text-muted)]">
                  {patient.age} · {patient.reason}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RiskPill risk={patient.risk} />
                <span className="text-sm text-[var(--app-text-muted)]">{patient.wait}</span>
                <Button size="sm">Review</Button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
