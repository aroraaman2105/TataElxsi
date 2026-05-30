import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, ProgressBar } from '../components/design-system';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function TherapistDashboard() {
  const navigate = useNavigate();

  // Mock engagement data for Recharts AreaChart
  const engagementTrend = [
    { session: 'S1', eyeContact: 65, speechProsody: 55, motorControl: 70 },
    { session: 'S2', eyeContact: 72, speechProsody: 58, motorControl: 68 },
    { session: 'S3', eyeContact: 70, speechProsody: 64, motorControl: 75 },
    { session: 'S4', eyeContact: 78, speechProsody: 68, motorControl: 82 },
    { session: 'S5', eyeContact: 84, speechProsody: 72, motorControl: 80 }
  ];

  // Today's schedule data
  const todaysSessions = [
    { id: 'liam-carter', name: 'Liam Carter', age: '4y', time: '10:00 AM', focus: 'Social Gaze Loop Training', status: 'Checked In' },
    { id: 'lucas-davis', name: 'Lucas Davis', age: '4y', time: '11:30 AM', focus: 'Stereotypy De-escalation', status: 'Checked In' },
    { id: 'ava-wilson', name: 'Ava Wilson', age: '5y', time: '02:00 PM', focus: 'Tactile Sensory Integration', status: 'Scheduled' },
    { id: 'oliver-thomas', name: 'Oliver Thomas', age: '3y', time: '03:30 PM', focus: 'Vestibular Regulation', status: 'Scheduled' }
  ];

  // Assigned Patients data
  const assignedPatients = [
    { id: 'liam-carter', name: 'Liam Carter', age: '4y', goal: 'Gaze gaze > 1.5s', progress: 75, risk: 'High' },
    { id: 'lucas-davis', name: 'Lucas Davis', age: '4y', goal: 'Flapping rate reduction', progress: 40, risk: 'High' },
    { id: 'oliver-thomas', name: 'Oliver Thomas', age: '3y', goal: 'Tactile tolerance', progress: 60, risk: 'High' },
    { id: 'ava-wilson', name: 'Ava Wilson', age: '5y', goal: 'Fine motor precision', progress: 80, risk: 'Medium' },
    { id: 'emma-larson', name: 'Emma Larson', age: '6y', goal: 'Vocal affect variance', progress: 85, risk: 'Medium' }
  ];

  // Progress Alerts data
  const progressAlerts = [
    { id: 1, type: 'milestone', title: 'Gaze Milestone Reached', patient: 'Liam Carter', message: 'Sustained joint gaze reached 2.2s on target tracker. Exceeded baseline threshold.', date: 'Just now' },
    { id: 2, type: 'warning', title: 'Motor Flapping Anomaly', patient: 'Lucas Davis', message: 'Repetitive stereotypy flapping index surged to 3.4Hz during transitions. Adjustment advised.', date: '10m ago' },
    { id: 3, type: 'critical', title: 'Sensory Avoidance Triggered', patient: 'Oliver Thomas', message: 'Parent session logs indicate high avoidance reaction to dry sand play. Reset task.', date: '1h ago' }
  ];

  // Adaptive recommendations
  const adaptiveRecommendations = [
    { id: 1, category: 'Visual Reward', patient: 'Liam Carter', rec: 'Increase gaze attention reward trigger latency from 1200ms to 1350ms.', action: 'Apply Optimization' },
    { id: 2, category: 'Tactile Play', patient: 'Oliver Thomas', rec: 'Introduce damp putty clay instead of dry sand to decrease avoidance.', action: 'Swap Exercise' },
    { id: 3, category: 'Acoustic Game', patient: 'Emma Larson', rec: 'Enable high-octave voice mimicry pitch maps in speech modules.', action: 'Scale Difficulty' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Therapist Console</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Coordinate client interventions, evaluate session feedback, and review AI recommendations.</p>
      </motion.div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Card
          onClick={() => navigate('/dashboard/therapy-planner')}
          className="border border-[var(--app-border)] bg-[var(--app-surface)] hover:border-[var(--accent-primary)]/30 hover:shadow-[0_0_15px_rgba(0,255,204,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-[var(--app-text-primary)] uppercase group-hover:text-[var(--accent-primary)] transition-colors">Therapy Planner</h4>
            <p className="text-[10px] text-[var(--app-text-muted)] mt-1">Design games and schedule tasks.</p>
          </div>
          <span className="text-xl text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">⚙️ →</span>
        </Card>

        <Card
          onClick={() => navigate('/dashboard/progress-tracker')}
          className="border border-[var(--app-border)] bg-[var(--app-surface)] hover:border-[var(--accent-secondary)]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-[var(--app-text-primary)] uppercase group-hover:text-[var(--accent-secondary)] transition-colors">Progress Tracker</h4>
            <p className="text-[10px] text-[var(--app-text-muted)] mt-1">Track child milestones over cycles.</p>
          </div>
          <span className="text-xl text-[var(--accent-secondary)] group-hover:translate-x-1 transition-transform">📊 →</span>
        </Card>

        <Card
          onClick={() => navigate('/dashboard/session-notes')}
          className="border border-[var(--app-border)] bg-[var(--app-surface)] hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(167,139,250,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-[var(--app-text-primary)] uppercase group-hover:text-purple-400 transition-colors">Session Notes</h4>
            <p className="text-[10px] text-[var(--app-text-muted)] mt-1">Record observation notes and logs.</p>
          </div>
          <span className="text-xl text-purple-400 group-hover:translate-x-1 transition-transform">✍️ →</span>
        </Card>

      </div>

      {/* Engagement metrics & progress alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Engagement Charts card */}
        <Card className="lg:col-span-2 space-y-4 border border-[var(--app-border)] bg-[var(--app-surface)]">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--app-border)]">
            <div>
              <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider">Engagement Metrics</h3>
              <p className="text-[10px] text-[var(--app-text-muted)] mt-0.5">Average interaction intensity tracked over the last 5 sessions.</p>
            </div>
            <span className="text-xs text-[var(--accent-primary)] font-bold font-mono">+3.2% Average</span>
          </div>

          {/* AreaChart */}
          <div className="h-52 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGaze" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpeech" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMotor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="session" stroke="var(--app-text-muted)" fontSize={9} tickLine={false} />
                <YAxis stroke="var(--app-text-muted)" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--app-bg-elevated)', borderColor: 'var(--app-border)', color: 'var(--app-text-primary)', fontSize: '10px' }} />
                <Area type="monotone" dataKey="eyeContact" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorGaze)" strokeWidth={2} name="Eye Contact" />
                <Area type="monotone" dataKey="speechProsody" stroke="var(--accent-secondary)" fillOpacity={1} fill="url(#colorSpeech)" strokeWidth={2} name="Speech Affect" />
                <Area type="monotone" dataKey="motorControl" stroke="#a78bfa" fillOpacity={1} fill="url(#colorMotor)" strokeWidth={2} name="Motor Precision" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Core metrics summary row */}
          <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[var(--app-border)]">
            <div>
              <span className="text-[9px] text-[var(--app-text-muted)] uppercase block font-semibold">Active Practice</span>
              <span className="text-xs font-bold text-[var(--app-text-primary)] font-mono">18.4 min/day</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--app-text-muted)] uppercase block font-semibold">Goal accuracy</span>
              <span className="text-xs font-bold text-[var(--app-text-primary)] font-mono">91.4% Target</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--app-text-muted)] uppercase block font-semibold">Session counts</span>
              <span className="text-xs font-bold text-[var(--app-text-primary)] font-mono">14 This Cycle</span>
            </div>
          </div>

        </Card>

        {/* Progress Alerts card */}
        <Card className="lg:col-span-1 flex flex-col justify-between border border-[var(--app-border)] bg-[var(--app-surface)]">
          <div>
            <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider mb-4">Progress Alerts</h3>
            
            <div className="space-y-3">
              {progressAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border flex gap-2.5 text-xs ${
                    alert.type === 'milestone' ? 'border-[var(--accent-success)]/20 bg-[var(--accent-success)]/[0.04]' :
                    alert.type === 'warning' ? 'border-amber-500/20 bg-amber-500/[0.04]' :
                    'border-red-500/20 bg-red-500/[0.04]'
                  }`}
                >
                  <span className="text-sm shrink-0">
                    {alert.type === 'milestone' ? '🟢' : alert.type === 'warning' ? '🟡' : '🔴'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className={`font-bold uppercase text-[9px] ${
                        alert.type === 'milestone' ? 'text-[var(--accent-success)]' :
                        alert.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>{alert.title}</span>
                      <span className="text-[8px] text-[var(--app-text-muted)] font-mono shrink-0">{alert.date}</span>
                    </div>
                    <p className="text-[10px] text-[var(--app-text-secondary)] mt-1 leading-relaxed">
                      Patient: <strong className="text-[var(--app-text-primary)]">{alert.patient}</strong> · {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--app-border)] pt-3 mt-4 flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => navigate('/dashboard/progress-tracker')}>
              Open Tracker History
            </Button>
          </div>
        </Card>

      </div>

      {/* Today's schedule & Assigned Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's schedule */}
        <Card className="lg:col-span-2 border border-[var(--app-border)] bg-[var(--app-surface)]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--app-border)]">
            <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider">Today's Sessions</h3>
            <span className="text-xs text-[var(--app-text-muted)] font-mono">4 sessions booked</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-[var(--app-text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--app-border)] text-[9px] uppercase text-[var(--app-text-muted)] font-bold">
                  <th className="py-2.5">Time</th>
                  <th>Patient</th>
                  <th>Session Focus</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--app-border)]">
                {todaysSessions.map((ses) => (
                  <tr key={ses.id} className="hover:bg-[var(--app-surface-muted)] transition-colors">
                    <td className="py-3 font-semibold text-[var(--app-text-primary)] font-mono">{ses.time}</td>
                    <td className="font-semibold text-[var(--app-text-primary)]">{ses.name} <span className="text-[9px] text-[var(--app-text-muted)] font-normal">({ses.age})</span></td>
                    <td className="text-[var(--app-text-secondary)]">{ses.focus}</td>
                    <td>
                      <span className={`status-pill text-[9px] font-bold ${
                        ses.status === 'Checked In' ? 'status-pill-success' : 'status-pill-info'
                      }`}>
                        {ses.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[10px] text-[var(--accent-secondary)]"
                        onClick={() => navigate(`/dashboard/session-notes?patientId=${ses.id}`)}
                      >
                        Enter Logs
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Assigned Patients progress list */}
        <Card className="lg:col-span-1 border border-[var(--app-border)] bg-[var(--app-surface)]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--app-border)]">
            <h3 className="text-sm font-semibold text-[var(--app-text-primary)] uppercase tracking-wider">Assigned Patients</h3>
            <span className="text-xs text-[var(--app-text-muted)] font-mono">5 active files</span>
          </div>

          <div className="space-y-3.5 max-h-[260px] overflow-y-auto pr-1">
            {assignedPatients.map((pat) => (
              <div
                key={pat.id}
                onClick={() => navigate(`/dashboard/progress-tracker?patientId=${pat.id}`)}
                className="p-3 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-bg-section)] hover:border-[var(--accent-secondary)]/25 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[var(--app-text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                    {pat.name} <span className="text-[9px] text-[var(--app-text-muted)] font-normal">({pat.age})</span>
                  </span>
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded ${
                    pat.risk === 'High' ? 'text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20' : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  }`}>
                    {pat.risk}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--app-text-secondary)] flex justify-between">
                  <span>Goal: {pat.goal}</span>
                  <span className="font-mono text-[var(--app-text-primary)] font-semibold">{pat.progress}%</span>
                </div>
                <div className="h-1 w-full bg-[var(--app-surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-primary)] rounded-full" style={{ width: `${pat.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Adaptive recommendations */}
      <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
        <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[var(--app-border)]">
          <span>🤖</span> AI Adaptive Therapy Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adaptiveRecommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] flex flex-col justify-between gap-3 text-xs">
              <div>
                <span className="text-[8px] text-[var(--accent-primary)] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[var(--accent-primary-muted)] border border-[var(--accent-primary)]/20 rounded-md">
                  {rec.category}
                </span>
                <h4 className="font-bold text-[var(--app-text-primary)] mt-2.5">For {rec.patient}</h4>
                <p className="text-[10px] text-[var(--app-text-secondary)] mt-1 leading-relaxed">{rec.rec}</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="text-[9px] py-1.5 w-full font-bold group-hover:bg-[var(--accent-primary-muted)]"
                onClick={() => navigate('/dashboard/therapy-planner')}
              >
                {rec.action}
              </Button>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
