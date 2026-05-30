import { useState, useRef, useEffect, useCallback } from 'react';

export const ACCEPT_VIDEO = 'video/*';
export const ACCEPT_AUDIO = 'audio/*';
export const ACCEPT_EEG = '.edf,.csv,.bdf,.txt,application/octet-stream';

export function DropZone({ accept, label, sublabel, icon, onFile, hasFile, fileName, children }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer?.files?.[0];
      if (f) onFile(f);
    },
    [onFile],
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
      className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center p-6 glow-border ${
        drag
          ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-muted)] scale-[1.01] is-active'
          : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] hover:border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--app-border))] hover:bg-[var(--accent-primary-muted)]'
      }`}
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
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary-muted)] border border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))] flex items-center justify-center mb-3">
            {icon}
          </div>
          <p className="text-[var(--app-text-primary)] font-medium text-sm">{label}</p>
          <p className="text-[var(--app-text-muted)] text-xs mt-1 text-center">{sublabel}</p>
          {hasFile && fileName && (
            <p className="text-[var(--accent-primary)] text-xs mt-2 truncate max-w-full px-2">{fileName}</p>
          )}
        </>
      )}
    </div>
  );
}

export function EegCanvas({ active }) {
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
      ctx.fillStyle = 'var(--app-input-bg)';
      ctx.fillRect(0, 0, w, h);
      const rowH = h / channels;
      for (let ch = 0; ch < channels; ch++) {
        const y0 = rowH * ch + rowH / 2;
        ctx.beginPath();
        ctx.strokeStyle = `color-mix(in srgb, var(--accent-primary) ${35 + ch * 8}%, transparent)`;
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
        ctx.fillStyle = 'var(--app-text-muted)';
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
      className="w-full h-[180px] rounded-lg border border-[var(--app-border)] bg-[var(--app-input-bg)]"
      style={{ minHeight: 180 }}
    />
  );
}

export function AudioWaveform({ url, active }) {
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
          let min = 1;
          let max = -1;
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
        ctx.fillStyle = 'var(--app-input-bg)';
        ctx.fillRect(0, 0, w, h);
        const peaks = peaksRef.current;
        const mid = h / 2;
        const amp = mid * 0.85;
        if (peaks && peaks.length) {
          const scale = peaks.length / w;
          ctx.beginPath();
          ctx.strokeStyle = 'var(--accent-primary)';
          ctx.globalAlpha = 0.75;
          ctx.lineWidth = 1;
          for (let x = 0; x < w; x++) {
            const ix = Math.min(Math.floor(x * scale), peaks.length - 1);
            const ph = peaks[ix] * amp * 3;
            ctx.moveTo(x + 0.5, mid - ph);
            ctx.lineTo(x + 0.5, mid + ph);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        scanRef.current = (scanRef.current + 3) % (w + 80);
        const s = scanRef.current;
        const grad = ctx.createLinearGradient(s - 50, 0, s + 50, 0);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, 'color-mix(in srgb, var(--accent-primary) 12%, transparent)');
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
      className="w-full h-[140px] rounded-lg border border-[var(--app-border)] bg-[var(--app-input-bg)]"
      style={{ minHeight: 140 }}
    />
  );
}
