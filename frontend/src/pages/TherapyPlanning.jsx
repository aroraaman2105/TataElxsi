import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/design-system';

const THERAPY_PLANS = {
  before: [
    {
      id: 'speech',
      title: 'Speech therapy',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
      accent: '#00ffcc',
      duration: '30 min',
      difficulty: 'Level 3 — Advanced',
      activities: ['Multi-syllable articulation drills', 'Complex sentence imitation', 'Rapid naming tasks'],
      engagement: 42,
      note: 'Standard protocol — not yet adapted',
    },
    {
      id: 'motor',
      title: 'Motor skill training',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      accent: '#00d4ff',
      duration: '25 min',
      difficulty: 'Level 2 — Intermediate',
      activities: ['Balance beam walking', 'Ball catch (medium pace)', 'Fine motor pegboard'],
      engagement: 68,
      note: 'Baseline motor plan',
    },
    {
      id: 'social',
      title: 'Social interaction exercises',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      accent: '#a78bfa',
      duration: '35 min',
      difficulty: 'Level 4 — Group role-play',
      activities: ['Peer turn-taking games', 'Emotion labeling in groups', 'Cooperative storytelling'],
      engagement: 55,
      note: 'High-demand social module',
    },
  ],
  after: [
    {
      id: 'speech',
      title: 'Speech therapy',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
      accent: '#00ffcc',
      duration: '20 min',
      difficulty: 'Level 1 — Simplified',
      activities: ['Single-word picture naming', 'Short phrase echoing (2–3 words)', 'Visual prompt cards only'],
      engagement: 42,
      adjustment: 'reduced',
      adjustmentReason: 'Engagement low (42%) → complexity reduced',
      note: 'AI shortened session & simplified tasks',
    },
    {
      id: 'motor',
      title: 'Motor skill training',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      accent: '#00d4ff',
      duration: '30 min',
      difficulty: 'Level 4 — Advanced',
      activities: ['Obstacle course with timing', 'Dual-hand coordination drills', 'Dynamic balance challenges'],
      engagement: 68,
      adjustment: 'increased',
      adjustmentReason: 'Improvement detected (+18%) → difficulty increased',
      note: 'AI extended session & added challenges',
    },
    {
      id: 'social',
      title: 'Social interaction exercises',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      accent: '#a78bfa',
      duration: '25 min',
      difficulty: 'Level 2 — Dyad practice',
      activities: ['1:1 joint attention games', 'Turn-taking with caregiver', 'Simple emotion mirrors'],
      engagement: 55,
      adjustment: 'reduced',
      adjustmentReason: 'Moderate engagement → group tasks replaced with dyad',
      note: 'AI shifted from group to 1:1 format',
    },
  ],
};

const AI_RECOMMENDATIONS = {
  before: {
    status: 'Awaiting optimization',
    summary: 'Current plan uses default difficulty levels from the last assessment. Run adaptive optimization to align tasks with live engagement and progress signals.',
    signals: [],
  },
  after: {
    status: 'Plan optimized',
    summary: 'Adaptive AI reviewed the last 7 sessions and adjusted today’s plan. Changes are applied per modality based on engagement trends and skill gains.',
    signals: [
      { label: 'Speech therapy', change: 'Complexity reduced', reason: 'Engagement below 50% for 3 consecutive sessions', type: 'down' },
      { label: 'Motor skill training', change: 'Difficulty increased', reason: 'Gross motor score improved 18% over 2 weeks', type: 'up' },
      { label: 'Social interaction', change: 'Format simplified', reason: 'Group settings correlated with withdrawal behaviors', type: 'down' },
    ],
  },
};

const adjustmentStyles = {
  reduced: 'text-amber-300 bg-amber-400/10 border-amber-400/25',
  increased: 'text-[#00ffcc] bg-[#00ffcc]/10 border-[#00ffcc]/25',
};

function EngagementBar({ value }) {
  const color = value < 50 ? '#fbbf24' : value >= 65 ? '#00ffcc' : '#94a3b8';
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">Session engagement</span>
        <span className="text-slate-300 tabular-nums font-medium">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          key={value}
        />
      </div>
    </div>
  );
}

function TherapyCard({ plan, optimized }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: `${plan.accent}15`, color: plan.accent }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={plan.icon} />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">{plan.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{plan.duration} · Daily</p>
            </div>
          </div>
          {optimized && plan.adjustment && (
            <span
              className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border flex-shrink-0 ${adjustmentStyles[plan.adjustment]}`}
            >
              {plan.adjustment === 'increased' ? '↑ Increased' : '↓ Reduced'}
            </span>
          )}
        </div>

        <p
          className="text-sm font-medium mb-3"
          style={{ color: plan.accent }}
        >
          {plan.difficulty}
        </p>

        <ul className="space-y-2 flex-1">
          {plan.activities.map((activity) => (
            <li key={activity} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-[#00ffcc] mt-1 flex-shrink-0">•</span>
              <span>{activity}</span>
            </li>
          ))}
        </ul>

        <EngagementBar value={plan.engagement} />

        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-white/5">
          {optimized && plan.adjustmentReason ? plan.adjustmentReason : plan.note}
        </p>
      </Card>
    </motion.div>
  );
}

function OptimizationToggle({ optimized, onChange }) {
  return (
    <div
      className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1"
      role="group"
      aria-label="Therapy plan optimization view"
    >
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          !optimized
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        Before AI optimization
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          optimized
            ? 'bg-[#00ffcc]/15 text-[#00ffcc] border border-[#00ffcc]/25 shadow-[0_0_12px_rgba(0,255,204,0.12)]'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        After AI optimization
      </button>
    </div>
  );
}

export default function TherapyPlanning() {
  const [optimized, setOptimized] = useState(false);
  const plans = optimized ? THERAPY_PLANS.after : THERAPY_PLANS.before;
  const ai = optimized ? AI_RECOMMENDATIONS.after : AI_RECOMMENDATIONS.before;

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">Therapy Planning</h1>
        <p className="text-slate-400 mt-1">
          Daily therapy schedule with adaptive AI recommendations based on child progress.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-white">Daily therapy plan</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <OptimizationToggle optimized={optimized} onChange={setOptimized} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={optimized ? 'after' : 'before'}
            className="contents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {plans.map((plan) => (
              <TherapyCard key={plan.id} plan={plan} optimized={optimized} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="!p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/8 bg-gradient-to-r from-[#00ffcc]/[0.06] to-transparent flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/25 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Adaptive AI Recommendation</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulated plan adjustments from engagement & progress signals
                </p>
              </div>
            </div>
            <span
              className={`self-start sm:self-center text-xs font-medium px-3 py-1 rounded-full border ${
                optimized
                  ? 'text-[#00ffcc] bg-[#00ffcc]/10 border-[#00ffcc]/25'
                  : 'text-slate-400 bg-white/5 border-white/10'
              }`}
            >
              {ai.status}
            </span>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={optimized ? 'ai-after' : 'ai-before'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm text-slate-300 leading-relaxed mb-5">{ai.summary}</p>

                {ai.signals.length > 0 ? (
                  <ul className="space-y-3" role="list">
                    {ai.signals.map((signal) => (
                      <li
                        key={signal.label}
                        className="flex items-start gap-4 rounded-lg border border-white/8 bg-white/[0.02] p-4"
                      >
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            signal.type === 'up'
                              ? 'bg-[#00ffcc]/10 text-[#00ffcc]'
                              : 'bg-amber-400/10 text-amber-300'
                          }`}
                        >
                          {signal.type === 'up' ? '↑' : '↓'}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{signal.label}</p>
                          <p className="text-sm text-[#00ffcc] mt-0.5">{signal.change}</p>
                          <p className="text-xs text-slate-500 mt-1">{signal.reason}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-lg border border-dashed border-white/10 p-6 text-center">
                    <p className="text-sm text-slate-500">
                      Switch to <span className="text-white font-medium">After AI optimization</span> to see
                      how the plan adapts when engagement is low or improvement is detected.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
