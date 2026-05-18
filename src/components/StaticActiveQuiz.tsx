"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quiz } from "@/data/quizData";
import { TriviaQuestion } from "@/lib/trivia";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsScreen } from "@/components/ResultsScreen";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StaticActiveQuizProps {
  quiz: Quiz;
  onExit: () => void;
}

const PAGE_VARIANTS = {
  enter: { opacity: 0, x: 48, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -48, scale: 0.97 },
};

const CARD_STYLE = {
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.04)",
  border: "1px solid rgba(0,0,0,0.04)",
} as const;

// ─── Adapter: converts local QuizQuestion → TriviaQuestion ───────────────────

function adaptQuestion(q: Quiz["questions"][number], id: string): TriviaQuestion {
  return {
    id,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    category: q.category,
    difficulty: q.difficulty,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StaticActiveQuiz({ quiz, onExit }: StaticActiveQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const adapted = quiz.questions.map((q, i) => adaptQuestion(q, `static-${i}`));

  const handleSubmit = useCallback(
    (selectedIndex: number) => {
      const isCorrect = selectedIndex === adapted[currentIdx]?.correctIndex;
      const nextScore = isCorrect ? score + 1 : score;
      const nextIdx = currentIdx + 1;

      if (nextIdx >= adapted.length) {
        setScore(nextScore);
        setIsFinished(true);
      } else {
        setScore(nextScore);
        setCurrentIdx(nextIdx);
      }
    },
    [adapted, currentIdx, score]
  );

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center gap-4 mb-3">
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

            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide truncate">
                {quiz.emoji} {quiz.title}
              </p>
            </div>

            {!isFinished && (
              <div
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: quiz.accentColor }}
              >
                {currentIdx + 1} / {adapted.length}
              </div>
            )}
          </div>

          {!isFinished && (
            <ProgressBar
              current={currentIdx + 1}
              total={adapted.length}
              accentColor={quiz.accentColor}
            />
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-5 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={`sq-${currentIdx}`}
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-white/5 shadow-card rounded-3xl p-8"
              >
                <QuestionCard
                  question={adapted[currentIdx]}
                  questionNumber={currentIdx + 1}
                  totalQuestions={adapted.length}
                  onSubmit={handleSubmit}
                  accentColor={quiz.accentColor}
                />
              </motion.div>
            ) : (
              <motion.div
                key="static-results"
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-white/5 shadow-card rounded-3xl p-8"
              >
                <ResultsScreen
                  score={score}
                  total={adapted.length}
                  accentColor={quiz.accentColor}
                  onPlayAgain={handleRestart}
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
