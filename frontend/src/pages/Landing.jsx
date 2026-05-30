import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { PERSONA_LIST } from '../config/personas';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function RoleCard({ persona, onSelect }) {
  return (
    <motion.button
      type="button"
      variants={cardVariant}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(persona.id)}
      className="group relative w-full text-left rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffcc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] transition-shadow duration-300 hover:border-white/15 hover:shadow-[0_8px_32px_rgba(0,255,204,0.06)]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 0% 0%, ${persona.accentDim}, transparent 65%)`,
        }}
      />

      <div className="relative p-4 sm:p-5 flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
          style={{
            background: persona.accentDim,
            borderColor: `${persona.accent}35`,
          }}
        >
          <svg
            className="w-5 h-5"
            style={{ color: persona.accent }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={persona.icon} />
          </svg>
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">{persona.title}</h2>
            <svg
              className="w-4 h-4 flex-shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5"
              style={{ color: 'inherit' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-xs text-slate-500 mb-1">{persona.cardWho}</p>
          <p className="text-sm text-slate-400 leading-snug">{persona.cardDoes}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { setPersona, isAuthenticated, personaConfig } = usePersona();

  const handleSelectRole = (personaId) => {
    setPersona(personaId);
    navigate('/dashboard');
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-200 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[20%] w-[50vw] max-w-2xl h-[50vw] rounded-full bg-[#00ffcc]/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] max-w-xl h-[40vw] rounded-full bg-[#00d4ff]/[0.05] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-[#0b0f14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ffcc]/25 to-[#00d4ff]/20 border border-[#00ffcc]/35 flex items-center justify-center shadow-glowGreen">
              <span className="text-[#00ffcc] font-bold text-lg font-mono">T</span>
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight block leading-tight">TELIPORT AI</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Clinical Platform</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
              <span className="text-xs text-slate-400 hidden sm:inline">Secure · HIPAA-ready demo</span>
            </div>
            {isAuthenticated && personaConfig && (
              <motion.button
                type="button"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleContinue}
                className="ml-2 sm:ml-4 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  color: personaConfig.accent,
                  borderColor: `${personaConfig.accent}40`,
                  background: personaConfig.accentDim,
                }}
              >
                Continue as {personaConfig.shortLabel}
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            WELCOME TO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#00d4ff]">
              TELIPORT AI
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            AI-Powered Autism Screening and Continuous Care Ecosystem
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {PERSONA_LIST.map((persona) => (
            <RoleCard key={persona.id} persona={persona} onSelect={handleSelectRole} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-600 mt-8"
        >
          Pick a role to continue · No login required
        </motion.p>
      </main>
    </div>
  );
}
