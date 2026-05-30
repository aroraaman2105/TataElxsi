import { motion } from 'framer-motion';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';

export default function AITriageReport() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">AI Triage Report</h1>
        <p className="text-[var(--app-text-muted)] mt-1">
          Plain-language summary of screening signals and recommended next steps
        </p>
      </motion.div>
      <ExplainableAIPanel />
    </div>
  );
}
