"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchTriviaQuestions, TriviaQuestion } from "@/lib/trivia";

// ─── State shape ──────────────────────────────────────────────────────────────

export type TriviaStatus = "idle" | "loading" | "error" | "playing" | "finished";

export interface UseTriviaReturn {
  // Data
  questions: TriviaQuestion[];
  currentQuestion: TriviaQuestion | null;
  currentIndex: number;
  score: number;
  total: number;

  // Status
  status: TriviaStatus;
  error: string | null;

  // Actions
  submitAnswer: (selectedIndex: number) => void;
  retry: () => void;
  playAgain: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useTrivia manages the complete OpenTDB quiz lifecycle:
 *   idle → loading → playing → finished
 *                 ↘ error → (retry) → loading
 */
export function useTrivia(): UseTriviaReturn {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<TriviaStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  // Ref to track fetch generation — prevents stale setState after unmount
  const fetchGenRef = useRef(0);

  // ── Fetch logic ─────────────────────────────────────────────────────────────
  const fetchQuestions = useCallback(async () => {
    const currentGen = ++fetchGenRef.current;
    setStatus("loading");
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);

    const controller = new AbortController();

    try {
      const qs = await fetchTriviaQuestions(controller.signal);
      if (currentGen !== fetchGenRef.current) return; // stale response
      setQuestions(qs);
      setStatus("playing");
    } catch (err: unknown) {
      if (currentGen !== fetchGenRef.current) return;
      // Don't surface AbortError as a user-facing error
      if (err instanceof Error && err.name === "AbortError") return;
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }

    return () => controller.abort();
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Answer submission ────────────────────────────────────────────────────────
  /**
   * Called by the QuestionCard after the 800ms visual-feedback delay.
   * Receives the index the user clicked; we derive correctness internally.
   */
  const submitAnswer = useCallback(
    (selectedIndex: number) => {
      if (status !== "playing") return;
      const question = questions[currentIndex];
      if (!question) return;

      const isCorrect = selectedIndex === question.correctIndex;
      const nextScore = isCorrect ? score + 1 : score;
      const nextIndex = currentIndex + 1;

      if (nextIndex >= questions.length) {
        setScore(nextScore);
        setStatus("finished");
      } else {
        setScore(nextScore);
        setCurrentIndex(nextIndex);
      }
    },
    [status, questions, currentIndex, score]
  );

  // ── Retry after error ────────────────────────────────────────────────────────
  const retry = useCallback(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // ── Play again — fetches a fresh batch ───────────────────────────────────────
  const playAgain = useCallback(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    questions,
    currentQuestion: questions[currentIndex] ?? null,
    currentIndex,
    score,
    total: questions.length,
    status,
    error,
    submitAnswer,
    retry,
    playAgain,
  };
}
