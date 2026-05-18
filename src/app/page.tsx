"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZZES, Quiz } from "@/data/quizData";
import { QuizCard } from "@/components/QuizCard";
import { ActiveQuiz } from "@/components/ActiveQuiz";
import { StaticActiveQuiz } from "@/components/StaticActiveQuiz";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabKey = "dashboard" | "quizzes" | "leaderboard" | "analytics";
type AppView = { kind: "tabs"; activeTab: TabKey } | { kind: "live" } | { kind: "static"; quiz: Quiz };

// ─── Icons ───────────────────────────────────────────────────────────────────

const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Quizzes: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  Leaderboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
};

// ─── Components ──────────────────────────────────────────────────────────────

export default function Home() {
  const [view, setView] = useState<AppView>({ kind: "tabs", activeTab: "dashboard" });

  // ── Live Trivia ─────────────────────────────────────────────────────────────
  if (view.kind === "live") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="live"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen bg-background"
        >
          <ActiveQuiz onExit={() => setView({ kind: "tabs", activeTab: "dashboard" })} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── Static quiz ─────────────────────────────────────────────────────────────
  if (view.kind === "static") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`static-${view.quiz.id}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen bg-background"
        >
          <StaticActiveQuiz quiz={view.quiz} onExit={() => setView({ kind: "tabs", activeTab: "quizzes" })} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── Tabs Layout ─────────────────────────────────────────────────────────────
  const renderTabContent = () => {
    if (view.kind !== "tabs") return null;
    switch (view.activeTab) {
      case "dashboard":
        return <DashboardTab setView={setView} />;
      case "quizzes":
        return <QuizzesTab setView={setView} />;
      case "leaderboard":
        return <LeaderboardTab />;
      case "analytics":
        return <AnalyticsTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-mesh text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-card/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            CS
          </div>
          <span className="font-bold text-xl tracking-tight">PlacementPrep</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: Icons.Dashboard },
            { id: "quizzes", label: "Mock Tests", icon: Icons.Quizzes },
            { id: "leaderboard", label: "Leaderboard", icon: Icons.Leaderboard },
            { id: "analytics", label: "Analytics", icon: Icons.Analytics },
          ].map((tab) => {
            const isActive = view.kind === "tabs" && view.activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setView({ kind: "tabs", activeTab: tab.id as TabKey })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 font-medium" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
              JS
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">John Student</p>
              <p className="text-xs text-slate-500">CS Undergrad</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-white/5 flex items-center gap-3 bg-card/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
            CS
          </div>
          <span className="font-bold text-lg">PlacementPrep</span>
        </div>

        {/* Mobile Nav Scroll */}
        <div className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-white/5 bg-background sticky top-[65px] z-20">
           {[
            { id: "dashboard", label: "Dashboard" },
            { id: "quizzes", label: "Mock Tests" },
            { id: "leaderboard", label: "Leaderboard" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => {
            const isActive = view.kind === "tabs" && view.activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setView({ kind: "tabs", activeTab: tab.id as TabKey })}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "bg-white/5 text-slate-400"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view.kind === "tabs" ? view.activeTab : "other"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────────

function DashboardTab({ setView }: { setView: (view: AppView) => void }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
        <p className="text-slate-400">Here's a summary of your placement preparation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Tests Taken", value: "24", trend: "+3 this week", color: "text-blue-400" },
          { label: "Average Accuracy", value: "82%", trend: "+2.4% overall", color: "text-emerald-400" },
          { label: "Global Rank", value: "#1,432", trend: "Top 5%", color: "text-violet-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-card">
            <p className="text-sm font-medium text-slate-400 mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color} mb-2`}>{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-4">Recommended Next Step</h2>
          <div className="bg-white/5 rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-2xl">
                🌳
              </div>
              <div>
                <h3 className="font-bold">DSA Advanced Mock</h3>
                <p className="text-sm text-slate-400">Trees and Graphs focus</p>
              </div>
            </div>
            <button 
              onClick={() => setView({ kind: "static", quiz: QUIZZES.find(q => q.id === "dsa")! })}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
             <h2 className="text-xl font-bold mb-4">Live Challenge</h2>
             <p className="text-slate-400 text-sm mb-6">
               Join a live multiplayer trivia room and compete with other candidates in real-time. Broaden your general tech knowledge.
             </p>
          </div>
          <button
            onClick={() => setView({ kind: "live" })}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Join Live Room 🌐
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Quizzes Tab ─────────────────────────────────────────────────────────────

function QuizzesTab({ setView }: { setView: (view: AppView) => void }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Placement Mock Tests</h1>
        <p className="text-slate-400">Curated tests for top tech company interviews.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUIZZES.map((quiz, i) => (
          <div key={quiz.id} className="relative group">
            {/* Shimmer on hover inside QuizCard is fine, but we'll adapt the styling slightly for dark mode via QuizCard component itself if needed */}
            <QuizCard
              quiz={quiz}
              onSelect={(q) => setView({ kind: "static", quiz: q })}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leaderboard Tab ─────────────────────────────────────────────────────────

function LeaderboardTab() {
  const leaders = [
    { rank: 1, name: "Alice Chen", score: 9850, accuracy: "96%", avatar: "AC" },
    { rank: 2, name: "Rahul Sharma", score: 9240, accuracy: "94%", avatar: "RS" },
    { rank: 3, name: "Emily Watson", score: 8900, accuracy: "91%", avatar: "EW" },
    { rank: 4, name: "David Kim", score: 8450, accuracy: "89%", avatar: "DK" },
    { rank: 5, name: "John Student (You)", score: 8120, accuracy: "82%", avatar: "JS", isYou: true },
    { rank: 6, name: "Michael O.", score: 7900, accuracy: "85%", avatar: "MO" },
    { rank: 7, name: "Sarah Connor", score: 7650, accuracy: "81%", avatar: "SC" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-slate-400">See how you rank against other candidates.</p>
      </header>

      <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-slate-400 text-sm">
                <th className="py-4 px-6 font-medium">Rank</th>
                <th className="py-4 px-6 font-medium">Candidate</th>
                <th className="py-4 px-6 font-medium">Total Score</th>
                <th className="py-4 px-6 font-medium text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaders.map((leader) => (
                <tr 
                  key={leader.rank} 
                  className={`transition-colors hover:bg-white/5 ${leader.isYou ? "bg-blue-500/10" : ""}`}
                >
                  <td className="py-4 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${leader.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                        leader.rank === 2 ? 'bg-slate-300/20 text-slate-300' :
                        leader.rank === 3 ? 'bg-amber-700/20 text-amber-500' :
                        'text-slate-500'}`}
                    >
                      #{leader.rank}
                    </div>
                  </td>
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                      {leader.avatar}
                    </div>
                    <span className={`font-medium ${leader.isYou ? "text-blue-400" : "text-slate-200"}`}>
                      {leader.name}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-slate-300">{leader.score.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-medium text-emerald-400">{leader.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Tab ───────────────────────────────────────────────────────────

function AnalyticsTab() {
  const skills = [
    { name: "Data Structures", level: 85, color: "bg-emerald-500" },
    { name: "Algorithms", level: 72, color: "bg-blue-500" },
    { name: "DBMS", level: 90, color: "bg-indigo-500" },
    { name: "Operating Systems", level: 65, color: "bg-purple-500" },
    { name: "System Design", level: 40, color: "bg-pink-500" },
  ];

  const recentScores = [65, 70, 75, 72, 85, 82, 88, 90, 85, 92];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-slate-400">Detailed breakdown of your strengths and weaknesses.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Bars */}
        <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-6">Subject Proficiency</h2>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${skill.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Chart */}
        <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-6">Recent Test Scores</h2>
          <div className="h-64 flex items-end gap-2 mt-4">
            {recentScores.map((score, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                <span className="text-[10px] text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {score}%
                </span>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="w-full bg-blue-600/60 hover:bg-blue-500 rounded-t-sm transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            <span>Older</span>
            <span>Newer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
