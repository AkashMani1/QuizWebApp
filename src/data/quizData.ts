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
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctIndex: 1,
        explanation: "Binary search works by repeatedly dividing the search interval in half. The time complexity is O(log n).",
        category: "Searching",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "What is the worst-case time complexity of the QuickSort algorithm?",
        options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
        correctIndex: 1,
        explanation: "Worst-case of QuickSort is O(n²) when the pivot chosen is always the extreme element.",
        category: "Sorting",
        difficulty: "Medium"
      },
      {
        id: 3,
        question: "Which data structure is fundamentally used for implementing Breadth-First Search (BFS) of a graph?",
        options: ["Stack", "Queue", "Heap", "Tree"],
        correctIndex: 1,
        explanation: "Breadth-First Search (BFS) uses a Queue data structure to traverse levels of a graph one by one.",
        category: "Graphs",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "Which data structure is fundamentally used for implementing Depth-First Search (DFS)?",
        options: ["Queue", "Stack", "Array", "Graph"],
        correctIndex: 1,
        explanation: "Depth-First Search (DFS) uses a Stack data structure (or recursion stack) to traverse deeply along each branch.",
        category: "Graphs",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "What is the best-case time complexity of Merge Sort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correctIndex: 0,
        explanation: "Merge Sort always divides the array in halves and merges them, taking O(n log n) in all cases (best, average, worst).",
        category: "Sorting",
        difficulty: "Medium"
      },
      {
        id: 6,
        question: "An AVL tree is defined as which of the following?",
        options: ["Complete Tree", "Balanced BST", "Heap", "Graph"],
        correctIndex: 1,
        explanation: "An AVL tree is a self-balancing Binary Search Tree where the height difference of left and right subtrees is at most 1.",
        category: "Trees",
        difficulty: "Medium"
      },
      {
        id: 7,
        question: "What is the height of a balanced Binary Search Tree (BST) containing n nodes?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctIndex: 1,
        explanation: "A balanced BST has a height of O(log n), keeping operations like insert, search, and delete fast.",
        category: "Trees",
        difficulty: "Medium"
      },
      {
        id: 8,
        question: "Linear probing is a technique used in which of the following systems?",
        options: ["Tree", "Hashing", "Stack", "Queue"],
        correctIndex: 1,
        explanation: "Linear probing is an open addressing method used in Hashing to resolve collisions.",
        category: "Hashing",
        difficulty: "Easy"
      },
      {
        id: 9,
        question: "Which of the following is NOT a valid collision resolution method in Hashing?",
        options: ["Chaining", "Probing", "Sorting", "Rehashing"],
        correctIndex: 2,
        explanation: "Sorting is not a method to resolve hash collisions. Common methods include Chaining, Open Addressing (Probing), and Rehashing.",
        category: "Hashing",
        difficulty: "Easy"
      },
      {
        id: 10,
        question: "Which ordering principle does a Stack follow?",
        options: ["FIFO", "LIFO", "Random", "Priority"],
        correctIndex: 1,
        explanation: "Stack follows the LIFO (Last In First Out) principle where the last element added is the first one removed.",
        category: "Stacks & Queues",
        difficulty: "Easy"
      },
      {
        id: 11,
        question: "Which ordering principle does a standard Queue follow?",
        options: ["FIFO", "LIFO", "Random", "None of the above"],
        correctIndex: 0,
        explanation: "Queue follows the FIFO (First In First Out) principle where the first element added is the first one removed.",
        category: "Stacks & Queues",
        difficulty: "Easy"
      },
      {
        id: 12,
        question: "A binary Heap is structurally classified as what type of tree?",
        options: ["Sorted BST", "Complete tree", "Binary Search Tree", "Graph"],
        correctIndex: 1,
        explanation: "A heap is a complete binary tree that satisfies the heap property (max-heap or min-heap).",
        category: "Heaps",
        difficulty: "Medium"
      },
      {
        id: 13,
        question: "What element is always located at the root node of a Min-Heap?",
        options: ["Max", "Min", "Random", "Median"],
        correctIndex: 1,
        explanation: "In a min-heap, the root node always contains the minimum element of the entire heap.",
        category: "Heaps",
        difficulty: "Easy"
      },
      {
        id: 14,
        question: "Dijkstra's shortest path algorithm is guaranteed to work on graphs with which edge characteristics?",
        options: ["Negative edges", "Positive weights", "Cycles only", "Trees only"],
        correctIndex: 1,
        explanation: "Dijkstra's algorithm is designed for graphs with positive edge weights. It may fail on graphs with negative weights.",
        category: "Graphs",
        difficulty: "Medium"
      },
      {
        id: 15,
        question: "The Floyd-Warshall algorithm is designed to solve which problem?",
        options: ["MST", "APSP", "Sorting", "Searching"],
        correctIndex: 1,
        explanation: "Floyd-Warshall is an All-Pairs Shortest Path (APSP) algorithm using dynamic programming.",
        category: "Graphs",
        difficulty: "Hard"
      },
      {
        id: 16,
        question: "Kruskal's algorithm is fundamentally used to compute which graph entity?",
        options: ["DFS", "MST", "BFS", "Shortest path"],
        correctIndex: 1,
        explanation: "Kruskal's algorithm is a greedy algorithm used to find the Minimum Spanning Tree (MST) of a graph.",
        category: "Graphs",
        difficulty: "Medium"
      },
      {
        id: 17,
        question: "Which algorithmic design approach does Prim's algorithm utilize?",
        options: ["Greedy", "DP", "Backtracking", "Divide and conquer"],
        correctIndex: 0,
        explanation: "Prim's algorithm uses a greedy approach to grow the Minimum Spanning Tree (MST) from a starting vertex.",
        category: "Graphs",
        difficulty: "Medium"
      },
      {
        id: 18,
        question: "What is the maximum number of nodes possible at level k of a binary tree?",
        options: ["k", "2^k", "2^(k-1)", "n²"],
        correctIndex: 1,
        explanation: "The maximum number of nodes at level k of a binary tree is 2^k (assuming root is level 0).",
        category: "Trees",
        difficulty: "Easy"
      },
      {
        id: 19,
        question: "The inorder traversal of a Binary Search Tree (BST) visits keys in which order?",
        options: ["Sorted", "Reverse", "Random", "Level order"],
        correctIndex: 0,
        explanation: "Inorder traversal (Left, Root, Right) of a Binary Search Tree (BST) visits keys in sorted ascending order.",
        category: "Trees",
        difficulty: "Easy"
      },
      {
        id: 20,
        question: "Which internal data structure is primarily utilized by program recursion?",
        options: ["Stack", "Queue", "Heap", "Tree"],
        correctIndex: 0,
        explanation: "Recursion utilizes a stack (call stack) to keep track of active function calls and their activation records.",
        category: "Recursion",
        difficulty: "Easy"
      },
      {
        id: 21,
        question: "What is the maximum number of edges in a simple undirected graph with n vertices?",
        options: ["n", "n²", "n(n-1)/2", "2n"],
        correctIndex: 2,
        explanation: "A simple undirected graph with n vertices can have at most n(n-1)/2 edges (a complete graph).",
        category: "Graphs",
        difficulty: "Medium"
      },
      {
        id: 22,
        question: "What type of graph is required to perform a Topological Sort?",
        options: ["Cyclic", "DAG", "Tree", "Undirected"],
        correctIndex: 1,
        explanation: "Topological sorting is only possible for Directed Acyclic Graphs (DAGs).",
        category: "Graphs",
        difficulty: "Hard"
      },
      {
        id: 23,
        question: "What is the time complexity of accessing an element in a Linked List by index?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "Accessing an element in a singly or doubly linked list requires sequential traversal, taking O(n) time.",
        category: "Linked Lists",
        difficulty: "Easy"
      },
      {
        id: 24,
        question: "What is the time complexity of accessing an element in a standard contiguous Array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctIndex: 0,
        explanation: "Array access is O(1) because elements are stored contiguously in memory and can be calculated via base address + index offset.",
        category: "Arrays",
        difficulty: "Easy"
      },
      {
        id: 25,
        question: "Which characteristics make a problem suitable for Dynamic Programming?",
        options: ["Greedy choice", "Divide and conquer", "Overlapping subproblems", "None of the above"],
        correctIndex: 2,
        explanation: "Dynamic programming is applicable when a problem has overlapping subproblems and optimal substructure.",
        category: "Design Paradigms",
        difficulty: "Medium"
      },
      {
        id: 26,
        question: "What paradigm best describes Backtracking?",
        options: ["BFS", "Trial & error", "Sorting", "Hashing"],
        correctIndex: 1,
        explanation: "Backtracking is a systematic trial and error method that searches for solutions by exploring all possibilities and pruning paths.",
        category: "Design Paradigms",
        difficulty: "Medium"
      },
      {
        id: 27,
        question: "Which of the following sorting algorithms is inherently stable?",
        options: ["Quick", "Merge", "Heap", "Selection"],
        correctIndex: 1,
        explanation: "Merge sort is stable because it preserves the relative order of equal elements.",
        category: "Sorting",
        difficulty: "Medium"
      },
      {
        id: 28,
        question: "What is the worst-case time complexity of Bubble Sort?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "Bubble sort makes O(n²) comparisons and swaps in the worst-case when the array is sorted in reverse order.",
        category: "Sorting",
        difficulty: "Easy"
      },
      {
        id: 29,
        question: "Which graph representation is generally more space-efficient for sparse graphs?",
        options: ["Adjacency Matrix", "Adjacency List", "Stack", "Queue"],
        correctIndex: 1,
        explanation: "An Adjacency List is generally more space-efficient than an Adjacency Matrix, especially for sparse graphs.",
        category: "Graphs",
        difficulty: "Medium"
      },
      {
        id: 30,
        question: "A Deque (Double-Ended Queue) allows insertions and deletions where?",
        options: ["One end only", "Both ends", "Middle only", "None of the above"],
        correctIndex: 1,
        explanation: "A Double-Ended Queue (Deque) allows insertion and deletion at both the front and rear ends.",
        category: "Stacks & Queues",
        difficulty: "Easy"
      }
    ]
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
        question: "What type of key uniquely identifies a record in a database table?",
        options: ["Foreign Key", "Primary Key", "Composite Key", "Candidate Key"],
        correctIndex: 1,
        explanation: "A Primary Key is a column or a set of columns that uniquely identifies each row in a table.",
        category: "Keys",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "What does a functional dependency represent in a relational schema?",
        options: ["Table relation", "Attribute relation", "Entity relation", "Index relation"],
        correctIndex: 1,
        explanation: "Functional dependency defines the constraint between attributes in a relation.",
        category: "Normalization",
        difficulty: "Medium"
      },
      {
        id: 3,
        question: "What is the primary purpose of database normalization?",
        options: ["Increase speed", "Remove redundancy", "Add security constraints", "Create backups"],
        correctIndex: 1,
        explanation: "Normalization is the process of organizing data in a database to eliminate redundancy and unwanted dependencies.",
        category: "Normalization",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "Which requirement must be met for a relation to be in First Normal Form (1NF)?",
        options: ["Atomic values", "Foreign key constraints", "No transitive dependencies", "Composite primary keys"],
        correctIndex: 0,
        explanation: "1NF requires that all attributes contain only atomic (indivisible) values.",
        category: "Normalization",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "What does the Second Normal Form (2NF) remove from a database schema?",
        options: ["Transitive dependency", "Partial dependency", "Multi-valued dependency", "Circular dependencies"],
        correctIndex: 1,
        explanation: "2NF is achieved when a relation is in 1NF and all non-key attributes are fully functionally dependent on the primary key, removing partial dependencies.",
        category: "Normalization",
        difficulty: "Medium"
      },
      {
        id: 6,
        question: "What does the Third Normal Form (3NF) remove from a database schema?",
        options: ["Partial dependency", "Transitive dependency", "Multi-valued dependency", "Join dependency"],
        correctIndex: 1,
        explanation: "3NF is achieved when a relation is in 2NF and there are no transitive dependencies of non-key attributes on the primary key.",
        category: "Normalization",
        difficulty: "Medium"
      },
      {
        id: 7,
        question: "Which statement best describes Boyce-Codd Normal Form (BCNF)?",
        options: ["Weaker than 3NF", "Stronger 3NF", "Same as 2NF", "Non-normal form"],
        correctIndex: 1,
        explanation: "BCNF is a stronger version of 3NF that handles anomalies when a relation has multiple overlapping candidate keys.",
        category: "Normalization",
        difficulty: "Hard"
      },
      {
        id: 8,
        question: "Which SQL statement is used to retrieve data from a database?",
        options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
        correctIndex: 1,
        explanation: "The SELECT statement is used to query data from one or more tables in a database.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 9,
        question: "What SQL operation combines columns from one or more tables based on a related column?",
        options: ["Group", "Join", "Index", "Schema"],
        correctIndex: 1,
        explanation: "A JOIN clause is used to combine rows from two or more tables based on a related column between them.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 10,
        question: "What type of key refers to the primary key of another table?",
        options: ["Primary Key", "Reference / Foreign Key", "Candidate Key", "Super Key"],
        correctIndex: 1,
        explanation: "A Foreign Key provides a reference link between data in two tables, ensuring referential integrity.",
        category: "Keys",
        difficulty: "Easy"
      },
      {
        id: 11,
        question: "What is the primary role of ACID properties in database transactions?",
        options: ["Consistency guarantee", "Storage size optimization", "Encryption mechanism", "Index organization"],
        correctIndex: 0,
        explanation: "ACID properties (Atomicity, Consistency, Isolation, Durability) serve as a consistency guarantee for database transactions.",
        category: "Transactions",
        difficulty: "Medium"
      },
      {
        id: 12,
        question: "What does Atomicity mean in the context of database transactions?",
        options: ["Half or whole", "All or nothing", "Parallel execution", "Serial operations"],
        correctIndex: 1,
        explanation: "Atomicity ensures that all statements within a transaction are completed successfully, or the entire transaction is rolled back (all or nothing).",
        category: "Transactions",
        difficulty: "Easy"
      },
      {
        id: 13,
        question: "In ACID properties, what does Isolation ensure?",
        options: ["Fast recovery", "No interference", "Continuous backups", "Data compression"],
        correctIndex: 1,
        explanation: "Isolation ensures that the concurrent execution of transactions results in a state equivalent to serial execution (no interference).",
        category: "Transactions",
        difficulty: "Medium"
      },
      {
        id: 14,
        question: "What occurs when two transactions are waiting for each other to release locks?",
        options: ["Starvation", "Circular wait / Deadlock", "Lock upgrade", "Normal execution"],
        correctIndex: 1,
        explanation: "A Deadlock represents a circular wait where each transaction holds a resource that the other transaction needs to proceed.",
        category: "Concurrency",
        difficulty: "Medium"
      },
      {
        id: 15,
        question: "What does the Entity-Relationship (ER) model represent?",
        options: ["Physical design", "Conceptual design", "Internal schema", "Storage allocation"],
        correctIndex: 1,
        explanation: "The ER model is a conceptual design model used to plan and structure the database before actual implementation.",
        category: "ER Model",
        difficulty: "Easy"
      },
      {
        id: 16,
        question: "Which statement describes a weak entity in an ER model?",
        options: ["Standalone entity", "Depends on strong entity", "Key-based entity", "Virtual entity"],
        correctIndex: 1,
        explanation: "A weak entity is an entity that cannot be uniquely identified by its own attributes alone and depends on an identifying relationship with a parent entity.",
        category: "ER Model",
        difficulty: "Medium"
      },
      {
        id: 17,
        question: "What is the main benefit of creating an Index in a database?",
        options: ["Speeds up insertion", "Search improvement", "Saves storage space", "Restricts data modifications"],
        correctIndex: 1,
        explanation: "Indexing improves the search performance of data retrieval queries at the cost of additional write speed and storage space.",
        category: "Indexing",
        difficulty: "Easy"
      },
      {
        id: 18,
        question: "What is a View in a database system?",
        options: ["Real physical table", "Virtual table", "Index structure", "Buffer area"],
        correctIndex: 1,
        explanation: "A View is a virtual table whose contents are defined by a query, allowing simplified representation of complex queries.",
        category: "SQL",
        difficulty: "Medium"
      },
      {
        id: 19,
        question: "What is a database Trigger?",
        options: ["Manual backup action", "Automatic action", "Periodic report generator", "Locking mechanism"],
        correctIndex: 1,
        explanation: "A Trigger is an automatic action (stored procedure) executed by the DBMS in response to specific events like INSERT, UPDATE, or DELETE.",
        category: "Triggers",
        difficulty: "Medium"
      },
      {
        id: 20,
        question: "What class of SQL commands is used to define and modify the database schema?",
        options: ["DML", "DDL / Schema", "DCL", "TCL"],
        correctIndex: 1,
        explanation: "DDL (Data Definition Language) commands like CREATE, ALTER, and DROP define and modify the schema structure.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 21,
        question: "What class of SQL commands is used to manage and manipulate actual data?",
        options: ["DDL", "DML / Data", "DCL", "TCL"],
        correctIndex: 1,
        explanation: "DML (Data Manipulation Language) commands like SELECT, INSERT, UPDATE, and DELETE manipulate data.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 22,
        question: "Which SQL commands deal with managing database transactions?",
        options: ["DDL", "TCL / Transaction", "DML", "DCL"],
        correctIndex: 1,
        explanation: "TCL (Transaction Control Language) commands like COMMIT and ROLLBACK manage transaction states.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 23,
        question: "What level of data does the WHERE clause filter?",
        options: ["Columns", "Rows filter", "Databases", "Tables"],
        correctIndex: 1,
        explanation: "The WHERE clause is used to filter individual rows in a query based on a specific condition.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 24,
        question: "What is the primary purpose of the GROUP BY clause in SQL?",
        options: ["Sorting rows", "Aggregation", "Joining tables", "Creating indexes"],
        correctIndex: 1,
        explanation: "GROUP BY is used in conjunction with aggregate functions to group result rows by one or more columns (Aggregation).",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 25,
        question: "What is the primary purpose of the HAVING clause?",
        options: ["Filter rows", "Filter groups", "Join tables", "Project columns"],
        correctIndex: 1,
        explanation: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions; it filters groups.",
        category: "SQL",
        difficulty: "Medium"
      },
      {
        id: 26,
        question: "What does the COUNT(*) function return?",
        options: ["Total distinct values", "Rows count", "Number of columns", "Sum of numerical values"],
        correctIndex: 1,
        explanation: "COUNT(*) returns the total number of rows matching the query criteria, including NULLs and duplicates.",
        category: "SQL",
        difficulty: "Easy"
      },
      {
        id: 27,
        question: "What does a NULL value represent in a database?",
        options: ["Zero", "Unknown", "Empty string", "Negative one"],
        correctIndex: 1,
        explanation: "NULL represents an unknown or missing value, which is different from zero or an empty string.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 28,
        question: "What is the primary reason for using database locking?",
        options: ["Enhance security", "Conflict prevention", "Compress data", "Accelerate backups"],
        correctIndex: 1,
        explanation: "Locking is used to manage concurrent access to database items, preventing conflict and ensuring consistency.",
        category: "Concurrency",
        difficulty: "Medium"
      },
      {
        id: 29,
        question: "What does the Two-Phase Locking (2PL) protocol guarantee?",
        options: ["High speed", "Serializability", "Deadlock-free execution", "Low storage overhead"],
        correctIndex: 1,
        explanation: "2PL guarantees conflict serializability of concurrent execution of transactions.",
        category: "Concurrency",
        difficulty: "Hard"
      },
      {
        id: 30,
        question: "What trade-off is described by the CAP theorem in distributed databases?",
        options: ["Storage vs Speed", "Trade-off (Consistency, Availability, Partition Tolerance)", "Security vs Usability", "Normalized vs Denormalized data"],
        correctIndex: 1,
        explanation: "CAP theorem states that a distributed database can only guarantee two out of three: Consistency, Availability, and Partition Tolerance.",
        category: "Concepts",
        difficulty: "Hard"
      }
    ]
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
        question: "What is the primary definition of an Operating System (OS)?",
        options: ["Web browser", "Resource manager", "Text editor", "Hardware driver"],
        correctIndex: 1,
        explanation: "An OS acts as a resource manager that controls and allocates CPU, memory, storage, and I/O devices.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "What is the initial state of a process when it is first created?",
        options: ["Ready", "New", "Running", "Terminated"],
        correctIndex: 1,
        explanation: "A newly created process is initially placed in the 'New' state before moving to the 'Ready' queue.",
        category: "Processes",
        difficulty: "Easy"
      },
      {
        id: 3,
        question: "What is the core purpose of process scheduling?",
        options: ["Disk cleanup", "CPU allocation", "Memory backup", "Thread killing"],
        correctIndex: 1,
        explanation: "Scheduling is the method by which processes are given access to CPU resources.",
        category: "Scheduling",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "How is the First-Come, First-Served (FCFS) scheduling algorithm categorized?",
        options: ["Preemptive", "Non-preemptive", "Round Robin", "Multi-level"],
        correctIndex: 1,
        explanation: "FCFS is a non-preemptive algorithm: once a process gets the CPU, it keeps it until it blocks or terminates.",
        category: "Scheduling",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "Why is Shortest Job First (SJF) considered optimal?",
        options: ["Simplest to implement", "Min wait time", "Prevents starvation entirely", "High throughput for large files"],
        correctIndex: 1,
        explanation: "SJF is optimal because it minimizes the average waiting time for a given set of processes.",
        category: "Scheduling",
        difficulty: "Medium"
      },
      {
        id: 6,
        question: "What parameter does the Round Robin (RR) scheduling algorithm rely on?",
        options: ["Process priority", "Time quantum", "Burst duration", "Disk latency"],
        correctIndex: 1,
        explanation: "Round Robin uses a fixed time quantum (slice) to allocate CPU cycles to each process cyclically.",
        category: "Scheduling",
        difficulty: "Easy"
      },
      {
        id: 7,
        question: "Which of the following is a necessary condition for a deadlock?",
        options: ["Shared resources", "Mutual exclusion", "Voluntary preemption", "Linear queue"],
        correctIndex: 1,
        explanation: "Mutual exclusion is one of the four necessary Coffman conditions for a deadlock.",
        category: "Deadlocks",
        difficulty: "Medium"
      },
      {
        id: 8,
        question: "What problem does the Paging memory management scheme successfully eliminate?",
        options: ["Internal fragmentation", "External fragmentation", "Thrashing", "Cache misses"],
        correctIndex: 1,
        explanation: "Paging avoids external fragmentation by allocating memory in fixed-size blocks called pages/frames.",
        category: "Memory",
        difficulty: "Medium"
      },
      {
        id: 9,
        question: "What describes the Segmentation memory management scheme?",
        options: ["Physical division", "Logical division", "Continuous storage", "Sector mapping"],
        correctIndex: 1,
        explanation: "Segmentation divides programs into variable-sized logical segments reflecting the programmer's view of memory.",
        category: "Memory",
        difficulty: "Medium"
      },
      {
        id: 10,
        question: "What is the main purpose of Virtual Memory?",
        options: ["Speed up memory access", "Illusion of large memory", "Protect files from malware", "Automate backups"],
        correctIndex: 1,
        explanation: "Virtual memory creates an illusion of a very large memory space by utilizing disk space as RAM.",
        category: "Memory",
        difficulty: "Easy"
      },
      {
        id: 11,
        question: "What is 'Thrashing' in an Operating System?",
        options: ["CPU executing tasks at maximum speed", "Excess paging / swapping", "Deadlock recovery process", "Hardware driver collision"],
        correctIndex: 1,
        explanation: "Thrashing occurs when virtual memory is overcommitted, causing the OS to spend more time swapping pages than running programs.",
        category: "Memory",
        difficulty: "Medium"
      },
      {
        id: 12,
        question: "What is a Semaphore in system synchronization?",
        options: ["Software lock", "Synchronization / Semaphore variable", "System call vector", "Memory segment"],
        correctIndex: 1,
        explanation: "A Semaphore is an integer variable used to control concurrent access to shared resources in a multi-threaded system.",
        category: "Synchronization",
        difficulty: "Medium"
      },
      {
        id: 13,
        question: "What does a Mutex represent?",
        options: ["Multi-level executor", "Mutual exclusion lock", "Context switch tracker", "Memory mapper"],
        correctIndex: 1,
        explanation: "A Mutex is a locking mechanism used to guarantee mutual exclusion among threads accessing critical sections.",
        category: "Synchronization",
        difficulty: "Easy"
      },
      {
        id: 14,
        question: "What occurs during a Context Switch?",
        options: ["Deleting old files", "Process change on CPU", "Compiling code", "Shuffling array indices"],
        correctIndex: 1,
        explanation: "A context switch is the process of storing the state of a running process and loading the state of another process to resume its execution.",
        category: "Processes",
        difficulty: "Medium"
      },
      {
        id: 15,
        question: "What represents the core component of an Operating System?",
        options: ["Shell", "Core OS / Kernel", "Text Editor", "File Explorer"],
        correctIndex: 1,
        explanation: "The Kernel is the core program of the OS that has direct control over hardware and manages essential operations.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 16,
        question: "What is a System Call?",
        options: ["Web browser shortcut", "Interface between process & OS kernel", "Compiler syntax checker", "Hardware reset trigger"],
        correctIndex: 1,
        explanation: "A System Call provides an interface allowing user programs to request services from the operating system kernel.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 17,
        question: "What is the role of a File System?",
        options: ["Memory allocation", "Storage management", "Context switching", "Instruction compiling"],
        correctIndex: 1,
        explanation: "A file system controls how data is stored, retrieved, and managed on physical storage media.",
        category: "File System",
        difficulty: "Easy"
      },
      {
        id: 18,
        question: "What is the goal of disk scheduling algorithms?",
        options: ["Speed up execution", "Seek optimization", "Reduce memory overhead", "Increase thread count"],
        correctIndex: 1,
        explanation: "Disk scheduling aims to reduce the mechanical seek time by optimizing the order of read/write requests.",
        category: "Disk Scheduling",
        difficulty: "Medium"
      },
      {
        id: 19,
        question: "What is an Interrupt in OS?",
        options: ["System crash", "Signal requesting immediate attention", "Loop statement", "Data compression technique"],
        correctIndex: 1,
        explanation: "An interrupt is a signal sent to the CPU to suspend current execution and run an Interrupt Service Routine (ISR).",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 20,
        question: "What is the main advantage of Multithreading?",
        options: ["Larger RAM space", "Parallel tasks within single process", "No synchronization required", "Direct hardware access"],
        correctIndex: 1,
        explanation: "Multithreading allows a single program process to divide itself into multiple threads to run tasks concurrently.",
        category: "Processes",
        difficulty: "Easy"
      },
      {
        id: 21,
        question: "What defines a Race Condition?",
        options: ["Thread synchronization success", "Conflict / timing issue", "Loop iteration speedup", "Process termination"],
        correctIndex: 1,
        explanation: "A race condition occurs when concurrent threads access shared data without proper synchronization, making the outcome dependent on execution order.",
        category: "Synchronization",
        difficulty: "Medium"
      },
      {
        id: 22,
        question: "What is Starvation in process management?",
        options: ["CPU running out of cycles", "Indefinite wait of process", "Disk space depletion", "High memory usage"],
        correctIndex: 1,
        explanation: "Starvation represents a scenario where a process is ready but never gets allocated CPU time because other processes are prioritized.",
        category: "Scheduling",
        difficulty: "Medium"
      },
      {
        id: 23,
        question: "What is the primary purpose of the Banker's Algorithm?",
        options: ["CPU scheduling", "Deadlock avoidance", "Memory paging", "Interrupt handling"],
        correctIndex: 1,
        explanation: "The Banker's Algorithm is a resource allocation and deadlock avoidance algorithm that simulates resource allocation safety.",
        category: "Deadlocks",
        difficulty: "Hard"
      },
      {
        id: 24,
        question: "How is the FIFO Page Replacement algorithm described?",
        options: ["Highly complex", "Simple page replacement", "Optimal under all conditions", "Requires future knowledge"],
        correctIndex: 1,
        explanation: "First-In, First-Out (FIFO) is a simple page replacement algorithm that replaces the oldest page in memory.",
        category: "Memory",
        difficulty: "Easy"
      },
      {
        id: 25,
        question: "What does the Least Recently Used (LRU) page replacement algorithm replace?",
        options: ["Newest page", "Recent usage based replacement", "Random page", "Smallest page"],
        correctIndex: 1,
        explanation: "LRU keeps track of recent page usages and replaces the page that has not been accessed for the longest duration.",
        category: "Memory",
        difficulty: "Medium"
      },
      {
        id: 26,
        question: "Why is the Optimal Page Replacement algorithm theoretical?",
        options: ["Very slow", "Best replacement (requires future knowledge)", "Takes too much RAM", "Causes lockups"],
        correctIndex: 1,
        explanation: "Optimal page replacement requires knowing the future page reference string, making it impossible to implement in practice but useful as a benchmark.",
        category: "Memory",
        difficulty: "Hard"
      },
      {
        id: 27,
        question: "What is preemptive scheduling?",
        options: ["No interrupts allowed", "Interrupt allowed", "FCFS exclusive", "Disk exclusive"],
        correctIndex: 1,
        explanation: "Preemptive scheduling allows the OS to interrupt a running process and reassign the CPU to a higher priority process.",
        category: "Scheduling",
        difficulty: "Easy"
      },
      {
        id: 28,
        question: "What is non-preemptive scheduling?",
        options: ["Process can be interrupted", "No interrupt / run to completion", "Priority-based only", "Virtual memory exclusive"],
        correctIndex: 1,
        explanation: "Non-preemptive scheduling ensures a process retains CPU control until it finishes its CPU burst or enters a waiting state.",
        category: "Scheduling",
        difficulty: "Easy"
      },
      {
        id: 29,
        question: "What is the 'Swap' space on disk used for?",
        options: ["Temporary text edits", "Disk transfer / paging space", "System logging", "Thread control vectors"],
        correctIndex: 1,
        explanation: "Swapping allows the OS to temporarily transfer inactive process memory to disk to free up physical RAM.",
        category: "Memory",
        difficulty: "Medium"
      },
      {
        id: 30,
        question: "What does 'Throughput' measure in operating systems?",
        options: ["File copy speed", "Processes completed per unit time", "RAM capacity", "Seek latency"],
        correctIndex: 1,
        explanation: "Throughput represents the rate at which the computer system completes processes.",
        category: "Scheduling",
        difficulty: "Easy"
      }
    ]
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
        question: "What is the fundamental concept of Cloud Computing?",
        options: ["Local program compilation", "On-demand resources over internet", "Operating without networks", "Desktop styling"],
        correctIndex: 1,
        explanation: "Cloud computing is the on-demand delivery of compute power, database, storage, applications, and other IT resources over the internet with pay-as-you-go pricing.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "What does IaaS stand for in cloud services?",
        options: ["Internet as a System", "Infrastructure", "Integration as a Software", "Information as a Storage"],
        correctIndex: 1,
        explanation: "Infrastructure as a Service (IaaS) provides virtualized computing resources, storage, and networking over the internet.",
        category: "Services",
        difficulty: "Easy"
      },
      {
        id: 3,
        question: "What does PaaS stand for?",
        options: ["Protocol as a System", "Platform", "Program as a Server", "Process as a Storage"],
        correctIndex: 1,
        explanation: "Platform as a Service (PaaS) offers a development and deployment environment in the cloud, allowing developers to focus on writing code.",
        category: "Services",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "What does SaaS stand for?",
        options: ["Security as a System", "Software", "Storage as a Server", "System as a Service"],
        correctIndex: 1,
        explanation: "Software as a Service (SaaS) delivers complete software applications over the internet on a subscription basis.",
        category: "Services",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "What characterizes a Public Cloud model?",
        options: ["Owned by a single private enterprise", "Shared infrastructure", "Offline server cluster", "Standard desktop network"],
        correctIndex: 1,
        explanation: "A public cloud is owned and operated by third-party providers, who deliver resources like servers and storage over the internet.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 6,
        question: "What is a Private Cloud?",
        options: ["Free internet storage", "Dedicated infrastructure", "Shared AWS account", "Peer-to-peer storage"],
        correctIndex: 1,
        explanation: "A private cloud consists of computing resources used exclusively by one business or organization.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 7,
        question: "What describes a Hybrid Cloud?",
        options: ["Local hard drives only", "Combination of public and private", "Multi-threaded CPU scheduling", "Web app client-server model"],
        correctIndex: 1,
        explanation: "A hybrid cloud combines public and private cloud models, allowing data and applications to be shared between them.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 8,
        question: "What is the purpose of Virtualization in cloud computing?",
        options: ["Deleting old databases", "Abstraction of physical hardware", "Building graphical UIs", "Securing web pages"],
        correctIndex: 1,
        explanation: "Virtualization enables the creation of multiple simulated environments or dedicated resources from a single physical hardware system.",
        category: "Virtualization",
        difficulty: "Medium"
      },
      {
        id: 9,
        question: "What is a Hypervisor?",
        options: ["High-speed network router", "VM manager", "Text editor extension", "Security credential manager"],
        correctIndex: 1,
        explanation: "A Hypervisor (Virtual Machine Monitor) is software that creates and runs virtual machines on host hardware.",
        category: "Virtualization",
        difficulty: "Medium"
      },
      {
        id: 10,
        question: "Which of the following is a major global public cloud provider?",
        options: ["Local server stack", "Cloud provider (AWS)", "MySQL local DB", "Visual Studio Code"],
        correctIndex: 1,
        explanation: "AWS is a leading cloud services platform, providing a highly reliable, scalable, low-cost infrastructure platform.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 11,
        question: "What does Scalability mean in cloud terms?",
        options: ["Defragmentation of disks", "Expand capacity to handle load", "Speed of local compiling", "UI responsive design"],
        correctIndex: 1,
        explanation: "Scalability is the ability of a system to grow and manage increased demand by adding compute power, memory, or storage.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 12,
        question: "What does Elasticity mean in cloud computing?",
        options: ["Static pricing models", "Auto scale resources up/down", "High network latency", "Database redundancy"],
        correctIndex: 1,
        explanation: "Elasticity refers to the ability to scale cloud resources dynamically and automatically to match the current workload.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 13,
        question: "What is the role of a Load Balancer in the cloud?",
        options: ["Encrypting database columns", "Traffic distribution across servers", "Cleaning temporary cache directories", "Storing user login states"],
        correctIndex: 1,
        explanation: "Load balancers distribute traffic across multiple target instances to ensure high availability and application resilience.",
        category: "Networking",
        difficulty: "Easy"
      },
      {
        id: 14,
        question: "What does a Content Delivery Network (CDN) provide?",
        options: ["Local text formatting", "Fast delivery via edge servers", "Server-side templates", "SQL schema creation"],
        correctIndex: 1,
        explanation: "CDNs store cached copies of web content at edge locations to minimize delay and accelerate content delivery.",
        category: "Networking",
        difficulty: "Medium"
      },
      {
        id: 15,
        question: "What does Fault Tolerance refer to?",
        options: ["Total cost reduction", "Failure handling without disruption", "Zero coding mistakes", "Strict user password policies"],
        correctIndex: 1,
        explanation: "Fault tolerance refers to the ability of an application to withstand infrastructure failures and remain fully operational.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 16,
        question: "What is Multi-Tenancy in cloud architectures?",
        options: ["Running multiple databases", "Shared users on shared hardware", "Having multiple CPU cores", "Double-ended process queues"],
        correctIndex: 1,
        explanation: "Multi-tenancy means that a single software instance or physical server serves multiple clients (tenants) while isolating their data.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 17,
        question: "What is Serverless Computing?",
        options: ["Computing without any servers", "No server management required", "Using static HTML files only", "Desktop-only application"],
        correctIndex: 1,
        explanation: "Serverless (like AWS Lambda) means the developer doesn't have to manage, provision, or scale servers; the cloud provider does it automatically.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 18,
        question: "What is a Container in cloud environments?",
        options: ["Physical server rack", "Lightweight VM-like package", "Zip file folder", "Database backup table"],
        correctIndex: 1,
        explanation: "Containers are lightweight packages that bundle application code and all its dependencies, sharing the host OS kernel for efficiency.",
        category: "Containers",
        difficulty: "Easy"
      },
      {
        id: 19,
        question: "What is Docker?",
        options: ["Programming language", "Container tool for deployment", "Web browser", "Relational database"],
        correctIndex: 1,
        explanation: "Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers.",
        category: "Containers",
        difficulty: "Easy"
      },
      {
        id: 20,
        question: "What is Kubernetes?",
        options: ["JavaScript compilation framework", "Orchestration of containers", "Security firewall service", "Disk partitioning utility"],
        correctIndex: 1,
        explanation: "Kubernetes is an open-source container orchestration tool that automates container deployment, scaling, and management.",
        category: "Containers",
        difficulty: "Hard"
      },
      {
        id: 21,
        question: "What does SLA stand for in cloud contracts?",
        options: ["Storage Local Array", "Service guarantee (SLA)", "System License Authority", "Server Logical Allocation"],
        correctIndex: 1,
        explanation: "An SLA is a formal commitment between a service provider and a client that guarantees metrics like uptime and service standards.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 22,
        question: "What is the benefit of Data Redundancy?",
        options: ["Creating identical databases", "Backup / redundant copies", "Speeding up database indexing", "Reducing storage costs"],
        correctIndex: 1,
        explanation: "Data redundancy stores multiple copies of the same data across different geographic locations to protect against data loss.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 23,
        question: "What is Edge Computing?",
        options: ["Fast CPU calculations", "Near source processing", "Advanced styling on visual components", "Parallel processing"],
        correctIndex: 1,
        explanation: "Edge computing places processing power closer to the physical location of users or data sources to minimize latency.",
        category: "Concepts",
        difficulty: "Medium"
      },
      {
        id: 24,
        question: "What does Cloud Storage refer to?",
        options: ["Local hard drives", "Remote storage space", "Storing data in CPU caches", "Offline server disks"],
        correctIndex: 1,
        explanation: "Cloud storage allows data to be stored and accessed securely over the internet on remote storage systems.",
        category: "Services",
        difficulty: "Easy"
      },
      {
        id: 25,
        question: "What is Bandwidth?",
        options: ["Network delay", "Data rate transmission", "Storage drive speed", "Number of server clusters"],
        correctIndex: 1,
        explanation: "Bandwidth represents the capacity of a network link to transmit data, typically measured in bits per second.",
        category: "Networking",
        difficulty: "Easy"
      },
      {
        id: 26,
        question: "What does Latency mean in cloud networking?",
        options: ["Speed of processor calculations", "Delay in transmission", "Storage size limit", "Security clearance level"],
        correctIndex: 1,
        explanation: "Latency is the round-trip time it takes for a data packet to travel from its source to its destination and back.",
        category: "Networking",
        difficulty: "Easy"
      },
      {
        id: 27,
        question: "What does API stand for?",
        options: ["Advanced Program Interface", "Interface (API)", "Automated Process Integration", "Active Program Index"],
        correctIndex: 1,
        explanation: "An API is a software intermediary that allows two applications to talk to each other.",
        category: "Concepts",
        difficulty: "Easy"
      },
      {
        id: 28,
        question: "What is the primary purpose of Encryption in the cloud?",
        options: ["Reduce file size", "Security (unreadable ciphertext)", "Format source code", "Compress database logs"],
        correctIndex: 1,
        explanation: "Encryption is a key security measure that makes data unreadable to unauthorized users.",
        category: "Security",
        difficulty: "Easy"
      },
      {
        id: 29,
        question: "What is Identity and Access Management (IAM)?",
        options: ["Local login tool", "Access control framework", "Database schema builder", "OS user folder"],
        correctIndex: 1,
        explanation: "IAM ensures that the right people and systems have the appropriate access to cloud resources and systems.",
        category: "Security",
        difficulty: "Medium"
      },
      {
        id: 30,
        question: "What billing model is most characteristic of public clouds?",
        options: ["Upfront license fees", "Billing on-demand (Pay-as-you-go)", "Free open-source terms", "Flat annual subscription"],
        correctIndex: 1,
        explanation: "Public clouds operate on a pay-as-you-go (utility-based) billing model, charging only for the resources consumed.",
        category: "Concepts",
        difficulty: "Easy"
      }
    ]
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
        question: "What is the primary role of the Java Virtual Machine (JVM)?",
        options: ["Compiling Java source files", "Runs bytecode", "Designing interface components", "Running physical hard drives"],
        correctIndex: 1,
        explanation: "The JVM is the engine that drives Java applications. It converts bytecode into machine code and executes it.",
        category: "JVM & Architecture",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "What does JDK stand for in Java?",
        options: ["Java Design Kernel", "Development kit (JDK)", "Java Database Key", "Java Directory Konnection"],
        correctIndex: 1,
        explanation: "The JDK is the software development environment used to write and compile Java applications.",
        category: "JVM & Architecture",
        difficulty: "Easy"
      },
      {
        id: 3,
        question: "What is the primary purpose of the Java Runtime Environment (JRE)?",
        options: ["Creating database tables", "Runtime environment", "Compiling source code", "Editing text files"],
        correctIndex: 1,
        explanation: "The JRE contains the class libraries, resources, and the JVM needed to run an already compiled Java program.",
        category: "JVM & Architecture",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "What is the core paradigm of Java programming?",
        options: ["Function-oriented development", "Class-object paradigm (OOP)", "Static pointer arithmetic", "Assembler operations"],
        correctIndex: 1,
        explanation: "Java is fundamentally an Object-Oriented language, focusing on objects and classes.",
        category: "OOPs",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "What does the concept of Encapsulation involve in Java?",
        options: ["Sharing resources across packages", "Data hiding / protection", "Defining multiple method names", "Dynamic memory garbage collection"],
        correctIndex: 1,
        explanation: "Encapsulation restricts direct access to some of an object's components, hiding its internal state.",
        category: "OOPs",
        difficulty: "Easy"
      },
      {
        id: 6,
        question: "What is Inheritance in Java OOP?",
        options: ["Restricting class instantiation", "Reuse / derivation from parent", "Managing thread execution", "Deallocating heap memory"],
        correctIndex: 1,
        explanation: "Inheritance enables a class to acquire the properties and methods of another class, promoting reusability.",
        category: "OOPs",
        difficulty: "Easy"
      },
      {
        id: 7,
        question: "What is the primary definition of Polymorphism?",
        options: ["Hiding data fields", "Many forms (overriding/overloading)", "Compiling code", "Static variables"],
        correctIndex: 1,
        explanation: "Polymorphism allows one interface or class reference to take multiple forms (e.g., dynamic method dispatch).",
        category: "OOPs",
        difficulty: "Medium"
      },
      {
        id: 8,
        question: "What is Abstraction in OOP?",
        options: ["Speeding up calculations", "Hide details / show essentials", "Declaring multiple classes", "Reusing base methods"],
        correctIndex: 1,
        explanation: "Abstraction focuses on what an object does rather than how it does it, implemented using abstract classes and interfaces.",
        category: "OOPs",
        difficulty: "Medium"
      },
      {
        id: 9,
        question: "What is a Java Interface?",
        options: ["Physical graphical screen", "Abstract contract (blueprint)", "Concrete class implementation", "Native package header"],
        correctIndex: 1,
        explanation: "An interface in Java is a blueprint of a class that has static constants and abstract methods (by default).",
        category: "OOPs",
        difficulty: "Easy"
      },
      {
        id: 10,
        question: "What defines an abstract class in Java?",
        options: ["Class that cannot be inherited", "Partial abstraction", "Standard package namespace", "Class containing only final methods"],
        correctIndex: 1,
        explanation: "Abstract classes are defined with the 'abstract' keyword and can contain both abstract and concrete methods.",
        category: "OOPs",
        difficulty: "Medium"
      },
      {
        id: 11,
        question: "What is the core role of a Constructor?",
        options: ["Compiling Java code", "Initialize objects", "Garbage collecting memory", "Resolving file imports"],
        correctIndex: 1,
        explanation: "A constructor is a special method called when a class instance is created to initialize its state.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 12,
        question: "What is Method Overloading?",
        options: ["Creating same-name methods in parent-child classes", "Compile-time / parameter-based", "Allocating too much memory", "Calling parent class constructor"],
        correctIndex: 1,
        explanation: "Method Overloading allows a class to have more than one method having the same name if their argument lists are different.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 13,
        question: "What is Method Overriding?",
        options: ["Compiling same-name methods", "Runtime polymorphism / parent replacement", "Changing variable scopes", "Speeding up loops"],
        correctIndex: 1,
        explanation: "Method Overriding occurs when a child class provides a specific implementation for a method inherited from its parent.",
        category: "Core Java",
        difficulty: "Medium"
      },
      {
        id: 14,
        question: "Are String objects immutable in Java?",
        options: ["No, strings can be edited directly", "Yes (immutable)", "Only inside static methods", "Only in newer Java versions"],
        correctIndex: 1,
        explanation: "Strings in Java are immutable; any modification creates a new String object rather than editing the original.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 15,
        question: "What is an Exception in Java?",
        options: ["Normal system termination", "Error handling / runtime event", "Final constant variable", "Class initialization syntax"],
        correctIndex: 1,
        explanation: "An Exception is an abnormal condition that occurs during runtime, handled using standard exception-handling keywords.",
        category: "Exceptions",
        difficulty: "Easy"
      },
      {
        id: 16,
        question: "What is the primary mechanism of a try-catch block?",
        options: ["Starting threads", "Handle error", "Importing external JAR libraries", "Defining static final constants"],
        correctIndex: 1,
        explanation: "The try-catch block isolates code that may throw an exception (try) and provides matching handlers (catch).",
        category: "Exceptions",
        difficulty: "Easy"
      },
      {
        id: 17,
        question: "What is guaranteed about the execution of a 'finally' block?",
        options: ["Never runs on success", "Always runs", "Runs only once per package", "Runs inside constructors only"],
        correctIndex: 1,
        explanation: "The finally block is always executed after try-catch, ensuring cleanup resources are closed properly.",
        category: "Exceptions",
        difficulty: "Easy"
      },
      {
        id: 18,
        question: "What represents a Thread in Java?",
        options: ["Memory segment", "Lightweight process path", "Collection index", "Virtual machine class loader"],
        correctIndex: 1,
        explanation: "A thread is a thread of execution in a program. The Java Virtual Machine allows an application to have multiple threads of execution running concurrently.",
        category: "Multithreading",
        difficulty: "Medium"
      },
      {
        id: 19,
        question: "What does Synchronization provide in multithreading?",
        options: ["High disk usage", "Thread safety", "Infinite loops", "Double pointer checks"],
        correctIndex: 1,
        explanation: "Synchronization controls thread access to shared objects, preventing concurrent modification errors.",
        category: "Multithreading",
        difficulty: "Medium"
      },
      {
        id: 20,
        question: "What is the Java Collections Framework?",
        options: ["System memory manager", "Data structure system", "Text layout template", "Database index system"],
        correctIndex: 1,
        explanation: "The Java Collections framework provides interfaces (Set, List, Queue, Deque) and implementations (ArrayList, LinkedList, HashSet, etc.) to store data.",
        category: "Collections",
        difficulty: "Easy"
      },
      {
        id: 21,
        question: "What is an ArrayList in Java?",
        options: ["Fixed size array", "Dynamic array representation", "Key-value map collection", "Sorted tree interface"],
        correctIndex: 1,
        explanation: "ArrayList implements the List interface using a resizable array back-end, allowing fast index-based access.",
        category: "Collections",
        difficulty: "Easy"
      },
      {
        id: 22,
        question: "What is the core structure of a HashMap?",
        options: ["Linked list index", "Key-value association", "Duplicate-only set", "Double-ended process queue"],
        correctIndex: 1,
        explanation: "HashMap store data in key-value pairs, providing average O(1) performance for insertions and lookups.",
        category: "Collections",
        difficulty: "Easy"
      },
      {
        id: 23,
        question: "What unique constraint is enforced by a Set?",
        options: ["Allows sorted items only", "Unique elements (no duplicates)", "Index-based access", "Slow search time"],
        correctIndex: 1,
        explanation: "A Set is a Collection that cannot contain duplicate elements.",
        category: "Collections",
        difficulty: "Easy"
      },
      {
        id: 24,
        question: "What is the role of Garbage Collection in Java?",
        options: ["Compiling classes", "Auto memory recovery", "Checking security clearances", "Speeding up method returns"],
        correctIndex: 1,
        explanation: "Garbage collection automatically tracks and deletes objects that are no longer referenced in the heap.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 25,
        question: "What does the 'static' keyword represent in Java?",
        options: ["Unique instance field", "Class level field/method", "Variable is read-only", "Method returns void"],
        correctIndex: 1,
        explanation: "Static variables or methods belong to the class rather than instances, loaded once during class loading.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 26,
        question: "What does the 'final' keyword represent when applied to variables?",
        options: ["Mutable object", "Constant variable", "Static class instance", "Package exclusive scope"],
        correctIndex: 1,
        explanation: "A final variable's value cannot be changed once initialized, making it a constant.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 27,
        question: "What does the 'this' keyword reference?",
        options: ["Parent class constructor", "Current object reference", "System environment settings", "Local package root"],
        correctIndex: 1,
        explanation: "In Java, 'this' is a reference variable that refers to the current object.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 28,
        question: "What does the 'super' keyword reference?",
        options: ["System memory page", "Parent reference", "Global package manager", "Static main thread"],
        correctIndex: 1,
        explanation: "The 'super' keyword is used to access parent class methods, variables, and constructors.",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 29,
        question: "What represents a package in Java?",
        options: ["Virtual machine container", "Namespace mapping", "Compilation error category", "Zip file layout"],
        correctIndex: 1,
        explanation: "Packages prevent naming conflicts and group related classes and interfaces together (e.g., java.util).",
        category: "Core Java",
        difficulty: "Easy"
      },
      {
        id: 30,
        question: "What is the purpose of an Access Modifier?",
        options: ["Compile class files", "Visibility scope controls", "Create custom exceptions", "Declare local threads"],
        correctIndex: 1,
        explanation: "Access modifiers control the access level of classes, constructors, variables, and methods.",
        category: "Core Java",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "se",
    title: "Software Engineering",
    description: "SDLC, Agile methodology, testing, and system design.",
    emoji: "🧠",
    accentColor: "#ec4899",
    questions: [
      {
        id: 1,
        question: "What does the abbreviation SDLC represent in software engineering?",
        options: ["System Data Licensing Center", "Development cycle (SDLC)", "Static Code Loading Core", "Standard Deployment Link Config"],
        correctIndex: 1,
        explanation: "SDLC is a structured process that outlines how a software system is planned, developed, tested, and deployed.",
        category: "SDLC",
        difficulty: "Easy"
      },
      {
        id: 2,
        question: "How is the Waterfall model characterized in development workflows?",
        options: ["Rapid feedback loop", "Sequential progression", "Iterative design", "Circular process"],
        correctIndex: 1,
        explanation: "The Waterfall model is a classic linear, sequential software development life cycle model.",
        category: "SDLC",
        difficulty: "Easy"
      },
      {
        id: 3,
        question: "What is the primary characteristic of the Agile methodology?",
        options: ["Strict documentation upfront", "Iterative delivery", "Single deployment phase", "Non-interactive design"],
        correctIndex: 1,
        explanation: "Agile values responding to change and collaboration over rigid plans, building software incrementally.",
        category: "Agile",
        difficulty: "Easy"
      },
      {
        id: 4,
        question: "What represents Scrum in Agile project management?",
        options: ["Web browser engine", "Agile framework", "Programming language compiler", "Database system"],
        correctIndex: 1,
        explanation: "Scrum is a popular lightweight Agile framework used to manage complex product development through short iterations called sprints.",
        category: "Agile",
        difficulty: "Easy"
      },
      {
        id: 5,
        question: "What represents a Requirement in software projects?",
        options: ["Variable initialization", "User need specification", "Server host specification", "Programming syntax rule"],
        correctIndex: 1,
        explanation: "Requirements capture the functional and non-functional needs that the software must fulfill for its stakeholders.",
        category: "Requirements",
        difficulty: "Easy"
      },
      {
        id: 6,
        question: "What does SRS stand for in requirements documentation?",
        options: ["Standard Run System", "Specification (SRS)", "Source Repository Schema", "System Recovery Source"],
        correctIndex: 1,
        explanation: "An SRS is a formal document that describes the comprehensive behavior and requirements of the software system to be built.",
        category: "Requirements",
        difficulty: "Easy"
      },
      {
        id: 7,
        question: "What is the role of UML in software design?",
        options: ["Web page styling", "Modeling / visualization tool", "Database backups", "Code debugging"],
        correctIndex: 1,
        explanation: "Unified Modeling Language (UML) is a standardized modeling language consisting of diagrams to specify, visualize, and document software systems.",
        category: "Design",
        difficulty: "Medium"
      },
      {
        id: 8,
        question: "What is illustrated by a Use Case diagram?",
        options: ["Database tables", "User interaction", "Code files", "CPU memory slots"],
        correctIndex: 1,
        explanation: "A Use Case diagram models the system's external behavior and interactions between users (actors) and the system.",
        category: "Design",
        difficulty: "Easy"
      },
      {
        id: 9,
        question: "What represents the main goal of software Testing?",
        options: ["Writing specifications", "Validation / verification", "Compiling code", "Writing CSS styles"],
        correctIndex: 1,
        explanation: "Testing evaluates software execution to verify functional compliance, identify bugs, and ensure correct behavior.",
        category: "Testing",
        difficulty: "Easy"
      },
      {
        id: 10,
        question: "What is Unit Testing?",
        options: ["Whole system verification", "Module testing in isolation", "Network speed testing", "Client acceptance check"],
        correctIndex: 1,
        explanation: "Unit testing tests individual functions, procedures, or classes to verify they work correctly in isolation.",
        category: "Testing",
        difficulty: "Easy"
      },
      {
        id: 11,
        question: "What is Integration Testing?",
        options: ["Compiling multiple libraries", "Combined modules verification", "Editing code lines", "Writing system specifications"],
        correctIndex: 1,
        explanation: "Integration testing verifies that different software components or modules work together smoothly when combined.",
        category: "Testing",
        difficulty: "Medium"
      },
      {
        id: 12,
        question: "What does System Testing evaluate?",
        options: ["Standalone functions", "Whole system verification", "Single database columns", "Local computer performance"],
        correctIndex: 1,
        explanation: "System testing is black-box testing performed on the complete, integrated system to ensure compliance with specified requirements.",
        category: "Testing",
        difficulty: "Medium"
      },
      {
        id: 13,
        question: "What is the primary purpose of Acceptance Testing?",
        options: ["Code compilation success", "Client validation", "Finding compiler warnings", "Adding custom classes"],
        correctIndex: 1,
        explanation: "Acceptance testing is formal testing conducted to determine whether a system satisfies its acceptance criteria and enables clients to decide whether to accept it.",
        category: "Testing",
        difficulty: "Medium"
      },
      {
        id: 14,
        question: "What describes Black Box testing?",
        options: ["Code-level inspection", "No internal structure knowledge", "Virtual machine debugging", "Automated deployment scripts"],
        correctIndex: 1,
        explanation: "Black-box testing focuses solely on inputs and outputs without examining the internal source code.",
        category: "Testing",
        difficulty: "Easy"
      },
      {
        id: 15,
        question: "What describes White Box testing?",
        options: ["Testing without code access", "Code level testing", "Usability reviews", "Server capacity checks"],
        correctIndex: 1,
        explanation: "White-box testing inspects the internal paths, structure, and implementation details of the code.",
        category: "Testing",
        difficulty: "Medium"
      },
      {
        id: 16,
        question: "What is Debugging?",
        options: ["Writing user guides", "Fix errors", "Compiling packages", "Hosting websites"],
        correctIndex: 1,
        explanation: "Debugging is the systematic process of finding, diagnosing, and resolving bugs within software code.",
        category: "Core Processes",
        difficulty: "Easy"
      },
      {
        id: 17,
        question: "What is software Maintenance?",
        options: ["Upfront requirements gathering", "Post release changes & fixes", "Writing initial draft code", "Initial UML sketching"],
        correctIndex: 1,
        explanation: "Software maintenance covers all updates and modifications done on a software product after it has been shipped to production.",
        category: "Core Processes",
        difficulty: "Easy"
      },
      {
        id: 18,
        question: "What does Cohesion represent in software design?",
        options: ["Strength of dependency between modules", "Module strength / focus", "Code file counts", "Number of server clusters"],
        correctIndex: 1,
        explanation: "Cohesion is a measure of how focused the responsibilities of a single module are.",
        category: "Design Concepts",
        difficulty: "Medium"
      },
      {
        id: 19,
        question: "What does Coupling measure in software design?",
        options: ["Module internal structure", "Dependency between modules", "Number of test scripts", "System throughput"],
        correctIndex: 1,
        explanation: "Coupling measures how closely connected or dependent two or more software modules are.",
        category: "Design Concepts",
        difficulty: "Medium"
      },
      {
        id: 20,
        question: "In software design, what is the goal for Cohesion?",
        options: ["Low cohesion", "High cohesion", "Zero cohesion", "Constant cohesion"],
        correctIndex: 1,
        explanation: "High cohesion within modules is desired because it indicates a well-focused design where each module has a singular, clear purpose.",
        category: "Design Concepts",
        difficulty: "Medium"
      },
      {
        id: 21,
        question: "In software design, what is the goal for Coupling?",
        options: ["High coupling", "Low coupling", "Double coupling", "Strict coupling"],
        correctIndex: 1,
        explanation: "Low (loose) coupling is a key design goal because it makes modules independent and easier to change, test, and maintain.",
        category: "Design Concepts",
        difficulty: "Medium"
      },
      {
        id: 22,
        question: "What is the primary role of a Version Control system?",
        options: ["Compile classes", "Track changes to source files", "Speed up CPU execution", "Automate database normalization"],
        correctIndex: 1,
        explanation: "Version control systems (like Git) track histories of code modifications, enabling team collaboration and rollback capabilities.",
        category: "Tools",
        difficulty: "Easy"
      },
      {
        id: 23,
        question: "Which of the following represents a modern Version Control tool?",
        options: ["Jenkins", "Git / Tool", "Docker", "IntelliJ IDEA"],
        correctIndex: 1,
        explanation: "Git is a highly popular distributed version control system.",
        category: "Tools",
        difficulty: "Easy"
      },
      {
        id: 24,
        question: "What does the abbreviation CI/CD represent in DevOps pipelines?",
        options: ["Computer Integration / Code Distribution", "Automation of integrations & delivery (CI/CD)", "Control Index / Data Center", "Compile Interface / Constant Duration"],
        correctIndex: 1,
        explanation: "CI/CD stands for Continuous Integration and Continuous Deployment/Delivery, which automates testing and deployment pipelines.",
        category: "DevOps",
        difficulty: "Medium"
      },
      {
        id: 25,
        question: "What is the primary goal of Risk Management?",
        options: ["Deleting old files", "Handle risk / mitigation", "Adding database columns", "Writing beautiful CSS styles"],
        correctIndex: 1,
        explanation: "Risk management systematically anticipates project disruptions and plans mitigation strategies to prevent failures.",
        category: "Management",
        difficulty: "Medium"
      },
      {
        id: 26,
        question: "What is evaluated by a Feasibility Study?",
        options: ["Individual code syntax correctness", "Viability & value check", "Thread safety", "Cache hit rates"],
        correctIndex: 1,
        explanation: "Feasibility studies analyze whether a project is worth pursuing from technical, financial, and operational perspectives.",
        category: "SDLC",
        difficulty: "Medium"
      },
      {
        id: 27,
        question: "What represents a Prototype in software systems?",
        options: ["Final production system", "Early model / experiment", "Standard design pattern", "Class constructor declaration"],
        correctIndex: 1,
        explanation: "A prototype is an early, simplified model of the software developed to validate concepts and gather early feedback.",
        category: "SDLC",
        difficulty: "Easy"
      },
      {
        id: 28,
        question: "What describes the Spiral model of software development?",
        options: ["Simple linear waterfall", "Risk-driven model", "Static database layout", "Pure client-side coding"],
        correctIndex: 1,
        explanation: "The Spiral model combines iterative development with systematic risk analysis and planning at each loop.",
        category: "SDLC",
        difficulty: "Hard"
      },
      {
        id: 29,
        question: "What represents software Deployment?",
        options: ["Designing a database schema", "Release to environment", "Writing a draft document", "Compiling code into bytecode"],
        correctIndex: 1,
        explanation: "Deployment encompasses all activities that make a software system available for use in its target environment.",
        category: "Core Processes",
        difficulty: "Easy"
      },
      {
        id: 30,
        question: "What is software Documentation?",
        options: ["Writing raw Java loops", "Record / guide keeping", "Deleting redundant columns", "Database indexing schemas"],
        correctIndex: 1,
        explanation: "Documentation includes all written materials (design docs, code comments, user manuals) that explain how a system works and is used.",
        category: "Core Processes",
        difficulty: "Easy"
      }
    ]
  }
];
