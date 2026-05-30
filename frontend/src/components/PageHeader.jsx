import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">{title}</h1>
      {subtitle && <p className="text-[var(--app-text-muted)] mt-1">{subtitle}</p>}
    </motion.div>
  );
}
