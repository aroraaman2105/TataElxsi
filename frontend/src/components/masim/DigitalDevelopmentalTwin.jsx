import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../design-system';

const AGES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];

const TWIN_DATABASE = {
  'liam-carter': {
    name: 'Liam Carter',
    age: '4 Years',
    actualScores: [41, 49, 57, 62, 63, 64, 65], // up to 4.0y
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [65, 71, 78, 84, 89], // from 4.0y to 6.0y
    flatScores: [65, 66, 65, 64, 62],
    regressionRisk: 18,
    plateauAge: 2.5,
    plateauGap: 23,
    confidence: 91,
    plateauText: "Social gaze attention and joint play interaction plateau identified at 2.5 years. Active therapy has recovered +8 score points.",
    milestones: [
      { name: 'Consistent eye contact > 1.5s during play', targetAge: '4.2y', desc: 'Predicted in 2 months with optimal video reward loops.' },
      { name: 'Spontaneous two-word expressive phrasing', targetAge: '4.5y', desc: 'Speech imitation drills target this goal.' },
      { name: 'Cooperative interactive play with peer group', targetAge: '5.0y', desc: 'Social group integration forecasted milestone.' }
    ]
  },
  'lucas-davis': {
    name: 'Lucas Davis',
    age: '4 Years',
    actualScores: [42, 48, 55, 59, 58, 59, 58],
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [58, 64, 71, 78, 83],
    flatScores: [58, 57, 56, 54, 52],
    regressionRisk: 28,
    plateauAge: 2.5,
    plateauGap: 30,
    confidence: 94,
    plateauText: "Fine motor stereotypy and social communication plateau identified at 2.5 years. Rhythmic sensory integration recovered +4 points.",
    milestones: [
      { name: 'Flapping stereotypy rate reduction < 1.0Hz', targetAge: '4.3y', desc: 'Targeted tactile interrupters active in planner.' },
      { name: 'Self-directed transition with soft prompts', targetAge: '4.7y', desc: 'Visual timeline training predicted achievement.' },
      { name: 'Integrated occupational classroom play', targetAge: '5.2y', desc: 'Preschool integration milestone forecasted.' }
    ]
  },
  'noah-kline': {
    name: 'Noah Kline',
    age: '3 Years',
    actualScores: [40, 48, 56, 62, 63], // up to 3.0y
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [63, 69, 75, 81, 85, 88, 90], // from 3.0y to 6.0y
    flatScores: [63, 62, 60, 58, 56, 54, 52],
    regressionRisk: 15,
    plateauAge: 2.0,
    plateauGap: 25,
    confidence: 88,
    plateauText: "Speech prosody and vocabulary plateau identified at 2.0 years. Verbal mimicry drills recovered +6 score points.",
    milestones: [
      { name: 'Verbal echo response latency < 2.0s', targetAge: '3.3y', desc: 'Acoustic vocal matching exercises target this goal.' },
      { name: 'Target matching inside social board games', targetAge: '3.6y', desc: 'Play sessions show rising attention duration.' },
      { name: 'Calm toy cleanup transitions', targetAge: '4.2y', desc: 'Breathing visualizer milestone forecast.' }
    ]
  },
  'oliver-thomas': {
    name: 'Oliver Thomas',
    age: '3 Years',
    actualScores: [41, 49, 57, 60, 59],
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [59, 65, 72, 78, 82, 85, 88],
    flatScores: [59, 58, 56, 54, 51, 48, 45],
    regressionRisk: 22,
    plateauAge: 2.0,
    plateauGap: 29,
    confidence: 90,
    plateauText: "Sensory hypo-reactivity and tactile avoidance plateau identified at 2.0 years. Sensory play therapy recovered +5 score points.",
    milestones: [
      { name: 'Tactile play with zero avoidance loops', targetAge: '3.4y', desc: 'Sensory integration exercises target this cycle.' },
      { name: 'Atypical motor toe walking stabilization', targetAge: '3.8y', desc: 'Physio and OT target milestone forecast.' },
      { name: 'Cooperative interactive sensory sandbox play', targetAge: '4.5y', desc: 'Sensory play socialization forecasted milestone.' }
    ]
  },
  'emma-larson': {
    name: 'Emma Larson',
    age: '6 Years',
    dob: 'June 14, 2020',
    actualScores: [43, 52, 60, 68, 76, 80, 82, 83, 84, 83, 82], // up to 6.0y
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [82],
    flatScores: [82],
    regressionRisk: 10,
    plateauAge: 3.5,
    plateauGap: 18,
    confidence: 85,
    plateauText: "Expressive verbal prosody plateau identified at 3.5 years. Interactive voice games recovered +12 score points.",
    milestones: [
      { name: 'Natural vocal pitch modulation during conversations', targetAge: '6.2y', desc: 'Interactive voice mimicry targets this goal.' },
      { name: 'Complex imitation syntax construction', targetAge: '6.5y', desc: 'Advanced language modules predicted achievement.' },
      { name: 'Peer classroom conversation loops', targetAge: '7.0y', desc: 'Classroom integration forecast milestone.' }
    ]
  },
  'ava-wilson': {
    name: 'Ava Wilson',
    age: '5 Years',
    actualScores: [42, 50, 58, 64, 70, 72, 73, 72, 72], // up to 5.0y
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [72, 77, 82], // from 5.0y to 6.0y
    flatScores: [72, 71, 70],
    regressionRisk: 12,
    plateauAge: 3.0,
    plateauGap: 16,
    confidence: 89,
    plateauText: "Fine motor control and sensory self-regulation plateau identified at 3.0 years. Hand coordinate games recovered +9 score points.",
    milestones: [
      { name: 'Bilateral coordination targets (cutting, blocks)', targetAge: '5.2y', desc: 'Hand coordinate exercises target this goal.' },
      { name: 'Independent transition routines at school', targetAge: '5.5y', desc: 'Behavioral visualizers target this milestone.' },
      { name: 'Self-regulated sensory calming cycles', targetAge: '6.0y', desc: 'Calming engine integration forecasted milestone.' }
    ]
  },
  'sophia-miller': {
    name: 'Sophia Miller',
    age: '5 Years',
    actualScores: [42, 50, 58, 66, 74, 80, 81, 80, 80],
    expectedScores: [42, 50, 58, 66, 74, 81, 88, 91, 94, 97, 100],
    optimalScores: [80, 84, 87],
    flatScores: [80, 79, 78],
    regressionRisk: 5,
    plateauAge: 4.5,
    plateauGap: 8,
    confidence: 92,
    plateauText: "Typical trajectory tracking. Mild social communication plateau identified at 4.5 years. Play coordination recovered +4 points.",
    milestones: [
      { name: 'Bilateral sensory play coordination', targetAge: '5.2y', desc: 'Typical development milestone target.' },
      { name: 'Independent cooperative peer play group', targetAge: '5.5y', desc: 'Typical social play milestones forecast.' },
      { name: 'Typical neurodevelopmental milestone track', targetAge: '6.0y', desc: 'Consistent tracking verified prognosis.' }
    ]
  }
};

const CHART = { width: 620, height: 300, pad: { top: 32, right: 32, bottom: 48, left: 56 } };

function scalePoint(age, score) {
  const { width, height, pad } = CHART;
  const minAge = 1.0;
  const maxAge = 6.0;
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
  return [40, 55, 70, 85, 100];
}

function AnimatedPath({ d, stroke, strokeWidth = 2.5, dashed = false, delay = 0, name }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '6 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export default function DigitalDevelopmentalTwin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || 'liam-carter';
  const currentPatient = TWIN_DATABASE[patientId] || TWIN_DATABASE['liam-carter'];

  // Calculate coordinates paths
  const expectedPath = useMemo(() => {
    return toPath(AGES.map((age, i) => scalePoint(age, currentPatient.expectedScores[i])));
  }, [currentPatient]);

  const actualPath = useMemo(() => {
    const historicalLength = currentPatient.actualScores.length;
    return toPath(AGES.slice(0, historicalLength).map((age, i) => scalePoint(age, currentPatient.actualScores[i])));
  }, [currentPatient]);

  const optimalPath = useMemo(() => {
    const historicalLength = currentPatient.actualScores.length;
    const forecastAges = AGES.slice(historicalLength - 1);
    return toPath(forecastAges.map((age, i) => scalePoint(age, currentPatient.optimalScores[i])));
  }, [currentPatient]);

  const flatPath = useMemo(() => {
    const historicalLength = currentPatient.actualScores.length;
    const forecastAges = AGES.slice(historicalLength - 1);
    return toPath(forecastAges.map((age, i) => scalePoint(age, currentPatient.flatScores[i])));
  }, [currentPatient]);

  const deviationAge = currentPatient.plateauAge;
  const deviationIndex = AGES.indexOf(deviationAge);
  const deviationExpected = currentPatient.expectedScores[deviationIndex];
  const deviationActual = currentPatient.actualScores[deviationIndex];
  
  const deviationPt = scalePoint(deviationAge, deviationActual);
  const expectedAtDeviation = scalePoint(deviationAge, deviationExpected);

  const { width, height, pad } = CHART;
  const plotBottom = height - pad.bottom;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="space-y-6"
    >
      {/* Selector and general summary */}
      <Card className="border border-white/5 bg-white/[0.01] p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#00d4ff] font-bold">Predictive Simulation Model</span>
            <h2 className="text-lg font-bold text-white mt-1">Liam Carter&apos;s Digital Twin Trajectory</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Compare actual developmental progress, population expectations, and predictive pathways to plan targets.
            </p>
          </div>
          {/* Patient Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/[0.02] border border-white/5 p-1.5 rounded-lg">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider pl-2">Case file:</span>
            <select
              value={patientId}
              onChange={(e) => setSearchParams({ patientId: e.target.value })}
              className="bg-[#0b0f14] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#00d4ff] focus:outline-none focus:border-[#00d4ff]/50 transition-all hover:bg-white/[0.04]"
            >
              {Object.keys(TWIN_DATABASE).map((id) => (
                <option key={id} value={id}>
                  {TWIN_DATABASE[id].name} ({TWIN_DATABASE[id].age})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Main Graph Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        
        {/* SVG Longitudinal Graph Card */}
        <Card className="border border-white/5 bg-white/[0.01] space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-white/5 pb-3">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0 border-t-2 border-dashed border-slate-500" /> Expected Norms</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#00ffcc] rounded" /> Actual Progress</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-emerald-500 rounded" /> Forecast (Optimal)</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-amber-500 rounded" /> Forecast (Flat Trend)</span>
          </div>

          <div className="rounded-lg border border-white/8 bg-[#0b0f14]/70 p-4 relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              
              {/* Horizontal Grid Lines */}
              {yTicks().map((score) => {
                const { y } = scalePoint(AGES[0], score);
                return (
                  <g key={score}>
                    <line
                      x1={pad.left}
                      y1={y}
                      x2={width - pad.right}
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeDasharray="4 4"
                    />
                    <text x={pad.left - 12} y={y + 4} textAnchor="end" className="fill-slate-500 text-[9px] font-mono">
                      {score}
                    </text>
                  </g>
                );
              })}

              {/* X-axis ages ticks */}
              <line x1={pad.left} y1={plotBottom} x2={width - pad.right} y2={plotBottom} stroke="rgba(255,255,255,0.1)" />
              {AGES.map((age) => {
                const { x } = scalePoint(age, 30);
                return (
                  <g key={age}>
                    <line x1={x} y1={plotBottom} x2={x} y2={plotBottom + 6} stroke="rgba(255,255,255,0.15)" />
                    <text x={x} y={plotBottom + 18} textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">
                      {age}y
                    </text>
                  </g>
                );
              })}

              {/* Shaded Plateau zone */}
              {(() => {
                const start = scalePoint(deviationAge, 30);
                const end = scalePoint(6.0, 30);
                return (
                  <motion.rect
                    x={start.x}
                    y={pad.top}
                    width={end.x - start.x}
                    height={plotBottom - pad.top}
                    fill="rgba(251, 191, 36, 0.03)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  />
                );
              })()}

              {/* Vertical deviation line */}
              <motion.line
                x1={deviationPt.x}
                y1={deviationPt.y}
                x2={expectedAtDeviation.x}
                y2={expectedAtDeviation.y}
                stroke="rgba(251, 191, 36, 0.4)"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              />

              {/* Trajectory Paths */}
              <AnimatedPath d={expectedPath} stroke="rgba(148, 163, 184, 0.4)" dashed delay={0.1} />
              <AnimatedPath d={actualPath} stroke="#00ffcc" strokeWidth={3} delay={0.3} />
              
              {/* Divergent Forecast paths */}
              {currentPatient.actualScores.length < AGES.length && (
                <>
                  <AnimatedPath d={optimalPath} stroke="#10b981" strokeWidth={2.5} dashed delay={0.6} />
                  <AnimatedPath d={flatPath} stroke="#fbbf24" strokeWidth={2.5} dashed delay={0.6} />
                </>
              )}

              {/* Deviation circle highlight */}
              <motion.circle
                cx={deviationPt.x}
                cy={deviationPt.y}
                r={6}
                fill="#fbbf24"
                stroke="#0b0f14"
                strokeWidth={1.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
              />
              <motion.circle
                cx={deviationPt.x}
                cy={deviationPt.y}
                r={12}
                fill="none"
                stroke="rgba(251, 191, 36, 0.3)"
                strokeWidth={1.5}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ delay: 1.5, duration: 2.2, repeat: Infinity }}
              />

            </svg>
          </div>
        </Card>

        {/* Right side: AI stats panel */}
        <div className="space-y-6">
          
          {/* Regression risk & model confidence gauges */}
          <Card className="border border-white/5 bg-white/[0.01] p-5 space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Twin Risk Analysis
            </h3>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Regression Risk */}
              <div className="text-center space-y-2">
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Regression Risk</span>
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={currentPatient.regressionRisk > 20 ? '#fbbf24' : '#10b981'}
                      strokeWidth="3"
                      strokeDasharray="100"
                      strokeDashoffset={100 - currentPatient.regressionRisk}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-white font-mono">{currentPatient.regressionRisk}%</span>
                    <span className="text-[6px] text-slate-500 uppercase tracking-tighter">Risk</span>
                  </div>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border inline-block ${
                  currentPatient.regressionRisk > 20 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  {currentPatient.regressionRisk > 20 ? 'ELEVATED' : 'STABLE'}
                </span>
              </div>

              {/* Model Confidence */}
              <div className="text-center space-y-2">
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Model Confidence</span>
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#00ffcc"
                      strokeWidth="3"
                      strokeDasharray="100"
                      strokeDashoffset={100 - currentPatient.confidence}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-white font-mono">{currentPatient.confidence}%</span>
                    <span className="text-[6px] text-slate-500 uppercase tracking-tighter">Cert.</span>
                  </div>
                </div>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#00ffcc]/20 text-[#00ffcc] bg-[#00ffcc]/10 inline-block">
                  HIGH CONF.
                </span>
              </div>

            </div>
          </Card>

          {/* Plateau detection warning */}
          <Card className="border border-white/5 bg-white/[0.01] p-4 space-y-2">
            <span className="text-[8px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider inline-block">
              ⚠️ Plateau Detected
            </span>
            <h4 className="text-xs font-bold text-white uppercase mt-2">Sensory Dev. Gap Alert</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-[450]">
              {currentPatient.plateauText} Current trajectory gap sits at <strong className="text-white">-{currentPatient.plateauGap} pts</strong> vs. population baseline.
            </p>
          </Card>

        </div>

      </div>

      {/* Milestone Forecast timeline */}
      <Card className="border border-white/5 bg-white/[0.01] p-5 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
          🔮 Predictive Milestone Projections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentPatient.milestones.map((ms, index) => (
            <div key={index} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col justify-between gap-3 text-xs">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[8px] text-purple-400 font-extrabold uppercase tracking-wider px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-md">
                    Milestone {index + 1}
                  </span>
                  <span className="text-xs font-extrabold text-[#00ffcc] font-mono">{ms.targetAge}</span>
                </div>
                <h4 className="font-bold text-white mt-3">{ms.name}</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{ms.desc}</p>
              </div>
              <div className="text-[9px] text-slate-400 bg-[#0b0f14]/80 p-2 rounded-lg border border-white/5 flex justify-between">
                <span>Simulation Confidence:</span>
                <span className="text-white font-mono font-bold">{currentPatient.confidence - 2}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
