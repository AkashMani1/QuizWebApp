"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  accentColor: string;
}

export function ProgressBar({ current, total, accentColor }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4">
      {/* Question count */}
      <div className="flex-shrink-0 text-sm font-semibold text-slate-500 tabular-nums">
        <span className="text-slate-800">{current}</span>
        <span className="text-slate-300 mx-1">/</span>
        <span>{total}</span>
      </div>

      {/* Progress track */}
      <div className="flex-1 relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
            boxShadow: `0 0 8px ${accentColor}66`,
          }}
        />
        {/* Shimmer layer */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Percentage */}
      <div className="flex-shrink-0 text-sm font-bold tabular-nums" style={{ color: accentColor }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
}
