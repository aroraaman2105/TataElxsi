import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, ProgressBar, StatusBadge, ChartContainer } from '../components/design-system';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const stats = [
  { label: 'Total Sessions', value: '1,247', change: '+12%', accent: 'green', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Active Users', value: '89', change: '+8%', accent: 'blue', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Assessments Done', value: '342', change: '+24%', accent: 'green', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Avg. Engagement', value: '87%', change: '+5%', accent: 'blue', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const accentColors = { green: '#00ffcc', blue: '#00d4ff' };
const accentBg = { green: 'rgba(0, 255, 204, 0.1)', blue: 'rgba(0, 212, 255, 0.1)' };

const engagementData = [
  { name: 'Mon', engagement: 68 },
  { name: 'Tue', engagement: 72 },
  { name: 'Wed', engagement: 85 },
  { name: 'Thu', engagement: 74 },
  { name: 'Fri', engagement: 90 },
  { name: 'Sat', engagement: 82 },
  { name: 'Sun', engagement: 88 },
];

const riskData = [
  { name: 'Low Risk', value: 65, color: '#00ffcc' },
  { name: 'Medium Risk', value: 25, color: '#00d4ff' },
  { name: 'High Risk', value: 10, color: '#ff9ecd' },
];

const progressData = [
  { name: 'Jan', Speech: 40, Motor: 50, Social: 30 },
  { name: 'Feb', Speech: 48, Motor: 55, Social: 35 },
  { name: 'Mar', Speech: 55, Motor: 60, Social: 48 },
  { name: 'Apr', Speech: 62, Motor: 68, Social: 52 },
  { name: 'May', Speech: 75, Motor: 72, Social: 60 },
  { name: 'Jun', Speech: 85, Motor: 80, Social: 72 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0f14]/90 border border-white/10 backdrop-blur-md p-3 rounded-lg shadow-xl">
        <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
        {payload.map((item) => (
          <div key={item.name} className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
            <span className="text-sm font-semibold text-white">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const suggestions = [
  {
    category: 'Assessment',
    title: 'Schedule follow-up assessment',
    description: 'Schedule a MASIM developmental screening follow-up. It has been 30 days since the last baseline assessment.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2',
    accentColor: '#00ffcc',
    accentBg: 'rgba(0, 255, 204, 0.1)',
    accentBorder: 'rgba(0, 255, 204, 0.2)',
    highPriority: true,
  },
  {
    category: 'Therapy',
    title: 'Increase speech therapy frequency',
    description: 'AI suggests increasing speech therapy modules to 3 times/week based on the latest phoneme articulation scoring trends.',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.1)',
    accentBorder: 'rgba(139, 92, 246, 0.2)',
    highPriority: false,
  },
  {
    category: 'Engagement',
    title: 'Monitor eye-contact engagement',
    description: 'Engagement scoring during the last 2 sessions dropped. Highlight eye-tracking cues in tomorrow’s interactive play session.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    accentColor: '#00d4ff',
    accentBg: 'rgba(0, 212, 255, 0.1)',
    accentBorder: 'rgba(0, 212, 255, 0.2)',
    highPriority: false,
  },
  {
    category: 'Diagnostic',
    title: 'Review EEG anomaly report',
    description: 'A transient cortical activity peak was detected during the second screening block. Review raw EEG traces with a clinical specialist.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    accentColor: '#ff9ecd',
    accentBg: 'rgba(255, 158, 205, 0.1)',
    accentBorder: 'rgba(255, 158, 205, 0.2)',
    highPriority: true,
  },
];

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0, y: 15 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 25,
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  },
  exit: { scale: 0.95, opacity: 0, y: 10, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

export default function Dashboard() {
    const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Overview of your TELIPORT AI platform metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Overview Widget */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card className="h-full flex flex-col justify-between">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src="/patient_avatar.png"
                    alt="Emma Larson"
                    className="w-16 h-16 rounded-full object-cover border border-[#00d4ff] shadow-glowBlue"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00ffcc] border-2 border-[#0b0f14] shadow-[0_0_8px_#00ffcc]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Emma Larson</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">ID: #EL-8902</span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-xs text-slate-400">Age: 6 Years</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/5">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Risk Level</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse shadow-[0_0_8px_#00d4ff]" />
                    <span className="text-sm font-semibold text-white">Medium (72%)</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Last Screening</span>
                  <span className="block text-sm font-semibold text-white mt-1">May 18, 2026</span>
                </div>
              </div>

              {/* Therapy Progress */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-400">Therapy Completion</span>
                  <span className="text-[#00ffcc] font-mono">68%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00ffcc] to-neon-blue rounded-full shadow-[0_0_8px_#00ffcc]" 
                    style={{ width: '68%' }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="secondary" size="sm" className="w-full">
                View Profile
              </Button>
              <Button variant="primary" size="sm" className="w-full shadow-glow">
                Start Screening
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={item}>
              <Card delay={index * 0.06} glow={stat.accent === 'green'}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-sm mt-2 font-medium" style={{ color: accentColors[stat.accent] }}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: accentBg[stat.accent], color: accentColors[stat.accent] }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {['Session completed - Child A', 'Assessment submitted - Child B', 'New user onboarded', 'Report generated'].map((text, i) => (
              <li key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                <span className="text-slate-300">{text}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your engagement metrics are above average. Consider scheduling follow-up assessments for users who haven’t completed a session in 7+ days.
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="primary" size="md" onClick={() => setShowSuggestions(true)}>View suggestions</Button>
            <Button variant="secondary" size="md">Dismiss</Button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk overview</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <StatusBadge status="low" />
                <StatusBadge status="medium" />
                <StatusBadge status="high" />
              </div>
              <ProgressBar value={72} label="Session completion" className="mb-4" />
              <ProgressBar value={45} label="Assessments this month" height="sm" />
            </div>
            
            <div className="w-full h-44 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Patients</span>
                <span className="text-lg font-bold text-white leading-tight font-mono">1,247</span>
              </div>
            </div>
          </div>
        </Card>
        <ChartContainer
          title="Engagement trend"
          subtitle="Last 7 days"
          action={<Button variant="ghost" size="sm">Export</Button>}
        >
          <div className="w-full h-48 sm:h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00d4ff" floodOpacity="0.4" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[50, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  name="Engagement"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  dot={{ r: 4, stroke: '#00d4ff', strokeWidth: 1.5, fill: '#0b0f14' }}
                  activeDot={{ r: 6, stroke: '#00d4ff', strokeWidth: 2, fill: '#0b0f14' }}
                  filter="url(#lineGlow)"
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
      >
        <ChartContainer
          title="Therapy Progress"
          subtitle="Adaptive training growth over the last 6 months"
          action={
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc]" />
                Speech
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00d4ff]" />
                Motor
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                Social
              </span>
            </div>
          }
        >
          <div className="w-full h-64 sm:h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpeech" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ffcc" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#00ffcc" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMotor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="Speech"
                  stroke="#00ffcc"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSpeech)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Motor"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMotor)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Social"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSocial)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </motion.div>

      <AnimatePresence>
        {showSuggestions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuggestions(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg bg-[#0b0f14]/95 border border-white/10 rounded-2xl shadow-glow overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ffcc]/25 to-neon-blue/20 border border-[#00ffcc]/35 flex items-center justify-center text-[#00ffcc] shadow-glowGreen">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI-Generated Recommendations</h3>
                    <p className="text-xs text-slate-400">Personalized clinical suggestions</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(false)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Suggestions List */}
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {suggestions.map((sug) => (
                  <motion.div
                    key={sug.title}
                    variants={itemVariants}
                    className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors flex items-start gap-4 group cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border"
                      style={{
                        backgroundColor: sug.accentBg,
                        borderColor: sug.accentBorder,
                        color: sug.accentColor,
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sug.icon} />
                      </svg>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: sug.accentBg,
                            color: sug.accentColor,
                          }}
                        >
                          {sug.category}
                        </span>
                        {sug.highPriority && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#ff9ecd]/20 text-[#ff9ecd]">
                            High Priority
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-white group-hover:text-[#00ffcc] transition-colors">
                        {sug.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {sug.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                <Button variant="secondary" size="md" onClick={() => setShowSuggestions(false)}>
                  Close
                </Button>
                <Button variant="primary" size="md" onClick={() => setShowSuggestions(false)}>
                  Apply recommendations
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
