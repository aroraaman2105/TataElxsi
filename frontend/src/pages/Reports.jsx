import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

const REPORTS = [
  { id: 1, title: 'Screening Summary — Emma L.', type: 'Triage', date: 'Mar 18, 2025', status: 'Ready' },
  { id: 2, title: 'Clinical Review — Noah K.', type: 'Clinical', date: 'Mar 17, 2025', status: 'Draft' },
  { id: 3, title: 'Therapy Progress — Sophia M.', type: 'Progress', date: 'Mar 15, 2025', status: 'Ready' },
  { id: 4, title: 'Monthly Caseload Overview', type: 'Analytics', date: 'Mar 1, 2025', status: 'Ready' },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Reports</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Clinical and progress reports for your caseload</p>
      </motion.div>

      <div className="glass-card p-6 rounded-xl">
        <ul className="space-y-3">
          {REPORTS.map((report, i) => (
            <motion.li
              key={report.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="theme-list-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl"
            >
              <div>
                <p className="font-medium text-[var(--app-text-primary)]">{report.title}</p>
                <p className="text-sm text-[var(--app-text-muted)]">
                  {report.type} · {report.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`status-pill ${report.status === 'Ready' ? 'status-pill-success' : 'status-pill-info'}`}>
                  {report.status}
                </span>
                <Button size="sm" variant="secondary">
                  Open
                </Button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
