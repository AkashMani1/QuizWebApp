"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZZES, Quiz } from "@/data/quizData";
import { QuizCard } from "@/components/QuizCard";
import { ActiveQuiz } from "@/components/ActiveQuiz";
import { StaticActiveQuiz } from "@/components/StaticActiveQuiz";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabKey = "dashboard" | "quizzes" | "leaderboard" | "analytics";
type AppView = { kind: "tabs"; activeTab: TabKey } | { kind: "live" } | { kind: "static"; quiz: Quiz };

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  score: number;
  accuracy: string;
}

interface Leader {
  rank: number;
  name: string;
  score: number;
  accuracy: string;
  avatar: string;
  isYou?: boolean;
  skills: number[]; // DSA, DBMS, OS, Cloud, Java
  streak?: number;
  tier?: string;
}

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
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Fire: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Crown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

// ─── Spring & Stagger Animations ─────────────────────────────────────────────

const springHover = {
  whileHover: { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 15 } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  }
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
} as const;

// ─── Main View ──────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<AppView>({ kind: "tabs", activeTab: "dashboard" });
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Student",
    role: "CS Undergrad",
    avatar: "JS",
    score: 8120,
    accuracy: "82%"
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("quiznova_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    localStorage.setItem("quiznova_profile", JSON.stringify(updated));
    setIsEditProfileOpen(false);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-zinc-950 items-center justify-center text-zinc-400 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium tracking-wider">Hydrating QuizNova...</p>
        </div>
      </div>
    );
  }

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
          className="min-h-screen bg-zinc-950"
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
          className="min-h-screen bg-zinc-950"
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
        return <DashboardTab setView={setView} profile={profile} />;
      case "quizzes":
        return <QuizzesTab setView={setView} />;
      case "leaderboard":
        return <LeaderboardTab profile={profile} />;
      case "analytics":
        return <AnalyticsTab profile={profile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* ── OLED Blurred Background Accents ── */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-2xl hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            QN
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            QuizNova
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group text-sm ${
                  isActive 
                    ? "bg-white/5 text-indigo-400 font-semibold border-l-2 border-indigo-500 shadow-[inset_1px_0_0_rgba(255,255,255,0.05)]" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Profile Card Trigger */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl transition-all text-left group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-600 flex items-center justify-center font-bold text-white uppercase shadow-md group-hover:scale-105 transition-transform duration-200">
              {profile.avatar.slice(0, 2)}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-zinc-200 group-hover:text-white transition-colors">{profile.name}</p>
              <p className="text-xs text-zinc-500 truncate">{profile.role}</p>
            </div>
            <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
              <Icons.Edit />
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col z-10">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-md">
              QN
            </div>
            <span className="font-bold text-lg text-white">QuizNova</span>
          </div>
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-teal-600 flex items-center justify-center font-bold text-xs text-white uppercase border border-white/10"
          >
            {profile.avatar.slice(0, 2)}
          </button>
        </div>

        {/* Mobile Nav Scroll */}
        <div className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-white/10 bg-zinc-950/80 backdrop-blur sticky top-[65px] z-20 scrollbar-none">
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
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                    : "bg-white/5 text-zinc-400"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 md:p-8 w-full max-w-6xl mx-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={view.kind === "tabs" ? view.activeTab : "other"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Edit Profile Modal Dialog */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-zinc-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white tracking-tight">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <ProfileEditorForm profile={profile} onSave={handleSaveProfile} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Profile Editor Form Sub-component ──────────────────────────────────────────

function ProfileEditorForm({ profile, onSave }: { profile: UserProfile; onSave: (updated: UserProfile) => void }) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const score = profile.score;
  const accuracy = profile.accuracy;

  const getInitials = (val: string) => {
    return val
      .split(" ")
      .filter(Boolean)
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "JS";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name,
      role: role || "CS Undergrad",
      avatar: getInitials(name),
      score,
      accuracy
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Candidate Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-white transition-all"
        />
      </div>
      
      <div>
        <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Academic/Placement Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-white transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-zinc-400 block mb-1.5 flex items-center justify-between">
            Placement Score
            <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-zinc-500 flex items-center gap-1 font-bold">
              <Icons.Lock className="w-2.5 h-2.5" /> AUTO-LOCKED
            </span>
          </label>
          <input
            type="number"
            value={score}
            readOnly
            disabled
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-sm font-mono text-center text-zinc-500 cursor-not-allowed shadow-inner"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-400 block mb-1.5 flex items-center justify-between">
            Accuracy Rate
            <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-zinc-500 flex items-center gap-1 font-bold">
              <Icons.Lock className="w-2.5 h-2.5" /> AUTO-LOCKED
            </span>
          </label>
          <input
            type="text"
            value={accuracy}
            readOnly
            disabled
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-sm font-mono text-center text-zinc-500 cursor-not-allowed shadow-inner"
          />
        </div>
      </div>
      
      <div className="text-[10px] text-zinc-500 text-center px-2 py-1 leading-relaxed">
        Scores & accuracy are live-calculated based on diagnostic tests to maintain global leaderboard integrity.
      </div>

      <div className="pt-4 border-t border-white/10 flex gap-3">
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm transition-all shadow-md active:scale-95"
        >
          Save Changes & Update
        </button>
      </div>
    </form>
  );
}

// ─── Dashboard Tab (PREMIUM BENTO BOX LAYOUT) ───────────────────────────────

interface DashboardTabProps {
  setView: (view: AppView) => void;
  profile: UserProfile;
}

function DashboardTab({ setView, profile }: DashboardTabProps) {
  const firstName = profile.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Overview
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Diagnostics console for high-performance placement matching.</p>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xl">
          LAST BACKUP: LIVE SYNCED
        </div>
      </header>

      {/* ── Premium Bento Box Grid ── */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min lg:auto-rows-[140px]"
      >
        {/* Box 1: Welcome Header Card (col-span-2, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="md:col-span-2 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Welcome back</div>
            <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
              Greetings, <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">{firstName}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed max-w-sm">
              Your diagnostic profile is mapped directly to tier 1 criteria. Run mock modules to advance global metrics.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-mono">
              OK
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">ALL TECHNICAL SERVICES OPERATIONAL</span>
          </div>
        </motion.div>

        {/* Box 2: Total Score Stat Box (col-span-1, row-span-1) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <span className="text-xs font-semibold text-zinc-400">Total Mock Points</span>
          <div className="mt-4">
            <span className="text-3xl font-black text-indigo-400 tracking-tight">{profile.score.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500 block mt-1">Updated live from diagnostic tests</span>
          </div>
        </motion.div>

        {/* Box 3: Placement Accuracy Stat Box (col-span-1, row-span-1) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <span className="text-xs font-semibold text-zinc-400">Diagnostic Accuracy</span>
          <div className="mt-4">
            <span className="text-3xl font-black text-teal-400 tracking-tight">{profile.accuracy}</span>
            <span className="text-[10px] text-zinc-500 block mt-1">Target precision baseline: 85%</span>
          </div>
        </motion.div>

        {/* Box 4: Radial Accuracy Gauge Box (col-span-1, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="lg:col-span-1 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between items-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <span className="text-xs font-semibold text-zinc-400 w-full text-left">Accuracy Index</span>
          
          {/* Radial Circle Progress Gauges */}
          <div className="relative w-28 h-28 my-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-zinc-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${parseInt(profile.accuracy) || 82}, 100` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-indigo-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]"
                strokeWidth="3.5"
                strokeDasharray="82, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white">{profile.accuracy}</span>
              <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">Matched</span>
            </div>
          </div>

          <span className="text-[10px] text-zinc-500 font-medium">PRECISION INDEX RATING: STABLE</span>
        </motion.div>

        {/* Box 5: Recommended Next Test Box (col-span-2, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="md:col-span-2 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden"
        >
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Recommended Next Step</span>
            <div className="flex items-center gap-4 my-4 p-3 bg-white/5 border border-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                🌳
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">DSA Advanced Mock</h3>
                <p className="text-xs text-zinc-400">Structured arrays, sorting, and graph matrices</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setView({ kind: "static", quiz: QUIZZES.find(q => q.id === "dsa")! })}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider transition-colors shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            START DIAGNOSTIC MODULE
          </button>
        </motion.div>

        {/* Box 6: Live Multiplayer Challenge (col-span-1, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="lg:col-span-1 lg:row-span-2 bg-gradient-to-b from-indigo-950/20 to-purple-950/20 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-300" />
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Live Challenge</span>
            <h4 className="font-extrabold text-white text-base mt-2">Multiplayer Arena</h4>
            <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
              Compete live with other placement candidates. Broaden general tech and logical CS knowledge.
            </p>
          </div>
          <button
            onClick={() => setView({ kind: "live" })}
            className="w-full py-2.5 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white font-bold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            JOIN ARENA 🌐
          </button>
        </motion.div>

        {/* Box 7: Compact Mini Leaderboard Preview (col-span-2, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="md:col-span-2 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-zinc-400">Placement Leaders Preview</span>
            <button 
              onClick={() => setView({ kind: "tabs", activeTab: "leaderboard" })}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              VIEW FULL LIST
            </button>
          </div>
          
          <div className="space-y-1.5">
            {[
              { rank: 1, name: "Alice Chen", score: 9850, avatar: "🥇" },
              { rank: 2, name: "Rahul Sharma", score: 9240, avatar: "🥈" },
              { rank: 5, name: profile.name, score: profile.score, avatar: "👤", isYou: true },
            ].map((lead, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-500 w-4">{lead.avatar}</span>
                  <span className={`font-medium ${lead.isYou ? "text-indigo-400 font-bold" : "text-zinc-200"}`}>
                    {lead.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-zinc-400">{lead.score.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Box 8: mini-proficiency card (col-span-2, row-span-2) */}
        <motion.div 
          variants={staggerItem}
          {...springHover}
          className="md:col-span-2 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-zinc-400">Technical Proficiency Profile</span>
            <button 
              onClick={() => setView({ kind: "tabs", activeTab: "analytics" })}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              EXPAND MATRICES
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: "Data Structures & Algos", level: 85, color: "bg-indigo-500" },
              { name: "Database & SQL Systems", level: 90, color: "bg-teal-500" },
              { name: "Operating Systems", level: 65, color: "bg-violet-500" },
            ].map((skill) => (
              <div key={skill.name} className="text-[10px]">
                <div className="flex justify-between text-zinc-400 mb-1 font-medium">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div style={{ width: `${skill.level}%` }} className={`h-full rounded-full ${skill.color}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Quizzes Tab (MOCK TESTS LIST) ──────────────────────────────────────────

function QuizzesTab({ setView }: { setView: (view: AppView) => void }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Mock Tests
        </h1>
        <p className="text-zinc-400 text-sm mt-1">Diagnostic mock modules tailored for tier-1 company evaluation criteria.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUIZZES.map((quiz, i) => (
          <div key={quiz.id} className="relative group">
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

// ─── Leaderboard Tab (COMPARE & DIAGNOSE ROWS) ───────────────────────────────

function LeaderboardTab({ profile }: { profile: UserProfile }) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "top3" | "you">("all");

  const baseLeaders: Leader[] = [
    { rank: 1, name: "Alice Chen", score: 9850, accuracy: "96%", avatar: "AC", skills: [90, 95, 88, 85, 75], streak: 12 },
    { rank: 2, name: "Rahul Sharma", score: 9240, accuracy: "94%", avatar: "RS", skills: [85, 90, 80, 75, 85], streak: 5 },
    { rank: 3, name: "Emily Watson", score: 8900, accuracy: "91%", avatar: "EW", skills: [80, 85, 95, 70, 65], streak: 8 },
    { rank: 4, name: "David Kim", score: 8450, accuracy: "89%", avatar: "DK", skills: [75, 80, 70, 90, 80], streak: 3 },
    { rank: 5, name: profile.name, score: profile.score, accuracy: profile.accuracy, avatar: profile.avatar, isYou: true, skills: [85, 72, 90, 65, 40], streak: 2 },
    { rank: 6, name: "Michael O.", score: 7900, accuracy: "85%", avatar: "MO", skills: [70, 75, 85, 60, 50], streak: 0 },
    { rank: 7, name: "Sarah Connor", score: 7650, accuracy: "81%", avatar: "SC", skills: [65, 70, 60, 85, 70], streak: 1 },
  ];

  const sortedLeaders = [...baseLeaders]
    .sort((a, b) => b.score - a.score)
    .map((leader, i) => ({ ...leader, rank: i + 1 }));

  const getTier = (score: number) => {
    if (score >= 9500) return { name: "Grandmaster", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", icon: "👑" };
    if (score >= 9000) return { name: "Master", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "⚡" };
    if (score >= 8500) return { name: "Diamond", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "💎" };
    if (score >= 8000) return { name: "Platinum", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "🔮" };
    if (score >= 7500) return { name: "Gold", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "⭐" };
    return { name: "Silver", color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/30", icon: "🛡️" };
  };

  useEffect(() => {
    if (!selectedLeader) {
      setSelectedLeader(sortedLeaders[0]);
    }
  }, [profile.score]);

  const filteredLeaders = sortedLeaders.filter(leader => {
    const matchesSearch = leader.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "top3") {
      return matchesSearch && leader.rank <= 3;
    }
    if (activeFilter === "you") {
      return matchesSearch && leader.isYou;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            Global Rankings <Icons.Crown className="w-8 h-8 text-amber-400" />
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Gamified placement scoring and competitive live matrices.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-xl flex flex-col items-center">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Your Tier</span>
            <span className={`text-sm font-black flex items-center gap-1.5 ${getTier(profile.score).color}`}>
              {getTier(profile.score).icon} {getTier(profile.score).name}
            </span>
          </div>
        </div>
      </header>

      {/* Dynamic Filter Panels */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-xl">
          {[
            { id: "all", label: "All Candidates" },
            { id: "top3", label: "Top 3 Tiers" },
            { id: "you", label: "Your Rank" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeFilter === btn.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search candidate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-xs md:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 text-white placeholder-zinc-500 transition-all shadow-inner"
          />
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Interactive Candidate Grid List */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 relative">
          {/* Decorative gamification bg */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2.5 relative z-10">
            <AnimatePresence>
              {filteredLeaders.map((leader) => {
                const isSelected = selectedLeader?.name === leader.name;
                const tierInfo = getTier(leader.score);
                
                return (
                  <motion.div
                    key={leader.name}
                    layoutId={`row-${leader.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setSelectedLeader(leader)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border group ${
                      isSelected 
                        ? "bg-indigo-900/40 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                        : leader.isYou 
                          ? "bg-teal-900/20 border-teal-500/30 hover:border-teal-400/50"
                          : "bg-black/20 hover:bg-white/5 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border shadow-inner ${
                        leader.rank === 1 
                          ? "bg-gradient-to-br from-amber-300 to-amber-600 border-amber-400/50 text-amber-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]" 
                          : leader.rank === 2 
                            ? "bg-gradient-to-br from-zinc-300 to-zinc-500 border-zinc-400/50 text-zinc-900" 
                            : leader.rank === 3 
                              ? "bg-gradient-to-br from-amber-700 to-amber-900 border-amber-600/50 text-white" 
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-zinc-300"
                      }`}>
                        {leader.rank === 1 ? "1" : leader.rank === 2 ? "2" : leader.rank === 3 ? "3" : leader.rank}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center font-black text-sm uppercase text-zinc-300 shadow-md">
                        {leader.avatar.slice(0, 2)}
                      </div>

                      {/* Name & Title */}
                      <div>
                        <span className={`font-bold text-base flex items-center gap-2 ${
                          leader.isYou ? "text-teal-400" : "text-white"
                        }`}>
                          {leader.name} 
                          {leader.isYou && <span className="text-[9px] uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-black border border-teal-500/30">You</span>}
                          {leader.rank === 1 && <span className="text-lg">👑</span>}
                        </span>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider border ${tierInfo.bg} ${tierInfo.color} ${tierInfo.border}`}>
                            {tierInfo.icon} {tierInfo.name}
                          </span>
                          {(leader.streak ?? 0) >= 3 && (
                            <span className="flex items-center gap-0.5 text-[10px] text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded-md border border-orange-500/20">
                              <Icons.Fire className="w-3 h-3" /> {leader.streak} Win Streak
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right mt-3 sm:mt-0 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-0.5">Rating</span>
                        <span className="font-mono text-xl text-white font-black tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                          {leader.score.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Icons.Shield className="w-3 h-3 text-teal-400" />
                        <span className="text-xs text-teal-400 font-bold">{leader.accuracy} Accuracy</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredLeaders.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-sm">
                No matching candidate rows found.
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Comparison Panel (Glassmorphic) */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedLeader ? (
              <motion.div
                key={selectedLeader.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">Diagnostic Comparison</h3>
                
                <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs uppercase text-white shadow-md">
                    {selectedLeader.avatar.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{selectedLeader.name}</h4>
                    <p className="text-xs text-zinc-400">Rank #{selectedLeader.rank} • Accuracy: {selectedLeader.accuracy}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-tight">Technical Disciplines</h4>
                  
                  {[
                    { label: "Data Structures", idx: 0, youVal: sortedLeaders.find(l => l.isYou)?.skills[0] ?? 85 },
                    { label: "Algorithms", idx: 1, youVal: sortedLeaders.find(l => l.isYou)?.skills[1] ?? 72 },
                    { label: "DBMS & SQL", idx: 2, youVal: sortedLeaders.find(l => l.isYou)?.skills[2] ?? 90 },
                    { label: "Operating Systems", idx: 3, youVal: sortedLeaders.find(l => l.isYou)?.skills[3] ?? 65 },
                    { label: "Software Eng.", idx: 4, youVal: sortedLeaders.find(l => l.isYou)?.skills[4] ?? 40 },
                  ].map((skill) => {
                    const opponentVal = selectedLeader.skills[skill.idx];
                    return (
                      <div key={skill.label} className="text-xs">
                        <div className="flex justify-between font-medium text-zinc-300 mb-1.5">
                          <span>{skill.label}</span>
                          <span className="text-[10px] text-zinc-500">
                            You: <strong className="text-teal-400">{skill.youVal}%</strong> vs Them: <strong className="text-indigo-400">{opponentVal}%</strong>
                          </span>
                        </div>
                        {/* Shifting double progress bar */}
                        <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden flex gap-0.5 p-[1px] border border-white/5">
                          <div 
                            style={{ width: `${skill.youVal}%` }} 
                            className="h-full rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
                          />
                          <div 
                            style={{ width: `${opponentVal}%` }} 
                            className="h-full rounded-full bg-indigo-500/60 shadow-[0_0_10px_rgba(99,102,241,0.3)]" 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedLeader.isYou ? (
                  <p className="text-[10px] text-zinc-500 italic mt-6 text-center">
                    Diagnostic profile holds rank baseline. Complete mock modules to boost mock ratings.
                  </p>
                ) : (
                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <p className="text-[11px] text-zinc-400">
                      You need <strong className="text-white">{(selectedLeader.score - (sortedLeaders.find(l => l.isYou)?.score ?? 0)).toLocaleString()} pts</strong> to overtake them.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl py-12 text-center text-zinc-500 text-xs">
                Select a candidate row to trigger comparative benchmark diagnostics.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Tab (TECHNICAL PERFORMANCE) ──────────────────────────────────

function AnalyticsTab({ profile }: { profile: UserProfile }) {
  const skills = [
    { name: "Data Structures", level: 85, color: "bg-teal-500" },
    { name: "Algorithms", level: 72, color: "bg-indigo-500" },
    { name: "DBMS & SQL", level: 90, color: "bg-indigo-400" },
    { name: "Operating Systems", level: 65, color: "bg-violet-500" },
    { name: "System Design", level: 40, color: "bg-pink-500" },
  ];

  const recentScores = [65, 70, 75, 72, 85, 82, 88, 90, 85, 92];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-zinc-400 text-sm mt-1">Diagnostic proficiency indicators for placement matching.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Bars */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-6 text-white">Subject Proficiency</h2>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-300 font-semibold">{skill.name}</span>
                  <span className="text-zinc-400 font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
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
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-6 text-white">Recent Test Scores</h2>
          <div className="h-64 flex items-end gap-2 mt-4">
            {recentScores.map((score, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                <span className="text-[10px] text-zinc-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold">
                  {score}%
                </span>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="w-full bg-indigo-600/60 hover:bg-indigo-500 rounded-t-lg transition-colors cursor-pointer shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-zinc-500">
            <span>Older</span>
            <span>Newer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
