import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, ProgressBar } from '../components/design-system';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';

export default function AITriageReport() {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingStep, setBookingStep] = useState('idle'); // idle, loading, done
  const [selectedSpecialist, setSelectedSpecialist] = useState('neurologist');

  const specialists = [
    {
      id: 'pediatrician',
      title: 'Developmental Pediatrician',
      icon: '👶',
      matchScore: 88,
      urgency: 'Medium Priority',
      description: 'Focuses on early childhood developmental milestones and baseline behavioral assessments.',
    },
    {
      id: 'neurologist',
      title: 'Pediatric Neurologist',
      icon: '🧠',
      matchScore: 96,
      urgency: 'High Priority (Primary)',
      description: 'Assesses neural waves, Theta/Beta ratios, and structural reflex keypoints to verify diagnosis.',
      isPrimary: true,
    },
    {
      id: 'speech',
      title: 'Speech Therapist',
      icon: '🗣️',
      matchScore: 92,
      urgency: 'High Priority (Co-treatment)',
      description: 'Addresses acoustic affect delays, speech response latency, and vocal communication challenges.',
    },
    {
      id: 'occupational',
      title: 'Occupational Therapist',
      icon: '🧩',
      matchScore: 78,
      urgency: 'Secondary Priority',
      description: 'Supports sensory integration, self-regulation, and fine motor coordinate habits.',
    },
  ];

  const nextSteps = [
    {
      step: 1,
      title: 'Lock Data Package',
      description: 'Encryption key generated. All computer vision keypoint frames, audio spectrums, and EEG files are consolidated into a secure Clinical Intake Pack.',
      status: 'completed',
    },
    {
      step: 2,
      title: 'Select Recommended Doctor',
      description: 'Direct referral to Dr. Sarah Chen, MD (Pediatric Neurologist) at the Neurodevelopmental Center.',
      status: 'active',
    },
    {
      step: 3,
      title: 'Book Consultation Visit',
      description: 'Confirm booking to transmit the data package and schedule the diagnostic review appointment.',
      status: 'pending',
    },
  ];

  const handleBookConsultation = () => {
    setBookingStep('loading');
    setTimeout(() => {
      setBookingStep('done');
      setBookingConfirmed(true);
    }, 1800);
  };

  const activeSpec = specialists.find((s) => s.id === selectedSpecialist) || specialists[1];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-white">AI Triage Report</h1>
        <p className="text-slate-400 mt-1">
          Plain-language clinical referral logic and expert recommendations based on multimodal screening.
        </p>
      </motion.div>

      {/* Main Grid: Dials & Core Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk & Urgency Card */}
        <Card className="flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full filter blur-2xl pointer-events-none" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Triage Severity</h3>
          
          {/* Radial Risk Score */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="54" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
              <circle
                cx="64"
                cy="64"
                r="54"
                stroke="#ef4444"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - 76 / 100)}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tabular-nums">76</span>
              <span className="text-[10px] text-slate-500">OUT OF 100</span>
            </div>
          </div>

          <div className="space-y-1 mt-2">
            <p className="text-sm font-semibold text-red-400">High Risk Profile</p>
            <p className="text-xs text-slate-400">Estimated Priority: <span className="text-white font-semibold">Priority 1 (Urgent)</span></p>
          </div>

          <span className="mt-5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 uppercase tracking-wider">
            Urgency: High Risk
          </span>
        </Card>

        {/* Recommended Specialist Matcher */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-2">Specialist Recommendations</h3>
            <p className="text-slate-400 text-xs mb-4">Click to view match parameters and clinical routing details.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {specialists.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSelectedSpecialist(spec.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative ${
                    selectedSpecialist === spec.id
                      ? 'border-[#00ffcc] bg-[#00ffcc]/10 shadow-[0_0_12px_rgba(0,255,204,0.15)]'
                      : 'border-white/5 bg-white/[0.01] hover:border-white/15'
                  }`}
                >
                  {spec.isPrimary && (
                    <span className="absolute top-2 right-2 text-[8px] font-bold tracking-widest text-[#00ffcc] uppercase bg-[#00ffcc]/15 px-1.5 py-0.5 rounded border border-[#00ffcc]/30">
                      Primary
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{spec.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{spec.title}</h4>
                      <p className="text-[9px] text-[#00ffcc] font-semibold mt-0.5">{spec.matchScore}% AI Match Score</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="text-xs">
                <span className="text-slate-500">Selected Path:</span>{' '}
                <span className="text-white font-semibold">{activeSpec.title}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {activeSpec.urgency}
              </span>
            </div>
          </div>
        </Card>

      </div>

      {/* Reasoning & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Reasoning Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-2">Triage Logic & Reasoning</h3>
            <p className="text-slate-400 text-xs mb-4">Explainable AI trace mapping sensor signals to clinical routing recommendations.</p>

            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <p>
                The Multimodal Fusion Engine flagged a combination of atypical indicators that strongly warrant specialist consultation:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-slate-400">
                <li>
                  <strong className="text-white">Computer Vision (Visual):</strong> Liam demonstrated atypical joint gaze avoidance (only 12% focus vs. 65% in control group) and frequent motor stereotypies (hand flapping, pacing) during toy play.
                </li>
                <li>
                  <strong className="text-white">Acoustic Speech (Audio):</strong> Atypical flat pitch prosody variance (frequency shift variance &lt; 1.4 Hz) indicates vocal affect repetition and delayed social response.
                </li>
                <li>
                  <strong className="text-white">Neural Analysis (EEG):</strong> Calculated frontal Theta-to-Beta ratio is elevated (TBR = 4.75), indicating clinical slow-wave shifts typical of early ASD profiles.
                </li>
              </ul>
              <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/[0.02] text-[11px] text-red-400">
                <strong>Clinical Path Justification:</strong> Frontal TBR shifts + motor stereotypies trigger the DSM-5 diagnostic criteria matching protocol for Pediatric Neurology.
              </div>
            </div>
          </Card>
        </div>

        {/* Next Steps & Action */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-4">Recommended Next Steps</h3>
              
              {/* Stepper timeline */}
              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.step} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] border ${
                        step.status === 'completed'
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                          : step.status === 'active'
                          ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc] animate-pulse'
                          : 'bg-white/5 border-white/10 text-slate-500'
                      }`}>
                        {step.step}
                      </span>
                      {step.step < 3 && <div className="w-px h-12 bg-white/10 mt-1" />}
                    </div>
                    <div>
                      <p className={`font-semibold ${step.status === 'pending' ? 'text-slate-500' : 'text-white'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Consultation Button */}
            <div className="border-t border-white/5 pt-4 mt-6">
              {bookingStep === 'done' ? (
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-center text-xs text-emerald-400 font-bold">
                  ✓ Consultation Request Transmitted
                </div>
              ) : (
                <Button
                  variant="primary"
                  className="w-full btn-glow relative overflow-hidden"
                  onClick={handleBookConsultation}
                  disabled={bookingStep === 'loading'}
                >
                  {bookingStep === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-white border-t-transparent animate-spin" />
                      Booking Appointment...
                    </span>
                  ) : (
                    'Book Consultation'
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* Downstream Explainable AIPanel */}
      <div className="border-t border-white/5 pt-6">
        <ExplainableAIPanel />
      </div>

      {/* Booking Done Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-[#0b0f14] p-6 text-center shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-base font-bold text-white mb-2">Consultation Booking Requested</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Your secure clinical data package has been locked and securely shared with Dr. Sarah Chen, MD.
                An intake coordinator will call you within 24 hours to schedule the session.
              </p>
              <Button onClick={() => setBookingConfirmed(false)}>
                Return to Dashboard
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
