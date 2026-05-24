import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../components/design-system';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';

const ACCEPT_VIDEO = 'video/*';
const ACCEPT_AUDIO = 'audio/*';
const ACCEPT_EEG = '.edf,.csv,.bdf,.txt,application/octet-stream';

function DropZone({ accept, label, sublabel, icon, onFile, hasFile, fileName, children }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer?.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      className={`
        relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 min-h-[140px] flex flex-col items-center justify-center p-6 glow-border
        ${drag ? 'border-[#00ffcc] bg-[#00ffcc]/10 scale-[1.02] shadow-glowGreen is-active' : 'border-white/15 bg-white/[0.02] hover:border-[#00ffcc]/30 hover:bg-[#00ffcc]/[0.04] hover:shadow-glow'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      {children || (
        <>
          <div className="w-12 h-12 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/25 flex items-center justify-center mb-3">
            {icon}
          </div>
          <p className="text-white font-medium text-sm">{label}</p>
          <p className="text-slate-500 text-xs mt-1 text-center">{sublabel}</p>
          {hasFile && fileName && (
            <p className="text-[#00ffcc] text-xs mt-2 truncate max-w-full px-2">{fileName}</p>
          )}
        </>
      )}
    </div>
  );
}

function EegCanvas({ active }) {
  const canvasRef = useRef(null);
  const tRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const channels = 6;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      tRef.current += 0.04;
      const t = tRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(11, 15, 20, 0.95)';
      ctx.fillRect(0, 0, w, h);
      const rowH = h / channels;
      for (let ch = 0; ch < channels; ch++) {
        const y0 = rowH * ch + rowH / 2;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 204, ${0.35 + ch * 0.08})`;
        ctx.lineWidth = 1.2;
        for (let x = 0; x <= w; x += 2) {
          const phase = ch * 1.7 + t * (1.2 + ch * 0.15);
          const y =
            y0 +
            Math.sin(x * 0.025 + phase) * (rowH * 0.28) +
            Math.sin(x * 0.08 + phase * 2) * (rowH * 0.12) +
            (Math.random() - 0.5) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.font = '10px DM Sans, sans-serif';
        ctx.fillText(`Ch${ch + 1}`, 6, y0 - rowH * 0.35);
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[200px] rounded-lg border border-white/10 bg-[#0b0f14]"
      style={{ minHeight: 200 }}
    />
  );
}

function AudioWaveform({ url, active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const peaksRef = useRef(null);
  const scanRef = useRef(0);

  useEffect(() => {
    if (!url || !active) return;
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const run = async () => {
      try {
        const res = await fetch(url);
        const arr = await res.arrayBuffer();
        const AC = window.AudioContext || window.webkitAudioContext;
        const ac = new AC();
        const buffer = await ac.decodeAudioData(arr.slice(0));
        if (cancelled) return;
        const data = buffer.getChannelData(0);
        const w = Math.max(320, canvas.offsetWidth || 320);
        const peaks = new Float32Array(w);
        const block = Math.floor(data.length / w);
        for (let x = 0; x < w; x++) {
          let min = 1,
            max = -1;
          const start = x * block;
          for (let j = 0; j < block && start + j < data.length; j++) {
            const v = data[start + j];
            if (v < min) min = v;
            if (v > max) max = v;
          }
          peaks[x] = max - min;
        }
        peaksRef.current = peaks;
      } catch {
        peaksRef.current = null;
      }

      const draw = () => {
        if (cancelled) return;
        const w = canvas.offsetWidth || 320;
        const h = canvas.offsetHeight || 160;
        if (!w || !h) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = 'rgba(11, 15, 20, 0.95)';
        ctx.fillRect(0, 0, w, h);
        const peaks = peaksRef.current;
        const mid = h / 2;
        const amp = mid * 0.85;
        if (peaks && peaks.length) {
          const scale = peaks.length / w;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 255, 204, 0.7)';
          ctx.lineWidth = 1;
          for (let x = 0; x < w; x++) {
            const ix = Math.min(Math.floor(x * scale), peaks.length - 1);
            const ph = peaks[ix] * amp * 3;
            ctx.moveTo(x + 0.5, mid - ph);
            ctx.lineTo(x + 0.5, mid + ph);
          }
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
          ctx.beginPath();
          for (let x = 0; x < w; x += 3) {
            const y = mid + Math.sin(x * 0.05 + Date.now() * 0.002) * 20;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        scanRef.current = (scanRef.current + 3) % (w + 80);
        const s = scanRef.current;
        const grad = ctx.createLinearGradient(s - 50, 0, s + 50, 0);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, 'rgba(0, 255, 204, 0.12)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    };
    run();
    return () => {
      cancelled = true;
      peaksRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [url, active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[160px] rounded-lg border border-white/10 bg-[#0b0f14]"
      style={{ minHeight: 160 }}
    />
  );
}

export default function MasimScreening() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [eegFile, setEegFile] = useState(null);
  const [eegReady, setEegReady] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
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

  const onVideo = (f) => setVideoFile(f);
  const onEeg = (f) => {
    setEegFile(f);
    setEegReady(true);
  };
  const onAudio = (f) => setAudioFile(f);

  const runAnalysis = () => {
    if (analyzing) return;
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

  useEffect(() => () => clearInterval(progressTimerRef.current), []);

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">MASIM Screening</h1>
        <p className="text-slate-400 mt-1">
          Multimodal input: video, EEG signal, and audio. Upload signals, then run unified analysis.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">Video</h3>
          <p className="text-white font-medium mb-4">Session recording</p>
          {!videoUrl ? (
            <DropZone
              accept={ACCEPT_VIDEO}
              label="Drop video here"
              sublabel="or click to browse · MP4, WebM, MOV"
              hasFile={!!videoFile}
              fileName={videoFile?.name}
              onFile={onVideo}
              icon={
                <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                <video src={videoUrl} controls className="w-full h-full object-contain max-h-[220px]" playsInline />
              </div>
              <p className="text-xs text-slate-400 truncate">{videoFile?.name}</p>
              <Button variant="ghost" size="sm" onClick={() => setVideoFile(null)}>
                Replace video
              </Button>
            </motion.div>
          )}
        </Card>

        {/* EEG */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">EEG</h3>
          <p className="text-white font-medium mb-4">Neural signal upload</p>
          <DropZone
            accept={ACCEPT_EEG}
            label="Drop EEG / signal file"
            sublabel="Simulated waveform after upload · .edf, .csv, any"
            hasFile={!!eegFile}
            fileName={eegFile?.name}
            onFile={onEeg}
            icon={
              <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            }
          />
          <div className="mt-4">
            <p className="text-xs text-slate-500 mb-2">Simulated multichannel EEG</p>
            <EegCanvas active={eegReady} />
            {!eegReady && (
              <p className="text-xs text-slate-500 mt-2 text-center">Upload a file to activate live simulation</p>
            )}
          </div>
        </Card>

        {/* Audio */}
        <Card>
          <h3 className="text-sm font-semibold text-[#00ffcc] uppercase tracking-wider mb-1">Audio</h3>
          <p className="text-white font-medium mb-4">Speech / ambient audio</p>
          {!audioUrl ? (
            <DropZone
              accept={ACCEPT_AUDIO}
              label="Drop audio here"
              sublabel="WAV, MP3, OGG"
              hasFile={!!audioFile}
              fileName={audioFile?.name}
              onFile={onAudio}
              icon={
                <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              }
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <audio src={audioUrl} controls className="w-full h-10" />
              <p className="text-xs text-slate-500">Animated waveform</p>
              <AudioWaveform url={audioUrl} active />
              <Button variant="ghost" size="sm" onClick={() => setAudioFile(null)}>
                Replace audio
              </Button>
            </motion.div>
          )}
        </Card>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <Button variant="primary" size="lg" onClick={runAnalysis} disabled={analyzing}>
          Run Analysis
        </Button>
        {analysisDone && (
          <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-[#00ffcc]">
            Analysis complete — explainable report below
          </motion.span>
        )}
      </motion.div>

      <AnimatePresence>
        {analysisDone && (
          <motion.div key="analysis-results" className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ExplainableAIPanel />
            <DigitalDevelopmentalTwin />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {analyzing && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b0f14]/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-[#00ffcc]/25 bg-white/[0.06] backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,255,204,0.12)]"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-[#00ffcc]/30 border-t-[#00ffcc]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
              </div>
              <motion.p
                className="text-center text-white font-medium text-lg mb-2"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              >
                Processing Multimodal Signals...
              </motion.p>
              <p className="text-center text-slate-400 text-sm mb-6">MASIM fusion pipeline</p>
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span className="text-[#00ffcc] tabular-nums">{analysisProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden border border-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00ffcc, #00d4ff)',
                    boxShadow: '0 0 12px rgba(0, 255, 204, 0.5)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ type: 'tween', duration: 0.15 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
