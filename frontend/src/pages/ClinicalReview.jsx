import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../components/design-system';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';
import { EegCanvas } from '../components/prescreening/UploadWidgets';

const PATIENTS_DATABASE = {
  'liam-carter': {
    name: 'Liam Carter',
    age: '4 Years',
    dob: 'April 12, 2022',
    riskScore: 76,
    urgency: 'High Risk',
    confidence: 94,
    referralDate: 'May 25, 2026',
    defaultNote: "Liam Carter (Age 4) presents with marked joint gaze latency (12% attention focus vs 65% control) and repetitive motor stereotypies (hand flapping, index 2.8Hz) captured in behavioral tracking. EEG frontal spectral scans verify Theta/Beta ratio shift (TBR = 4.75). Findings match diagnostic guidelines for ASD Level 1.",
    behavioral: {
      gazeGaps: '12% focus duration (Avoidant)',
      smileLatency: '3.4 seconds (Delayed)',
      stereotypyIndex: 'Hand flapping active (freq: 2.8Hz)',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Flat affect (variance < 1.4 Hz)',
      latency: 'Average 3.4s response delay',
      echolalia: 'Repetitive phoneme loops detected',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '4.75 (Triage Trigger Threshold > 2.5)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '15/100 (Delayed)',
      language: '22/100 (Delayed)',
      sensory: '50/100 (Moderate)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'eye-contact', label: 'Low eye contact', modality: 'Video', domain: 'Social gaze', confidence: 87, importance: 92, level: 'high' },
        { id: 'joint-attention', label: 'Reduced joint attention', modality: 'Video', domain: 'Social interaction', confidence: 81, importance: 78, level: 'high' },
        { id: 'eeg-anomaly', label: 'EEG anomaly', modality: 'EEG', domain: 'Neural connectivity', confidence: 74, importance: 65, level: 'moderate' }
      ],
      importance: [
        { label: 'Low eye contact', value: 92, modality: 'Video' },
        { label: 'Reduced joint attention', value: 78, modality: 'Video' },
        { label: 'EEG anomaly', value: 65, modality: 'EEG' }
      ],
      summary: "This screening session was reviewed using video, EEG, and audio signals fused by the MASIM model. The strongest contributors to the current risk estimate were limited sustained eye contact and reduced joint attention during social moments in the recording. EEG analysis also flagged an atypical connectivity pattern worth follow-up in context of the child's history and presentation."
    },
    biomarkers: [
      "Visual CV: 12% joint attention gaze focus duration; hand flapping stereotypy index active.",
      "Acoustic Speech: Flat pitch prosody variance (variance < 1.4 Hz); echolalia repetitions.",
      "Neural EEG: Frontal Theta-to-Beta ratio shift (TBR = 4.75)."
    ]
  },
  'lucas-davis': {
    name: 'Lucas Davis',
    age: '4 Years',
    dob: 'September 30, 2022',
    riskScore: 82,
    urgency: 'High Risk',
    confidence: 96,
    referralDate: 'May 29, 2026',
    defaultNote: "Lucas Davis (Age 4) presents with severe joint attention deficits (8% gaze focus) and pronounced motor stereotypies (rocking and hand flapping at 3.2Hz). Frontal EEG spectra shows highly elevated TBR (5.12). Recommending fast-tracked comprehensive clinical assessment for Autism Spectrum Disorder.",
    behavioral: {
      gazeGaps: '8% focus duration (Severely Avoidant)',
      smileLatency: '4.1 seconds (Severely Delayed)',
      stereotypyIndex: 'Hand flapping & rocking active (freq: 3.2Hz)',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Atypical cadence & flat tone (variance < 1.1 Hz)',
      latency: 'Average 4.2s response delay',
      echolalia: 'High Echolalia (phrase repetition loops)',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '5.12 (Triage Trigger Threshold > 2.5)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '10/100 (Delayed)',
      language: '18/100 (Delayed)',
      sensory: '40/100 (Severe)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'stereotypies', label: 'Severe motor stereotypies', modality: 'Video', domain: 'Motor tracking', confidence: 92, importance: 95, level: 'high' },
        { id: 'smile-latency', label: 'Delayed gaze smile', modality: 'Video', domain: 'Facial affect', confidence: 89, importance: 88, level: 'high' },
        { id: 'tbr-wave', label: 'Elevated TBR wave', modality: 'EEG', domain: 'Spectral bands', confidence: 84, importance: 82, level: 'high' }
      ],
      importance: [
        { label: 'Severe motor stereotypies', value: 95, modality: 'Video' },
        { label: 'Delayed gaze smile', value: 88, modality: 'Video' },
        { label: 'Elevated TBR wave', value: 82, modality: 'EEG' }
      ],
      summary: "Predictive markers highlight a high degree of convergence across CV motor tracking and neural EEG spectra. High-frequency motor stereotypies (3.2Hz) combined with fronto-central spectral abnormalities (TBR=5.12) are the primary drivers of the elevated risk score. Standard clinical follow-up is urgently advised."
    },
    biomarkers: [
      "Visual CV: 8% joint attention gaze focus duration; rocking & hand flapping (3.2Hz).",
      "Acoustic Speech: Atypical speech cadence; high echolalia phrase repetition loops.",
      "Neural EEG: Elevated frontal spectral power shift (TBR = 5.12)."
    ]
  },
  'noah-kline': {
    name: 'Noah Kline',
    age: '3 Years',
    dob: 'November 05, 2023',
    riskScore: 68,
    urgency: 'High Risk',
    confidence: 90,
    referralDate: 'May 26, 2026',
    defaultNote: "Noah Kline (Age 3) exhibits moderate social-communication delay with 18% joint attention gaze focus. Frontal EEG spectral features indicate a TBR of 3.90, exceeding the risk threshold. Suggesting diagnostic evaluation with ADOS-2 Toddler Module.",
    behavioral: {
      gazeGaps: '18% focus duration (Avoidant)',
      smileLatency: '2.9 seconds (Delayed)',
      stereotypyIndex: 'Mild finger tapping active (freq: 1.5Hz)',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Monotone speech tendencies (variance < 1.6 Hz)',
      latency: 'Average 2.8s response delay',
      echolalia: 'Occasional word repetitions detected',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '3.90 (Triage Trigger Threshold > 2.5)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '25/100 (Delayed)',
      language: '30/100 (Moderate Delay)',
      sensory: '60/100 (Moderate)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'tbr-elevation', label: 'Frontal TBR elevation', modality: 'EEG', domain: 'Neural connectivity', confidence: 82, importance: 85, level: 'high' },
        { id: 'joint-attention', label: 'Low joint attention', modality: 'Video', domain: 'Social interaction', confidence: 78, importance: 74, level: 'moderate' },
        { id: 'social-score', label: 'Social questionnaire score', modality: 'Questionnaire', domain: 'Parent assessment', confidence: 85, importance: 70, level: 'moderate' }
      ],
      importance: [
        { label: 'Frontal TBR elevation', value: 85, modality: 'EEG' },
        { label: 'Low joint attention', value: 74, modality: 'Video' },
        { label: 'Social questionnaire score', value: 70, modality: 'Questionnaire' }
      ],
      summary: "Neural spectral features (TBR=3.90) and parent-reported social communication deficits represent the primary weights for this classification. Direct behavioral observation shows moderate gaze avoidance. Suggest specialized neurological follow-up."
    },
    biomarkers: [
      "Visual CV: 18% joint attention gaze focus duration; mild finger tapping active (1.5Hz).",
      "Acoustic Speech: Monotone pitch tendencies; average 2.8s response delay.",
      "Neural EEG: Frontal Theta-to-Beta spectral shift (TBR = 3.90)."
    ]
  },
  'oliver-thomas': {
    name: 'Oliver Thomas',
    age: '3 Years',
    dob: 'February 18, 2023',
    riskScore: 74,
    urgency: 'High Risk',
    confidence: 91,
    referralDate: 'May 29, 2026',
    defaultNote: "Oliver Thomas (Age 3) demonstrates significant sensory seeking behavior, atypical tactile and vestibular responses, and toe walking. Video analysis highlights frequent hand posturing. Advise sensory integration therapy and Occupational Therapy evaluation.",
    behavioral: {
      gazeGaps: '14% focus duration (Avoidant)',
      smileLatency: '3.1 seconds (Delayed)',
      stereotypyIndex: 'Toe walking and hand posturing detected',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Variable intonation fluctuations',
      latency: 'Average 2.5s response delay',
      echolalia: 'Minimal word-copy loops',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '3.10 (Triage Trigger Threshold > 2.5)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '20/100 (Delayed)',
      language: '35/100 (Moderate Delay)',
      sensory: '30/100 (Atypical sensory)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'sensory-score', label: 'Sensory regulation score', modality: 'Questionnaire', domain: 'Sensory processing', confidence: 88, importance: 90, level: 'high' },
        { id: 'posturing', label: 'Motor posturing', modality: 'Video', domain: 'Motor tracking', confidence: 82, importance: 80, level: 'high' },
        { id: 'smile-latency', label: 'Gaze smile latency', modality: 'Video', domain: 'Social interaction', confidence: 75, importance: 72, level: 'moderate' }
      ],
      importance: [
        { label: 'Sensory regulation score', value: 90, modality: 'Questionnaire' },
        { label: 'Motor posturing', value: 80, modality: 'Video' },
        { label: 'Gaze smile latency', value: 72, modality: 'Video' }
      ],
      summary: "Sensory regulation anomalies reported in parent surveys combined with computer-vision detected atypical motor patterns (toe walking, hand posturing) represent the leading contributors. Neural features are moderately elevated. OT consultation is highly recommended."
    },
    biomarkers: [
      "Visual CV: 14% joint attention gaze focus; toe walking and hand posturing.",
      "Acoustic Speech: Intonation fluctuations; average 2.5s response delay.",
      "Neural EEG: Frontal Theta-to-Beta ratio shift (TBR = 3.10)."
    ]
  },
  'emma-larson': {
    name: 'Emma Larson',
    age: '6 Years',
    dob: 'June 14, 2020',
    riskScore: 48,
    urgency: 'Medium Risk',
    confidence: 85,
    referralDate: 'May 27, 2026',
    defaultNote: "Emma Larson (Age 6) presents with mild communication delays and vocal echolalia patterns during speech elicitation tasks. Gaze attention and motor tracking are largely within expected ranges. Recommend Speech-Language Therapy assessment.",
    behavioral: {
      gazeGaps: '35% focus duration (Mildly Avoidant)',
      smileLatency: '2.1 seconds (Slightly Delayed)',
      stereotypyIndex: 'No major active stereotypies detected',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Variable pitch, monotonic under stress',
      latency: 'Average 3.0s response delay',
      echolalia: 'Echolalia detected in specific tasks',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '2.45 (Below Trigger Threshold)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '45/100 (Moderate)',
      language: '38/100 (Moderate Delay)',
      sensory: '65/100 (Typical)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'response-delay', label: 'Speech response delay', modality: 'Audio', domain: 'Vocal prosody', confidence: 80, importance: 85, level: 'high' },
        { id: 'echolalia', label: 'Echolalia repetitions', modality: 'Audio', domain: 'Acoustic features', confidence: 82, importance: 78, level: 'high' },
        { id: 'social-comm', label: 'Social communication score', modality: 'Questionnaire', domain: 'Parent assessment', confidence: 70, importance: 60, level: 'moderate' }
      ],
      importance: [
        { label: 'Speech response delay', value: 85, modality: 'Audio' },
        { label: 'Echolalia repetitions', value: 78, modality: 'Audio' },
        { label: 'Social communication score', value: 60, modality: 'Questionnaire' }
      ],
      summary: "Audio features, specifically vocal response latency (3.0s) and repetitive acoustic sequences, are the primary contributors. Behavioral and EEG metrics show low-to-typical indicators. Speech-language evaluation is suggested."
    },
    biomarkers: [
      "Visual CV: 35% joint attention gaze focus; no major active stereotypies.",
      "Acoustic Speech: Monotonic under stress; echolalia detected in specific responses.",
      "Neural EEG: Frontal Theta-to-Beta ratio (TBR = 2.45)."
    ]
  },
  'ava-wilson': {
    name: 'Ava Wilson',
    age: '5 Years',
    dob: 'August 22, 2021',
    riskScore: 55,
    urgency: 'Medium Risk',
    confidence: 88,
    referralDate: 'May 28, 2026',
    defaultNote: "Ava Wilson (Age 5) presents with moderate sensory self-regulation challenges and occasional motor stereotypies (hand flapping at 1.8Hz). Language and speech are borderline. Recommended Occupational Therapy evaluation to address sensory seeking.",
    behavioral: {
      gazeGaps: '30% focus duration (Mild Avoidant)',
      smileLatency: '2.4 seconds (Slightly Delayed)',
      stereotypyIndex: 'Occasional hand flapping (freq: 1.8Hz)',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Mildly flat prosody (variance < 1.9 Hz)',
      latency: 'Average 2.2s response delay',
      echolalia: 'Low word repetitions detected',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '2.68 (Slightly Above Threshold)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '40/100 (Moderate)',
      language: '48/100 (Typical-borderline)',
      sensory: '42/100 (Moderate sensory seek)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'sensory-score', label: 'Sensory regulation score', modality: 'Questionnaire', domain: 'Sensory processing', confidence: 85, importance: 82, level: 'high' },
        { id: 'hand-flapping', label: 'Hand flapping active', modality: 'Video', domain: 'Motor tracking', confidence: 78, importance: 75, level: 'moderate' },
        { id: 'tbr-wave', label: 'Elevated TBR wave', modality: 'EEG', domain: 'Neural spectral', confidence: 70, importance: 68, level: 'moderate' }
      ],
      importance: [
        { label: 'Sensory regulation score', value: 82, modality: 'Questionnaire' },
        { label: 'Hand flapping active', value: 75, modality: 'Video' },
        { label: 'Elevated TBR wave', value: 68, modality: 'EEG' }
      ],
      summary: "The risk assessment is primarily driven by parent-reported sensory processing items and computerized tracking of hand flapping. Neural markers show slight elevation above baseline. OT assessment will help optimize sensory integration."
    },
    biomarkers: [
      "Visual CV: 30% joint attention gaze focus; occasional hand flapping (1.8Hz).",
      "Acoustic Speech: Flat prosody; response latency delay (average 2.2s).",
      "Neural EEG: EEG spectral power shift (TBR = 2.68)."
    ]
  },
  'sophia-miller': {
    name: 'Sophia Miller',
    age: '5 Years',
    dob: 'December 03, 2021',
    riskScore: 28,
    urgency: 'Low Risk',
    confidence: 92,
    referralDate: 'May 28, 2026',
    defaultNote: "Sophia Miller (Age 5) shows screening profiles within the typical neurodevelopmental range across all domains. Behavioral gaze, speech cadence, and EEG spectral power (TBR=1.85) present no clinical anomalies. Routine developmental tracking is sufficient.",
    behavioral: {
      gazeGaps: '58% focus duration (Typical)',
      smileLatency: '1.4 seconds (Typical)',
      stereotypyIndex: 'Absent',
      description: 'Computer Vision play-pattern tracking keypoints.'
    },
    audio: {
      prosody: 'Natural pitch variance (typical cadence)',
      latency: 'Average 1.2s response delay (Typical)',
      echolalia: 'None detected',
      description: 'Acoustic pitch variance and voice imitation tracking.'
    },
    eeg: {
      tbr: '1.85 (Typical Range)',
      description: 'Fast Fourier Transform (FFT) spectral frequency breakdown.'
    },
    questionnaire: {
      social: '70/100 (Typical)',
      language: '75/100 (Typical)',
      sensory: '80/100 (Typical)',
      description: 'Parent-submitted developmental milestone domains.'
    },
    xai: {
      factors: [
        { id: 'social-gaze', label: 'Typical joint attention', modality: 'Video', domain: 'Social gaze', confidence: 94, importance: 85, level: 'moderate' },
        { id: 'spectral-bands', label: 'Typical frontal ratio', modality: 'EEG', domain: 'Spectral bands', confidence: 91, importance: 80, level: 'moderate' },
        { id: 'parent-assess', label: 'Typical social questionnaire', modality: 'Questionnaire', domain: 'Parent assessment', confidence: 90, importance: 78, level: 'moderate' }
      ],
      importance: [
        { label: 'Typical joint attention', value: 85, modality: 'Video' },
        { label: 'Typical frontal ratio', value: 80, modality: 'EEG' },
        { label: 'Typical social questionnaire', value: 78, modality: 'Questionnaire' }
      ],
      summary: "Multimodal fusion indicates high alignment with typical neurodevelopmental milestones. There are no atypical visual, acoustic, or neural biomarkers detected. Standard pediatric check-ups are recommended."
    },
    biomarkers: [
      "Visual CV: Typical joint attention gaze focus (58%); no stereotypies.",
      "Acoustic Speech: Typical speech cadence; response latency typical (1.2s).",
      "Neural EEG: Typical neural spectrals (TBR = 1.85)."
    ]
  }
};

export default function ClinicalReview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || 'liam-carter';
  const currentPatient = PATIENTS_DATABASE[patientId] || PATIENTS_DATABASE['liam-carter'];

  const [docNotes, setDocNotes] = useState(currentPatient.defaultNote);
  const [activeAction, setActiveAction] = useState(null); // 'approve', 'test', 'refer', 'confirm', 'summary'
  const [summaryModal, setSummaryModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync doc notes when patientId changes
  useEffect(() => {
    setDocNotes(currentPatient.defaultNote);
    setActiveAction(null);
    setNotification(null);
  }, [patientId]);

  const handleActionClick = (actionType) => {
    setActiveAction(actionType);
    if (actionType === 'summary') {
      setSummaryModal(true);
    } else {
      const messages = {
        approve: `✓ Recommended specialist (${currentPatient.xai.factors[0]?.label || 'triage recommendation'}) approved for ${currentPatient.name}.`,
        test: `✓ Order for additional tests (detailed audiometry & follow-up EEG) dispatched for ${currentPatient.name}.`,
        refer: `✓ Referral request routed to developmental specialists for ${currentPatient.name}.`,
        confirm: `✓ Diagnosis of ASD-related markers signed off for ${currentPatient.name}'s clinical file.`
      };
      setNotification({
        type: 'success',
        message: messages[actionType]
      });
      setTimeout(() => {
        setActiveAction(null);
      }, 2000);
    }
  };

  const getUrgencyClass = (urgency) => {
    if (urgency === 'High Risk') return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (urgency === 'Medium Risk') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Clinical Review Workspace</h1>
            <p className="text-slate-400 mt-1">
              Review screening indicators, analyze multimodal signals, and finalize diagnosis logs.
            </p>
          </div>
          {/* Patient Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/[0.02] border border-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider pl-2">Case file:</span>
            <select
              value={patientId}
              onChange={(e) => setSearchParams({ patientId: e.target.value })}
              className="bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#00d4ff] focus:outline-none focus:border-[#00d4ff]/50 transition-all hover:bg-white/[0.04]"
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

      {/* Floating Action Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.08)]"
          >
            <div className="flex items-center gap-2">
              <span>🩺</span>
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white font-bold ml-2">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 Modalities Findings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Behavioral Findings */}
        <Card className="space-y-4 border border-white/5 bg-white/[0.01]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#00ffcc] uppercase tracking-wider flex items-center gap-1.5">
              <span>📹</span> Behavioral Findings
            </h3>
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded ${getUrgencyClass(currentPatient.urgency)}`}>
              {currentPatient.urgency}
            </span>
          </div>
          <p className="text-xs text-slate-400">{currentPatient.behavioral.description}</p>
          
            <div className="p-3 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Joint Attention Gaze Gaps:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.behavioral.gazeGaps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Gaze Smile Latency:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.behavioral.smileLatency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Motor Stereotypy Index:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.behavioral.stereotypyIndex}</span>
              </div>
            </div>
        </Card>

        {/* Audio / Speech Findings */}
        <Card className="space-y-4 border border-white/5 bg-white/[0.01]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#00d4ff] uppercase tracking-wider flex items-center gap-1.5">
              <span>🎙️</span> Audio Findings
            </h3>
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded ${getUrgencyClass(currentPatient.urgency)}`}>
              {currentPatient.urgency}
            </span>
          </div>
          <p className="text-xs text-slate-400">{currentPatient.audio.description}</p>

            <div className="p-3 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Vocal Pitch Prosody:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.audio.prosody}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Utterance Latency:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.audio.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--app-text-muted)] font-medium">Echolalia Indicator:</span>
                <span className="text-[var(--app-text-primary)] font-semibold">{currentPatient.audio.echolalia}</span>
              </div>
            </div>
        </Card>

        {/* EEG Waveform Findings */}
        <Card className="space-y-4 border border-white/5 bg-white/[0.01]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🧠</span> EEG Findings
            </h3>
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded ${getUrgencyClass(currentPatient.urgency)}`}>
              {currentPatient.urgency}
            </span>
          </div>
          <p className="text-xs text-slate-400">{currentPatient.eeg.description}</p>
          <EegCanvas active={true} />
            <div className="p-3 rounded-lg bg-[var(--app-surface-muted)] border border-[var(--app-border)] text-xs flex justify-between">
              <span className="text-[var(--app-text-muted)] font-medium">Frontal Theta-to-Beta Ratio (TBR):</span>
              <span className="text-[#00ffcc] font-bold">{currentPatient.eeg.tbr}</span>
            </div>
        </Card>

        {/* Questionnaire Domain score */}
        <Card className="space-y-4 flex flex-col justify-between border border-white/5 bg-white/[0.01]">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📝</span> Questionnaire Findings
              </h3>
              <span className={`text-[10px] font-bold border px-2 py-0.5 rounded ${getUrgencyClass(currentPatient.urgency)}`}>
                {currentPatient.urgency}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">{currentPatient.questionnaire.description}</p>
            
              <div className="space-y-2.5 text-xs bg-[var(--app-surface-muted)] border border-[var(--app-border)] p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-[var(--app-text-muted)] font-medium">Social Interaction Domain:</span>
                  <span className="text-[var(--app-text-primary)] font-semibold font-mono">{currentPatient.questionnaire.social}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--app-text-muted)] font-medium">Language Communication:</span>
                  <span className="text-[var(--app-text-primary)] font-semibold font-mono">{currentPatient.questionnaire.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--app-text-muted)] font-medium">Sensory Self-Regulation:</span>
                  <span className="text-[var(--app-text-primary)] font-semibold font-mono">{currentPatient.questionnaire.sensory}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[var(--app-border)] pt-3 mt-4 text-[10px] text-[var(--app-text-muted)] font-semibold flex justify-between items-center">
            <span>Combined Screening Risk Score:</span>
            <span className="text-white font-bold text-xs bg-white/5 px-2 py-1 rounded font-mono">{currentPatient.riskScore}/100</span>
          </div>
        </Card>

      </div>

      {/* Downstream Explainable AI traces */}
      <ExplainableAIPanel
        confidence={currentPatient.confidence}
        factors={currentPatient.xai.factors}
        importance={currentPatient.xai.importance}
        summary={currentPatient.xai.summary}
      />

      {/* Doctor Notes Box */}
      <Card className="space-y-4 border border-white/5 bg-white/[0.01]">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <span>✍️</span> Physician Clinical Notes
        </h3>
        <p className="text-slate-400 text-xs">Add specific observations or therapeutic recommendations to final intake card.</p>
        <textarea
          rows={5}
          value={docNotes}
          onChange={(e) => setDocNotes(e.target.value)}
          className="theme-input w-full p-4 rounded-xl text-xs leading-relaxed"
          placeholder="Record notes..."
        />
      </Card>

      {/* Action Buttons Panel */}
      <Card className="p-6 border border-white/5 bg-white/[0.01]">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Triage Verification Actions</h3>
        <div className="flex flex-wrap gap-3">
          
          <Button
            onClick={() => handleActionClick('approve')}
            variant={activeAction === 'approve' ? 'ghost' : 'secondary'}
            disabled={activeAction !== null && activeAction !== 'approve'}
            className="flex-1 min-w-[160px] text-xs py-2.5 transition-all"
          >
            {activeAction === 'approve' ? '✓ Recommendation Approved' : 'Approve Recommendation'}
          </Button>

          <Button
            onClick={() => handleActionClick('test')}
            variant={activeAction === 'test' ? 'ghost' : 'secondary'}
            disabled={activeAction !== null && activeAction !== 'test'}
            className="flex-1 min-w-[160px] text-xs py-2.5 transition-all"
          >
            {activeAction === 'test' ? '✓ Additional Tests Requested' : 'Request Additional Tests'}
          </Button>

          <Button
            onClick={() => handleActionClick('refer')}
            variant={activeAction === 'refer' ? 'ghost' : 'secondary'}
            disabled={activeAction !== null && activeAction !== 'refer'}
            className="flex-1 min-w-[160px] text-xs py-2.5 transition-all"
          >
            {activeAction === 'refer' ? '✓ Specialist Referred' : 'Refer Specialist'}
          </Button>

          <Button
            onClick={() => handleActionClick('confirm')}
            variant={activeAction === 'confirm' ? 'ghost' : 'secondary'}
            disabled={activeAction !== null && activeAction !== 'confirm'}
            className="flex-1 min-w-[160px] text-xs py-2.5 transition-all"
          >
            {activeAction === 'confirm' ? '✓ Diagnosis Confirmed' : 'Confirm Diagnosis'}
          </Button>

          <Button
            onClick={() => handleActionClick('summary')}
            variant="primary"
            className="flex-1 min-w-[200px] text-xs py-2.5 btn-glow font-bold text-white"
          >
            Generate Clinical Summary
          </Button>

        </div>
      </Card>

      {/* Clinical Summary Output Modal */}
      <AnimatePresence>
        {summaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg-elevated)] p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSummaryModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-white/5 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              >
                ✕
              </button>

              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="text-[9px] tracking-widest font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded border border-[#00d4ff]/20 uppercase">
                  AI-Generated Diagnostic Package
                </span>
                <h3 className="text-lg font-bold text-white mt-2">TELIPORT AI Clinical Intake Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">Doc ID: #INTAKE-{patientId.toUpperCase()} · Date: {new Date().toLocaleDateString()}</p>
              </div>

              {/* Summary Document Body */}
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <div className="grid grid-cols-2 gap-4 bg-[var(--app-surface-muted)] p-3 rounded-lg border border-[var(--app-border)] font-mono text-[10px] text-[var(--app-text-secondary)]">
                  <p>Patient Name: <span className="text-white print:text-black font-semibold">{currentPatient.name}</span></p>
                  <p>Date of Birth: <span className="text-white print:text-black font-semibold">{currentPatient.dob}</span></p>
                  <p>Risk Score: <span className="text-red-400 font-bold">{currentPatient.riskScore}/100 ({currentPatient.urgency})</span></p>
                  <p>Confidence Index: <span className="text-[#00ffcc] font-semibold">{currentPatient.confidence}%</span></p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wide text-[#00d4ff]">Verified Biomarkers</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
                    {currentPatient.biomarkers.map((bio, index) => (
                      <li key={index}>{bio}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wide text-[#00d4ff]">Physician Clinical Conclusions</h4>
                  <p className="p-3 bg-[var(--app-surface-muted)] rounded-lg border border-[var(--app-border)] text-[11px] text-[var(--app-text-secondary)] leading-normal whitespace-pre-line">
                    {docNotes}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  ✓ Clinical Summary generated and securely encrypted. Data packet transmitted to the assigned therapists and specialists.
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 border-t border-white/10 pt-4 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setSummaryModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {
                  setNotification({
                    type: 'success',
                    message: `✓ Final clinical package for ${currentPatient.name} transmitted & sent to print queue.`
                  });
                  setSummaryModal(false);
                }} className="btn-glow font-bold text-white">
                  Transmit & Print Package
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
