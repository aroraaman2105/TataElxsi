import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const weeks = [
  { week: 'Week 1', score: 62 },
  { week: 'Week 2', score: 68 },
  { week: 'Week 3', score: 71 },
  { week: 'Week 4', score: 75 },
  { week: 'Week 5', score: 78 },
  { week: 'Week 6', score: 82 },
];

export default function ProgressTracking() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress Tracking" subtitle="Weekly milestones and developmental trends" />
      <div className="glass-card p-6 rounded-xl">
        <p className="text-sm text-[var(--app-text-muted)] mb-4">
          Emma&apos;s engagement score over the last 6 weeks —{' '}
          <span className="text-[#00ffcc] font-medium">+20 points</span> overall
        </p>
        <div className="flex items-end gap-2 h-40">
          {weeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ height: 0 }}
              animate={{ height: `${w.score}%` }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#00ffcc]/30 to-[#00ffcc]/70 min-h-[4px]"
              title={`${w.week}: ${w.score}%`}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {weeks.map((w) => (
            <span key={w.week} className="flex-1 text-[10px] text-center text-[var(--app-text-muted)]">
              {w.week.replace('Week ', 'W')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
