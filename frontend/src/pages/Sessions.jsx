import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../components/design-system';

export default function Sessions({
  title = "Care Journey Timeline",
  subtitle = "Complete developmental and clinical tracking status log",
}) {
  const [expandedStage, setExpandedStage] = useState(8); // Default expand the "In Progress" therapy step

  const stages = [
    {
      id: 0,
      title: 'Profile Created',
      description: 'Liam Carter\'s clinical developmental file registered in clinic database.',
      status: 'completed',
      timestamp: 'May 24, 2026 · 10:00 AM',
      icon: '👤',
      details: 'Patient: Liam Carter (Age 4). Primary Language: English. Registrant parent: Amanda Carter. Secure database encryption key: TELEPORT-ASD-2026-X89.',
    },
    {
      id: 1,
      title: 'Pre-Screening Completed',
      description: 'Video recording, voice recording, and initial parent questionnaires uploaded.',
      status: 'completed',
      timestamp: 'May 24, 2026 · 11:30 AM',
      icon: '📤',
      details: 'Modality package uploaded: play_video_04.mp4 (4m12s), vocal_speech_sample.wav (1m30s), EDF EEG file. 10/10 questionnaire answers recorded.',
    },
    {
      id: 2,
      title: 'MASIM Analysis',
      description: 'Unified sensor fusion processed through the Computer Vision, Speech, and EEG pipelines.',
      status: 'completed',
      timestamp: 'May 25, 2026 · 02:15 PM',
      icon: '🧬',
      details: 'Multimodal Fusion output: Combined Risk Index: 76/100 (High Risk), Confidence Reliability: 94%. Frontal TBR shifted (TBR = 4.75).',
    },
    {
      id: 3,
      title: 'AI Triage',
      description: ' Triage matching triggers pediatric neurology specialist consultation path.',
      status: 'completed',
      timestamp: 'May 25, 2026 · 02:20 PM',
      icon: '🩺',
      details: 'Triage Rule Trigger: [Rule ASD-04: High Risk + Gaze Deficit + TBR Shift] → Recommended specialist: Pediatric Neurologist / Specialist.',
    },
    {
      id: 4,
      title: 'Consultation Scheduled',
      description: 'Consultation booking finalized with the Neurology specialist clinic.',
      status: 'completed',
      timestamp: 'May 25, 2026 · 04:00 PM',
      icon: '📅',
      details: 'Appointment locked for May 27, 2026 at 09:00 AM with Dr. Sarah Chen, MD at the Neurodevelopmental Center.',
    },
    {
      id: 5,
      title: 'Doctor Review',
      description: 'Neurologist reviews video keypoints, audio pitch variance graphs, and EEG bands.',
      status: 'completed',
      timestamp: 'May 27, 2026 · 09:15 AM',
      icon: '🔍',
      details: 'Dr. Sarah Chen verified gaze avoidance keypoints (12% attention duration) and flat prosody variance under 1.4 Hz.',
    },
    {
      id: 6,
      title: 'Diagnosis Support',
      description: 'Clinician confirms diagnosis and verified digital intake file.',
      status: 'completed',
      timestamp: 'May 27, 2026 · 10:30 AM',
      icon: '✍️',
      details: 'Confirmed Diagnosis: Autism Spectrum Disorder (ASD) - Level 1 (Requiring Support). Signed and finalized bySarah Chen, MD.',
    },
    {
      id: 7,
      title: 'Therapy Assigned',
      description: 'Intervention mapping completed. Active home speech apps and clinic sensory protocols set up.',
      status: 'completed',
      timestamp: 'May 27, 2026 · 11:45 AM',
      icon: '🧩',
      details: 'Assigned therapies: Joint Attention Training (3x weekly), Speech Game App (Daily), RL-Optimized Sensory Integration (2x weekly).',
    },
    {
      id: 8,
      title: 'Progress Monitoring',
      description: 'Daily speech exercises and joint attention progress active in home sandbox.',
      status: 'active',
      timestamp: 'In Progress · Last sync 2 hours ago',
      icon: '📈',
      details: '14 therapy sessions completed. RL adaptive engine optimized reward visual contrast to 82% to maximize focus duration.',
    },
    {
      id: 9,
      title: 'Milestone Achievement',
      description: 'Digital Twin forecasting models projected milestone goals successfully met.',
      status: 'pending',
      timestamp: 'Locked · Est. Target: 3 Months',
      icon: '🏆',
      details: 'Awaiting 3-Month evaluation. Targeted milestone: Spontaneous joint gaze duration &gt; 3 seconds (Current baseline progress: 35%).',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="text-slate-400 mt-1">{subtitle}</p>
      </motion.div>

      {/* Main Timeline Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 sm:p-8 rounded-xl relative overflow-hidden"
      >
        {/* Neon vertical line background */}
        <div className="absolute top-24 bottom-12 left-12 w-0.5 bg-white/5 pointer-events-none" />

        {/* The Stepper List */}
        <div className="space-y-6 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';
            const isPending = stage.status === 'pending';
            const isExpanded = expandedStage === stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`flex gap-6 p-4 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'border-[#00ffcc]/30 bg-[#00ffcc]/5 shadow-[0_0_15px_rgba(0,255,204,0.08)]'
                    : isExpanded
                    ? 'border-white/10 bg-white/[0.02]'
                    : 'border-transparent bg-transparent hover:bg-white/[0.01]'
                }`}
              >
                {/* Visual Status Dot / Number */}
                <div className="flex flex-col items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 relative ${
                      isCompleted
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : isActive
                        ? 'border-[#00ffcc] bg-[#00ffcc] text-slate-900 shadow-[0_0_12px_rgba(0,255,204,0.4)] animate-pulse'
                        : 'border-white/10 bg-[#0b0f14] text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </button>
                </div>

                {/* Content Block */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                      className="text-left focus:outline-none"
                    >
                      <h3 className={`text-sm font-semibold flex items-center gap-2 ${
                        isActive ? 'text-[#00ffcc]' : isPending ? 'text-slate-500' : 'text-white'
                      }`}>
                        <span>{stage.icon}</span>
                        {stage.title}
                      </h3>
                    </button>

                    {/* Completion State Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 tabular-nums">
                        {stage.timestamp}
                      </span>
                      <span className={`status-pill text-[9px] uppercase tracking-wider font-bold ${
                        isCompleted
                          ? 'status-pill-success'
                          : isActive
                          ? 'status-pill-info text-[#00ffcc] bg-[#00ffcc]/10 border-[#00ffcc]/20'
                          : 'bg-white/5 border-white/10 text-slate-500'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs mt-1.5 leading-relaxed ${isPending ? 'text-slate-600' : 'text-slate-400'}`}>
                    {stage.description}
                  </p>

                  {/* Expandable details drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-[11px] text-slate-400 font-medium leading-relaxed">
                          <p className="text-white font-bold uppercase text-[9px] mb-1 tracking-wider">Clinical Log Output</p>
                          {stage.details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
