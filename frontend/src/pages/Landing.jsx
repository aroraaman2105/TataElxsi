import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionLink = motion(Link);

const ctaStyle = {
  background: 'rgba(0, 255, 204, 0.15)',
  border: '1px solid rgba(0, 255, 204, 0.35)',
  color: '#00ffcc',
  boxShadow: '0 0 16px rgba(0, 255, 204, 0.15)',
};
const ctaHover = {
  background: 'rgba(0, 255, 204, 0.25)',
  border: '1px solid rgba(0, 255, 204, 0.5)',
  boxShadow: '0 0 24px rgba(0, 255, 204, 0.25), 0 0 48px rgba(0, 255, 204, 0.1)',
  scale: 1.02,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const problems = [
  {
    title: 'Delayed diagnosis',
    desc: 'Average wait times leave critical developmental windows under-addressed when early intervention matters most.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Subjective screening',
    desc: 'Traditional tools depend heavily on observer variance—reducing consistency across clinics and caregivers.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'Fragmented care',
    desc: 'Assessment, therapy, and progress tracking often live in silos—making continuity of care hard to sustain.',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
];

const solutions = [
  {
    name: 'MASIM',
    tag: 'Multimodal AI',
    desc: 'Fuses speech, gaze, motor, and behavioral signals for richer, objective screening—not a single questionnaire in isolation.',
    accent: 'from-[#00ffcc]/20 to-cyan-500/10',
  },
  {
    name: 'Digital Twin',
    tag: 'Personalized model',
    desc: 'A living profile of developmental trajectory that evolves with each session—so care stays aligned to the individual.',
    accent: 'from-neon-blue/20 to-[#00ffcc]/10',
  },
  {
    name: 'RL Therapy',
    tag: 'Adaptive care',
    desc: 'Reinforcement-learning–guided therapy paths that adapt difficulty and pacing in real time for continuous improvement.',
    accent: 'from-violet-500/20 to-neon-blue/10',
  },
];

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.65], [0, 48]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-200 overflow-x-hidden">
      {/* Ambient orbs — parallax with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#00ffcc]/8 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/10 blur-[100px]" />
      </motion.div>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0b0f14]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00ffcc]/25 to-cyan-500/20 border border-[#00ffcc]/30 flex items-center justify-center text-[#00ffcc] font-mono font-bold">
              T
            </span>
            <span className="font-semibold text-white tracking-tight">TELIPORT AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              Dashboard
            </Link>
            <MotionLink
              to="/dashboard/masim"
              className="inline-flex items-center justify-center font-medium rounded-lg px-3 py-1.5 text-sm btn-glow"
              style={ctaStyle}
              whileHover={ctaHover}
              whileTap={{ scale: 0.98 }}
            >
              Start Screening
            </MotionLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center px-6 pt-20 pb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ffcc]/25 bg-[#00ffcc]/5 text-[#00ffcc] text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
            Autism Platform
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            AI-Powered Early Autism Detection &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-cyan-400">
              Continuous Care
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            Multimodal screening combines voice, video, movement, and behavioral cues—so signals surface earlier and
            more objectively than paper-only workflows alone.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <MotionLink
              to="/dashboard/masim"
              className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-3 text-base btn-glow shadow-glowGreen"
              style={ctaStyle}
              whileHover={ctaHover}
              whileTap={{ scale: 0.98 }}
            >
              Start Screening
            </MotionLink>
            <motion.a
              href="#problem"
              className="text-sm text-slate-400 hover:text-[#00ffcc] transition-colors"
              whileHover={{ x: 2 }}
            >
              Why it matters ↓
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div className="w-1 h-2 rounded-full bg-[#00ffcc]/80" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </div>
        </motion.div>
      </section>

      {/* Problem */}
      <section id="problem" className="relative py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The problem</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Today’s pathways often miss the window where early support has the greatest impact.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {problems.map((p) => (
              <motion.div
                key={p.title}
                variants={itemFade}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl p-6 border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our solution</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              TELIPORT unifies sensing, modeling, and adaptive therapy in one continuous loop.
            </p>
          </motion.div>
          <div className="space-y-6">
            {solutions.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={`flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${s.accent} bg-white/[0.03] backdrop-blur-md overflow-hidden relative`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ffcc]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#00ffcc]/15 border border-[#00ffcc]/30 flex items-center justify-center text-2xl font-bold text-[#00ffcc] font-mono relative z-10">
                  {i + 1}
                </div>
                <div className="relative z-10 flex-1">
                  <span className="text-xs font-medium text-[#00ffcc]/90 uppercase tracking-wider">{s.tag}</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-2">{s.name}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center rounded-3xl p-12 sm:p-16 border border-[#00ffcc]/20 bg-gradient-to-b from-[#00ffcc]/10 to-transparent backdrop-blur-xl relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,255,204,0.15),transparent)] pointer-events-none"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to screen smarter?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Move from fragmented checks to continuous, multimodal insight—starting with one screening flow.
            </p>
            <MotionLink
              to="/dashboard/masim"
              className="inline-flex items-center justify-center font-medium rounded-lg px-10 py-3 text-base btn-glow"
              style={ctaStyle}
              whileHover={{ ...ctaHover, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Screening
            </MotionLink>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} TELIPORT AI · Autism Platform</p>
      </footer>
    </div>
  );
}
