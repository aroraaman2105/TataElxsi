import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

const PATIENTS = [
  { id: 1, name: 'Emma L.', age: '4y', plan: 'Speech + Motor', sessions: 12, next: 'Mon 10:00' },
  { id: 2, name: 'James T.', age: '5y', plan: 'Social skills', sessions: 8, next: 'Tue 14:30' },
  { id: 3, name: 'Ava S.', age: '3y', plan: 'Early intervention', sessions: 5, next: 'Wed 09:00' },
];

export default function AssignedPatients() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Assigned Patients</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Your active caseload and upcoming sessions</p>
      </motion.div>

      <div className="glass-card p-6 rounded-xl">
        <ul className="space-y-3">
          {PATIENTS.map((patient, i) => (
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
                  {patient.age} · {patient.plan} · {patient.sessions} sessions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--app-text-muted)]">Next: {patient.next}</span>
                <Button size="sm">View plan</Button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
