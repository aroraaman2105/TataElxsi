import { motion } from 'framer-motion';
import { usePersona } from '../context/PersonaContext';

export default function PersonaBanner() {
  const { personaConfig } = usePersona();
  if (!personaConfig) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      style={{
        borderLeftWidth: 3,
        borderLeftColor: personaConfig.accent,
      }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
          Active workspace
        </p>
        <p className="text-sm sm:text-base font-semibold text-white">{personaConfig.title}</p>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{personaConfig.tagline}</p>
      </div>
      <div
        className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-medium border"
        style={{
          color: personaConfig.accent,
          background: personaConfig.accentDim,
          borderColor: `${personaConfig.accent}35`,
        }}
      >
        Role-based view
      </div>
    </motion.div>
  );
}
