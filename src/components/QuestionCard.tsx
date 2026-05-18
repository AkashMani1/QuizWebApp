"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TriviaQuestion } from "@/lib/trivia";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnswerOptionProps {
  option: string;
  index: number;
  selectedIndex: number | null;
  correctIndex: number;
  onSelect: (index: number) => void;
  revealed: boolean;
  accentColor: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const OPTION_LABELS = ["A", "B", "C", "D"];

/** Milliseconds of visual feedback shown before sliding to next question */
const FEEDBACK_DELAY_MS = 800;

// ─── AnswerOption ─────────────────────────────────────────────────────────────

function AnswerOption({
  option,
  index,
  selectedIndex,
  correctIndex,
  onSelect,
  revealed,
  accentColor,
}: AnswerOptionProps) {
  const isSelected = selectedIndex === index;
  const isCorrect = index === correctIndex;
  const isWrong = isSelected && !isCorrect;

  // Highlight correct option whenever answer is revealed (even if user picked wrong)
  const showCorrect = revealed && isCorrect;

  let bg = "rgba(255, 255, 255, 0.03)";
  let borderColor = "rgba(255, 255, 255, 0.1)";
  let shadow = "transparent";
  let labelBg = "rgba(255, 255, 255, 0.05)";
  let labelColor = "#94a3b8"; // slate-400
  let textColor = "#f1f5f9"; // slate-100

  if (showCorrect) {
    bg = "rgba(34, 197, 94, 0.15)";
    borderColor = "#22c55e";
    shadow = "rgba(34,197,94,0.18)";
    labelBg = "#22c55e";
    labelColor = "#ffffff";
    textColor = "#4ade80"; // emerald-400
  } else if (revealed && isWrong) {
    bg = "rgba(244, 63, 94, 0.15)";
    borderColor = "#f43f5e";
    shadow = "rgba(244,63,94,0.18)";
    labelBg = "#f43f5e";
    labelColor = "#ffffff";
    textColor = "#fb7185"; // rose-400
  } else if (isSelected && !revealed) {
    bg = `${accentColor}0d`;
    borderColor = accentColor;
    shadow = `${accentColor}25`;
    labelBg = accentColor;
    labelColor = "#ffffff";
    textColor = accentColor;
  }

  return (
    <motion.button
      id={`option-${index}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!revealed ? { scale: 1.015, x: 4 } : {}}
      whileTap={!revealed ? { scale: 0.98 } : {}}
      onClick={() => !revealed && onSelect(index)}
      disabled={revealed}
      className="w-full text-left flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 cursor-pointer disabled:cursor-default group"
      style={{
        background: bg,
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 2px 16px ${shadow}`,
      }}
    >
      {/* Label badge */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300"
        style={{ background: labelBg, color: labelColor }}
      >
        {revealed && isCorrect ? (
          <motion.svg
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : revealed && isWrong ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
        ) : (
          OPTION_LABELS[index]
        )}
      </div>

      {/* Option text */}
      <span
        className="flex-1 text-sm font-medium leading-snug transition-colors duration-300"
        style={{ color: textColor }}
      >
        {option}
      </span>

      {/* Hover arrow (hidden after reveal) */}
      {!revealed && (
        <svg
          className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </motion.button>
  );
}

// ─── QuestionCard ─────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: TriviaQuestion;
  questionNumber: number;
  totalQuestions: number;
  /** Called AFTER the 800ms visual feedback window — receives selected index */
  onSubmit: (selectedIndex: number) => void;
  accentColor: string;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  accentColor,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = (index: number) => {
    if (revealed || isAdvancing) return;
    setSelectedIndex(index);
    setRevealed(true);

    // Show explanation after short reveal gap
    setTimeout(() => setShowExplanation(true), 320);

    // After FEEDBACK_DELAY_MS, pass control up to ActiveQuiz for slide transition
    timerRef.current = setTimeout(() => {
      setIsAdvancing(true);
      onSubmit(index);
    }, FEEDBACK_DELAY_MS);
  };

  const isLastQuestion = questionNumber === totalQuestions;

  const difficultyClasses: Record<string, string> = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category + Difficulty */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border"
          style={{
            background: `${accentColor}12`,
            color: accentColor,
            borderColor: `${accentColor}25`,
          }}
        >
          {question.category}
        </span>
        <span
          className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${difficultyClasses[question.difficulty] ?? ""}`}
        >
          {question.difficulty}
        </span>

        {/* Question counter on mobile */}
        <span className="ml-auto text-xs font-semibold text-slate-400 tabular-nums">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-xl font-bold text-slate-100 leading-snug">{question.question}</h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => (
          <AnswerOption
            key={idx}
            index={idx}
            option={option}
            selectedIndex={selectedIndex}
            correctIndex={question.correctIndex}
            onSelect={handleSelect}
            revealed={revealed}
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Correct answer reveal note (shown when user answers wrong) */}
      <AnimatePresence>
        {showExplanation && selectedIndex !== null && selectedIndex !== question.correctIndex && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                    Correct answer
                  </p>
                  <p className="text-sm font-semibold text-emerald-300 leading-snug">
                    {question.options[question.correctIndex]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-advance indicator */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(0,0,0,0.06)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: FEEDBACK_DELAY_MS / 1000, ease: "linear" }}
              style={{
                background: selectedIndex === question.correctIndex
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #f43f5e, #e11d48)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next/Finish label for last question */}
      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="text-center text-xs font-semibold text-slate-400"
          >
            {isLastQuestion
              ? "Calculating your results…"
              : "Moving to next question…"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
