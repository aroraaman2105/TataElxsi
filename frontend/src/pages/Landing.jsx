import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { PERSONA_LIST } from '../config/personas';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function RoleCard({ persona, onSelect }) {
  return (
    <motion.button
      type="button"
      variants={cardVariant}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(persona.id)}
      className="group relative w-full text-left rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] backdrop-blur-md overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-bg)] hover:border-[var(--app-border-strong)] hover:shadow-[0_12px_40px_rgba(0,255,204,0.08)] transition-all duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 0% 0%, ${persona.accentDim}, transparent 65%)`,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${persona.accent}55, transparent)` }}
      />

      <div className="relative p-6 sm:p-7">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4 transition-transform group-hover:scale-105"
          style={{
            background: persona.accentDim,
            borderColor: `${persona.accent}35`,
            boxShadow: `0 0 20px ${persona.accent}15`,
          }}
        >
          <svg
            className="w-6 h-6"
            style={{ color: persona.accent }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={persona.icon} />
          </svg>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-[var(--app-text-primary)] tracking-tight mb-3">{persona.title}</h2>

        <div className="space-y-2.5 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-semibold mb-0.5">Who uses it</p>
            <p className="text-[var(--app-text-secondary)]">{persona.cardWho}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-semibold mb-0.5">What you&apos;ll do</p>
            <p className="text-[var(--app-text-muted)] leading-snug">{persona.cardDoes}</p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[var(--app-border)] flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--app-text-muted)] group-hover:text-[var(--app-text-primary)] transition-colors">
            Enter workspace
          </span>
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all group-hover:translate-x-0.5"
            style={{ color: persona.accent, borderColor: `${persona.accent}35`, background: persona.accentDim }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
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

  const handleContinue = () => navigate('/dashboard');

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text-secondary)] overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[15%] w-[55vw] max-w-3xl h-[55vw] rounded-full bg-[#00ffcc]/[0.06] blur-[120px] ambient-orb-teal" />
        <div className="absolute bottom-[-10%] right-[5%] w-[45vw] max-w-2xl h-[45vw] rounded-full bg-[#00d4ff]/[0.05] blur-[100px] ambient-orb-blue" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <header className="relative z-10 border-b border-[var(--app-border)] bg-[var(--app-nav-bg)] backdrop-blur-xl shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ffcc]/25 to-[#00d4ff]/20 border border-[#00ffcc]/35 flex items-center justify-center shadow-glowGreen">
              <span className="text-[#00ffcc] font-bold text-lg font-mono">T</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--app-text-primary)] tracking-tight block leading-tight">TELIPORT AI</span>
              <span className="text-[10px] text-[var(--app-text-muted)] uppercase tracking-wider">Clinical Platform</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_8px_var(--accent-primary)]" />
              <span className="text-xs text-[var(--app-text-muted)] hidden sm:inline">Secure demo</span>
            </div>
            {isAuthenticated && personaConfig && (
              <motion.button
                type="button"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleContinue}
                className="ml-3 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-primary)]/25 bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            Select your role to continue
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--app-text-primary)] tracking-tight leading-[1.1] mb-4">
            WELCOME TO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
              TELIPORT AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--app-text-muted)] leading-relaxed">
            AI-Powered Autism Screening and Continuous Care Ecosystem
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {PERSONA_LIST.map((persona) => (
            <RoleCard key={persona.id} persona={persona} onSelect={handleSelectRole} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-center text-xs text-[var(--app-text-muted)] mt-10"
        >
          Demo environment · No password required · Your role is saved locally
        </motion.p>
      </main>
    </div>
  );
}
