import { motion } from 'framer-motion';
import { Card } from '../design-system';

const CONTRIBUTING_FACTORS = [
  {
    id: 'eye-contact',
    label: 'Low eye contact',
    modality: 'Video',
    domain: 'Social gaze',
    confidence: 87,
    importance: 92,
    level: 'high',
  },
  {
    id: 'joint-attention',
    label: 'Reduced joint attention',
    modality: 'Video',
    domain: 'Social interaction',
    confidence: 81,
    importance: 78,
    level: 'high',
  },
  {
    id: 'eeg-anomaly',
    label: 'EEG anomaly',
    modality: 'EEG',
    domain: 'Neural connectivity',
    confidence: 74,
    importance: 65,
    level: 'moderate',
  },
];

const FEATURE_IMPORTANCE = [...CONTRIBUTING_FACTORS]
  .sort((a, b) => b.importance - a.importance)
  .map(({ label, importance, modality }) => ({ label, value: importance, modality }));

const CLINICAL_SUMMARY = `This screening session was reviewed using video, EEG, and audio signals fused by the MASIM model. The strongest contributors to the current risk estimate were limited sustained eye contact and reduced joint attention during social moments in the recording. EEG analysis also flagged an atypical connectivity pattern worth follow-up in context of the child's history and presentation.

These results support further clinical evaluation—they do not replace your judgment, caregiver report, or standardized instruments such as M-CHAT-R or ADOS. Consider discussing early intervention options if findings align with your in-person observations.`;

const OVERALL_CONFIDENCE = 78;

const levelStyles = {
  high: 'text-amber-300 bg-amber-400/10 border-amber-400/25',
  moderate: 'text-sky-300 bg-sky-400/10 border-sky-400/25',
};

function ConfidenceRing({ value }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88" aria-hidden>
        <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="#00ffcc"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-white tabular-nums">{value}%</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500">Model</span>
      </div>
    </div>
  );
}

function FeatureImportanceChart({ features }) {
  const max = Math.max(...features.map((f) => f.value), 1);

  return (
    <div className="space-y-4 w-full" role="img" aria-label="Bar chart of feature importance">
      {features.map((feature, index) => (
        <div key={feature.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">{feature.label}</p>
              <p className="text-xs text-slate-500">{feature.modality} signal</p>
            </div>
            <span className="text-sm font-semibold text-[#00ffcc] tabular-nums flex-shrink-0">
              {feature.value}%
            </span>
          </div>
          <div className="h-3 rounded-md bg-white/5 border border-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-md"
              style={{
                background: 'linear-gradient(90deg, rgba(0,255,204,0.95) 0%, rgba(0,212,255,0.75) 100%)',
                boxShadow: '0 0 10px rgba(0, 255, 204, 0.35)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(feature.value / max) * 100}%` }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.55, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-slate-500 pt-1 border-t border-white/5">
        Relative contribution to the screening outcome (normalized SHAP-style attribution).
      </p>
    </div>
  );
}

function FactorCard({ factor, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.06 }}
      className="rounded-lg border border-white/8 bg-white/[0.03] p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-[#00ffcc] font-semibold mb-1">
            {factor.modality} · {factor.domain}
          </p>
          <h4 className="text-base font-medium text-white">{factor.label}</h4>
        </div>
        <span
          className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border flex-shrink-0 ${levelStyles[factor.level]}`}
        >
          {factor.level}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">Factor confidence</span>
        <span className="text-sm font-semibold text-white tabular-nums">{factor.confidence}%</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#00ffcc]/80"
          initial={{ width: 0 }}
          animate={{ width: `${factor.confidence}%` }}
          transition={{ delay: 0.2 + index * 0.06, duration: 0.5 }}
        />
      </div>
    </motion.li>
  );
}

export default function ExplainableAIPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
      aria-labelledby="xai-panel-title"
    >
      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 bg-gradient-to-r from-[#00ffcc]/[0.06] to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#00ffcc] font-semibold mb-1">
                Clinical decision support
              </p>
              <h2 id="xai-panel-title" className="text-xl font-semibold text-white">
                Explainable AI Report
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Interpretable breakdown of multimodal screening signals for clinician review.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <ConfidenceRing value={OVERALL_CONFIDENCE} />
              <div>
                <p className="text-sm font-medium text-white">Overall model confidence</p>
                <p className="text-xs text-slate-400 mt-0.5 max-w-[200px]">
                  Aggregated certainty across video, EEG, and audio modalities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Key contributing factors</h3>
            <p className="text-xs text-slate-500 mb-4">
              Ranked findings with per-factor confidence scores
            </p>
            <ul className="space-y-3" role="list">
              {CONTRIBUTING_FACTORS.map((factor, index) => (
                <FactorCard key={factor.id} factor={factor} index={index} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Feature importance</h3>
            <p className="text-xs text-slate-500 mb-4">
              Relative weight of each signal in the fused prediction
            </p>
            <div className="rounded-lg border border-white/8 bg-[#0b0f14]/60 p-5">
              <FeatureImportanceChart features={FEATURE_IMPORTANCE} />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5 border-l-4 border-l-[#00ffcc]">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Clinical interpretation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-[450]">
              {CLINICAL_SUMMARY}
            </p>
          </div>
          <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
            For research and screening support only. Not FDA-cleared as a diagnostic device. Verify all
            outputs with direct observation and established assessment protocols.
          </p>
        </div>
      </Card>
    </motion.section>
  );
}
