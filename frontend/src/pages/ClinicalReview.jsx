import { motion } from 'framer-motion';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';

export default function ClinicalReview() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Clinical Review</h1>
        <p className="text-[var(--app-text-muted)] mt-1">
          Validate AI evidence, screening data, and clinical decision support
        </p>
      </motion.div>
      <ExplainableAIPanel />
    </div>
  );
}
