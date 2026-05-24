import { motion } from 'framer-motion';
import { Card } from '../components/design-system';

const CHILD_NAME = 'Emma';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAILY_PROGRESS = [
  { day: 'Mon', done: true, label: 'Speech play', mood: '😊' },
  { day: 'Tue', done: true, label: 'Motor fun', mood: '🙂' },
  { day: 'Wed', done: true, label: 'Social time', mood: '😊' },
  { day: 'Thu', done: false, label: 'Rest day', mood: '—' },
  { day: 'Fri', done: false, label: 'Speech play', mood: '—' },
  { day: 'Sat', done: false, label: 'Family activity', mood: '—' },
  { day: 'Sun', done: false, label: 'Check-in', mood: '—' },
];

const WEEKLY_SCORES = [
  { week: 'W1', score: 58 },
  { week: 'W2', score: 62 },
  { week: 'W3', score: 60 },
  { week: 'W4', score: 68 },
  { week: 'W5', score: 72 },
  { week: 'W6', score: 78 },
];

const ALERTS = [
  {
    id: 'regression',
    type: 'attention',
    emoji: '💛',
    title: 'Regression detected',
    message: 'Social play was a bit harder this week. Your therapist has a gentler plan ready—nothing to worry about!',
    time: '2 days ago',
  },
  {
    id: 'speech',
    type: 'celebration',
    emoji: '🎉',
    title: 'Improvement in speech',
    message: `${CHILD_NAME} used 3 new words during story time. Great job practicing at home!`,
    time: 'Today',
  },
];

const MILESTONES = [
  { id: 1, title: 'First shared smile', date: 'Jan 8', done: true },
  { id: 2, title: 'Said "mama" clearly', date: 'Feb 2', done: true },
  { id: 3, title: 'Pointed to show interest', date: 'Mar 10', done: true },
  { id: 4, title: 'Took turns in a game', date: 'In progress', done: false, current: true },
  { id: 5, title: 'Two-word phrases', date: 'Coming up', done: false },
  { id: 6, title: 'Played with a friend', date: 'Coming up', done: false },
];

const CHART = { width: 480, height: 200, pad: { top: 24, right: 20, bottom: 36, left: 40 } };

function scalePoint(index, score) {
  const { width, height, pad } = CHART;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = WEEKLY_SCORES.length - 1;
  const minScore = 50;
  const maxScore = 85;
  const x = pad.left + (index / max) * plotW;
  const y = pad.top + plotH - ((score - minScore) / (maxScore - minScore)) * plotH;
  return { x, y };
}

function toPath() {
  return WEEKLY_SCORES.map((w, i) => {
    const p = scalePoint(i, w.score);
    return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(' ');
}

function DailyTracker() {
  const completed = DAILY_PROGRESS.filter((d) => d.done).length;
  const total = DAILY_PROGRESS.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <Card className="!p-6 bg-gradient-to-br from-[#ff9ecd]/[0.06] to-transparent border-[#ff9ecd]/15">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Today&apos;s progress</h2>
          <p className="text-sm text-slate-400 mt-0.5">How the week is going</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#ff9ecd] tabular-nums">{pct}%</p>
          <p className="text-xs text-slate-500">{completed} of {total} days</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAILY_PROGRESS.map((item, i) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col items-center rounded-xl p-2 text-center transition-colors ${
              item.done
                ? 'bg-[#00ffcc]/10 border border-[#00ffcc]/25'
                : i === 3
                  ? 'bg-white/[0.06] border-2 border-[#ff9ecd]/40 ring-1 ring-[#ff9ecd]/20'
                  : 'bg-white/[0.02] border border-white/5'
            }`}
          >
            <span className="text-[10px] text-slate-500 font-medium">{item.day}</span>
            <span className="text-lg my-1">{item.done ? '✓' : i === 3 ? '★' : '○'}</span>
            <span className="text-[9px] text-slate-500 leading-tight hidden sm:block">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-slate-400 mt-4 text-center">
        You&apos;re doing great — <span className="text-white">Thursday</span> is your next activity day.
      </p>
    </Card>
  );
}

function WeeklyGraph() {
  const path = toPath();
  const last = WEEKLY_SCORES[WEEKLY_SCORES.length - 1];
  const first = WEEKLY_SCORES[0];
  const improvement = last.score - first.score;

  return (
    <Card className="!p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Weekly improvement</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          {CHILD_NAME}&apos;s overall progress — up{' '}
          <span className="text-[#00ffcc] font-medium">{improvement} points</span> in 6 weeks 🌱
        </p>
      </div>

      <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} className="w-full h-auto" role="img" aria-label="Weekly improvement chart">
        <defs>
          <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ffcc" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity={0} />
          </linearGradient>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00ffcc" floodOpacity="0.4" />
          </filter>
        </defs>

        {[60, 70, 80].map((score) => {
          const { y } = scalePoint(0, score);
          return (
            <line
              key={score}
              x1={CHART.pad.left}
              y1={y}
              x2={CHART.width - CHART.pad.right}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 4"
            />
          );
        })}
        <motion.path
          d={path}
          fill="none"
          stroke="#00ffcc"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={`${path} L ${scalePoint(WEEKLY_SCORES.length - 1, 50).x} ${CHART.height - CHART.pad.bottom} L ${scalePoint(0, 50).x} ${CHART.height - CHART.pad.bottom} Z`}
          fill="url(#weeklyGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        {WEEKLY_SCORES.map((w, i) => {
          const p = scalePoint(i, w.score);
          return (
            <g key={w.week}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={5}
                fill="#00ffcc"
                stroke="#0b0f14"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
              <text x={p.x} y={CHART.height - 12} textAnchor="middle" className="fill-slate-500 text-[11px]">
                {w.week}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}

function AlertCard({ alert, index }) {
  const isCelebration = alert.type === 'celebration';
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl p-4 border flex gap-4 ${
        isCelebration
          ? 'bg-[#00ffcc]/[0.06] border-[#00ffcc]/20'
          : 'bg-amber-500/[0.06] border-amber-400/20'
      }`}
    >
      <span className="text-3xl flex-shrink-0" aria-hidden>
        {alert.emoji}
      </span>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="font-semibold text-white text-sm">{alert.title}</h3>
          <span className="text-xs text-slate-500">{alert.time}</span>
        </div>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{alert.message}</p>
      </div>
    </motion.div>
  );
}

function MilestoneTracker() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-white mb-1">Milestone tracker</h2>
      <p className="text-sm text-slate-400 mb-6">Little wins along the way ✨</p>

      <div className="relative">
        <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-white/10" aria-hidden />
        <ul className="space-y-0" role="list">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold border-2 ${
                  m.done
                    ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc]'
                    : m.current
                      ? 'bg-[#ff9ecd]/20 border-[#ff9ecd] text-[#ff9ecd] animate-pulse'
                      : 'bg-white/5 border-white/15 text-slate-600'
                }`}
              >
                {m.done ? '✓' : m.current ? '★' : ''}
              </div>
              <div className={`flex-1 pt-0.5 ${!m.done && !m.current ? 'opacity-50' : ''}`}>
                <p className={`text-sm font-medium ${m.done || m.current ? 'text-white' : 'text-slate-400'}`}>
                  {m.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {m.done ? `Reached ${m.date}` : m.current ? 'Working on it now' : m.date}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function ParentTips() {
  return (
    <Card className="!p-5 bg-gradient-to-br from-[#ff9ecd]/[0.04] to-transparent border-[#ff9ecd]/15">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-[#ff9ecd]/10 flex items-center justify-center text-[#ff9ecd] flex-shrink-0 border border-[#ff9ecd]/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm">Today&apos;s tip</h3>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Use visual cards for speech activities today. Emma responds <span className="text-[#00ffcc] font-medium">40% better</span> to visual prompts than verbal ones when tired.
          </p>
        </div>
      </div>
    </Card>
  );
}

function TherapistNotes() {
  return (
    <Card className="!p-5 bg-gradient-to-br from-[#00ffcc]/[0.04] to-transparent border-[#00ffcc]/15">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-sm">Therapist Notes</h3>
          <span className="text-[10px] text-slate-500 font-medium">Updated yesterday</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Emma is showing great progress in turn-taking. Let&apos;s focus on two-word phrases during dinner table conversations this week.
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <div className="w-6 h-6 rounded-full bg-[#00ffcc]/20 flex items-center justify-center text-[#00ffcc] text-xs font-bold">
            S
          </div>
          <span className="text-xs text-slate-400 font-medium">Dr. Sarah Cole, Speech Pathologist</span>
        </div>
      </div>
    </Card>
  );
}

export default function ParentDashboard() {
  return (
    <div className="space-y-6 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r from-[#ff9ecd]/10 via-[#00ffcc]/5 to-transparent border border-white/10 p-6"
      >
        <p className="text-sm text-[#ff9ecd] font-medium mb-1">Welcome back 👋</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          {CHILD_NAME}&apos;s journey
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl">
          A simple look at how things are going — no medical jargon, just what matters for your family.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Daily Tracker & Milestones */}
        <div className="space-y-6">
          <DailyTracker />
          <MilestoneTracker />
        </div>

        {/* Column 2: Weekly Progress & Parent Tips */}
        <div className="space-y-6">
          <WeeklyGraph />
          <ParentTips />
        </div>

        {/* Column 3: Alerts & Therapist Notes */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Updates for you</h2>
            <div className="space-y-3">
              {ALERTS.map((alert, i) => (
                <AlertCard key={alert.id} alert={alert} index={i} />
              ))}
            </div>
          </div>
          <TherapistNotes />
        </div>
      </div>
    </div>
  );
}
