export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  emoji: string;
  accentColor: string;
  questions: QuizQuestion[];
}

export const QUIZZES: Quiz[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master arrays, trees, graphs, and dynamic programming.",
    emoji: "🌳",
    accentColor: "#10b981",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of searching an element in a balanced Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "In a balanced BST, each comparison halves the search space, yielding O(log n) time complexity.",
        category: "Trees",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which data structure is optimal for implementing an LRU cache?",
        options: ["Array and Hash Map", "Queue and Stack", "Doubly Linked List and Hash Map", "Binary Tree and Array"],
        correctIndex: 2,
        explanation: "A Doubly Linked List maintains the access order (O(1) updates) and a Hash Map provides O(1) key lookups.",
        category: "Design",
        difficulty: "Hard",
      },
      {
        id: 3,
        question: "What algorithmic paradigm is Dijkstra's algorithm based on?",
        options: ["Dynamic Programming", "Divide and Conquer", "Greedy Algorithm", "Backtracking"],
        correctIndex: 2,
        explanation: "Dijkstra's repeatedly picks the unvisited vertex with the lowest distance, which is a greedy choice.",
        category: "Graphs",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: "Which sorting algorithm is guaranteed to run in O(n log n) in the worst case?",
        options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Bubble Sort"],
        correctIndex: 1,
        explanation: "Merge sort always splits the array in half and merges, guaranteeing O(n log n) even in the worst case.",
        category: "Sorting",
        difficulty: "Easy",
      }
    ],
  },
  {
    id: "dbms",
    title: "Database Management Systems",
    description: "SQL, ACID properties, normalization, and indexing.",
    emoji: "🗄️",
    accentColor: "#3b82f6",
    questions: [
      {
        id: 1,
        question: "Which normal form deals with removing multi-valued dependencies?",
        options: ["1NF", "2NF", "3NF", "4NF"],
        correctIndex: 3,
        explanation: "Fourth Normal Form (4NF) is concerned with isolating independent multiple relationships, removing multi-valued dependencies.",
        category: "Normalization",
        difficulty: "Hard",
      },
      {
        id: 2,
        question: "What does the 'A' in ACID properties stand for?",
        options: ["Accuracy", "Atomicity", "Availability", "Aggregation"],
        correctIndex: 1,
        explanation: "Atomicity ensures that a transaction is treated as a single indivisible unit, which either succeeds completely or fails completely.",
        category: "Transactions",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "Which indexing structure is most commonly used in RDBMS?",
        options: ["Hash Table", "Binary Search Tree", "B+ Tree", "Graph"],
        correctIndex: 2,
        explanation: "B+ Trees are balanced trees that keep data sorted and allow sequential access, making them ideal for disk-based storage in RDBMS.",
        category: "Indexing",
        difficulty: "Medium",
      }
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Processes, threads, memory management, and concurrency.",
    emoji: "⚙️",
    accentColor: "#8b5cf6",
    questions: [
      {
        id: 1,
        question: "Which scheduling algorithm can suffer from 'Starvation'?",
        options: ["Round Robin", "First Come First Serve", "Shortest Job First", "All of the above"],
        correctIndex: 2,
        explanation: "In Shortest Job First (SJF), a continuous stream of short jobs can indefinitely postpone a long job, causing starvation.",
        category: "CPU Scheduling",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "What is a 'Thrashing' in an Operating System?",
        options: ["High CPU utilization doing actual work", "System spending more time paging than executing", "A type of deadlock", "A context switch overhead"],
        correctIndex: 1,
        explanation: "Thrashing occurs when virtual memory is overcommitted, causing the OS to spend most of its time swapping pages rather than executing processes.",
        category: "Memory Management",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: "Which condition is NOT required for a deadlock to occur?",
        options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Context Switching"],
        correctIndex: 3,
        explanation: "Context switching is a normal OS function. The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        category: "Concurrency",
        difficulty: "Medium",
      }
    ],
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    description: "AWS, microservices, Docker, and distributed systems.",
    emoji: "☁️",
    accentColor: "#06b6d4",
    questions: [
      {
        id: 1,
        question: "Which cloud service model provides a platform allowing customers to develop, run, and manage applications?",
        options: ["IaaS", "PaaS", "SaaS", "FaaS"],
        correctIndex: 1,
        explanation: "Platform as a Service (PaaS) abstracts the underlying infrastructure, providing a platform for application development.",
        category: "Concepts",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "What is the primary purpose of a load balancer?",
        options: ["Encrypting traffic", "Distributing network traffic across multiple servers", "Caching database queries", "Hosting static websites"],
        correctIndex: 1,
        explanation: "Load balancers distribute incoming application traffic across multiple targets to ensure high availability and reliability.",
        category: "Networking",
        difficulty: "Medium",
      }
    ],
  },
  {
    id: "java",
    title: "Java Programming",
    description: "OOP concepts, Collections, Multithreading, and JVM.",
    emoji: "☕",
    accentColor: "#f97316",
    questions: [
      {
        id: 1,
        question: "Which of the following is not a core concept of OOP in Java?",
        options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
        correctIndex: 2,
        explanation: "Compilation is a step in translating code. The core OOP concepts are Encapsulation, Abstraction, Inheritance, and Polymorphism.",
        category: "OOPs",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "What is the parent class of all classes in Java?",
        options: ["Main", "Object", "Class", "System"],
        correctIndex: 1,
        explanation: "The java.lang.Object class is the root of the class hierarchy in Java.",
        category: "Core Java",
        difficulty: "Easy",
      }
    ],
  }
];
