"use client";

import { motion } from "framer-motion";
import { Quiz } from "@/data/quizData";

interface QuizCardProps {
  quiz: Quiz;
  onSelect: (quiz: Quiz) => void;
  index: number;
}

export function QuizCard({ quiz, onSelect, index }: QuizCardProps) {
  // Using hex colors for fallback, but using slate/dark classes
  return (
    <motion.button
      id={`quiz-card-${quiz.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(quiz)}
      className="group w-full text-left bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-7 cursor-pointer transition-all duration-300 relative overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 50%, ${quiz.accentColor}20, transparent 70%)` }}
      />

      {/* Accent corner decoration */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-[80px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none"
        style={{ background: quiz.accentColor }}
      />

      <div className="relative flex items-start gap-5">
        {/* Emoji icon */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-white/5 border border-white/10"
          style={{ boxShadow: `inset 0 0 20px ${quiz.accentColor}20` }}
        >
          {quiz.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
            {quiz.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{quiz.description}</p>

          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border bg-white/5 border-white/10"
              style={{ color: quiz.accentColor }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              {quiz.questions.length} Questions
            </span>
            <span className="text-xs text-slate-500 font-medium">~{quiz.questions.length * 30}s</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
