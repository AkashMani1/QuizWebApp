"use client";

import { motion } from "framer-motion";

// A single shimmer pulse element
function Shimmer({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/5 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
      />
    </div>
  );
}

/**
 * Skeleton that mirrors the exact dimensions of the QuestionCard —
 * two badge pills, three heading lines, four option buttons, one CTA button.
 */
export function SkeletonLoader() {
  return (
    <div
      className="bg-card border border-white/5 shadow-card rounded-3xl p-8 flex flex-col gap-6"
      role="status"
      aria-label="Loading questions…"
    >
      {/* Category + difficulty badges */}
      <div className="flex items-center gap-2">
        <Shimmer className="h-7 w-28 rounded-full" />
        <Shimmer className="h-7 w-16 rounded-full" />
      </div>

      {/* Question heading — 2 lines */}
      <div className="flex flex-col gap-2.5">
        <Shimmer className="h-6 w-full" />
        <Shimmer className="h-6 w-4/5" />
      </div>

      {/* Answer options × 4 */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="flex items-center gap-4 rounded-2xl p-4 border border-white/5 bg-white/5"
          >
            {/* Letter badge */}
            <Shimmer className="flex-shrink-0 w-9 h-9 rounded-xl" />
            {/* Text */}
            <Shimmer className={`h-4 rounded-lg flex-1 ${n % 2 === 0 ? "w-3/4" : "w-full"}`} />
          </div>
        ))}
      </div>

      {/* Bottom CTA placeholder */}
      <Shimmer className="h-14 w-full rounded-2xl mt-1" />
    </div>
  );
}

// ─── Error state card ─────────────────────────────────────────────────────────

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-white/5 shadow-card rounded-3xl p-8 flex flex-col items-center gap-6 text-center"
      role="alert"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-rose-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      {/* Copy */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 mb-2">Oops, something went wrong</h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{message}</p>
      </div>

      {/* Retry */}
      <button
        id="btn-retry-fetch"
        onClick={onRetry}
        className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 relative overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, #f43f5e, #e11d48)",
          boxShadow: "0 8px 24px rgba(244,63,94,0.35)",
        }}
      >
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-2xl" />
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>
    </motion.div>
  );
}
