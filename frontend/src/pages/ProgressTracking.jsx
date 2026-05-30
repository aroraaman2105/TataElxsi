import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, ProgressBar } from '../components/design-system';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function ProgressTracking() {
  // Mock longitudinal data for overall developmental growth + 4-week forecast
  const developmentalProgress = [
    { name: 'Week 1', score: 52, forecast: null },
    { name: 'Week 2', score: 58, forecast: null },
    { name: 'Week 3', score: 55, forecast: null },
    { name: 'Week 4', score: 64, forecast: null },
    { name: 'Week 5', score: 68, forecast: null },
    { name: 'Week 6', score: 72, forecast: 72 }, // crossover point
    { name: 'Week 7 (Proj.)', score: null, forecast: 76 },
    { name: 'Week 8 (Proj.)', score: null, forecast: 79 },
    { name: 'Week 9 (Proj.)', score: null, forecast: 83 },
    { name: 'Week 10 (Proj.)', score: null, forecast: 86 }
  ];

  // Mock longitudinal data for specific behaviors (weeks 1 to 6)
  const behaviorTrends = [
    { name: 'Week 1', eyeFocus: 45, transitionCalm: 55 },
    { name: 'Week 2', eyeFocus: 52, transitionCalm: 50 },
    { name: 'Week 3', eyeFocus: 50, transitionCalm: 58 },
    { name: 'Week 4', eyeFocus: 62, transitionCalm: 60 },
    { name: 'Week 5', eyeFocus: 65, transitionCalm: 54 }, // minor regression
    { name: 'Week 6', eyeFocus: 74, transitionCalm: 68 }
  ];

  const milestones = [
    { id: 1, label: 'Sustained eye contact during bubble play', done: true, date: 'Feb 12', note: 'Liam held eye contact for 2.2 seconds! 🥳' },
    { id: 2, label: 'Imitated two-word phrasing loops', done: true, date: 'Mar 03', note: 'Perfect pitch matching in vocal games. 🗣️' },
    { id: 3, label: 'Stayed calm during toy clean-up transition', done: true, date: 'May 14', note: 'Used breathing visualizer tool to transition. 🧸' },
    { id: 4, label: 'Shared play block with a peer', done: false, date: 'In progress', note: 'Currently practicing during morning social group.' },
    { id: 5, label: 'Responded to name on first verbal call', done: false, date: 'Next step', note: 'Goal set for upcoming social play games.' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Liam&apos;s Journey Tracker</h1>
        <p className="text-[var(--app-text-muted)] mt-1">A supportive space to trace Liam&apos;s developmental milestones, daily activities, and visual progress charts.</p>
      </motion.div>

      {/* Hero Stats / Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Weekly Wellbeing Growth</span>
            <h3 className="text-2xl font-bold text-[var(--app-text-primary)] mt-1.5 font-sans">+20% <span className="text-xs font-normal text-[var(--app-text-muted)]">vs baseline</span></h3>
          </div>
          <p className="text-[10px] text-[var(--accent-primary)] font-semibold mt-3">✓ Great work! Liam is making steady strides in gaze and speech cycles.</p>
        </Card>

        <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Daily Therapy Completion</span>
            <h3 className="text-2xl font-bold text-[var(--app-text-primary)] mt-1.5 font-sans">75% <span className="text-xs font-normal text-[var(--app-text-muted)]">average</span></h3>
          </div>
          <div className="mt-3">
            <ProgressBar value={75} />
          </div>
        </Card>

        <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Completed Milestones</span>
            <h3 className="text-2xl font-bold text-[var(--app-text-primary)] mt-1.5 font-sans">3 / 5</h3>
          </div>
          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-3">🌟 1 milestone currently in progress!</p>
        </Card>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Improvement & Forecast Chart */}
        <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider">Weekly Improvement & Growth Forecast</h3>
            <p className="text-[10px] text-[var(--app-text-muted)] mt-0.5">Historical growth index paired with a 4-week forecast based on consistent therapy routines.</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={developmentalProgress} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--app-text-muted)" fontSize={9} tickLine={false} />
                <YAxis stroke="var(--app-text-muted)" fontSize={9} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--app-bg-elevated)', borderColor: 'var(--app-border)', color: 'var(--app-text-primary)', fontSize: '10px' }} />
                <Area type="monotone" dataKey="score" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#growthGrad)" name="Recorded Growth" />
                <Area type="monotone" dataKey="forecast" stroke="var(--accent-secondary)" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#forecastGrad)" name="Projected Path" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Behavior Trends Chart */}
        <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider">Longitudinal Behavioral Trends</h3>
            <p className="text-[10px] text-[var(--app-text-muted)] mt-0.5">Traces day-to-day engagement states such as eye focus and calmness during changes.</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={behaviorTrends} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--app-text-muted)" fontSize={9} tickLine={false} />
                <YAxis stroke="var(--app-text-muted)" fontSize={9} tickLine={false} domain={[30, 90]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--app-bg-elevated)', borderColor: 'var(--app-border)', color: 'var(--app-text-primary)', fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="eyeFocus" stroke="var(--accent-primary)" strokeWidth={2.5} name="Eye Focus & Attention" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="transitionCalm" stroke="#a78bfa" strokeWidth={2.5} name="Comfort in Transitions" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Therapy completion & regression warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Therapy completion stats */}
        <Card className="lg:col-span-1 space-y-4 border border-[var(--app-border)] bg-[var(--app-surface)]">
          <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider border-b border-[var(--app-border)] pb-2">
            🏆 Active Interventions
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[var(--app-text-secondary)]">Speech & Vocals</span>
                <span className="text-[var(--accent-primary)] font-bold">85% Completed</span>
              </div>
              <ProgressBar value={85} />
              <p className="text-[9px] text-[var(--app-text-muted)] mt-1">Liam loved the word-imitation games this week!</p>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[var(--app-text-secondary)]">Motor Coordination</span>
                <span className="text-[var(--accent-secondary)] font-bold">72% Completed</span>
              </div>
              <ProgressBar value={72} />
              <p className="text-[9px] text-[var(--app-text-muted)] mt-1">Finger coordinate loops are moving up steadily.</p>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[var(--app-text-secondary)]">Social Play Exercises</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">68% Completed</span>
              </div>
              <ProgressBar value={68} />
              <p className="text-[9px] text-[var(--app-text-muted)] mt-1">Daily interactive reading sessions help build vocabulary.</p>
            </div>
          </div>
        </Card>

        {/* Reassuring Empathetic Regression Alerts */}
        <Card className="lg:col-span-2 space-y-4 border border-[var(--app-border)] bg-[var(--app-surface)]">
          <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider border-b border-[var(--app-border)] pb-2">
            🌱 Reassuring Guideposts & Warnings
          </h3>

          <div className="space-y-3.5">
            
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex gap-3 text-xs leading-relaxed">
              <span className="text-lg shrink-0 mt-0.5">🌱</span>
              <div>
                <h4 className="font-bold text-amber-600 dark:text-amber-300 text-[11px] uppercase tracking-wider">A Gentle Note on Transitions (Week 5)</h4>
                <p className="text-[var(--app-text-secondary)] mt-1">
                  Developmental peaks and valleys are completely normal. Liam experienced a minor dip in calmness during changes on Wednesday. This is a standard adjustment phase! 
                </p>
                <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-800 dark:text-amber-200">
                  💡 <strong>Home Tip:</strong> Practice the short 2-minute bubble-pop cleaning game before dinner. Keeps transitions playful and predictable.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/[0.04] flex gap-3 text-xs leading-relaxed">
              <span className="text-lg shrink-0 mt-0.5">🎨</span>
              <div>
                <h4 className="font-bold text-purple-600 dark:text-purple-300 text-[11px] uppercase tracking-wider">Sensory Reactivity Observations</h4>
                <p className="text-[var(--app-text-secondary)] mt-1">
                  Our system noticed Liam showed slightly higher sensitivity to coarse textures. This is a common pattern when introducing new games.
                </p>
                <div className="mt-2.5 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-800 dark:text-purple-200">
                  💡 <strong>Home Tip:</strong> Try playing with soft damp clay or smooth playdough first. Gradually introduce texture seeds later.
                </div>
              </div>
            </div>

          </div>
        </Card>

      </div>

      {/* Milestone progress card */}
      <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
        <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider border-b border-[var(--app-border)] pb-2">
          🎉 Milestone Celebrations
        </h3>
        
        <div className="divide-y divide-[var(--app-border)]">
          {milestones.map((m) => (
            <div key={m.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <div className="flex items-start gap-3 min-w-0">
                <span className={`text-sm shrink-0 ${m.done ? 'text-[var(--accent-primary)]' : 'text-[var(--app-text-muted)]'}`}>
                  {m.done ? '✓' : '○'}
                </span>
                <div>
                  <p className={`font-semibold ${m.done ? 'text-[var(--app-text-primary)]' : 'text-[var(--app-text-muted)]'}`}>{m.label}</p>
                  <p className="text-[10px] text-[var(--app-text-muted)] mt-0.5">{m.note}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border shrink-0 sm:self-center self-start ${
                m.date === 'In progress' ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' :
                m.date === 'Next step' ? 'text-[var(--app-text-muted)] bg-[var(--app-surface-muted)] border-[var(--app-border)]' :
                'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {m.date}
              </span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
