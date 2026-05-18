"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTrivia } from "@/hooks/useTrivia";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsScreen } from "@/components/ResultsScreen";
import { SkeletonLoader, ErrorCard } from "@/components/SkeletonLoader";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Accent colour used across the live-trivia quiz session */
const LIVE_ACCENT = "#6366f1";

const CARD_STYLE = {
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.04)",
  border: "1px solid rgba(0,0,0,0.04)",
} as const;

const PAGE_VARIANTS = {
  enter: { opacity: 0, x: 48, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -48, scale: 0.97 },
};

interface ActiveQuizProps {
  onExit: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ActiveQuiz({ onExit }: ActiveQuizProps) {
  const {
    currentQuestion,
    currentIndex,
    total,
    score,
    status,
    error,
    submitAnswer,
    retry,
    playAgain,
  } = useTrivia();

  const isPlaying = status === "playing";
  const isFinished = status === "finished";

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center gap-4 mb-3">
            {/* Back button */}
            <button
              id="btn-back-home"
              onClick={onExit}
              aria-label="Back to home"
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all duration-150 active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide truncate">
                🌐 Live Trivia
              </p>
            </div>

            {/* Question counter pill */}
            {isPlaying && (
              <div
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-white tabular-nums"
                style={{ background: LIVE_ACCENT }}
              >
                {currentIndex + 1} / {total}
              </div>
            )}

            {/* Status badges */}
            {status === "loading" && (
              <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <motion.div
                  className="w-2 h-2 rounded-full bg-indigo-400"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                />
                <span className="text-xs font-semibold text-indigo-400">Fetching…</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-xs font-semibold text-rose-400">Error</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {isPlaying && (
            <ProgressBar
              current={currentIndex + 1}
              total={total}
              accentColor={LIVE_ACCENT}
            />
          )}
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-start justify-center px-5 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">

            {/* Loading skeleton */}
            {status === "loading" && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <SkeletonLoader />
              </motion.div>
            )}

            {/* Error state */}
            {status === "error" && (
              <motion.div key="error">
                <ErrorCard message={error ?? "Unknown error."} onRetry={retry} />
              </motion.div>
            )}

            {/* Active question */}
            {isPlaying && currentQuestion && (
              <motion.div
                key={`q-${currentIndex}-${currentQuestion.id}`}
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-white/5 shadow-card rounded-3xl p-8"
              >
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={total}
                  onSubmit={submitAnswer}
                  accentColor={LIVE_ACCENT}
                />
              </motion.div>
            )}

            {/* Results */}
            {isFinished && (
              <motion.div
                key="results"
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-white/5 shadow-card rounded-3xl p-8"
              >
                <ResultsScreen
                  score={score}
                  total={total}
                  accentColor={LIVE_ACCENT}
                  onPlayAgain={playAgain}
                  onHome={onExit}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
