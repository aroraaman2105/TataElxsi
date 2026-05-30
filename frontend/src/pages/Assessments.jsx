import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

export default function Assessments() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Assessments</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Manage and run autism screening assessments</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass-card p-6 rounded-xl interactive-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary-muted)] border border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))] flex items-center justify-center">
              <span className="text-[var(--accent-primary)] text-xl font-bold">M</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--app-text-primary)]">M-CHAT-R</h3>
              <p className="text-sm text-[var(--app-text-muted)]">Modified Checklist for Autism in Toddlers</p>
            </div>
          </div>
          <p className="text-[var(--app-text-muted)] text-sm mb-4">Quick screening for toddlers 16–30 months.</p>
          <Button className="w-full">Start assessment</Button>
        </div>

        <div className="glass-card p-6 rounded-xl interactive-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--accent-secondary)_12%,var(--app-surface))] border border-[color-mix(in_srgb,var(--accent-secondary)_22%,var(--app-border))] flex items-center justify-center">
              <span className="text-[var(--accent-secondary)] text-xl font-bold">C</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--app-text-primary)]">CARS-2</h3>
              <p className="text-sm text-[var(--app-text-muted)]">Childhood Autism Rating Scale</p>
            </div>
          </div>
          <p className="text-[var(--app-text-muted)] text-sm mb-4">Structured observation for diagnosis support.</p>
          <Button variant="secondary" className="w-full">
            Start assessment
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 rounded-xl overflow-hidden"
      >
        <h3 className="text-lg font-semibold text-[var(--app-text-primary)] mb-4">Recent assessments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[var(--app-text-muted)] border-b border-[var(--app-border)]">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-[var(--app-text-secondary)]">
              <tr className="border-b border-[var(--app-border)]">
                <td className="py-3">Child A</td>
                <td className="py-3">M-CHAT-R</td>
                <td className="py-3">Mar 15, 2025</td>
                <td className="py-3">
                  <span className="status-pill status-pill-success">Completed</span>
                </td>
              </tr>
              <tr className="border-b border-[var(--app-border)]">
                <td className="py-3">Child B</td>
                <td className="py-3">CARS-2</td>
                <td className="py-3">Mar 14, 2025</td>
                <td className="py-3">
                  <span className="status-pill status-pill-info">In progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
