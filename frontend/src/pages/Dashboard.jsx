import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, ProgressBar, StatusBadge } from '../components/design-system';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function Dashboard({ hideHeader = false }) {
  const navigate = useNavigate();

  // Mock data for workload metrics
  const workloadStats = [
    { label: "Today's Schedule", value: '12 Patients', change: '8 completed', color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)' },
    { label: 'Pending AI Reviews', value: '4 Cases', change: '3 urgent', color: '#00ffcc', bg: 'rgba(0, 255, 204, 0.1)' },
    { label: 'Clinical Alerts', value: '3 Active', change: 'Require action', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    { label: 'Diagnoses Signed', value: '18 This Month', change: '+12% vs last month', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' },
  ];

  // Today's Patients list
  const todaysPatients = [
    { id: 'liam-carter', name: 'Liam Carter', age: '4 Years', time: '09:00 AM', type: 'Diagnostic Consultation', risk: 'High', status: 'Checked In' },
    { id: 'emma-larson', name: 'Emma Larson', age: '6 Years', time: '10:30 AM', type: 'Therapy Goal Review', risk: 'Medium', status: 'In Session' },
    { id: 'noah-kline', name: 'Noah Kline', age: '3 Years', time: '01:15 PM', type: 'First Intake Screening', risk: 'High', status: 'Scheduled' },
    { id: 'sophia-miller', name: 'Sophia Miller', age: '5 Years', time: '03:00 PM', type: 'EEG Waves Review', risk: 'Low', status: 'Scheduled' },
  ];

  // Clinical Alerts list
  const clinicalAlerts = [
    { id: 1, patientId: 'liam-carter', type: 'critical', title: 'Critical Frontal TBR Shift', patient: 'Liam Carter', message: 'Calculated Theta/Beta ratio F3-F4 is 4.75. Immediate diagnostic confirmation indicated.', date: 'Today, 08:45 AM' },
    { id: 2, patientId: 'noah-kline', type: 'warning', title: 'Atypical Gaze Avoidance Peak', patient: 'Noah Kline', message: 'Computer vision analysis recorded 88% gaze avoidance during toys tracking step.', date: 'Today, 07:30 AM' },
  ];

  // Pending Reviews list
  const pendingReviews = [
    { id: 1, patientId: 'lucas-davis', name: 'Lucas Davis', age: '4y', duration: 'Pre-screening Ready', date: 'Uploaded 4h ago', risk: 'High' },
    { id: 2, patientId: 'ava-wilson', name: 'Ava Wilson', age: '5y', duration: 'Speech Sample Ready', date: 'Uploaded 1d ago', risk: 'Medium' },
    { id: 3, patientId: 'oliver-thomas', name: 'Oliver Thomas', age: '3y', duration: 'EEG Waves Processed', date: 'Uploaded 2d ago', risk: 'High' },
  ];

  // Recent Diagnoses signed
  const recentDiagnoses = [
    { name: 'Emma Larson', diagnosis: 'ASD Level 1 (Verified support)', date: 'May 28, 2026' },
    { name: 'Mason Roberts', diagnosis: 'Typical Development Profile', date: 'May 26, 2026' },
    { name: 'Charlotte Green', diagnosis: 'ASD Level 2 (Substantial support)', date: 'May 25, 2026' },
  ];

  // Workload / Case distribution charts
  const riskDistribution = [
    { name: 'Low Risk', value: 8, color: '#10b981' },
    { name: 'Medium Risk', value: 14, color: '#00d4ff' },
    { name: 'High Risk', value: 9, color: '#ef4444' },
  ];

  const weeklyCapacity = [
    { day: 'Mon', patients: 8 },
    { day: 'Tue', patients: 11 },
    { day: 'Wed', patients: 14 },
    { day: 'Thu', patients: 10 },
    { day: 'Fri', patients: 12 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      {!hideHeader && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-semibold text-white">Clinician Console</h1>
          <p className="text-slate-400 mt-1">Overview of caseload alerts, active queue, and diagnostic pipelines.</p>
        </motion.div>
      )}

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          onClick={() => navigate('/dashboard/patient-queue')}
          className="border border-white/5 bg-white/[0.01] hover:border-[#00d4ff]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-white uppercase group-hover:text-[#00d4ff] transition-colors">Patient Queue</h4>
            <p className="text-[10px] text-slate-500 mt-1">Review waiting cases and scheduling.</p>
          </div>
          <span className="text-xl text-[#00d4ff] group-hover:translate-x-1 transition-transform">👥 →</span>
        </Card>

        <Card
          onClick={() => navigate('/dashboard/clinical-review')}
          className="border border-white/5 bg-white/[0.01] hover:border-[#00ffcc]/30 hover:shadow-[0_0_15px_rgba(0,255,204,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-white uppercase group-hover:text-[#00ffcc] transition-colors">Clinical Review</h4>
            <p className="text-[10px] text-slate-500 mt-1">Analyze sensor logs and CV reports.</p>
          </div>
          <span className="text-xl text-[#00ffcc] group-hover:translate-x-1 transition-transform">🔍 →</span>
        </Card>

        <Card
          onClick={() => navigate('/dashboard/diagnosis-support')}
          className="border border-white/5 bg-white/[0.01] hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(167,139,250,0.08)] cursor-pointer transition-all duration-300 p-4 flex items-center justify-between group"
        >
          <div>
            <h4 className="text-xs font-bold text-white uppercase group-hover:text-purple-400 transition-colors">Diagnosis Support</h4>
            <p className="text-[10px] text-slate-500 mt-1">Apply guidelines and sign reports.</p>
          </div>
          <span className="text-xl text-purple-400 group-hover:translate-x-1 transition-transform">✍️ →</span>
        </Card>
      </div>

      {/* Workload Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {workloadStats.map((stat, idx) => (
          <Card key={idx} className="p-5 flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-xs font-semibold">{stat.label}</p>
              <p className="text-2xl font-extrabold text-white mt-1.5">{stat.value}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: stat.color }} />
              <span>{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Clinical Alerts Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Clinical Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clinicalAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => navigate(`/dashboard/clinical-review?patientId=${alert.patientId}`)}
              className={`p-4 rounded-xl border flex gap-3 cursor-pointer hover:border-red-500/30 hover:bg-red-500/[0.04] transition-all duration-300 ${
                alert.type === 'critical'
                  ? 'border-red-500/20 bg-red-500/[0.02]'
                  : 'border-amber-500/20 bg-amber-500/[0.02]'
              }`}
            >
              <span className="text-lg shrink-0 mt-0.5">{alert.type === 'critical' ? '🚨' : '⚠️'}</span>
              <div className="min-w-0">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-white uppercase">{alert.title}</h4>
                  <span className="text-[9px] text-slate-500 font-semibold">{alert.date}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Patient: <span className="text-white font-semibold">{alert.patient}</span> · {alert.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule & Pending reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Patients Queue */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Today's Schedule</h3>
            <span className="text-xs text-slate-500">Liam Carter (09:00 AM) is checked in</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase text-slate-500 font-bold">
                  <th className="py-2.5">Time</th>
                  <th>Patient</th>
                  <th>Appointment Type</th>
                  <th>Risk Tier</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {todaysPatients.map((pat) => (
                  <tr
                    key={pat.id}
                    onClick={() => navigate(`/dashboard/clinical-review?patientId=${pat.id}`)}
                    className="hover:bg-white/[0.015] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 font-semibold text-white font-mono">{pat.time}</td>
                    <td className="font-semibold text-white group-hover:text-[#00d4ff] transition-colors">{pat.name} <span className="text-[10px] text-slate-500 font-normal">({pat.age})</span></td>
                    <td className="text-slate-400">{pat.type}</td>
                    <td>
                      <span className={`status-pill text-[9px] font-bold ${
                        pat.risk === 'High' ? 'status-pill-warning' : pat.risk === 'Medium' ? 'status-pill-info' : 'status-pill-success'
                      }`}>
                        {pat.risk}
                      </span>
                    </td>
                    <td className="text-right font-medium text-slate-400">{pat.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pending Reviews list */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Pending AI Reviews</h3>
            
            <div className="space-y-3">
              {pendingReviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-2 hover:border-[#00d4ff]/20 transition-colors">
                  <div>
                    <p className="text-xs font-bold text-white">{rev.name} <span className="text-[9px] text-slate-500 font-normal">({rev.age})</span></p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{rev.duration} · {rev.date}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-[10px] text-[#00d4ff]" onClick={() => navigate(`/dashboard/clinical-review?patientId=${rev.patientId}`)}>
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-3 mt-4 flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => navigate('/dashboard/clinical-review')}>
              View All Reviews
            </Button>
          </div>
        </Card>

      </div>

      {/* Analytics Distributions & Recent Diagnoses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Chart */}
        <Card className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Caseload Risk Spread</h3>
          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Active Cases</span>
              <span className="text-lg font-bold text-white leading-tight font-mono">31</span>
            </div>
          </div>
          <div className="flex justify-around items-center text-[10px] text-slate-400 mt-2 border-t border-white/5 pt-3">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />Low (8)</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />Med (14)</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />High (9)</span>
          </div>
        </Card>

        {/* Capacity Capacity Chart */}
        <Card className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-sans">Patient Capacity Trend</h3>
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCapacity} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="patients" fill="#00d4ff" radius={[4, 4, 0, 0]}>
                  {weeklyCapacity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#00ffcc' : '#00d4ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Diagnoses Signed */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Recent Diagnoses Signed</h3>
            
            <div className="space-y-3">
              {recentDiagnoses.map((diag, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-white/5 bg-white/[0.01] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{diag.name}</span>
                    <span className="text-[9px] text-slate-500">{diag.date}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{diag.diagnosis}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-3 mt-4 flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => navigate('/dashboard/reports')}>
              Open Reports Archival
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
