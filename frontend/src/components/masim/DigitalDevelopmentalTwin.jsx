import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../design-system';

const AGES = [1, 1.5, 2, 2.5, 3, 3.5, 4];
const EXPECTED_SCORES = [42, 50, 58, 66, 74, 81, 88];
const ACTUAL_SCORES = [41, 49, 57, 62, 63, 64, 65];

const DEVIATION_INDEX = 3; // age 2.5y — plateau begins
const RISK_6MO = 72;

const CHART = { width: 560, height: 280, pad: { top: 28, right: 28, bottom: 44, left: 52 } };

function scalePoint(age, score) {
  const { width, height, pad } = CHART;
  const minAge = AGES[0];
  const maxAge = AGES[AGES.length - 1];
  const minScore = 30;
  const maxScore = 100;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = pad.left + ((age - minAge) / (maxAge - minAge)) * plotW;
  const y = pad.top + plotH - ((score - minScore) / (maxScore - minScore)) * plotH;
  return { x, y };
}

function toPath(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
}

function yTicks() {
  return [40, 55, 70, 85];
}

function AnimatedLine({ d, stroke, strokeWidth = 2.5, dashed = false, delay = 0 }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '8 6' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export default function DigitalDevelopmentalTwin() {
  const expectedPath = useMemo(
    () => toPath(AGES.map((age, i) => scalePoint(age, EXPECTED_SCORES[i]))),
    []
  );
  const actualPath = useMemo(
    () => toPath(AGES.map((age, i) => scalePoint(age, ACTUAL_SCORES[i]))),
    []
  );

  const deviationAge = AGES[DEVIATION_INDEX];
  const deviationExpected = EXPECTED_SCORES[DEVIATION_INDEX];
  const deviationActual = ACTUAL_SCORES[DEVIATION_INDEX];
  const deviationPt = scalePoint(deviationAge, deviationActual);
  const expectedAtDeviation = scalePoint(deviationAge, deviationExpected);
  const gapMid = {
    x: deviationPt.x,
    y: (deviationPt.y + expectedAtDeviation.y) / 2,
  };

  const { width, height, pad } = CHART;
  const plotBottom = height - pad.bottom;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="space-y-4"
      aria-labelledby="ddt-panel-title"
    >
      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 bg-gradient-to-r from-[#00d4ff]/[0.06] to-transparent">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#00d4ff] font-semibold mb-1">
            Longitudinal model
          </p>
          <h2 id="ddt-panel-title" className="text-xl font-semibold text-white">
            Digital Developmental Twin
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulated developmental trajectory compared with population-expected norms for this age band.
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-6 h-0 border-t-2 border-dashed border-slate-400" />
                Expected trajectory
              </span>
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-6 h-0.5 bg-[#00ffcc] rounded" />
                Actual child progress
              </span>
              <span className="flex items-center gap-2 text-amber-300/90">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                Deviation / plateau
              </span>
            </div>

            <div className="rounded-lg border border-white/8 bg-[#0b0f14]/70 p-4">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto"
                role="img"
                aria-label="Development score by age chart showing expected and actual trajectories"
              >
                {/* Grid */}
                {yTicks().map((score) => {
                  const { y } = scalePoint(AGES[0], score);
                  return (
                    <g key={score}>
                      <line
                        x1={pad.left}
                        y1={y}
                        x2={width - pad.right}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="4 4"
                      />
                      <text x={pad.left - 10} y={y + 4} textAnchor="end" className="fill-slate-500 text-[10px]">
                        {score}
                      </text>
                    </g>
                  );
                })}

                {/* Y-axis label */}
                <text
                  x={14}
                  y={height / 2}
                  textAnchor="middle"
                  transform={`rotate(-90, 14, ${height / 2})`}
                  className="fill-slate-500 text-[11px]"
                >
                  Development score
                </text>

                {/* X-axis */}
                <line
                  x1={pad.left}
                  y1={plotBottom}
                  x2={width - pad.right}
                  y2={plotBottom}
                  stroke="rgba(255,255,255,0.12)"
                />
                {AGES.map((age) => {
                  const { x } = scalePoint(age, 40);
                  return (
                    <g key={age}>
                      <line x1={x} y1={plotBottom} x2={x} y2={plotBottom + 6} stroke="rgba(255,255,255,0.2)" />
                      <text x={x} y={plotBottom + 20} textAnchor="middle" className="fill-slate-500 text-[10px]">
                        {age}y
                      </text>
                    </g>
                  );
                })}
                <text x={width / 2} y={height - 6} textAnchor="middle" className="fill-slate-500 text-[11px]">
                  Age (years)
                </text>

                {/* Deviation gap band */}
                <motion.line
                  x1={deviationPt.x}
                  y1={deviationPt.y}
                  x2={expectedAtDeviation.x}
                  y2={expectedAtDeviation.y}
                  stroke="rgba(251, 191, 36, 0.5)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />

                {/* Lines */}
                <AnimatedLine d={expectedPath} stroke="rgba(148, 163, 184, 0.85)" dashed delay={0.1} />
                <AnimatedLine d={actualPath} stroke="#00ffcc" strokeWidth={3} delay={0.35} />

                {/* Plateau highlight zone (shaded after deviation) */}
                {(() => {
                  const start = scalePoint(AGES[DEVIATION_INDEX], 40);
                  const end = scalePoint(AGES[AGES.length - 1], 40);
                  return (
                    <motion.rect
                      x={start.x}
                      y={pad.top}
                      width={end.x - start.x}
                      height={plotBottom - pad.top}
                      fill="rgba(251, 191, 36, 0.06)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                    />
                  );
                })()}

                {/* Deviation marker */}
                <motion.circle
                  cx={deviationPt.x}
                  cy={deviationPt.y}
                  r={7}
                  fill="#fbbf24"
                  stroke="#0b0f14"
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 18 }}
                />
                <motion.circle
                  cx={deviationPt.x}
                  cy={deviationPt.y}
                  r={14}
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.45)"
                  strokeWidth={2}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ delay: 1.6, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Label callout */}
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.65, duration: 0.4 }}
                >
                  <rect
                    x={gapMid.x - 72}
                    y={gapMid.y - 38}
                    width={144}
                    height={28}
                    rx={6}
                    fill="rgba(251, 191, 36, 0.12)"
                    stroke="rgba(251, 191, 36, 0.35)"
                  />
                  <text
                    x={gapMid.x}
                    y={gapMid.y - 20}
                    textAnchor="middle"
                    className="fill-amber-200 text-[10px] font-medium"
                  >
                    Plateau · −{deviationExpected - deviationActual} pts vs expected
                  </text>
                </motion.g>
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              className="rounded-xl border border-amber-400/25 bg-gradient-to-br from-amber-500/10 to-transparent p-5"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.45 }}
            >
              <p className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold mb-2">
                Forward prediction
              </p>
              <p className="text-sm text-slate-300 leading-snug mb-4">
                Risk of developmental delay in next 6 months:
              </p>
              <div className="flex items-end gap-2">
                <motion.span
                  className="text-4xl font-bold text-white tabular-nums"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {RISK_6MO}%
                </motion.span>
                <span className="text-xs text-amber-300/90 mb-1.5 font-medium">elevated</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                    boxShadow: '0 0 12px rgba(251, 191, 36, 0.4)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${RISK_6MO}%` }}
                  transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Based on current plateau at {deviationAge} years and multimodal screening signals. Reassess at
                3-month intervals.
              </p>
            </motion.div>

            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4 space-y-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Current age</span>
                <span className="text-white font-medium tabular-nums">{AGES[AGES.length - 1]} years</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Latest development score</span>
                <span className="text-[#00ffcc] font-medium tabular-nums">{ACTUAL_SCORES[ACTUAL_SCORES.length - 1]}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Expected at this age</span>
                <span className="text-slate-300 font-medium tabular-nums">
                  {EXPECTED_SCORES[EXPECTED_SCORES.length - 1]}
                </span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t border-white/5">
                <span className="text-slate-500">Trajectory gap</span>
                <span className="text-amber-300 font-medium tabular-nums">
                  −{EXPECTED_SCORES[EXPECTED_SCORES.length - 1] - ACTUAL_SCORES[ACTUAL_SCORES.length - 1]} pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
