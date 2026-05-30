import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CENTER = { x: 300, y: 300 };
const ORBIT_R = 195;

const AGENTS = [
  {
    id: 'screening',
    label: 'Screening Agent',
    role: 'Multimodal intake & risk signals',
    angle: -90,
    color: '#00ffcc',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    id: 'clinical',
    label: 'Clinical Agent',
    role: 'Interpretation & decision support',
    angle: 0,
    color: '#00d4ff',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'therapy',
    label: 'Therapy Agent',
    role: 'Adaptive plans & interventions',
    angle: 90,
    color: '#a78bfa',
    icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    id: 'monitoring',
    label: 'Monitoring Agent',
    role: 'Longitudinal tracking & alerts',
    angle: 180,
    color: '#ff9ecd',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
];

const DIAGRAM_THEME = {
  dark: {
    centerFill: 'rgba(11,15,20,0.9)',
    centerText: '#ffffff',
    centerSubtext: '#64748b',
    orbitOuter: 'rgba(255,255,255,0.08)',
    orbitInner: 'rgba(0,255,204,0.12)',
    crossStroke: 'rgba(255,255,255,0.35)',
    lakeGlow: [
      { offset: '0%', color: '#00ffcc', opacity: 0.35 },
      { offset: '70%', color: '#00d4ff', opacity: 0.08 },
      { offset: '100%', color: 'transparent', opacity: 0 },
    ],
    agentNodeBg: (color) => `linear-gradient(135deg, ${color}22, rgba(11,15,20,0.92))`,
    agentShadow: (color, selected) =>
      selected ? `0 0 32px ${color}55, inset 0 0 20px ${color}18` : `0 0 16px ${color}28`,
  },
  light: {
    centerFill: '#ffffff',
    centerText: '#111827',
    centerSubtext: '#64748b',
    orbitOuter: 'rgba(15,23,42,0.1)',
    orbitInner: 'rgba(37,99,235,0.2)',
    crossStroke: 'rgba(100,116,139,0.45)',
    lakeGlow: [
      { offset: '0%', color: '#2563eb', opacity: 0.16 },
      { offset: '60%', color: '#4f46e5', opacity: 0.08 },
      { offset: '100%', color: '#eef2f6', opacity: 0.5 },
    ],
    agentNodeBg: (color) => `linear-gradient(135deg, ${color}18, #ffffff)`,
    agentShadow: (color, selected) =>
      selected
        ? `0 8px 28px ${color}40, 0 0 0 2px ${color}55, inset 0 1px 0 rgba(255,255,255,0.9)`
        : `0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px ${color}35`,
  },
};

function polar(angleDeg, radius = ORBIT_R) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER.x + radius * Math.cos(rad),
    y: CENTER.y + radius * Math.sin(rad),
  };
}

function linkPath(from, to) {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

function DataParticles({ from, to, color, active, reverse = false }) {
  const path = linkPath(from, to);
  const durations = ['2.2s', '2.8s', '3.4s'];
  const begins = ['0s', '0.7s', '1.4s'];

  if (!active) return null;

  return (
    <g>
      {durations.map((dur, i) => (
        <circle key={i} r={3} fill={color} opacity={0.9}>
          <animateMotion
            dur={dur}
            begin={begins[i]}
            repeatCount="indefinite"
            path={path}
            keyPoints={reverse ? '1;0' : '0;1'}
            keyTimes="0;1"
            calcMode="linear"
          />
        </circle>
      ))}
    </g>
  );
}

function AgentNode({ agent, position, selected, onSelect, diagramStyle }) {
  const isActive = selected === null || selected === agent.id;

  return (
    <motion.button
      type="button"
      className="absolute flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#00ffcc] rounded-2xl"
      style={{
        left: `${(position.x / 600) * 100}%`,
        top: `${(position.y / 600) * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={() => onSelect(selected === agent.id ? null : agent.id)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      animate={{ opacity: isActive ? 1 : 0.45, scale: isActive ? 1 : 0.92 }}
    >
      <motion.div
        className="relative w-[88px] h-[88px] rounded-2xl flex items-center justify-center border-2 backdrop-blur-md cursor-pointer"
        style={{
          background: diagramStyle.agentNodeBg(agent.color),
          borderColor: selected === agent.id ? agent.color : `${agent.color}55`,
          boxShadow: diagramStyle.agentShadow(agent.color, selected === agent.id),
        }}
        animate={
          selected === agent.id
            ? { boxShadow: [`0 0 20px ${agent.color}44`, `0 0 36px ${agent.color}55`, `0 0 20px ${agent.color}44`] }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={agent.color} strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={agent.icon} />
        </svg>
        {selected === agent.id && (
          <motion.span
            className="absolute -inset-1 rounded-2xl border-2 pointer-events-none"
            style={{ borderColor: agent.color }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
      <div className="text-center max-w-[120px]">
        <p
          className="text-xs font-semibold leading-tight"
          style={{ color: diagramStyle.centerText }}
        >
          {agent.label}
        </p>
        <p
          className="text-[10px] mt-0.5 hidden sm:block"
          style={{ color: diagramStyle.centerSubtext }}
        >
          {agent.role}
        </p>
      </div>
    </motion.button>
  );
}

function SystemDiagram({ selected, onSelect, isLight }) {
  const diagramStyle = DIAGRAM_THEME[isLight ? 'light' : 'dark'];
  const gradientId = isLight ? 'lakeGlowLight' : 'lakeGlowDark';

  const positions = useMemo(
    () => AGENTS.map((a) => ({ ...a, pos: polar(a.angle) })),
    []
  );

  return (
    <div className="relative w-full max-w-[640px] mx-auto aspect-square">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        role="img"
        aria-label="Agentic AI system with Patient Data Lake at center and four agents around it"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            {diagramStyle.lakeGlow.map((stop) => (
              <stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity}
              />
            ))}
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={ORBIT_R}
          fill="none"
          stroke={diagramStyle.orbitOuter}
          strokeWidth={1}
          strokeDasharray="6 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={ORBIT_R + 28}
          fill="none"
          stroke={diagramStyle.orbitInner}
          strokeWidth={1}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        />

        {positions.map(({ id, pos, color }) => {
          const active = selected === null || selected === id;
          return (
            <g key={id}>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={pos.x}
                y2={pos.y}
                stroke={color}
                strokeWidth={active ? 1.5 : 0.5}
                strokeOpacity={active ? (isLight ? 0.55 : 0.35) : isLight ? 0.2 : 0.12}
                strokeDasharray="4 6"
              />
              <DataParticles from={pos} to={CENTER} color={color} active={active} />
              <DataParticles from={CENTER} to={pos} color={color} active={active} reverse />
            </g>
          );
        })}

        {selected && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: isLight ? 0.35 : 0.2 }}>
            {positions
              .filter((a) => a.id !== selected)
              .map((a) => {
                const src = positions.find((p) => p.id === selected)?.pos;
                if (!src) return null;
                return (
                  <line
                    key={`cross-${a.id}`}
                    x1={src.x}
                    y1={src.y}
                    x2={a.pos.x}
                    y2={a.pos.y}
                    stroke={diagramStyle.crossStroke}
                    strokeWidth={0.5}
                    strokeDasharray="2 6"
                  />
                );
              })}
          </motion.g>
        )}

        <circle cx={CENTER.x} cy={CENTER.y} r={72} fill={`url(#${gradientId})`} />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={58}
          fill={diagramStyle.centerFill}
          stroke="#00ffcc"
          strokeWidth={2}
          filter={isLight ? undefined : 'url(#glow)'}
          animate={{ strokeOpacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={68}
          fill="none"
          stroke="#00ffcc"
          strokeWidth={1}
          strokeOpacity={isLight ? 0.45 : 0.3}
          animate={{ r: [66, 74, 66], strokeOpacity: isLight ? [0.25, 0.55, 0.25] : [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x={CENTER.x}
          y={CENTER.y - 8}
          textAnchor="middle"
          fill={diagramStyle.centerText}
          fontSize="13"
          fontWeight="600"
        >
          Patient
        </text>
        <text
          x={CENTER.x}
          y={CENTER.y + 10}
          textAnchor="middle"
          fill="#00cc9f"
          fontSize="13"
          fontWeight="600"
        >
          Data Lake
        </text>
        <text
          x={CENTER.x}
          y={CENTER.y + 28}
          textAnchor="middle"
          fill={diagramStyle.centerSubtext}
          fontSize="9"
        >
          Unified records
        </text>
      </svg>

      {positions.map((agent) => (
        <AgentNode
          key={agent.id}
          agent={agent}
          position={agent.pos}
          selected={selected}
          onSelect={onSelect}
          diagramStyle={diagramStyle}
        />
      ))}
    </div>
  );
}

const AGENT_DETAILS = {
  screening: {
    title: 'Screening Agent',
    desc: 'Ingests video, EEG, and audio; runs MASIM fusion; flags early risk patterns.',
    outputs: ['Risk scores', 'XAI factors', 'Screening reports'],
  },
  clinical: {
    title: 'Clinical Agent',
    desc: 'Translates AI outputs into clinician-ready summaries and developmental twin models.',
    outputs: ['Clinical notes', 'Twin trajectories', 'Referral prompts'],
  },
  therapy: {
    title: 'Therapy Agent',
    desc: 'Builds and adapts daily therapy plans from engagement and progress signals.',
    outputs: ['Daily plans', 'Difficulty tuning', 'Activity recommendations'],
  },
  monitoring: {
    title: 'Monitoring Agent',
    desc: 'Tracks milestones, detects regression, and sends parent-friendly alerts.',
    outputs: ['Parent alerts', 'Weekly trends', 'Milestone updates'],
  },
};

export default function AgenticSystem() {
  const [selected, setSelected] = useState(null);
  const { isLight } = useTheme();
  const detail = selected ? AGENT_DETAILS[selected] : null;

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#00ffcc] font-semibold mb-2">
          Multi-agent orchestration
        </p>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Agentic AI System</h1>
        <p className="text-[var(--app-text-muted)] mt-1 max-w-2xl">
          Specialized agents collaborate through a shared patient data lake. Click an agent to focus the
          data flows and view its role.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
        <motion.div
          className="agentic-diagram-panel rounded-2xl border backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden transition-colors duration-300"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="agentic-diagram-grid absolute inset-0 opacity-80 pointer-events-none" />
          <SystemDiagram selected={selected} onSelect={setSelected} isLight={isLight} />
          <p className="text-center text-xs text-[var(--app-text-muted)] mt-4 relative z-10">
            Live simulation · bidirectional sync with Patient Data Lake
          </p>
        </motion.div>

        <div className="space-y-4">
          {detail ? (
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-wider text-[#00ffcc] mb-2">Active agent</p>
              <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">{detail.title}</h2>
              <p className="text-sm text-[var(--app-text-muted)] mt-2 leading-relaxed">{detail.desc}</p>
              <p className="text-xs text-[var(--app-text-muted)] mt-4 mb-2 font-medium">Outputs to data lake</p>
              <ul className="space-y-2">
                {detail.outputs.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-[var(--app-text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]" />
                    {o}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-5 text-xs text-[var(--app-text-muted)] hover:text-[#00ffcc] transition-colors"
              >
                ← Show all agents
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">How it works</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--app-text-muted)]">
                <li className="flex gap-2">
                  <span className="text-[#00ffcc]">①</span>
                  All agents read and write to the central Patient Data Lake.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4ff]">②</span>
                  Data packets flow in real time (animated paths).
                </li>
                <li className="flex gap-2">
                  <span className="text-[#a78bfa]">③</span>
                  Click any agent to isolate its connections.
                </li>
              </ul>
            </div>
          )}

          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-[var(--app-text-muted)] mb-3 font-medium uppercase tracking-wider">
              Agent status
            </p>
            <ul className="space-y-2">
              {AGENTS.map((a) => (
                <li key={a.id} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--app-text-secondary)]">{a.label}</span>
                  <span className="flex items-center gap-1.5 text-[#00ffcc] text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
                    Active
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
