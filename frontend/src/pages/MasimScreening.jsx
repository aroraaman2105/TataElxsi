import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, ProgressBar } from '../components/design-system';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';
import DevelopmentalQuestionnaire from '../components/prescreening/DevelopmentalQuestionnaire';
import {
  DropZone,
  EegCanvas,
  AudioWaveform,
  ACCEPT_VIDEO,
  ACCEPT_AUDIO,
  ACCEPT_EEG,
} from '../components/prescreening/UploadWidgets';

export default function MasimScreening() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [eegFile, setEegFile] = useState(null);
  const [eegReady, setEegReady] = useState(false);

  // Questionnaire states
  const [answers, setAnswers] = useState({});
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [behavioralRiskScore, setBehavioralRiskScore] = useState(null);
  const [showQModal, setShowQModal] = useState(false);

  // Analysis workflow states
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [activeLog, setActiveLog] = useState('Initializing MASIM pipelines...');
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

  const handleVideoUpload = (f) => setVideoFile(f);
  const handleAudioUpload = (f) => setAudioFile(f);
  const handleEegUpload = (f) => {
    setEegFile(f);
    setEegReady(true);
  };

  const pipelineLogs = [
    '[Intake] Initializing pipelines... Loading video keypoint trackers...',
    '[CV] Mapping 68-point facial landmark mesh for joint attention...',
    '[Speech] Parsing vocal acoustics & prosody pitch jitter...',
    '[EEG] Calculating spectral density in alpha and theta bands...',
    '[CV] Hand flapping motor patterns detected in video (freq: 2.8Hz)',
    '[Speech] Vocal pitch variance flat prosody detection active (variance < 1.4Hz)',
    '[EEG] TBR ratio: 4.75 anomalous in frontal cortex F3-F4',
    '[Behavioral] Integrating questionnaire answers into assessment vector...',
    '[Fusion] Converging signals into Multimodal Fusion Transformer...',
    '[Fusion] Completing cross-attention matrix calculations...',
    '[Fusion] Core analysis outputs resolved.',
  ];

  const runAnalysis = () => {
    if (analyzing) return;
    setAnalyzing(true);
    setAnalysisDone(false);
    setAnalysisProgress(0);
    let p = 0;
    progressTimerRef.current = setInterval(() => {
      p += 4 + Math.random() * 6;
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
      const logIdx = Math.min(
        pipelineLogs.length - 1,
        Math.floor((p / 100) * pipelineLogs.length)
      );
      setActiveLog(pipelineLogs[logIdx]);
    }, 150);
  };

  const checklistReady = !!videoFile && !!audioFile && questionnaireSubmitted;

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">MASIM Screening</h1>
        <p className="text-slate-400 mt-1">
          Multimodal input fusion: video recording, speech audio, EEG wave uploads, and parent questionnaire.
        </p>
      </motion.div>

      {/* 2x2 Grid of Modalities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Upload */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">Behavior Video</h3>
          <p className="text-slate-400 text-xs mb-4">Short play/interaction recording for Computer Vision analysis.</p>
          {!videoUrl ? (
            <DropZone
              accept={ACCEPT_VIDEO}
              label="Drop behavior video here"
              sublabel="or click to browse · MP4, WebM, MOV"
              hasFile={!!videoFile}
              fileName={videoFile?.name}
              onFile={handleVideoUpload}
              icon={
                <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                <video src={videoUrl} controls className="w-full h-full object-contain max-h-[180px]" playsInline />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="truncate max-w-[200px]">{videoFile?.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setVideoFile(null)}>
                  Replace
                </Button>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Audio Upload */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">Vocal Audio</h3>
          <p className="text-slate-400 text-xs mb-4">Speech sample recording for acoustic prosody modeling.</p>
          {!audioUrl ? (
            <DropZone
              accept={ACCEPT_AUDIO}
              label="Drop speech audio here"
              sublabel="or click to browse · WAV, MP3, OGG"
              hasFile={!!audioFile}
              fileName={audioFile?.name}
              onFile={handleAudioUpload}
              icon={
                <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              }
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <audio src={audioUrl} controls className="w-full h-10" />
              <AudioWaveform url={audioUrl} active />
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="truncate max-w-[200px]">{audioFile?.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setAudioFile(null)}>
                  Replace
                </Button>
              </div>
            </motion.div>
          )}
        </Card>

        {/* EEG Waveform Upload */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">EEG Signals (Optional)</h3>
          <p className="text-slate-400 text-xs mb-4">EDF/CSV brain signal file. Simulates neural bands on upload.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropZone
              accept={ACCEPT_EEG}
              label="Drop EEG file here"
              sublabel=".edf, .csv or binary files"
              hasFile={!!eegFile}
              fileName={eegFile?.name}
              onFile={handleEegUpload}
              icon={
                <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              }
            />
            <div className="rounded-xl border border-white/10 p-3 bg-black/40 flex flex-col justify-center min-h-[140px]">
              <span className="text-[10px] uppercase text-slate-500 font-bold mb-1.5">EEG Signal Simulator</span>
              <EegCanvas active={eegReady} />
            </div>
          </div>
        </Card>

        {/* Questionnaire Intake */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">Developmental Questionnaire</h3>
            <p className="text-slate-400 text-xs mb-4">Complete the baseline developmental assessment questions.</p>
            
            {questionnaireSubmitted ? (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <span>✓</span> Questionnaire Submitted Successfully
                </p>
                <p className="text-slate-300">
                  Behavioral Risk Score: <span className="font-bold text-white">{behavioralRiskScore}</span>
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-center space-y-3">
                <p className="text-slate-400 text-xs">Fill out standard questions mapping basic developmental markers.</p>
                <Button size="sm" onClick={() => setShowQModal(true)}>
                  Start Questionnaire
                </Button>
              </div>
            )}
          </div>
          <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-xs text-slate-500">
            <span>M-CHAT based domains</span>
            {questionnaireSubmitted && (
              <Button size="sm" variant="ghost" onClick={() => setShowQModal(true)}>
                Edit Answers
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Run Analysis Trigger */}
      <div className="flex flex-col items-center justify-center pt-4">
        {!analysisDone && !analyzing && (
          <div className="text-center">
            <Button variant="primary" size="lg" onClick={runAnalysis} disabled={!checklistReady || analyzing}>
              Run MASIM Analysis
            </Button>
            {!checklistReady && (
              <p className="text-xs text-slate-500 mt-2">
                Upload video, audio, and submit the questionnaire to enable analysis.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Analysis Workflow Diagram (Active/Complete state) */}
      <AnimatePresence>
        {(analyzing || analysisDone) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Interactive Workflow Diagram */}
            <Card className="border border-white/5 bg-[#090d12]/70 overflow-hidden relative min-h-[300px]">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Interactive Processing Workflow</h3>
              
              <div className="grid grid-cols-11 gap-2 items-center justify-center relative min-h-[220px]">
                {/* Modality Inputs Column */}
                <div className="col-span-3 space-y-3">
                  <div className="p-2 rounded-lg border border-white/5 bg-white/[0.02] flex items-center gap-2">
                    <span className="text-sm">📹</span>
                    <span className="text-[11px] text-white font-medium">Behavior Video</span>
                  </div>
                  <div className="p-2 rounded-lg border border-white/5 bg-white/[0.02] flex items-center gap-2">
                    <span className="text-sm">🎙️</span>
                    <span className="text-[11px] text-white font-medium">Vocal Audio</span>
                  </div>
                  <div className="p-2 rounded-lg border border-white/5 bg-white/[0.02] flex items-center gap-2">
                    <span className="text-sm">🧠</span>
                    <span className="text-[11px] text-white font-medium">EEG Waves</span>
                  </div>
                  <div className="p-2 rounded-lg border border-white/5 bg-white/[0.02] flex items-center gap-2">
                    <span className="text-sm">📝</span>
                    <span className="text-[11px] text-white font-medium">Questionnaire</span>
                  </div>
                </div>

                {/* Connectors 1 */}
                <div className="col-span-1 flex flex-col justify-around h-full min-h-[160px] items-center">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="w-full h-[1px] bg-white/10 relative">
                      {analyzing && (
                        <motion.div
                          className="absolute top-[-2px] left-0 w-2 h-1 rounded-full bg-[#00ffcc]"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 1.2 + idx * 0.2, ease: 'linear' }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* AI Processing Nodes */}
                <div className="col-span-3 space-y-3">
                  <div className={`p-2 rounded-lg border text-left transition-colors duration-300 ${analyzing ? 'border-[#00ffcc] bg-[#00ffcc]/10 shadow-[0_0_8px_rgba(0,255,204,0.2)]' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="text-[11px] text-white font-bold">Computer Vision Analysis</p>
                    <p className="text-[9px] text-slate-500">Keypoint/Attention track</p>
                  </div>
                  <div className={`p-2 rounded-lg border text-left transition-colors duration-300 ${analyzing ? 'border-[#00d4ff] bg-[#00d4ff]/10 shadow-[0_0_8px_rgba(0,212,255,0.2)]' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="text-[11px] text-white font-bold">Speech Analysis</p>
                    <p className="text-[9px] text-slate-500">Prosody spectrogram</p>
                  </div>
                  <div className={`p-2 rounded-lg border text-left transition-colors duration-300 ${analyzing ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_8px_rgba(168,85,247,0.2)]' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="text-[11px] text-white font-bold">Neural Signal Analysis</p>
                    <p className="text-[9px] text-slate-500">Frequency TBR ratios</p>
                  </div>
                  <div className={`p-2 rounded-lg border text-left transition-colors duration-300 ${analyzing ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_8px_rgba(234,179,8,0.2)]' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="text-[11px] text-white font-bold">Behavioral Assessment</p>
                    <p className="text-[9px] text-slate-500">Questionnaire metrics</p>
                  </div>
                </div>

                {/* Connectors 2 */}
                <div className="col-span-1 flex flex-col justify-around h-full min-h-[160px] items-center">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="w-full h-[1px] bg-white/10 relative">
                      {analyzing && (
                        <motion.div
                          className="absolute top-[-2px] left-0 w-2 h-1 rounded-full bg-[#00d4ff]"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 0.8 + idx * 0.15, ease: 'linear' }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Multimodal Fusion Orb */}
                <div className="col-span-3 flex flex-col items-center justify-center">
                  <motion.div
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center flex-col p-1 text-center relative transition-all duration-500 ${
                      analyzing
                        ? 'border-[#00ffcc] bg-[#00ffcc]/10 shadow-[0_0_24px_rgba(0,255,204,0.3)]'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}
                    animate={analyzing ? { rotate: 360, scale: [1, 1.05, 1] } : {}}
                    transition={analyzing ? { rotate: { repeat: Infinity, duration: 4, ease: 'linear' }, scale: { repeat: Infinity, duration: 1.5 } } : {}}
                  >
                    <div className="absolute inset-[-4px] rounded-full border border-dashed border-[#00d4ff]/40 animate-[spin_10s_linear_infinite]" />
                    <span className="text-[9px] font-bold text-white uppercase relative z-10">MULTIMODAL</span>
                    <span className="text-[8px] text-[#00ffcc] font-semibold uppercase relative z-10">FUSION ENGINE</span>
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* Simulated pipeline log scanner (Active during analysis) */}
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="border border-[#00ffcc]/20 bg-[#00ffcc]/[0.02] p-4">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-ping" />
                      Pipeline inference tracker
                    </span>
                    <span className="text-[#00ffcc] font-bold">{analysisProgress}%</span>
                  </div>
                  <ProgressBar value={analysisProgress} showLabel={false} height="sm" />
                  <p className="text-[10px] font-mono text-[#00ffcc] bg-black/40 p-2 border border-white/5 rounded mt-2 truncate">
                    {activeLog}
                  </p>
                </Card>
              </motion.div>
            )}

            {/* Redesigned Generated Output Panel */}
            {analysisDone && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Risk Score */}
                <Card className="border border-white/5 bg-[#090d12]/80 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full filter blur-xl pointer-events-none" />
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">MASIM Risk Score</h4>
                  
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#ef4444"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 76 / 100)}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))' }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-white tabular-nums">76</span>
                      <span className="text-[9px] text-slate-500">OUT OF 100</span>
                    </div>
                  </div>

                  <span className="mt-4 px-2.5 py-0.5 text-[10px] font-bold rounded bg-red-500/10 border border-red-500/20 text-red-400 uppercase tracking-wide">
                    High Risk profile
                  </span>
                </Card>

                {/* Confidence Score */}
                <Card className="border border-white/5 bg-[#090d12]/80 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#00ffcc]/10 rounded-full filter blur-xl pointer-events-none" />
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">Fusion Confidence</h4>

                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#00ffcc"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 94 / 100)}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 204, 0.4))' }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-white tabular-nums">94%</span>
                      <span className="text-[9px] text-slate-500">ACCURACY</span>
                    </div>
                  </div>

                  <span className="mt-4 px-2.5 py-0.5 text-[10px] font-bold rounded bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] uppercase tracking-wide">
                    High Convergence
                  </span>
                </Card>

                {/* Biomarker Summary Card */}
                <Card className="border border-white/5 bg-[#090d12]/80 flex flex-col justify-between p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Biomarker Highlights</h4>
                  
                  <div className="space-y-2 text-xs text-slate-300 flex-1 overflow-y-auto max-h-[140px] pr-1.5 scrollbar-none">
                    <div className="border-l-2 border-[#00ffcc] pl-2 py-0.5">
                      <p className="font-semibold text-white text-[10px] uppercase">Visual CV</p>
                      <p className="text-[9px] text-slate-400">Atypical joint gaze duration (12% attention), motor stereotypies detected.</p>
                    </div>
                    <div className="border-l-2 border-[#00d4ff] pl-2 py-0.5">
                      <p className="font-semibold text-white text-[10px] uppercase">Speech Acoustics</p>
                      <p className="text-[9px] text-slate-400">Flat vocal pitch affect, vocal repetition delay detected.</p>
                    </div>
                    <div className="border-l-2 border-purple-400 pl-2 py-0.5">
                      <p className="font-semibold text-white text-[10px] uppercase">Neural EEG</p>
                      <p className="text-[9px] text-slate-400">Anomalous frontal Theta/Beta power ratio (TBR = 4.75).</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Downstream panels */}
      <AnimatePresence>
        {analysisDone && (
          <motion.div key="analysis-results" className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ExplainableAIPanel />
            <DigitalDevelopmentalTwin />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Questionnaire */}
      <AnimatePresence>
        {showQModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0f14] p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-white">Intake Developmental Screening</h3>
                <button
                  type="button"
                  onClick={() => setShowQModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <DevelopmentalQuestionnaire
                answers={answers}
                onChange={setAnswers}
                submitted={questionnaireSubmitted}
                onSubmit={(result) => {
                  setAnswers(result.answers);
                  setBehavioralRiskScore(result.riskScore);
                  setQuestionnaireSubmitted(true);
                  setShowQModal(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
