import { motion } from 'framer-motion';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';

export default function DigitalTwinPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Digital Twin</h1>
        <p className="text-[var(--app-text-muted)] mt-1">
          A living model of developmental domains, updated from screening and therapy data
        </p>
      </motion.div>
      <DigitalDevelopmentalTwin />
    </div>
  );
}
