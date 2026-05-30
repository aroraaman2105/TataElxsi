import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../components/design-system';

const PATIENTS_DATABASE = {
  'liam-carter': {
    name: 'Liam Carter',
    age: '4 Years',
    dob: 'April 12, 2022',
    referralDate: 'May 25, 2026',
    riskScore: 76,
    aiConfidence: 94,
    aiSpecialist: 'Pediatric Neurologist',
    biomarkers: [
      { name: '📹 Joint attention latency', val: '12% focus (Avoidant)' },
      { name: '🎙️ Vocal prosody variance', val: 'Flat affect (< 1.4 Hz)' },
      { name: '🧠 EEG Frontal Spectral Shift', val: '4.75 TBR (Atypical)' },
      { name: '📝 Questionnaire domains', val: 'Social: 15/100 (Delayed)' }
    ],
    aiSummary: "The fused multimodal pipeline reveals highly convergent indicators. Video tracking shows social gaze latency and motor stereotypies. EEG spectra verifies significant fronto-central spectral power shift (TBR=4.75). Findings strongly support Autism Spectrum Disorder (ASD Level 1) screening parameters.",
    suggestedActions: {
      referNeurologist: true,
      referOT: false,
      referSpeech: true,
      socialSkills: true,
      sensoryTherapy: true,
      cbt: false,
      eegFollowup: true
    },
    dsm5: {
      A1: true,
      A2: true,
      A3: false,
      B1: true,
      B2: false,
      B3: false,
      B4: true
    },
    defaultDiagnosis: 'Autism Spectrum Disorder - Level 1 (Requiring support)'
  },
  'lucas-davis': {
    name: 'Lucas Davis',
    age: '4 Years',
    dob: 'September 30, 2022',
    referralDate: 'May 29, 2026',
    riskScore: 82,
    aiConfidence: 96,
    aiSpecialist: 'Pediatric Neurologist',
    biomarkers: [
      { name: '📹 Gaze focus duration', val: '8% focus (Severe Avoidance)' },
      { name: '🎙️ Cadence & tone affect', val: 'Flat cadence (< 1.1 Hz)' },
      { name: '📹 Stereotypy Frequency', val: '3.2Hz Rocking/Flapping' },
      { name: '🧠 Frontal EEG Ratio', val: '5.12 TBR (High Severity)' }
    ],
    aiSummary: "Multiple clinical metrics converge. Severe motor stereotypies and gaze avoidance represent significant visual evidence. EEG spectrum TBR (5.12) is extremely elevated. Recommended fast-tracked full clinical intake for diagnostic confirmation.",
    suggestedActions: {
      referNeurologist: true,
      referOT: true,
      referSpeech: true,
      socialSkills: true,
      sensoryTherapy: true,
      cbt: false,
      eegFollowup: true
    },
    dsm5: {
      A1: true,
      A2: true,
      A3: true,
      B1: true,
      B2: true,
      B3: false,
      B4: true
    },
    defaultDiagnosis: 'Autism Spectrum Disorder - Level 2 (Substantial support)'
  },
  'noah-kline': {
    name: 'Noah Kline',
    age: '3 Years',
    dob: 'November 05, 2023',
    referralDate: 'May 26, 2026',
    riskScore: 68,
    aiConfidence: 90,
    aiSpecialist: 'Pediatric Neurologist',
    biomarkers: [
      { name: '📹 Joint attention gaze', val: '18% focus (Avoidant)' },
      { name: '🎙️ Vocal prosody loop', val: 'Monotonic loops (2.8s delay)' },
      { name: '🧠 Frontal TBR Waves', val: '3.90 TBR (Atypical)' },
      { name: '📝 Questionnaire domains', val: 'Social: 25/100 (Delayed)' }
    ],
    aiSummary: "The neural spectrogram TBR (3.90) and parent questionnaire social communication score (25/100) are the key contributors. Minor finger tapping active during toy tracking. Diagnostic evaluation using ADOS-2 toddler modules is suggested.",
    suggestedActions: {
      referNeurologist: true,
      referOT: false,
      referSpeech: true,
      socialSkills: true,
      sensoryTherapy: false,
      cbt: false,
      eegFollowup: true
    },
    dsm5: {
      A1: true,
      A2: true,
      A3: false,
      B1: false,
      B2: true,
      B3: false,
      B4: false
    },
    defaultDiagnosis: 'Autism Spectrum Disorder - Level 1 (Requiring support)'
  },
  'oliver-thomas': {
    name: 'Oliver Thomas',
    age: '3 Years',
    dob: 'February 18, 2023',
    referralDate: 'May 29, 2026',
    riskScore: 74,
    aiConfidence: 91,
    aiSpecialist: 'Occupational Therapist',
    biomarkers: [
      { name: '📝 Sensory Self-Regulation', val: '30/100 (Atypical)' },
      { name: '📹 Motor Gait Analysis', val: 'Toe walking detected' },
      { name: '📹 Hand Posturing Index', val: 'Atypical finger posturing' },
      { name: '🧠 EEG TBR Scan', val: '3.10 TBR (Moderate)' }
    ],
    aiSummary: "Predominant markers represent atypical sensory seeking behaviors and motor gait patterns. Parent questionnaire records significant tactile hypo-reactivity. Diagnostic profile maps heavily to sensory integration and occupational therapy needs.",
    suggestedActions: {
      referNeurologist: false,
      referOT: true,
      referSpeech: false,
      socialSkills: false,
      sensoryTherapy: true,
      cbt: false,
      eegFollowup: false
    },
    dsm5: {
      A1: true,
      A2: false,
      A3: false,
      B1: true,
      B2: false,
      B3: true,
      B4: true
    },
    defaultDiagnosis: 'Autism Spectrum Disorder - Level 1 (Requiring support)'
  },
  'emma-larson': {
    name: 'Emma Larson',
    age: '6 Years',
    dob: 'June 14, 2020',
    referralDate: 'May 27, 2026',
    riskScore: 48,
    aiConfidence: 85,
    aiSpecialist: 'Speech Therapist',
    biomarkers: [
      { name: '🎙️ Vocal prosody tone', val: 'Monotonic patterns' },
      { name: '🎙️ Response Latency', val: 'Average 3.0s delay' },
      { name: '🎙️ Acoustic loops', val: 'Vocal Echolalia detected' },
      { name: '🧠 Frontal TBR Waves', val: '2.45 TBR (Borderline)' }
    ],
    aiSummary: "Predicted risk is primarily acoustic-driven. The child exhibits repetitive phrase loops (echolalia) and conversational gaps. Gaze, motor coordination, and questionnaire markers fall within age-typical milestones.",
    suggestedActions: {
      referNeurologist: false,
      referOT: false,
      referSpeech: true,
      socialSkills: true,
      sensoryTherapy: false,
      cbt: false,
      eegFollowup: false
    },
    dsm5: {
      A1: false,
      A2: true,
      A3: false,
      B1: false,
      B2: false,
      B3: false,
      B4: false
    },
    defaultDiagnosis: 'Social Communication Disorder'
  },
  'ava-wilson': {
    name: 'Ava Wilson',
    age: '5 Years',
    dob: 'August 22, 2021',
    referralDate: 'May 28, 2026',
    riskScore: 55,
    aiConfidence: 88,
    aiSpecialist: 'Occupational Therapist',
    biomarkers: [
      { name: '📝 Sensory Score card', val: '42/100 (Moderate Seek)' },
      { name: '📹 Flapping motor track', val: '1.8Hz hand flapping' },
      { name: '🧠 Frontal TBR Ratio', val: '2.68 TBR (Mild Shift)' },
      { name: '🎙️ Vocal Prosody', val: 'Prosody variance typical-low' }
    ],
    aiSummary: "The prediction is guided by parent reports of atypical sensory responses and CV indicators of mild motor flapping. Frontal EEG spectrals verify TBR at 2.68, slightly exceeding threshold. Occupational therapy evaluation is advised.",
    suggestedActions: {
      referNeurologist: false,
      referOT: true,
      referSpeech: false,
      socialSkills: false,
      sensoryTherapy: true,
      cbt: false,
      eegFollowup: false
    },
    dsm5: {
      A1: true,
      A2: false,
      A3: false,
      B1: true,
      B2: false,
      B3: false,
      B4: true
    },
    defaultDiagnosis: 'Autism Spectrum Disorder - Level 1 (Requiring support)'
  },
  'sophia-miller': {
    name: 'Sophia Miller',
    age: '5 Years',
    dob: 'December 03, 2021',
    referralDate: 'May 28, 2026',
    riskScore: 28,
    aiConfidence: 92,
    aiSpecialist: 'Developmental Pediatrician',
    biomarkers: [
      { name: '📹 Social Gaze Track', val: '58% focus (Typical)' },
      { name: '🎙️ Vocal Cadence', val: 'Typical pitch (1.2s delay)' },
      { name: '🧠 Frontal TBR Waves', val: '1.85 TBR (Typical)' },
      { name: '📝 Questionnaire domains', val: 'Social: 70/100 (Typical)' }
    ],
    aiSummary: "All signals fall in expected developmental ranges. Facial scanning tracks typical eye-to-eye smile latencies, and neural spectrals are normal (TBR 1.85). Normal pediatric tracking is recommended.",
    suggestedActions: {
      referNeurologist: false,
      referOT: false,
      referSpeech: false,
      socialSkills: false,
      sensoryTherapy: false,
      cbt: false,
      eegFollowup: false
    },
    dsm5: {
      A1: false,
      A2: false,
      A3: false,
      B1: false,
      B2: false,
      B3: false,
      B4: false
    },
    defaultDiagnosis: 'Typical Neurodevelopmental Profile'
  }
};

export default function DiagnosisSupport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || 'liam-carter';
  const currentPatient = PATIENTS_DATABASE[patientId] || PATIENTS_DATABASE['liam-carter'];

  // Diagnostic states
  const [doctorDSM, setDoctorDSM] = useState(currentPatient.dsm5);
  const [docDiagnosis, setDocDiagnosis] = useState(currentPatient.defaultDiagnosis);
  const [docConfidence, setDocConfidence] = useState(85);
  const [clinicalActions, setClinicalActions] = useState(currentPatient.suggestedActions);
  const [customNotes, setCustomNotes] = useState('');
  
  // Modals / alerts
  const [printModal, setPrintModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state when patientId changes
  useEffect(() => {
    setDoctorDSM(currentPatient.dsm5);
    setDocDiagnosis(currentPatient.defaultDiagnosis);
    setDocConfidence(currentPatient.riskScore > 50 ? 85 : 90);
    setClinicalActions(currentPatient.suggestedActions);
    setCustomNotes(`Initial clinical observation aligns with AI findings. Patient demonstrates communication markers matching ${currentPatient.defaultDiagnosis}. Suggested interventions mapped to care timeline.`);
    setSaveSuccess(false);
  }, [patientId]);

  const handleDSMCheck = (key) => {
    setDoctorDSM(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleActionCheck = (key) => {
    setClinicalActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Alignment score logic
  const calculateAlignment = () => {
    let matches = 0;
    const keys = Object.keys(currentPatient.dsm5);
    keys.forEach(k => {
      if (currentPatient.dsm5[k] === doctorDSM[k]) matches++;
    });
    return Math.round((matches / keys.length) * 100);
  };

  const alignmentScore = calculateAlignment();

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Diagnosis Support Workspace</h1>
            <p className="text-[var(--app-text-muted)] mt-1">
              Cross-examine AI metrics, map DSM-5 observations, and finalize printable intake reports.
            </p>
          </div>
          {/* Patient Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[var(--app-surface-muted)] border border-[var(--app-border)] p-2 rounded-xl">
            <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider pl-2">Case file:</span>
            <select
              value={patientId}
              onChange={(e) => setSearchParams({ patientId: e.target.value })}
              className="bg-[var(--app-input-bg)] border border-[var(--app-border)] rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--accent-secondary)] focus:outline-none focus:border-[var(--accent-secondary)]/50 transition-all hover:bg-[var(--app-surface-muted)]"
            >
              {Object.keys(PATIENTS_DATABASE).map((id) => (
                <option key={id} value={id}>
                  {PATIENTS_DATABASE[id].name} ({PATIENTS_DATABASE[id].age}) - {PATIENTS_DATABASE[id].urgency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Floating save notifications */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.08)]"
          >
            <span>✓ Patient Diagnostic decision matrix recorded in secure FHIR server.</span>
            <button onClick={() => setSaveSuccess(false)} className="text-emerald-400 hover:text-white font-bold ml-2">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Findings Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* AI Assessment Summary */}
          <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--app-border)] pb-3">
              <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <span>🤖</span> AI Assessment Summary
              </h3>
              <span className="text-[10px] font-mono text-[var(--app-text-muted)]">Confidence: {currentPatient.aiConfidence}%</span>
            </div>

            {/* Dial / Confidence indicator */}
            <div className="flex items-center gap-4 py-2">
              <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="var(--app-border)" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={100 - currentPatient.riskScore}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-extrabold text-[var(--app-text-primary)] font-mono">{currentPatient.riskScore}</span>
                  <span className="text-[7px] text-[var(--app-text-muted)] uppercase tracking-tighter">Risk</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--app-text-primary)] uppercase">{currentPatient.name}</h4>
                <p className="text-[10px] text-[var(--app-text-muted)] mt-1 leading-normal">
                  Multimodal Risk Tier: <span className={currentPatient.riskScore > 50 ? 'text-red-500 font-bold' : 'text-emerald-500 font-bold'}>{currentPatient.urgency}</span>
                </p>
              </div>
            </div>

            {/* Contributing Biomarkers */}
            <div className="space-y-2">
              <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider">Contributing Biomarkers</span>
              <div className="grid grid-cols-1 gap-2">
                {currentPatient.biomarkers.map((bio, index) => (
                  <div key={index} className="p-2.5 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] text-[10px] flex justify-between items-center">
                    <span className="text-[var(--app-text-secondary)] font-semibold">{bio.name}</span>
                    <span className="text-[var(--app-text-primary)] font-mono bg-[var(--app-input-bg)] px-2 py-0.5 rounded border border-[var(--app-border)]">{bio.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence summary */}
            <div className="space-y-2 pt-2 border-t border-[var(--app-border)]">
              <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider">Evidence Summary</span>
              <p className="text-[11px] text-[var(--app-text-secondary)] leading-relaxed font-[450] bg-[var(--app-surface-muted)] p-3 rounded-lg border border-[var(--app-border)]">
                {currentPatient.aiSummary}
              </p>
            </div>
          </Card>
        </div>

        {/* Middle and Right: Diagnostic Decision support */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Comparison and DSM-5 mapping */}
          <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--app-border)] pb-4 gap-3">
              <div>
                <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚖️</span> AI findings vs. clinician findings
                </h3>
                <p className="text-[10px] text-[var(--app-text-muted)] mt-0.5">Toggle criteria checkboxes below to confirm patient observations.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase">Alignment:</span>
                <span className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded border ${
                  alignmentScore > 80 ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                  alignmentScore > 50 ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                  'text-red-400 bg-red-500/10 border-red-500/20'
                }`}>
                  {alignmentScore}%
                </span>
              </div>
            </div>

            {/* DSM-5 Criteria Checklist */}
            <div className="space-y-4">
              
              {/* Category A */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-extrabold text-[var(--accent-secondary)] uppercase tracking-wider">Social Communication & Social Interaction (Criterion A)</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  
                  <div
                    onClick={() => handleDSMCheck('A1')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.A1 ? 'border-[var(--accent-secondary)]/30 bg-[var(--accent-secondary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.A1}
                      onChange={() => {}} // handled by click
                      className="mt-0.5 accent-[var(--accent-secondary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Deficits in Social-Emotional Reciprocity (A1)</span>
                        {currentPatient.dsm5.A1 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Abnormal social approach, conversational gaps, lack of shared interests or affect.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDSMCheck('A2')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.A2 ? 'border-[var(--accent-secondary)]/30 bg-[var(--accent-secondary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.A2}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-secondary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Deficits in Nonverbal Communication (A2)</span>
                        {currentPatient.dsm5.A2 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Deficits in eye contact, body language gesture integration, or lack of facial expressions.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDSMCheck('A3')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.A3 ? 'border-[var(--accent-secondary)]/30 bg-[var(--accent-secondary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.A3}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-secondary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Developing & Understanding Relationships (A3)</span>
                        {currentPatient.dsm5.A3 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Difficulties adjusting behavior to suit social contexts, lack of imaginative play, or making friends.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Category B */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-extrabold text-[var(--accent-primary)] uppercase tracking-wider">Restricted & Repetitive Behaviors (Criterion B)</h4>
                <div className="grid grid-cols-1 gap-2.5">

                  <div
                    onClick={() => handleDSMCheck('B1')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.B1 ? 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.B1}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-primary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Repetitive Movements, Objects, or Speech (B1)</span>
                        {currentPatient.dsm5.B1 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Simple motor stereotypies (e.g. hand flapping), lining up toys, echolalia, idiosyncratic phrases.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDSMCheck('B2')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.B2 ? 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.B2}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-primary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Insistence on Sameness & Routines (B2)</span>
                        {currentPatient.dsm5.B2 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Extreme distress at small changes, difficulties with transitions, rigid eating or greeting patterns.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDSMCheck('B3')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.B3 ? 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.B3}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-primary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Highly Restricted, Fixated Interests (B3)</span>
                        {currentPatient.dsm5.B3 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Strong attachment or preoccupation with unusual objects, excessively circumscribed or perseverative interest.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDSMCheck('B4')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      doctorDSM.B4 ? 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/[0.02]' : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:bg-[var(--app-border)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doctorDSM.B4}
                      onChange={() => {}}
                      className="mt-0.5 accent-[var(--accent-primary)]"
                    />
                    <div className="text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[var(--app-text-primary)] uppercase tracking-wider text-[10px]">Hyper- or Hypo-reactivity to Sensory Input (B4)</span>
                        {currentPatient.dsm5.B4 && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold">AI Flagged</span>}
                      </div>
                      <p className="text-[var(--app-text-secondary)]">Apparent indifference to pain/temperature, adverse response to sounds or textures, excessive smelling or touching.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Diagnostic Decisions Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--app-border)]">
              
              {/* Confirmed Diagnosis Selector */}
              <div className="space-y-2">
                <label className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Confirmed Diagnosis</label>
                <select
                  value={docDiagnosis}
                  onChange={(e) => setDocDiagnosis(e.target.value)}
                  className="bg-[var(--app-input-bg)] border border-[var(--app-border)] rounded-xl px-4 py-3 text-xs font-semibold text-[var(--app-text-primary)] focus:outline-none focus:border-[var(--accent-secondary)]/50 w-full"
                >
                  <option value="Autism Spectrum Disorder - Level 1 (Requiring support)">ASD Level 1 (Requiring support)</option>
                  <option value="Autism Spectrum Disorder - Level 2 (Requiring substantial support)">ASD Level 2 (Substantial support)</option>
                  <option value="Autism Spectrum Disorder - Level 3 (Requiring very substantial support)">ASD Level 3 (Severe support)</option>
                  <option value="Social Communication Disorder">Social Communication Disorder</option>
                  <option value="Typical Neurodevelopmental Profile">Typical Neurodevelopmental Profile</option>
                </select>
              </div>

              {/* Diagnostic Confidence comparison */}
              <div className="space-y-2 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider">Clinician Confidence</label>
                  <span className="text-xs font-extrabold text-[var(--accent-secondary)] font-mono">{docConfidence}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                     type="range"
                     min="50"
                     max="100"
                     value={docConfidence}
                     onChange={(e) => setDocConfidence(Number(e.target.value))}
                     className="w-full h-1 bg-[var(--app-border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-secondary)]"
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[var(--app-text-muted)] font-mono mt-1">
                  <span>AI Confidence: {currentPatient.aiConfidence}%</span>
                  <span>Match: {alignmentScore}%</span>
                </div>
              </div>

            </div>

          </Card>

          {/* Clinical actions suggested */}
          <Card className="border border-[var(--app-border)] bg-[var(--app-surface)] space-y-4">
            <h3 className="text-xs font-bold text-[var(--app-text-primary)] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[var(--app-border)]">
              <span>📋</span> Suggested Clinical Actions & referrals
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Specialist Referrals */}
              <div className="space-y-2">
                <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Specialist Referrals</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.referNeurologist}
                      onChange={() => handleActionCheck('referNeurologist')}
                      className="accent-[var(--accent-secondary)]"
                    />
                    <span>Pediatric Neurologist Referral</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.referOT}
                      onChange={() => handleActionCheck('referOT')}
                      className="accent-[var(--accent-secondary)]"
                    />
                    <span>Occupational Therapist Referral</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.referSpeech}
                      onChange={() => handleActionCheck('referSpeech')}
                      className="accent-[var(--accent-secondary)]"
                    />
                    <span>Speech Therapist Referral</span>
                  </label>
                </div>
              </div>

              {/* Therapy Assignments */}
              <div className="space-y-2">
                <span className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Therapy Interventions</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.socialSkills}
                      onChange={() => handleActionCheck('socialSkills')}
                      className="accent-[var(--accent-primary)]"
                    />
                    <span>Social Skills Group Therapy</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.sensoryTherapy}
                      onChange={() => handleActionCheck('sensoryTherapy')}
                      className="accent-[var(--accent-primary)]"
                    />
                    <span>Sensory Integration Therapy</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--app-text-secondary)]">
                    <input
                      type="checkbox"
                      checked={clinicalActions.eegFollowup}
                      onChange={() => handleActionCheck('eegFollowup')}
                      className="accent-[var(--accent-primary)]"
                    />
                    <span>EEG Follow-up (6 Months)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Custom Notes text area */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] text-[var(--app-text-muted)] font-bold uppercase tracking-wider block">Report Clinical Addendum</label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="theme-input w-full p-3 rounded-xl text-xs leading-relaxed"
                placeholder="Type clinician observations to append to printable document..."
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-3 justify-end pt-3 border-t border-[var(--app-border)]">
              <Button variant="secondary" onClick={handleSave} className="text-xs py-2 px-4">
                Save Progress
              </Button>
              <Button variant="primary" onClick={() => setPrintModal(true)} className="text-xs py-2 px-5 btn-glow font-bold text-white">
                Generate Printable Report
              </Button>
            </div>

          </Card>

        </div>

      </div>

      {/* Printable Report Modal */}
      <AnimatePresence>
        {printModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:relative print:p-0 print:bg-white print:z-0">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg-elevated)] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none print:bg-white print:p-0 print:relative print:text-black"
            >
              
              {/* Close Button - hidden during printing */}
              <button
                type="button"
                onClick={() => setPrintModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-white/5 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10 print:hidden"
              >
                ✕
              </button>

              {/* Printable Document Container */}
              <div id="printable-area" className="space-y-6 font-serif print:text-black print:bg-white print:m-0 print:p-6 print:text-xs">
                
                {/* Style sheet override for clean browser printing */}
                <style dangerouslySetInnerHTML={{__html: `
                  @media print {
                    body * {
                      visibility: hidden;
                    }
                    #printable-area, #printable-area * {
                      visibility: visible;
                    }
                    #printable-area {
                      position: absolute;
                      left: 0;
                      top: 0;
                      width: 100%;
                      color: #000000 !important;
                      background-color: #ffffff !important;
                    }
                    .text-white {
                      color: #000000 !important;
                    }
                    .text-slate-400, .text-slate-500 {
                      color: #4b5563 !important;
                    }
                    .bg-white\\/\\[0\\.02\\], .bg-black\\/40, .bg-\\[\\#0b0f14\\]\\/80 {
                      background-color: #f3f4f6 !important;
                      border-color: #d1d5db !important;
                    }
                    .border-white\\/5, .border-white\\/10, .border-emerald-500\\/20 {
                      border-color: #9ca3af !important;
                    }
                    .print\\:hidden {
                      display: none !important;
                    }
                  }
                `}} />

                {/* Letterhead */}
                <div className="border-b-2 border-slate-600 pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[var(--app-text-primary)] print:text-black">TELIPORT AI</h2>
                    <p className="text-[10px] text-[var(--app-text-muted)] print:text-slate-600 uppercase font-sans font-semibold tracking-wider mt-0.5">
                      Multimodal Neurodevelopmental Diagnostics
                    </p>
                    <p className="text-[9px] text-[var(--app-text-muted)] print:text-slate-600 mt-1 font-mono">
                      FHIR-Compliant Client ID: #TELIPORT-DX-50020
                    </p>
                  </div>
                  <div className="text-right font-sans text-[10px] text-[var(--app-text-muted)] print:text-slate-600">
                    <p className="font-bold">Clinical Diagnosis & Intake Report</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Status: Signed & Confirmed</p>
                  </div>
                </div>

                {/* Patient Demographics */}
                <div className="grid grid-cols-2 gap-4 bg-[var(--app-surface-muted)] p-4 rounded-xl border border-[var(--app-border)] font-mono text-[10px] text-[var(--app-text-secondary)] print:bg-slate-100 print:border-slate-300">
                  <div>
                    <p className="text-[var(--app-text-muted)] uppercase text-[9px] font-bold">Patient Demographics</p>
                    <p className="text-[var(--app-text-primary)] print:text-black font-semibold mt-1">Name: {currentPatient.name}</p>
                    <p className="mt-0.5">Age: {currentPatient.age}</p>
                    <p className="mt-0.5">Date of Birth: {currentPatient.dob}</p>
                  </div>
                  <div>
                    <p className="text-[var(--app-text-muted)] uppercase text-[9px] font-bold">Referral Log</p>
                    <p className="text-[var(--app-text-primary)] print:text-black font-semibold mt-1">Referral Date: {currentPatient.referralDate}</p>
                    <p className="mt-0.5">Recommended Specialization: {currentPatient.aiSpecialist}</p>
                  </div>
                </div>

                {/* Diagnostic Summary */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[var(--app-text-primary)] print:text-black uppercase tracking-wider font-sans border-b border-[var(--app-border)] pb-1">
                    I. AI Multimodal Evaluation
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-[11px] font-sans">
                    <div className="p-3 bg-[var(--app-surface-muted)] border border-[var(--app-border)] rounded-lg text-center">
                      <span className="text-[var(--app-text-muted)] block uppercase text-[8px] font-bold">Risk Index</span>
                      <span className="text-lg font-bold text-red-500 mt-1 block">{currentPatient.riskScore} / 100</span>
                    </div>
                    <div className="p-3 bg-[var(--app-surface-muted)] border border-[var(--app-border)] rounded-lg text-center">
                      <span className="text-[var(--app-text-muted)] block uppercase text-[8px] font-bold">Model Confidence</span>
                      <span className="text-lg font-bold text-[var(--accent-primary)] print:text-black mt-1 block">{currentPatient.aiConfidence}%</span>
                    </div>
                    <div className="p-3 bg-[var(--app-surface-muted)] border border-[var(--app-border)] rounded-lg text-center">
                      <span className="text-[var(--app-text-muted)] block uppercase text-[8px] font-bold">Primary Biomarkers</span>
                      <span className="text-[10px] text-[var(--app-text-primary)] print:text-black font-semibold mt-1.5 block truncate">
                        {currentPatient.biomarkers[0]?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-[11px] leading-relaxed text-[var(--app-text-secondary)] print:text-black bg-[var(--app-surface-muted)] p-3 rounded-lg border border-[var(--app-border)] font-sans mt-2">
                    <span className="font-bold text-[var(--app-text-primary)] print:text-black block text-[9px] uppercase mb-1">AI Pipeline Reasoning Summary:</span>
                    {currentPatient.aiSummary}
                  </div>
                </div>

                {/* DSM-5 Criteria Cross-Reference */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[var(--app-text-primary)] print:text-black uppercase tracking-wider font-sans border-b border-[var(--app-border)] pb-1">
                    II. Clinician DSM-5 Assessment Alignment
                  </h3>
                  <p className="text-[10px] text-[var(--app-text-muted)] print:text-slate-600 font-sans">
                    Alignment Score between Computer Vision/EEG anomaly predictions and manual evaluation: <strong className="text-[var(--app-text-primary)] print:text-black">{alignmentScore}%</strong>
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-[10px] font-sans">
                    <div className="p-3 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] space-y-1.5">
                      <span className="font-bold text-[var(--accent-secondary)] print:text-black block text-[9px] uppercase">Social Communication (Criterion A)</span>
                      <p className={doctorDSM.A1 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>A1: Deficits in Social-Emotional Reciprocity - {doctorDSM.A1 ? "CONFIRMED" : "NOT PRESENT"}</p>
                      <p className={doctorDSM.A2 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>A2: Deficits in Nonverbal Communication - {doctorDSM.A2 ? "CONFIRMED" : "NOT PRESENT"}</p>
                      <p className={doctorDSM.A3 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>A3: Relationships & Behaviors Deficits - {doctorDSM.A3 ? "CONFIRMED" : "NOT PRESENT"}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] space-y-1.5">
                      <span className="font-bold text-[var(--accent-primary)] print:text-black block text-[9px] uppercase">Repetitive Patterns (Criterion B)</span>
                      <p className={doctorDSM.B1 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>B1: Repetitive Motor Movements / Echolalia - {doctorDSM.B1 ? "CONFIRMED" : "NOT PRESENT"}</p>
                      <p className={doctorDSM.B2 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>B2: Insistence on Sameness / Routines - {doctorDSM.B2 ? "CONFIRMED" : "NOT PRESENT"}</p>
                      <p className={doctorDSM.B3 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>B3: Highly Restricted, Fixated Interests - {doctorDSM.B3 ? "CONFIRMED" : "NOT PRESENT"}</p>
                      <p className={doctorDSM.B4 ? "text-[var(--app-text-primary)] print:text-black" : "text-[var(--app-text-muted)] line-through"}>B4: Hyper/Hypo Sensory Reactivity - {doctorDSM.B4 ? "CONFIRMED" : "NOT PRESENT"}</p>
                    </div>
                  </div>
                </div>

                {/* Final Diagnostic conclusions */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[var(--app-text-primary)] print:text-black uppercase tracking-wider font-sans border-b border-[var(--app-border)] pb-1">
                    III. Clinical Impression & Action Plan
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-[11px] font-sans">
                    <div className="p-2.5 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)]">
                      <span className="text-[var(--app-text-muted)] block uppercase text-[8px] font-bold">Confirmed Diagnosis</span>
                      <span className="text-[var(--app-text-primary)] print:text-black font-semibold mt-1 block">{docDiagnosis}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)]">
                      <span className="text-[var(--app-text-muted)] block uppercase text-[8px] font-bold">Clinician Confidence</span>
                      <span className="text-[var(--accent-secondary)] print:text-black font-semibold mt-1 block">{docConfidence}%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[var(--app-surface-muted)] border border-[var(--app-border)] rounded-lg text-[10px] font-sans space-y-1 mt-2">
                    <span className="font-bold text-[var(--app-text-primary)] print:text-black block text-[9px] uppercase mb-1">Confirmed Interventions:</span>
                    <ul className="list-disc pl-4 space-y-1 text-[var(--app-text-secondary)] print:text-black">
                      {clinicalActions.referNeurologist && <li>Dispatched referral request to Pediatric Neurologist.</li>}
                      {clinicalActions.referOT && <li>Dispatched referral request to Occupational Therapist.</li>}
                      {clinicalActions.referSpeech && <li>Dispatched referral request to Speech Therapist.</li>}
                      {clinicalActions.socialSkills && <li>Prescribed Social Skills Group therapy.</li>}
                      {clinicalActions.sensoryTherapy && <li>Prescribed Sensory Integration therapy.</li>}
                      {clinicalActions.eegFollowup && <li>Ordered baseline EEG follow-up review in 6 months.</li>}
                    </ul>
                  </div>

                  <div className="p-3 bg-[var(--app-surface-muted)] border border-[var(--app-border)] rounded-lg text-[11px] leading-relaxed text-[var(--app-text-secondary)] print:text-black font-sans mt-2">
                    <span className="font-bold text-[var(--app-text-primary)] print:text-black block text-[9px] uppercase mb-1">Clinician Addendum / Notes:</span>
                    <p className="italic">{customNotes}</p>
                  </div>
                </div>

                {/* Sign off */}
                <div className="pt-8 border-t border-[var(--app-border)] flex justify-between items-end font-sans">
                  <div className="text-[10px] text-[var(--app-text-muted)]">
                    <p>Report generated via TELIPORT AI portal.</p>
                    <p>Electronic signature confirmed via clinician account.</p>
                  </div>
                  <div className="text-right border-t border-slate-500 pt-2 w-48 text-[11px] text-[var(--app-text-primary)] print:text-black">
                    <p className="font-bold">Dr. Evelyn Sterling, MD</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Assigned Pediatric Neurologist</p>
                  </div>
                </div>

              </div>

              {/* Modal footer - print hidden */}
              <div className="mt-8 border-t border-[var(--app-border)] pt-4 flex justify-end gap-3 print:hidden">
                <Button variant="secondary" onClick={() => setPrintModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={triggerPrint} className="btn-glow font-bold text-white">
                  Print Report / Save PDF
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
