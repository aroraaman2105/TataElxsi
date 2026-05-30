import { motion } from 'framer-motion';
import { Card, ProgressBar } from '../components/design-system';

const PATIENTS = [
  { name: 'Emma L.', speech: 78, motor: 72, social: 65 },
  { name: 'James T.', speech: 62, motor: 80, social: 58 },
  { name: 'Ava S.', speech: 45, motor: 55, social: 42 },
];

export default function ProgressTracker() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Progress Tracker</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Domain-level progress across assigned patients</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PATIENTS.map((patient, i) => (
          <motion.div
            key={patient.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-6">
              <h2 className="font-semibold text-[var(--app-text-primary)] mb-4">{patient.name}</h2>
              <div className="space-y-4">
                {[
                  { label: 'Speech', value: patient.speech },
                  { label: 'Motor', value: patient.motor },
                  { label: 'Social', value: patient.social },
                ].map((domain) => (
                  <div key={domain.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--app-text-muted)]">{domain.label}</span>
                      <span className="text-[var(--app-text-primary)] font-medium">{domain.value}%</span>
                    </div>
                    <ProgressBar value={domain.value} />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
