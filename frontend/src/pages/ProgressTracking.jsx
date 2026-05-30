import { motion } from 'framer-motion';
import { Card, ProgressBar } from '../components/design-system';

const WEEKLY_SCORES = [
  { week: 'W1', score: 58 },
  { week: 'W2', score: 62 },
  { week: 'W3', score: 60 },
  { week: 'W4', score: 68 },
  { week: 'W5', score: 72 },
  { week: 'W6', score: 78 },
];

const MILESTONES = [
  { label: 'First eye contact during play', done: true, date: 'Feb 12' },
  { label: 'Used two-word phrases', done: true, date: 'Mar 3' },
  { label: 'Joined peer activity', done: false, date: 'In progress' },
  { label: 'Completed full screening', done: true, date: 'Jan 28' },
];

export default function ProgressTracking() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Progress Tracking</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Weekly trends and milestones for your child&apos;s journey</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold text-[var(--app-text-primary)] mb-4">Weekly wellbeing score</h2>
          <div className="flex items-end gap-2 h-40">
            {WEEKLY_SCORES.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-[var(--accent-primary)]/80"
                  style={{ height: `${w.score}%` }}
                />
                <span className="text-xs text-[var(--app-text-muted)]">{w.week}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-[var(--app-text-primary)] mb-4">Therapy adherence</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--app-text-muted)]">Speech activities</span>
                <span className="text-[var(--app-text-primary)] font-medium">85%</span>
              </div>
              <ProgressBar value={85} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--app-text-muted)]">Motor skills</span>
                <span className="text-[var(--app-text-primary)] font-medium">72%</span>
              </div>
              <ProgressBar value={72} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--app-text-muted)]">Social play</span>
                <span className="text-[var(--app-text-primary)] font-medium">68%</span>
              </div>
              <ProgressBar value={68} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-[var(--app-text-primary)] mb-4">Milestone tracker</h2>
        <ul className="space-y-3">
          {MILESTONES.map((m) => (
            <li
              key={m.label}
              className="flex items-center justify-between gap-4 p-3 rounded-lg theme-list-row"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={m.done ? 'text-[var(--accent-primary)]' : 'text-[var(--app-text-muted)]'}>
                  {m.done ? '✓' : '○'}
                </span>
                <span className="text-sm text-[var(--app-text-primary)] truncate">{m.label}</span>
              </div>
              <span className="text-xs text-[var(--app-text-muted)] shrink-0">{m.date}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
