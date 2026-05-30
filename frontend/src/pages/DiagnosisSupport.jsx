import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const domains = [
  { name: 'Social communication', score: 62, note: 'Below expected for age 3y' },
  { name: 'Restricted/repetitive behaviors', score: 45, note: 'Mild elevation' },
  { name: 'Sensory processing', score: 58, note: 'Monitor in follow-up' },
];

export default function DiagnosisSupport() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Diagnosis Support"
        subtitle="Structured clinical decision support — not a final diagnosis"
      />
      <div className="grid gap-4">
        {domains.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5 rounded-xl"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-medium text-[var(--app-text-primary)]">{d.name}</h3>
              <span className="text-[#00d4ff] font-semibold tabular-nums">{d.score}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
              <div className="h-full bg-[#00d4ff]/70 rounded-full" style={{ width: `${d.score}%` }} />
            </div>
            <p className="text-sm text-[var(--app-text-muted)]">{d.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
