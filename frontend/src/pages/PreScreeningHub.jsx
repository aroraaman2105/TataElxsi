import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, ProgressBar } from '../components/design-system';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';
import {
  DropZone,
  EegCanvas,
  AudioWaveform,
  ACCEPT_VIDEO,
  ACCEPT_AUDIO,
  ACCEPT_EEG,
} from '../components/prescreening/UploadWidgets';
import DevelopmentalQuestionnaire from '../components/prescreening/DevelopmentalQuestionnaire';

const STEPS = [
  {
    id: 0,
    title: 'Child Profile',
    subtitle: 'Tell us about your child',
    duration: '2 min',
  },
  {
    id: 1,
    title: 'Behavioral Video',
    subtitle: 'Upload a short clip of everyday play',
    duration: '3 min',
  },
  {
    id: 2,
    title: 'Speech Recording',
    subtitle: 'A voice sample or conversation',
    duration: '2 min',
  },
  {
    id: 3,
    title: 'EEG Data',
    subtitle: 'Optional brain activity file from your clinic',
    duration: '1 min',
    optional: true,
  },
  {
    id: 4,
    title: 'Parent Questionnaire',
    subtitle: 'Developmental screening across six behavior areas',
    duration: '5 min',
  },
  {
    id: 5,
    title: 'MASIM Analysis',
    subtitle: 'Run the combined pre-screening review',
    duration: '2 min',
  },
];

const EMPTY_PROFILE = {
  firstName: '',
  birthDate: '',
  sex: '',
  language: 'English',
};

function StepIcon({ done, active, optional, index }) {
  if (done) {
    return (
      <span className="w-8 h-8 rounded-full bg-[var(--accent-success)] text-white flex items-center justify-center text-sm font-bold shrink-0">
        ✓
      </span>
    );
  }
  return (
    <span
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 ${
        active
          ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]'
          : 'border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-muted)]'
      }`}
    >
      {optional ? '—' : index + 1}
    </span>
  );
}

function StepperSidebar({ steps, currentStep, completion, onSelect }) {
  return (
    <Card className="!p-0 overflow-hidden h-fit lg:sticky lg:top-24">
      <div className="px-5 py-4 border-b border-[var(--app-border)] bg-[var(--app-surface-muted)]">
        <p className="text-xs uppercase tracking-wider text-[var(--app-text-muted)] font-semibold">
          Pre-screening steps
        </p>
        <p className="text-sm text-[var(--app-text-primary)] font-medium mt-1">
          {completion.completed} of {completion.total} complete
        </p>
        <ProgressBar value={completion.percent} showLabel={false} className="mt-3" height="sm" />
      </div>

      <nav className="p-3 space-y-1" aria-label="Pre-screening steps">
        {steps.map((step, index) => {
          const done = completion.byStep[index];
          const active = currentStep === index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors border ${
                active
                  ? 'bg-[var(--accent-primary-muted)] border-[color-mix(in_srgb,var(--accent-primary)_30%,var(--app-border))]'
                  : 'border-transparent hover:bg-[var(--app-surface-muted)]'
              }`}
            >
              <StepIcon done={done} active={active} optional={step.optional} index={index} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-medium ${active ? 'text-[var(--app-text-primary)]' : 'text-[var(--app-text-secondary)]'}`}>
                    {step.title}
                  </p>
                  {step.optional && (
                    <span className="text-[10px] uppercase tracking-wide text-[var(--app-text-muted)]">Optional</span>
                  )}
                </div>
                <p className="text-xs text-[var(--app-text-muted)] mt-0.5 line-clamp-2">{step.subtitle}</p>
                <p className={`text-[10px] mt-1.5 font-medium ${done ? 'text-[var(--accent-success)]' : 'text-[var(--app-text-muted)]'}`}>
                  {done ? 'Complete' : `~${step.duration}`}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </Card>
  );
}

function MobileStepper({ steps, currentStep, completion }) {
  return (
    <div className="lg:hidden space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--app-text-muted)]">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-[var(--accent-primary)] font-medium tabular-nums">{completion.percent}%</span>
      </div>
      <ProgressBar value={completion.percent} showLabel={false} height="sm" />
      <div className="flex gap-1 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const done = completion.byStep[index];
          const active = currentStep === index;
          return (
            <div
              key={step.id}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                active
                  ? 'bg-[var(--accent-primary-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : done
                    ? 'bg-[color-mix(in_srgb,var(--accent-success)_12%,var(--app-surface))] border-[var(--accent-success)] text-[var(--accent-success)]'
                    : 'bg-[var(--app-surface)] border-[var(--app-border)] text-[var(--app-text-muted)]'
              }`}
            >
              {done ? '✓' : index + 1}. {step.title.split(' ')[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileStep({ profile, onChange }) {
  const update = (field, value) => onChange({ ...profile, [field]: value });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-[var(--app-text-primary)]">Child&apos;s first name</span>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            placeholder="e.g. Emma"
            className="theme-input mt-1.5 w-full px-4 py-2.5 rounded-lg text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--app-text-primary)]">Date of birth</span>
          <input
            type="date"
            value={profile.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            className="theme-input mt-1.5 w-full px-4 py-2.5 rounded-lg text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--app-text-primary)]">Sex</span>
          <select
            value={profile.sex}
            onChange={(e) => update('sex', e.target.value)}
            className="theme-input mt-1.5 w-full px-4 py-2.5 rounded-lg text-sm"
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Prefer not to say</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--app-text-primary)]">Primary language at home</span>
          <input
            type="text"
            value={profile.language}
            onChange={(e) => update('language', e.target.value)}
            placeholder="e.g. English"
            className="theme-input mt-1.5 w-full px-4 py-2.5 rounded-lg text-sm"
          />
        </label>
      </div>
      <p className="text-xs text-[var(--app-text-muted)] rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3">
        This information helps us personalize your screening. It is stored securely and only shared with your care team.
      </p>
    </div>
  );
}


function AnalysisStep({ ready, analyzing, analysisDone, onRun, checklist, riskScore }) {
  return (
    <div className="space-y-6">
      {riskScore !== null && (
        <div className="rounded-xl border border-[var(--app-border)] bg-[var(--accent-primary-muted)] p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--app-text-muted)] font-semibold">
              Questionnaire result
            </p>
            <p className="text-sm text-[var(--app-text-primary)] mt-1">
              Behavioral Risk Score: <span className="font-bold tabular-nums">{riskScore}</span>
            </p>
          </div>
          <span className="status-pill status-pill-info">Included in analysis</span>
        </div>
      )}
      <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-5">
        <p className="text-sm font-medium text-[var(--app-text-primary)] mb-3">Ready to analyze</p>
        <ul className="space-y-2">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              <span className={item.done ? 'text-[var(--accent-success)]' : 'text-[var(--app-text-muted)]'}>
                {item.done ? '✓' : '○'}
              </span>
              <span className={item.done ? 'text-[var(--app-text-primary)]' : 'text-[var(--app-text-muted)]'}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {!analysisDone ? (
        <div className="text-center py-4">
          <p className="text-sm text-[var(--app-text-muted)] mb-4 max-w-md mx-auto">
            MASIM combines your uploads and questionnaire into one easy-to-read summary for your doctor visit.
          </p>
          <Button size="lg" onClick={onRun} disabled={!ready || analyzing}>
            {analyzing ? 'Running analysis…' : 'Run MASIM Analysis'}
          </Button>
          {!ready && (
            <p className="text-xs text-[var(--app-text-muted)] mt-3">
              Complete the required steps above before running analysis.
            </p>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[color-mix(in_srgb,var(--accent-success)_30%,var(--app-border))] bg-[color-mix(in_srgb,var(--accent-success)_8%,var(--app-surface))] p-5 text-center"
        >
          <p className="text-lg font-semibold text-[var(--app-text-primary)]">Pre-screening complete</p>
          <p className="text-sm text-[var(--app-text-muted)] mt-1">
            Your summary is ready. Scroll down to review your AI triage report and digital twin snapshot.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function PreScreeningHub() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [eegFile, setEegFile] = useState(null);
  const [eegSkipped, setEegSkipped] = useState(false);
  const [eegReady, setEegReady] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [behavioralRiskScore, setBehavioralRiskScore] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisDone, setAnalysisDone] = useState(false);
  const progressTimerRef = useRef(null);

  useEffect(() => {
    if (!videoFile) {
      setVideoUrl(null);
      return;
    }
    const u = URL.createObjectURL(videoFile);
    setVideoUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [videoFile]);

  useEffect(() => {
    if (!audioFile) {
      setAudioUrl(null);
      return;
    }
    const u = URL.createObjectURL(audioFile);
    setAudioUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [audioFile]);

  useEffect(() => () => clearInterval(progressTimerRef.current), []);

  const stepComplete = useMemo(() => {
    const profileDone = profile.firstName.trim() && profile.birthDate;
    const videoDone = !!videoFile;
    const speechDone = !!audioFile;
    const eegDone = !!eegFile || eegSkipped;
    const questionnaireDone = questionnaireSubmitted;
    const analysisStepDone = analysisDone;
    return [profileDone, videoDone, speechDone, eegDone, questionnaireDone, analysisStepDone];
  }, [profile, videoFile, audioFile, eegFile, eegSkipped, questionnaireSubmitted, analysisDone]);

  const completion = useMemo(() => {
    const completed = stepComplete.filter(Boolean).length;
    return {
      byStep: stepComplete,
      completed,
      total: STEPS.length,
      percent: Math.round((completed / STEPS.length) * 100),
    };
  }, [stepComplete]);

  const analysisReady = stepComplete.slice(0, 5).every(Boolean);

  const analysisChecklist = [
    { label: 'Child profile saved', done: stepComplete[0] },
    { label: 'Behavioral video uploaded', done: stepComplete[1] },
    { label: 'Speech recording uploaded', done: stepComplete[2] },
    { label: 'EEG step finished (upload or skip)', done: stepComplete[3] },
    { label: 'Questionnaire completed', done: stepComplete[4] },
  ];

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const runAnalysis = () => {
    if (analyzing || !analysisReady) return;
    setAnalyzing(true);
    setAnalysisDone(false);
    setAnalysisProgress(0);
    let p = 0;
    progressTimerRef.current = setInterval(() => {
      p += 2 + Math.random() * 6;
      if (p >= 100) {
        p = 100;
        clearInterval(progressTimerRef.current);
        setAnalysisProgress(100);
        setTimeout(() => {
          setAnalyzing(false);
          setAnalysisDone(true);
        }, 600);
        return;
      }
      setAnalysisProgress(Math.round(p));
    }, 120);
  };

  const step = STEPS[currentStep];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ProfileStep profile={profile} onChange={setProfile} />;
      case 1:
        return !videoUrl ? (
          <DropZone
            accept={ACCEPT_VIDEO}
            label="Drop a short video here"
            sublabel="Everyday play works best · MP4, WebM, MOV · up to 5 min"
            hasFile={!!videoFile}
            fileName={videoFile?.name}
            onFile={setVideoFile}
            icon={
              <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-[var(--app-border)] bg-black aspect-video max-h-[320px]">
              <video src={videoUrl} controls className="w-full h-full object-contain" playsInline />
            </div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-sm text-[var(--app-text-muted)] truncate">{videoFile?.name}</p>
              <Button variant="ghost" size="sm" onClick={() => setVideoFile(null)}>
                Replace video
              </Button>
            </div>
          </div>
        );
      case 2:
        return !audioUrl ? (
          <DropZone
            accept={ACCEPT_AUDIO}
            label="Drop a speech recording here"
            sublabel="Reading a story or chatting · WAV, MP3, OGG"
            hasFile={!!audioFile}
            fileName={audioFile?.name}
            onFile={setAudioFile}
            icon={
              <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            }
          />
        ) : (
          <div className="space-y-4">
            <audio src={audioUrl} controls className="w-full" />
            <AudioWaveform url={audioUrl} active />
            <Button variant="ghost" size="sm" onClick={() => setAudioFile(null)}>
              Replace recording
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-[var(--app-text-muted)]">
              If your clinic provided an EEG file, upload it here. Otherwise you can skip this step — it won&apos;t block your screening.
            </p>
            {!eegSkipped && (
              <DropZone
                accept={ACCEPT_EEG}
                label="Drop EEG file here"
                sublabel=".edf, .csv, or other signal formats"
                hasFile={!!eegFile}
                fileName={eegFile?.name}
                onFile={(f) => {
                  setEegFile(f);
                  setEegReady(true);
                  setEegSkipped(false);
                }}
                icon={
                  <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                }
              />
            )}
            {eegReady && !eegSkipped && (
              <>
                <EegCanvas active={eegReady} />
                <Button variant="ghost" size="sm" onClick={() => { setEegFile(null); setEegReady(false); }}>
                  Remove file
                </Button>
              </>
            )}
            {eegSkipped && (
              <p className="text-sm text-[var(--accent-primary)] rounded-lg border border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))] bg-[var(--accent-primary-muted)] p-4">
                EEG step skipped — you can continue to the questionnaire.
              </p>
            )}
            {!eegFile && !eegSkipped && (
              <Button variant="secondary" onClick={() => setEegSkipped(true)}>
                Skip this step
              </Button>
            )}
          </div>
        );
      case 4:
        return (
          <DevelopmentalQuestionnaire
            answers={answers}
            onChange={setAnswers}
            submitted={questionnaireSubmitted}
            onSubmit={(result) => {
              setAnswers(result.answers);
              setBehavioralRiskScore(result.riskScore);
              setQuestionnaireSubmitted(true);
            }}
          />
        );
      case 5:
        return (
          <AnalysisStep
            ready={analysisReady}
            analyzing={analyzing}
            analysisDone={analysisDone}
            onRun={runAnalysis}
            checklist={analysisChecklist}
            riskScore={behavioralRiskScore}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] overflow-hidden"
      >
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-[var(--accent-primary-muted)] to-transparent border-b border-[var(--app-border)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)] font-semibold">
            Before your doctor visit
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--app-text-primary)] mt-1">
            Pre-Screening Hub
          </h1>
          <p className="text-sm text-[var(--app-text-muted)] mt-2 max-w-2xl">
            Complete each step at your own pace. Most families finish in about 15 minutes. Your data stays private and secure.
          </p>
        </div>
        <div className="px-6 py-4 sm:px-8 flex flex-wrap items-center gap-4 text-xs text-[var(--app-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)]" />
            Encrypted uploads
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            Save &amp; continue anytime
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
            Parent-friendly language
          </span>
        </div>
      </motion.header>

      <MobileStepper steps={STEPS} currentStep={currentStep} completion={completion} />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        <div className="hidden lg:block">
          <StepperSidebar
            steps={STEPS}
            currentStep={currentStep}
            completion={completion}
            onSelect={setCurrentStep}
          />
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--app-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-semibold text-[var(--app-text-primary)]">{step.title}</h2>
                {step.optional && (
                  <span className="status-pill status-pill-info text-[10px]">Optional</span>
                )}
                {stepComplete[currentStep] && (
                  <span className="status-pill status-pill-success text-[10px]">Complete</span>
                )}
              </div>
              <p className="text-sm text-[var(--app-text-muted)] mt-0.5">{step.subtitle}</p>
            </div>
            <span className="text-xs text-[var(--app-text-muted)] shrink-0">~{step.duration}</span>
          </div>

          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep < 5 && (
            <div className="px-6 py-4 border-t border-[var(--app-border)] bg-[var(--app-surface-muted)] flex items-center justify-between gap-3">
              <Button variant="secondary" onClick={goBack} disabled={currentStep === 0}>
                Back
              </Button>
              <Button onClick={goNext} disabled={!stepComplete[currentStep]}>
                {currentStep === STEPS.length - 2 ? 'Review & analyze' : 'Continue'}
              </Button>
            </div>
          )}
        </Card>
      </div>

      <AnimatePresence>
        {analysisDone && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <ExplainableAIPanel />
            <DigitalDevelopmentalTwin />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {analyzing && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--app-overlay)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))] bg-[var(--app-surface)] backdrop-blur-xl p-8 shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-[color-mix(in_srgb,var(--accent-primary)_30%,var(--app-border))] border-t-[var(--accent-primary)]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
              </div>
              <p className="text-center text-[var(--app-text-primary)] font-medium text-lg mb-2">
                Running MASIM analysis…
              </p>
              <p className="text-center text-[var(--app-text-muted)] text-sm mb-6">
                Combining video, speech, and questionnaire responses
              </p>
              <ProgressBar value={analysisProgress} label="Progress" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
