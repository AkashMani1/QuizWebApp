"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZZES, Quiz, QuizQuestion } from "@/data/quizData";

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface Room {
  id: string;
  name: string;
  category: string; // e.g. "Data Structures & Algorithms"
  maxPlayers: number;
  timeLimit: number; // in seconds
  difficulty: "Easy" | "Medium" | "Hard";
  creator: string;
  players: Player[];
  isCreator: boolean;
  status: "lobby" | "playing" | "finished";
}

interface Player {
  name: string;
  avatar: string;
  isReady: boolean;
  score: number;
  accuracy: number;
  speedRating: number; // 1-10 (high is faster)
  accuracyRating: number; // 0.5 - 0.95
  isYou?: boolean;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

interface ActiveQuizProps {
  onExit: () => void;
}

// ─── Animation Presets ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
} as const;

const springHover = {
  whileHover: { scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 15 } }
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function ActiveQuiz({ onExit }: ActiveQuizProps) {
  // ── Mode controller ──
  const [mode, setMode] = useState<"rooms" | "lobby" | "game" | "podium">("rooms");

  // ── Rooms Database state ──
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "room-1",
      name: "Elite Algo Challengers ⚔️",
      category: "Data Structures & Algorithms",
      maxPlayers: 4,
      timeLimit: 15,
      difficulty: "Hard",
      creator: "Alice Chen",
      players: [
        { name: "Alice Chen", avatar: "AC", isReady: true, score: 0, accuracy: 0, speedRating: 8, accuracyRating: 0.92 },
        { name: "Rahul Sharma", avatar: "RS", isReady: true, score: 0, accuracy: 0, speedRating: 6, accuracyRating: 0.85 },
      ],
      isCreator: false,
      status: "lobby",
    },
    {
      id: "room-2",
      name: "Database Titans 🗄️",
      category: "Database Management Systems",
      maxPlayers: 6,
      timeLimit: 15,
      difficulty: "Medium",
      creator: "David Kim",
      players: [
        { name: "David Kim", avatar: "DK", isReady: true, score: 0, accuracy: 0, speedRating: 7, accuracyRating: 0.88 },
        { name: "Emily Watson", avatar: "EW", isReady: false, score: 0, accuracy: 0, speedRating: 8, accuracyRating: 0.90 },
      ],
      isCreator: false,
      status: "lobby",
    },
  ]);

  // ── Active Selection state ──
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // ── Creation/Edit Dialog state ──
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formRoomName, setFormRoomName] = useState("");
  const [formCategory, setFormCategory] = useState("Data Structures & Algorithms");
  const [formMaxPlayers, setFormMaxPlayers] = useState(4);
  const [formTimeLimit, setFormTimeLimit] = useState(15);
  const [formDifficulty, setFormDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  // ── Game Play Engine state ──
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const opponentsTimerRef = useRef<NodeJS.Timeout[]>([]);

  // ── Simulated opponents templates ──
  const OPPONENTS_POOL = [
    { name: "Alice Chen", avatar: "AC", speedRating: 8, accuracyRating: 0.92 },
    { name: "Rahul Sharma", avatar: "RS", speedRating: 6, accuracyRating: 0.85 },
    { name: "Emily Watson", avatar: "EW", speedRating: 8, accuracyRating: 0.90 },
    { name: "David Kim", avatar: "DK", speedRating: 7, accuracyRating: 0.88 },
    { name: "Sarah Connor", avatar: "SC", speedRating: 9, accuracyRating: 0.94 },
    { name: "Michael O.", avatar: "MO", speedRating: 5, accuracyRating: 0.80 },
  ];

  // Load User profile name for multiplayer sync
  const [currentUser, setCurrentUser] = useState({ name: "John Student", avatar: "JS" });
  useEffect(() => {
    const saved = localStorage.getItem("quiznova_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser({ name: parsed.name, avatar: parsed.avatar });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // ── Lobby simulated player joins ──
  useEffect(() => {
    let lobbyInterval: NodeJS.Timeout;
    if (mode === "lobby" && activeRoom && !activeRoom.isCreator) {
      lobbyInterval = setInterval(() => {
        setRooms(prevRooms => {
          return prevRooms.map(r => {
            if (r.id === activeRoom.id && r.players.length < r.maxPlayers) {
              const currentNames = r.players.map(p => p.name);
              const available = OPPONENTS_POOL.filter(o => !currentNames.includes(o.name));
              if (available.length > 0) {
                const choice = available[Math.floor(Math.random() * available.length)];
                const newPlayer: Player = {
                  ...choice,
                  isReady: Math.random() > 0.3,
                  score: 0,
                  accuracy: 0
                };
                
                // Trigger system message
                setMessages(prev => [
                  ...prev,
                  {
                    id: Math.random().toString(),
                    user: "System",
                    text: `Candidate ${newPlayer.name} has joined the room.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isSystem: true
                  }
                ]);

                const updatedPlayers = [...r.players, newPlayer];
                const updatedRoom = { ...r, players: updatedPlayers };
                setActiveRoom(updatedRoom);
                return updatedRoom;
              }
            }
            return r;
          });
        });
      }, 5000);
    }
    return () => clearInterval(lobbyInterval);
  }, [mode, activeRoom]);

  // ── Clean active intervals on exit ──
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      opponentsTimerRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // ── Create Room handler ──
  const handleCreateRoom = () => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: formRoomName.trim() || "Blitz Practice Room ⚡",
      category: formCategory,
      maxPlayers: formMaxPlayers,
      timeLimit: formTimeLimit,
      difficulty: formDifficulty,
      creator: currentUser.name,
      players: [
        {
          name: currentUser.name,
          avatar: currentUser.avatar,
          isReady: true,
          score: 0,
          accuracy: 0,
          speedRating: 10,
          accuracyRating: 1.0,
          isYou: true
        }
      ],
      isCreator: true,
      status: "lobby",
    };

    setRooms(prev => [newRoom, ...prev]);
    setActiveRoom(newRoom);
    setMessages([
      {
        id: "sys-1",
        user: "System",
        text: `Arena "${newRoom.name}" initialized. Waiting for other candidates...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
    setIsCreatorModalOpen(false);
    setMode("lobby");
  };

  // ── Edit Room handler ──
  const handleEditRoom = () => {
    if (!activeRoom) return;
    const updated: Room = {
      ...activeRoom,
      name: formRoomName.trim() || activeRoom.name,
      category: formCategory,
      maxPlayers: formMaxPlayers,
      timeLimit: formTimeLimit,
      difficulty: formDifficulty
    };
    
    setRooms(prev => prev.map(r => r.id === activeRoom.id ? updated : r));
    setActiveRoom(updated);
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        user: "System",
        text: "Room parameters updated by host.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
    setIsEditing(false);
  };

  // ── Delete Room handler ──
  const handleDeleteRoom = (roomId: string) => {
    setRooms(prev => prev.filter(r => r.id !== roomId));
    if (activeRoom && activeRoom.id === roomId) {
      setActiveRoom(null);
      setMode("rooms");
    }
  };

  // ── Join Room handler ──
  const handleJoinRoom = (room: Room) => {
    const isAlreadyJoined = room.players.some(p => p.name === currentUser.name);
    let updatedRoom = { ...room };

    if (!isAlreadyJoined && room.players.length < room.maxPlayers) {
      const you: Player = {
        name: currentUser.name,
        avatar: currentUser.avatar,
        isReady: false,
        score: 0,
        accuracy: 0,
        speedRating: 10,
        accuracyRating: 1.0,
        isYou: true
      };
      updatedRoom.players = [...room.players, you];
      setRooms(prev => prev.map(r => r.id === room.id ? updatedRoom : r));
    }

    setActiveRoom(updatedRoom);
    setMessages([
      {
        id: "sys-welcome",
        user: "System",
        text: `Connected to "${room.name}". Ready status is required to start.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
    setMode("lobby");
  };

  // ── Toggle Ready Status ──
  const toggleReady = () => {
    if (!activeRoom) return;
    const updatedPlayers = activeRoom.players.map(p => {
      if (p.isYou || p.name === currentUser.name) {
        return { ...p, isReady: !p.isReady };
      }
      return p;
    });

    const updatedRoom = { ...activeRoom, players: updatedPlayers };
    setRooms(prev => prev.map(r => r.id === activeRoom.id ? updatedRoom : r));
    setActiveRoom(updatedRoom);

    const readyStatus = updatedPlayers.find(p => p.isYou || p.name === currentUser.name)?.isReady;
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        user: "System",
        text: `Candidate ${currentUser.name} is now ${readyStatus ? "READY" : "NOT READY"}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
  };

  // ── Send Chat Message ──
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        user: currentUser.name,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage("");
  };

  // ── Start Game Session ──
  const handleStartGame = () => {
    if (!activeRoom) return;
    
    // Fetch seeded questions matching selected category
    const selectedCategoryQuiz = QUIZZES.find(q => q.title === activeRoom.category) || QUIZZES[0];
    // Take a slice of 5 questions for fast and frantic multiplayer gameplay
    const questionsSlice = selectedCategoryQuiz.questions.slice(0, 5);

    setCurrentQuestions(questionsSlice);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setActivityLogs([]);

    // Initialize scores
    const initialGamePlayers = activeRoom.players.map(p => ({
      ...p,
      score: 0,
      accuracy: 0
    }));
    setGamePlayers(initialGamePlayers);
    
    setMode("game");
    startQuestionCycle(0, questionsSlice, initialGamePlayers);
  };

  // ── Core Question Cycle (Real-Time Opponents simulation) ──
  const startQuestionCycle = (qIdx: number, questions: QuizQuestion[], players: Player[]) => {
    if (!activeRoom) return;
    
    setTimer(activeRoom.timeLimit);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setActivityLogs([]);

    // 1. Setup simulated answers for opponents
    opponentsTimerRef.current.forEach(t => clearTimeout(t));
    opponentsTimerRef.current = [];

    const opponents = players.filter(p => !p.isYou);
    opponents.forEach(opp => {
      // Speed calculation (opp.speedRating determines speed delay in seconds)
      const baseDelay = (10 - opp.speedRating) * 1.2 + 1.5; // range: 1.5s to 12.5s
      const actualDelay = Math.max(1, baseDelay + (Math.random() - 0.5) * 2) * 1000;

      const timerOut = setTimeout(() => {
        const isCorrect = Math.random() < opp.accuracyRating;
        const speedBonus = Math.floor(Math.max(50, 100 * (1 - (actualDelay / 1000) / activeRoom.timeLimit)));
        const scoreGain = isCorrect ? 400 + speedBonus : 0;

        setGamePlayers(prevPlayers => {
          return prevPlayers.map(p => {
            if (p.name === opp.name) {
              const updatedScore = p.score + scoreGain;
              const currentAcc = p.accuracy;
              const newAcc = scoreGain > 0 ? (currentAcc * qIdx + 1) / (qIdx + 1) : (currentAcc * qIdx) / (qIdx + 1);
              return {
                ...p,
                score: updatedScore,
                accuracy: parseFloat(newAcc.toFixed(2))
              };
            }
            return p;
          });
        });

        setActivityLogs(prev => [
          ...prev,
          `⚡ ${opp.name} answered: ${isCorrect ? "✅ SUCCESS" : "❌ FAILED"} (+${scoreGain} pts)`
        ]);
      }, actualDelay);

      opponentsTimerRef.current.push(timerOut);
    });

    // 2. Start active countdown clock
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(gameIntervalRef.current!);
          // Timer expired - auto submit wrong if not submitted
          handleNextQuestion(qIdx, questions);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Handle User Answer Submission ──
  const handleUserAnswer = (optIndex: number) => {
    if (hasAnswered || !activeRoom) return;
    setSelectedAnswer(optIndex);
    setHasAnswered(true);

    const question = currentQuestions[questionIndex];
    const isCorrect = optIndex === question.correctIndex;
    
    // Score matches speed: faster answers grant up to 100 extra speed points
    const timeSpent = activeRoom.timeLimit - timer;
    const speedPercentage = 1 - (timeSpent / activeRoom.timeLimit);
    const speedBonus = isCorrect ? Math.floor(100 * speedPercentage) : 0;
    const scoreGain = isCorrect ? 400 + speedBonus : 0;

    setGamePlayers(prevPlayers => {
      return prevPlayers.map(p => {
        if (p.isYou || p.name === currentUser.name) {
          const newScore = p.score + scoreGain;
          const currentAcc = p.accuracy;
          const newAcc = isCorrect ? (currentAcc * questionIndex + 1) / (questionIndex + 1) : (currentAcc * questionIndex) / (questionIndex + 1);
          return {
            ...p,
            score: newScore,
            accuracy: parseFloat(newAcc.toFixed(2))
          };
        }
        return p;
      });
    });

    setActivityLogs(prev => [
      ...prev,
      `🎯 You answered: ${isCorrect ? "✅ SUCCESS" : "❌ FAILED"} (+${scoreGain} pts)`
    ]);
  };

  // ── Advance to next question or display Podium ──
  const handleNextQuestion = (currIdx: number, questions: QuizQuestion[]) => {
    // Force complete opponents answers that are pending
    opponentsTimerRef.current.forEach(t => clearTimeout(t));

    const nextIdx = currIdx + 1;
    if (nextIdx < questions.length) {
      setQuestionIndex(nextIdx);
      startQuestionCycle(nextIdx, questions, gamePlayers);
    } else {
      // Completed last question - navigate to podium
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      setMode("podium");
    }
  };

  // ── Render Rooms Dashboard Panel ──
  const renderRoomsView = () => {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Live Multiplayer Arena
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Compete head-to-head with placement candidates under high pressure.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onExit}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                setFormRoomName("");
                setFormMaxPlayers(4);
                setFormTimeLimit(15);
                setIsEditing(false);
                setIsCreatorModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
            >
              + Create Arena
            </button>
          </div>
        </div>

        {/* List of active rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => {
            return (
              <motion.div
                key={room.id}
                variants={itemVariants}
                {...springHover}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden h-56"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                      {room.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      DIFFICULTY: {room.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 truncate pr-6">{room.name}</h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed truncate">
                    Host: <strong className="text-zinc-300">{room.creator}</strong>
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                      👥 <strong className="text-zinc-200">{room.players.length}/{room.maxPlayers} candidates</strong>
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                      ⏱️ <strong className="text-zinc-200">{room.timeLimit}s per question</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 mt-2 border-t border-white/5">
                  {room.creator === currentUser.name ? (
                    <>
                      <button
                        onClick={() => {
                          setFormRoomName(room.name);
                          setFormCategory(room.category);
                          setFormMaxPlayers(room.maxPlayers);
                          setFormTimeLimit(room.timeLimit);
                          setFormDifficulty(room.difficulty);
                          setActiveRoom(room);
                          setIsEditing(true);
                          setIsCreatorModalOpen(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 border border-white/10 transition-colors"
                      >
                        Edit Settings
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="py-2 px-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleJoinRoom(room)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    >
                      Join Arena
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {rooms.length === 0 && (
            <div className="col-span-2 py-16 text-center bg-white/5 border border-white/10 border-dashed rounded-3xl text-zinc-500 text-sm">
              No active practice arenas available. Create one to begin.
            </div>
          )}
        </div>

        {/* Create / Edit Room Modal */}
        <AnimatePresence>
          {isCreatorModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {isEditing ? "Edit Practice Arena" : "Create Practice Arena"}
                  </h3>
                  <button 
                    onClick={() => setIsCreatorModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Arena Name</label>
                    <input
                      type="text"
                      required
                      value={formRoomName}
                      onChange={(e) => setFormRoomName(e.target.value)}
                      placeholder="e.g. Master Minds Blitz ⚡"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Subject Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    >
                      {QUIZZES.map(q => (
                        <option key={q.id} value={q.title}>{q.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Max Candidates</label>
                      <input
                        type="number"
                        min={2}
                        max={8}
                        value={formMaxPlayers}
                        onChange={(e) => setFormMaxPlayers(parseInt(e.target.value, 10) || 4)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-center focus:outline-none focus:border-indigo-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Time Limit (secs)</label>
                      <select
                        value={formTimeLimit}
                        onChange={(e) => setFormTimeLimit(parseInt(e.target.value, 10) || 15)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-center focus:outline-none focus:border-indigo-500 text-white"
                      >
                        <option value={10}>10s (Blitz)</option>
                        <option value={15}>15s (Normal)</option>
                        <option value={30}>30s (Extended)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Difficulty Tier</label>
                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                      {(["Easy", "Medium", "Hard"] as const).map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setFormDifficulty(d)}
                          className={`flex-1 py-2 text-xs rounded-lg font-semibold transition-all ${
                            formDifficulty === d ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex gap-3">
                  <button
                    onClick={isEditing ? handleEditRoom : handleCreateRoom}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm transition-all shadow-md active:scale-95"
                  >
                    {isEditing ? "Save Parameters" : "Launch Arena"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ── Render Lobby & Players Panel ──
  const renderLobbyView = () => {
    if (!activeRoom) return null;
    const you = activeRoom.players.find(p => p.isYou || p.name === currentUser.name);
    const host = activeRoom.players.find(p => p.name === activeRoom.creator);
    const readyPlayersCount = activeRoom.players.filter(p => p.isReady).length;
    const canStart = activeRoom.players.length >= 2 && readyPlayersCount === activeRoom.players.length;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 items-start">
        
        {/* Left / Middle: Lobby Details & Player Slots (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">MULTIPLAYER LOBBY</span>
              <h2 className="text-2xl font-black text-white mt-1">{activeRoom.name}</h2>
            </div>
            <button
              onClick={() => {
                setActiveRoom(null);
                setMode("rooms");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Leave Room
            </button>
          </div>

          {/* Player Grid slots */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Joined Candidates ({activeRoom.players.length}/{activeRoom.maxPlayers})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activeRoom.players.map((p, idx) => {
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center relative ${
                      p.isReady 
                        ? "bg-teal-500/5 border-teal-500/25 text-teal-400" 
                        : "bg-white/2 border-white/5 text-zinc-400"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-zinc-200 mb-2 uppercase">
                      {p.avatar.slice(0, 2)}
                    </div>
                    <span className="text-xs font-bold text-zinc-200 block truncate max-w-full">{p.name}</span>
                    <span className="text-[9px] text-zinc-500 mt-1 uppercase font-bold">
                      {p.name === activeRoom.creator ? "👑 Host" : "Candidate"}
                    </span>
                    <span className={`text-[9px] mt-2 px-2 py-0.5 rounded font-mono font-bold ${
                      p.isReady ? "bg-teal-500/10 text-teal-400" : "bg-white/5 text-zinc-500"
                    }`}>
                      {p.isReady ? "READY" : "WAITING"}
                    </span>
                  </div>
                );
              })}

              {/* Empty Slots */}
              {Array.from({ length: activeRoom.maxPlayers - activeRoom.players.length }).map((_, i) => (
                <div key={`empty-${i}`} className="p-4 rounded-2xl border border-dashed border-white/5 bg-white/1 flex flex-col items-center justify-center text-zinc-600 text-center h-32">
                  <span className="text-xl">👥</span>
                  <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Empty Slot</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lobby Controller CTA */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-400">READY STATUS:</span>
              <p className="text-sm font-bold text-white mt-1">
                {readyPlayersCount} / {activeRoom.players.length} Players Prepared
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={toggleReady}
                className={`flex-1 md:flex-initial px-6 py-3 rounded-xl font-bold text-xs tracking-wider transition-all ${
                  you?.isReady 
                    ? "bg-teal-500/10 border border-teal-500/30 text-teal-400" 
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200"
                }`}
              >
                {you?.isReady ? "Ready! (Cancel)" : "Tap to Ready"}
              </button>

              {activeRoom.isCreator ? (
                <button
                  disabled={!canStart}
                  onClick={handleStartGame}
                  className={`flex-1 md:flex-initial px-8 py-3 rounded-xl font-bold text-xs tracking-wider transition-all ${
                    canStart 
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-95" 
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  Start Game ⚡
                </button>
              ) : (
                <div className="text-[10px] text-zinc-500 max-w-[150px] font-medium leading-normal italic text-right hidden md:block">
                  Waiting for host {host?.name} to launch game.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Chat Lobby Activity Feed (col-span-1) */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl shadow-card h-[480px] flex flex-col justify-between">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
            <span className="text-xs font-bold text-zinc-300">Live Activity Feed</span>
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          </div>

          {/* Messages lists scrollable */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin">
            {messages.map((msg) => {
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="text-zinc-500 italic bg-white/2 p-2 rounded-xl border border-white/5 text-center">
                    {msg.text}
                  </div>
                );
              }
              return (
                <div key={msg.id} className="bg-white/5 border border-white/5 rounded-2xl p-2.5">
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <strong className="text-indigo-400">{msg.user}</strong>
                    <span className="text-zinc-600 font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-zinc-300 leading-normal">{msg.text}</p>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
            <input
              type="text"
              placeholder="Send message to lobby..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    );
  };

  // ── Render Active Game Screen (MULTIPLAYER LIVE ARENA) ──
  const renderGameView = () => {
    if (currentQuestions.length === 0) return null;
    const question = currentQuestions[questionIndex];
    
    // Sort players in real-time by score for the live game scoreboard
    const sortedScores = [...gamePlayers].sort((a, b) => b.score - a.score);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 items-start">
        
        {/* Left / Middle: Active MCQ question & Option Cards (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Circular Countdown Clock */}
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Question {questionIndex + 1} of {currentQuestions.length}</span>
              <span className="text-xs text-zinc-500 font-medium truncate mt-0.5 block">{activeRoom?.category}</span>
            </div>
            
            {/* Timer circle countdown */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase">Time Remaining:</span>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-black text-sm transition-all duration-300 ${
                timer <= 3 
                  ? "bg-rose-500/10 border-rose-500 text-rose-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]" 
                  : "bg-white/5 border-indigo-500 text-indigo-400"
              }`}>
                {timer}
              </div>
            </div>
          </div>

          {/* Question Card Box */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-bold text-white leading-relaxed mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const showCorrect = hasAnswered && i === question.correctIndex;
                const showWrong = hasAnswered && isSelected && i !== question.correctIndex;

                return (
                  <button
                    key={i}
                    disabled={hasAnswered}
                    onClick={() => handleUserAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all duration-150 flex items-center justify-between ${
                      showCorrect 
                        ? "bg-teal-500/10 border-teal-500 text-teal-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                        : showWrong 
                          ? "bg-rose-500/10 border-rose-500 text-rose-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                          : isSelected 
                            ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                            : "bg-white/2 border-white/5 text-zinc-300 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      {showCorrect ? "✅ Correct" : showWrong ? "❌ Failed" : `Option ${String.fromCharCode(65 + i)}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleNextQuestion(questionIndex, currentQuestions)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md active:scale-95"
                >
                  {questionIndex + 1 === currentQuestions.length ? "View Rankings Podium 🏆" : "Continue to Next Question →"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Interactive Scoreboard & Activity Feed (col-span-1) */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Live Rankings Scoreboard */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-card">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Live Scoreboard</h3>
            <div className="space-y-2">
              <AnimatePresence>
                {sortedScores.map((p, idx) => {
                  const isYou = p.isYou || p.name === currentUser.name;
                  return (
                    <motion.div
                      key={p.name}
                      layoutId={`scoreboard-${p.name}`}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        isYou 
                          ? "bg-teal-500/5 border-teal-500/20 text-teal-400" 
                          : "bg-white/2 border-white/5 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-zinc-500 font-bold text-xs">#{idx + 1}</span>
                        <div className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-[10px] uppercase text-zinc-200">
                          {p.avatar.slice(0, 2)}
                        </div>
                        <span className="text-xs font-bold truncate max-w-[100px]">{p.name}</span>
                      </div>
                      <span className="font-mono font-bold text-xs">{p.score} pts</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Opponents response logs */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 shadow-card h-48 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Arena Log Feed</h4>
            <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[10px] text-zinc-400 scrollbar-none">
              {activityLogs.map((log, i) => (
                <div key={i} className="p-1 rounded bg-white/2 border border-white/5">
                  {log}
                </div>
              ))}
              {activityLogs.length === 0 && (
                <div className="text-center py-8 text-zinc-600 italic">
                  Awaiting answers from candidates...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    );
  };

  // ── Render podium view ──
  const renderPodiumView = () => {
    const podiumScores = [...gamePlayers].sort((a, b) => b.score - a.score);
    const gold = podiumScores[0];
    const silver = podiumScores[1];
    const bronze = podiumScores[2];

    return (
      <div className="max-w-xl mx-auto py-8 text-center space-y-8">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-widest block">MATCH CONCLUDED</span>
          <h2 className="text-3xl font-black text-white mt-1">Practice Arena Podium</h2>
          <p className="text-zinc-400 text-sm mt-1">Excellent diagnostic match. XP updates have been recorded.</p>
        </div>

        {/* 3 Tier Podium visual stages */}
        <div className="flex items-end justify-center gap-2 pt-16 pb-8 h-64 max-w-sm mx-auto">
          {/* 2nd place: Silver (Left) */}
          {silver && (
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center font-bold text-zinc-300 text-xs mb-2">
                🥈
              </div>
              <span className="text-xs font-bold text-zinc-300 truncate max-w-full block mb-1">{silver.name}</span>
              <div className="w-full bg-zinc-800 border border-white/10 rounded-t-xl h-24 flex items-center justify-center text-zinc-400 font-mono font-bold shadow-md">
                2nd Tier
              </div>
              <span className="text-[10px] text-zinc-500 font-mono font-bold mt-1.5">{silver.score} pts</span>
            </div>
          )}

          {/* 1st place: Gold (Center) */}
          {gold && (
            <div className="flex-1 flex flex-col items-center justify-end z-10 scale-105">
              <div className="w-12 h-12 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-xl mb-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                🏆
              </div>
              <span className="text-sm font-black text-white truncate max-w-full block mb-1">{gold.name}</span>
              <div className="w-full bg-indigo-950 border border-indigo-500/20 rounded-t-xl h-36 flex items-center justify-center text-amber-400 font-mono font-extrabold shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                1st Tier
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold mt-1.5">{gold.score} pts</span>
            </div>
          )}

          {/* 3rd place: Bronze (Right) */}
          {bronze && (
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="w-10 h-10 rounded bg-amber-800 flex items-center justify-center font-bold text-amber-600 text-xs mb-2">
                🥉
              </div>
              <span className="text-xs font-bold text-zinc-300 truncate max-w-full block mb-1">{bronze.name}</span>
              <div className="w-full bg-zinc-900 border border-white/10 rounded-t-xl h-16 flex items-center justify-center text-zinc-500 font-mono font-bold shadow-md">
                3rd Tier
              </div>
              <span className="text-[10px] text-zinc-500 font-mono font-bold mt-1.5">{bronze.score} pts</span>
            </div>
          )}
        </div>

        {/* Statistics list breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-card max-w-sm mx-auto">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Diagnostic Summary</h3>
          {podiumScores.map((p, i) => (
            <div key={i} className="flex justify-between items-center text-xs py-2 border-b border-white/5 last:border-0">
              <span className="text-zinc-400 font-medium">Rank #{i+1} • {p.name}</span>
              <span className="font-mono text-zinc-200">Acc: {(p.accuracy * 100).toFixed(0)}% • Score: {p.score}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center max-w-sm mx-auto">
          <button
            onClick={() => {
              setMode("rooms");
            }}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors"
          >
            Lobby Menu
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md active:scale-95"
          >
            Exit Challenge
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative overflow-hidden flex flex-col">
      {/* ── OLED Blurred Background Accents ── */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (mode === "rooms") onExit();
                else setMode("rooms");
              }}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              ✕
            </button>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">MULTIPLAYER CHALLENGE</span>
              <span className="text-xs font-medium text-zinc-500 block truncate">QuizNova Diagnostics Arena</span>
            </div>
          </div>
          <div className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            ● live connected
          </div>
        </div>
      </header>

      {/* Main viewport */}
      <main className="flex-1 relative z-10 px-6 py-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {mode === "rooms" && (
            <motion.div
              key="rooms"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {renderRoomsView()}
            </motion.div>
          )}

          {mode === "lobby" && (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {renderLobbyView()}
            </motion.div>
          )}

          {mode === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {renderGameView()}
            </motion.div>
          )}

          {mode === "podium" && (
            <motion.div
              key="podium"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              {renderPodiumView()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
