import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, ProgressBar, Button } from '../components/design-system';
import { ROUTES } from '../config/routes';

const CHILD = {
  name: 'Emma',
  age: '4 years old',
  stage: 'Getting ready for doctor visit',
};

const JOURNEY_STEPS = [
  { id: 'screening', label: 'Pre-Screening', status: 'completed', detail: 'Finished at home — great job!' },
  { id: 'triage', label: 'AI Summary Reviewed', status: 'completed', detail: 'Your report is ready to share' },
  { id: 'doctor', label: 'Doctor Consultation', status: 'pending', detail: 'Scheduled for Mar 28' },
  { id: 'therapy', label: 'Therapy Plan', status: 'upcoming', detail: 'Starts after your visit' },
  { id: 'tracking', label: 'Ongoing Progress', status: 'upcoming', detail: 'Weekly check-ins at home' },
];

const APPOINTMENTS = [
  {
    id: 1,
    title: 'Doctor visit',
    with: 'Dr. Sarah Chen',
    date: 'Mar 28, 2025',
    time: '10:30 AM',
    place: 'Sunrise Children\'s Clinic',
  },
  {
    id: 2,
    title: 'Speech play session',
    with: 'Maria Lopez',
    date: 'Apr 2, 2025',
    time: '2:00 PM',
    place: 'Video call',
  },
];

const WEEKLY_DAYS = [
  { day: 'Mon', done: true, activity: 'Speech play', mood: '😊' },
  { day: 'Tue', done: true, activity: 'Motor fun', mood: '🙂' },
  { day: 'Wed', done: true, activity: 'Social time', mood: '😊' },
  { day: 'Thu', done: false, activity: 'Rest day', mood: '—' },
  { day: 'Fri', done: false, activity: 'Speech play', mood: '—' },
  { day: 'Sat', done: false, activity: 'Family outing', mood: '—' },
  { day: 'Sun', done: false, activity: 'Weekly check-in', mood: '—' },
];

const WEEKLY_SCORES = [
  { week: 'W1', score: 58 },
  { week: 'W2', score: 62 },
  { week: 'W3', score: 60 },
  { week: 'W4', score: 68 },
  { week: 'W5', score: 72 },
  { week: 'W6', score: 78 },
];

const THERAPY_ADHERENCE = [
  { label: 'Speech activities at home', value: 85 },
  { label: 'Movement & play exercises', value: 72 },
  { label: 'Social connection time', value: 68 },
];

const MILESTONES = [
  { id: 1, title: 'First shared smile during play', date: 'Jan 8', done: true },
  { id: 2, title: 'Said a new word clearly', date: 'Feb 2', done: true },
  { id: 3, title: 'Pointed to show something interesting', date: 'Mar 10', done: true },
  { id: 4, title: 'Took turns in a simple game', date: 'Working on it', done: false, current: true },
  { id: 5, title: 'Used two words together', date: 'Coming up', done: false },
];

const DOCTOR_MESSAGES = [
  {
    id: 1,
    from: 'Dr. Sarah Chen',
    time: 'Mar 18',
    preview: 'Thanks for completing the home screening. Emma\'s results look ready for our visit — please bring her favorite comfort toy.',
  },
  {
    id: 2,
    from: 'Dr. Sarah Chen',
    time: 'Mar 12',
    preview: 'No need to prepare anything special before the appointment. We\'ll walk you through everything together.',
  },
];

const TWIN_DOMAINS = [
  { label: 'Talking & listening', value: 72, trend: 'Growing steadily' },
  { label: 'Movement & play', value: 78, trend: 'Strong this month' },
  { label: 'Connecting with others', value: 65, trend: 'Small steps forward' },
];

const CHART = { width: 480, height: 180, pad: { top: 20, right: 16, bottom: 32, left: 36 } };

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

function journeyStatusLabel(status) {
  if (status === 'completed') return 'Completed';
  if (status === 'pending') return 'Pending';
  return 'Up next';
}

function journeyStatusClass(status) {
  if (status === 'completed') return 'status-pill-success';
  if (status === 'pending') return 'status-pill-info';
  return 'status-pill';
}

function ChildProfileCard() {
  return (
    <Card className="!p-6 bg-gradient-to-br from-[var(--accent-primary-muted)] to-transparent">
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-semibold shrink-0 border"
          style={{
            background: 'var(--accent-primary-muted)',
            borderColor: 'color-mix(in srgb, var(--accent-primary) 30%, var(--app-border))',
            color: 'var(--accent-primary)',
          }}
        >
          {CHILD.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-[var(--app-text-muted)] font-medium">Child profile</p>
          <h2 className="text-xl font-semibold text-[var(--app-text-primary)] mt-1">{CHILD.name}</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-[var(--app-text-muted)] shrink-0">Age</dt>
              <dd className="text-[var(--app-text-primary)] font-medium">{CHILD.age}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[var(--app-text-muted)] shrink-0">Current stage</dt>
              <dd className="text-[var(--app-text-primary)] font-medium">{CHILD.stage}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Card>
  );
}

function JourneyStatus() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Current journey status</h2>
      <p className="text-sm text-[var(--app-text-muted)] mt-1">Where you are in Emma&apos;s care path</p>

      <ul className="mt-5 space-y-3" role="list">
        {JOURNEY_STEPS.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="theme-list-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-xl"
          >
            <div>
              <p className="font-medium text-[var(--app-text-primary)]">{step.label}</p>
              <p className="text-sm text-[var(--app-text-muted)] mt-0.5">{step.detail}</p>
            </div>
            <span className={`status-pill shrink-0 ${journeyStatusClass(step.status)}`}>
              {journeyStatusLabel(step.status)}
            </span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

function UpcomingAppointments() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Upcoming appointments</h2>
      <p className="text-sm text-[var(--app-text-muted)] mt-1">What&apos;s on the calendar next</p>

      <ul className="mt-5 space-y-3" role="list">
        {APPOINTMENTS.map((appt, i) => (
          <motion.li
            key={appt.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="theme-list-row p-4 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <p className="font-medium text-[var(--app-text-primary)]">{appt.title}</p>
                <p className="text-sm text-[var(--app-text-muted)] mt-0.5">With {appt.with}</p>
              </div>
              <div className="text-sm text-right shrink-0">
                <p className="text-[var(--app-text-primary)] font-medium">{appt.date}</p>
                <p className="text-[var(--app-text-muted)]">{appt.time}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--app-text-muted)] mt-2">{appt.place}</p>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

function WeeklyProgress() {
  const completed = WEEKLY_DAYS.filter((d) => d.done).length;
  const path = WEEKLY_SCORES.map((w, i) => {
    const p = scalePoint(i, w.score);
    return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(' ');
  const improvement = WEEKLY_SCORES.at(-1).score - WEEKLY_SCORES[0].score;

  return (
    <Card className="!p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Weekly progress</h2>
          <p className="text-sm text-[var(--app-text-muted)] mt-1">
            {CHILD.name} is moving forward — up {improvement} points over six weeks
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[var(--accent-primary)] tabular-nums">
            {completed}/{WEEKLY_DAYS.length}
          </p>
          <p className="text-xs text-[var(--app-text-muted)]">activity days this week</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {WEEKLY_DAYS.map((item) => (
          <div
            key={item.day}
            className={`flex flex-col items-center rounded-xl p-2 text-center border ${
              item.done
                ? 'bg-[var(--accent-primary-muted)] border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))]'
                : 'bg-[var(--app-surface)] border-[var(--app-border)]'
            }`}
          >
            <span className="text-[10px] text-[var(--app-text-muted)] font-medium">{item.day}</span>
            <span className="text-base my-1">{item.done ? '✓' : '○'}</span>
            <span className="text-[9px] text-[var(--app-text-muted)] leading-tight hidden sm:block">
              {item.activity}
            </span>
          </div>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Weekly progress trend over six weeks"
      >
        <motion.path
          d={path}
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {WEEKLY_SCORES.map((w, i) => {
          const p = scalePoint(i, w.score);
          return (
            <g key={w.week}>
              <circle cx={p.x} cy={p.y} r={4} fill="var(--accent-primary)" />
              <text x={p.x} y={CHART.height - 10} textAnchor="middle" className="fill-[var(--app-text-muted)] text-[10px]">
                {w.week}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}

function TherapyAdherence() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Therapy adherence</h2>
      <p className="text-sm text-[var(--app-text-muted)] mt-1">How often home activities were completed this week</p>

      <div className="mt-5 space-y-5">
        {THERAPY_ADHERENCE.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ProgressBar label={item.label} value={item.value} />
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-[var(--app-text-muted)] mt-5">
        You&apos;re doing well — even short sessions count. Consistency matters more than perfection.
      </p>
    </Card>
  );
}

function MilestoneTracker() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Milestone tracker</h2>
      <p className="text-sm text-[var(--app-text-muted)] mt-1">Little wins along the way</p>

      <div className="relative mt-6">
        <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-[var(--app-border)]" aria-hidden />
        <ul className="space-y-0" role="list">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold border-2 ${
                  m.done
                    ? 'bg-[var(--accent-primary-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    : m.current
                      ? 'bg-[color-mix(in_srgb,#ff9ecd_12%,var(--app-surface))] border-[#ff9ecd] text-[#ff9ecd]'
                      : 'bg-[var(--app-surface)] border-[var(--app-border)] text-[var(--app-text-muted)]'
                }`}
              >
                {m.done ? '✓' : m.current ? '★' : ''}
              </div>
              <div className={`flex-1 pt-0.5 ${!m.done && !m.current ? 'opacity-60' : ''}`}>
                <p className="text-sm font-medium text-[var(--app-text-primary)]">{m.title}</p>
                <p className="text-xs text-[var(--app-text-muted)] mt-0.5">
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

function DoctorMessages() {
  return (
    <Card className="!p-6">
      <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Messages from doctor</h2>
      <p className="text-sm text-[var(--app-text-muted)] mt-1">Notes and reminders from your care team</p>

      <ul className="mt-5 space-y-3" role="list">
        {DOCTOR_MESSAGES.map((msg, i) => (
          <motion.li
            key={msg.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="theme-list-row p-4 rounded-xl"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-sm font-medium text-[var(--app-text-primary)]">{msg.from}</p>
              <span className="text-xs text-[var(--app-text-muted)]">{msg.time}</span>
            </div>
            <p className="text-sm text-[var(--app-text-muted)] leading-relaxed">{msg.preview}</p>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

function DigitalTwinSnapshot() {
  const navigate = useNavigate();

  return (
    <Card className="!p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">Digital twin snapshot</h2>
          <p className="text-sm text-[var(--app-text-muted)] mt-1">
            A simple picture of how {CHILD.name} is growing in key areas
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => navigate(ROUTES.DIGITAL_TWIN)}>
          View full picture
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TWIN_DOMAINS.map((domain, i) => (
          <motion.div
            key={domain.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4"
          >
            <p className="text-sm font-medium text-[var(--app-text-primary)]">{domain.label}</p>
            <p className="text-2xl font-bold text-[var(--accent-primary)] tabular-nums mt-2">{domain.value}%</p>
            <ProgressBar value={domain.value} showLabel={false} height="sm" className="mt-3" />
            <p className="text-xs text-[var(--app-text-muted)] mt-2">{domain.trend}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-[var(--app-text-muted)] mt-4">
        This snapshot updates as you complete activities and visits. It helps your team see the full story over time.
      </p>
    </Card>
  );
}

export default function ParentDashboard() {
  return (
    <div className="space-y-6 pb-12 w-full max-w-7xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6"
      >
        <p className="text-sm text-[var(--accent-primary)] font-medium mb-1">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--app-text-primary)]">
          {CHILD.name}&apos;s journey
        </h1>
        <p className="text-[var(--app-text-muted)] mt-2 text-sm sm:text-base max-w-2xl">
          A calm, simple overview of where things stand — no medical jargon, just what matters for your family.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ChildProfileCard />
          <JourneyStatus />
          <UpcomingAppointments />
        </div>

        <div className="space-y-6">
          <WeeklyProgress />
          <TherapyAdherence />
          <MilestoneTracker />
        </div>

        <div className="space-y-6">
          <DoctorMessages />
          <DigitalTwinSnapshot />
        </div>
      </div>
    </div>
  );
}
