"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResultsScreenProps {
  score: number;
  total: number;
  accentColor: string;
  /** Re-fetches a fresh batch of questions and restarts from scratch */
  onPlayAgain: () => void;
  onHome: () => void;
}

// ─── Canvas confetti ─────────────────────────────────────────────────────────

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PALETTE = [
      "#6366f1", "#8b5cf6", "#a78bfa",
      "#22d3ee", "#34d399", "#fbbf24",
      "#f472b6", "#60a5fa", "#fb923c",
    ];

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; rotation: number; vr: number; opacity: number;
      shape: "rect" | "circle";
    };

    const particles: Particle[] = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 300,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 2.5 + Math.random() * 4,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      size: 5 + Math.random() * 7,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 9,
      opacity: 1,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        if (p.y > canvas.height * 0.65) p.opacity -= 0.018;
        if (p.opacity <= 0 || p.y > canvas.height) continue;
        alive++;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
        }
        ctx.restore();
      }

      if (alive > 0) animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

// ─── ResultsScreen ────────────────────────────────────────────────────────────

export function ResultsScreen({
  score,
  total,
  accentColor,
  onPlayAgain,
  onHome,
}: ResultsScreenProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPerfect = score === total;
  const isGreat = percentage >= 75;
  const isOkay = percentage >= 50;

  const grade = isPerfect
    ? { emoji: "🏆", label: "Perfect Score!", sub: "Outstanding! You nailed every single question." }
    : isGreat
    ? { emoji: "🎉", label: "Great Job!", sub: "You really know your stuff!" }
    : isOkay
    ? { emoji: "👍", label: "Well Done!", sub: "Solid effort — keep learning and growing!" }
    : { emoji: "📚", label: "Keep Practicing!", sub: "Every expert was once a beginner. Try again!" };

  const circumference = 2 * Math.PI * 48;
  const dashOffset = circumference - (percentage / 100) * circumference;

  const stats = [
    { label: "Correct", value: score, color: "#4ade80", bg: "rgba(34, 197, 94, 0.15)" },
    { label: "Incorrect", value: total - score, color: "#fb7185", bg: "rgba(244, 63, 94, 0.15)" },
    { label: "Score", value: `${percentage}%`, color: accentColor, bg: `${accentColor}15` },
  ];

  return (
    <>
      {(isPerfect || isGreat) && <Confetti />}

      <div className="flex flex-col items-center gap-7">
        {/* Animated score ring */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <motion.circle
              cx="55"
              cy="55"
              r="48"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="url(#scoreGrad)"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={accentColor} />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-black text-slate-100 tabular-nums"
            >
              {score}/{total}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-sm font-bold tabular-nums"
              style={{ color: accentColor }}
            >
              {percentage}%
            </motion.span>
          </div>
        </motion.div>

        {/* Grade label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="text-4xl mb-2">{grade.emoji}</div>
          <h2 className="text-2xl font-black text-slate-100 mb-1.5">{grade.label}</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[260px] mx-auto">{grade.sub}</p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full grid grid-cols-3 gap-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center gap-1.5 rounded-2xl py-4 px-2"
              style={{ background: s.bg }}
            >
              <span className="text-2xl font-black tabular-nums" style={{ color: s.color }}>
                {s.value}
              </span>
              <span className="text-xs font-semibold text-slate-400">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Fetches FRESH questions on play again */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col gap-3"
        >
          <button
            id="btn-play-again"
            onClick={onPlayAgain}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              boxShadow: `0 8px 24px ${accentColor}40`,
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-2xl" />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Play Again — New Questions
          </button>

          <button
            id="btn-go-home"
            onClick={onHome}
            className="w-full py-4 rounded-2xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </>
  );
}
