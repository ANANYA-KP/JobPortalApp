import { useState } from "react";

// ── Static Data ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All Skills", "Coding", "Design", "Soft Skills", "Management"];

const ASSESSMENTS = [
  {
    id: 1,
    title: "Advanced React Patterns",
    category: "Coding",
    duration: 60,
    difficulty: 3,
    status: "available",
    description: "Master hooks, HOCs, render props and complex state management in enterprise applications.",
    accent: "#2563eb",
    bannerBg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    icon: "< />",
    questions: [
      { id: 1, question: "What is the purpose of React.memo()?", options: ["To memorize values between renders", "To prevent unnecessary re-renders of functional components", "To cache API responses", "To manage global state"], correct: 1 },
      { id: 2, question: "Which hook should you use to avoid recreating a function on every render?", options: ["useState", "useEffect", "useCallback", "useReducer"], correct: 2 },
      { id: 3, question: "What is a Higher Order Component (HOC)?", options: ["A component that renders other components", "A function that takes a component and returns a new component", "A component with higher priority rendering", "A built-in React component"], correct: 1 },
      { id: 4, question: "What does the render props pattern allow?", options: ["Rendering JSX directly in props", "Sharing stateful logic between components via a prop that is a function", "Optimizing render performance", "Rendering components conditionally"], correct: 1 },
      { id: 5, question: "Which of the following is true about useReducer?", options: ["It replaces Redux entirely", "It is used for simple state only", "It is useful for complex state logic with multiple sub-values", "It can only be used at the top level of an app"], correct: 2 },
    ],
  },
  {
    id: 2,
    title: "UI/UX Foundations",
    category: "Design",
    duration: 45,
    difficulty: 2,
    status: "completed",
    score: 94,
    description: "Test your knowledge of typography, spacing, accessibility, and visual hierarchy principles.",
    accent: "#7c3aed",
    bannerBg: "linear-gradient(135deg, #1e1b4b 0%, #3b1a5a 100%)",
    icon: "✦",
    questions: [
      { id: 1, question: "What does the 60-30-10 rule refer to in design?", options: ["Font size ratio", "Color proportion rule", "Grid column layout", "Image to text ratio"], correct: 1 },
      { id: 2, question: "What is visual hierarchy?", options: ["Ordering elements by file size", "Arranging elements to show importance and guide attention", "Alphabetical ordering of components", "The z-index stacking of elements"], correct: 1 },
    ],
  },
  {
    id: 3,
    title: "Conflict Resolution",
    category: "Soft Skills",
    duration: 30,
    difficulty: 2,
    status: "available",
    description: "Scenario-based assessment on navigating professional disagreements and team building.",
    accent: "#ea580c",
    bannerBg: "linear-gradient(135deg, #431407 0%, #7c2d12 100%)",
    icon: "⇄",
    questions: [
      { id: 1, question: "A teammate consistently misses deadlines. What is the best first step?", options: ["Report them to the manager immediately", "Have a private, empathetic conversation to understand the root cause", "Do their work for them", "Ignore it and hope it improves"], correct: 1 },
      { id: 2, question: "During a heated meeting, two team members disagree strongly. You should:", options: ["Pick a side and defend it", "Leave the meeting", "Acknowledge both views and suggest a short break to cool down", "Escalate to HR immediately"], correct: 2 },
      { id: 3, question: "Which conflict resolution style focuses on satisfying both parties?", options: ["Avoiding", "Competing", "Collaborating", "Accommodating"], correct: 2 },
    ],
  },
  {
    id: 4,
    title: "Product Management Core",
    category: "Management",
    duration: 45,
    difficulty: 4,
    status: "in_progress",
    progress: 45,
    lastActive: "2h ago",
    description: "Roadmapping, user personas, and agile methodologies for product owners.",
    accent: "#0d9488",
    bannerBg: "linear-gradient(135deg, #042f2e 0%, #134e4a 100%)",
    icon: "▦",
    questions: [
      { id: 1, question: "What is the primary purpose of a product roadmap?", options: ["To list all bugs to fix", "To communicate the vision and direction of a product over time", "To track developer hours", "To document API endpoints"], correct: 1 },
      { id: 2, question: "A user persona is:", options: ["A real customer's profile", "A fictional representation of your target user based on research", "A list of user complaints", "A UX wireframe"], correct: 1 },
      { id: 3, question: "In Agile, a sprint is typically:", options: ["A year-long planning cycle", "A 1-4 week development iteration", "A marketing campaign", "A bug-fix release"], correct: 1 },
      { id: 4, question: "What does MoSCoW stand for in prioritization?", options: ["Must, Should, Could, Won't", "More, Some, Could, Wait", "Must, Some, Can, Will", "Main, Secondary, Core, Wishlist"], correct: 0 },
    ],
  },
  {
    id: 5,
    title: "System Design Basics",
    category: "Coding",
    duration: 90,
    difficulty: 5,
    status: "available",
    description: "Scalability, microservices, databases, and distributed systems fundamentals.",
    accent: "#0891b2",
    bannerBg: "linear-gradient(135deg, #0c1a2e 0%, #0e4f6b 100%)",
    icon: "⬡",
    questions: [
      { id: 1, question: "What is horizontal scaling?", options: ["Adding more CPU/RAM to an existing server", "Adding more servers to distribute the load", "Scaling the database vertically", "Reducing latency with caching"], correct: 1 },
      { id: 2, question: "Which of the following is a benefit of microservices?", options: ["Simpler debugging", "Single deployment unit", "Independent deployment and scaling of services", "Reduced network overhead"], correct: 2 },
      { id: 3, question: "What is the CAP theorem?", options: ["A caching strategy for APIs", "Consistency, Availability, Partition Tolerance — only 2 can be guaranteed", "A CPU architecture principle", "A cloud cost optimization model"], correct: 1 },
    ],
  },
  {
    id: 6,
    title: "Leadership Essentials",
    category: "Management",
    duration: 40,
    difficulty: 3,
    status: "available",
    description: "Decision-making frameworks, delegation, and building high-performing teams.",
    accent: "#9333ea",
    bannerBg: "linear-gradient(135deg, #1a0a2e 0%, #3b0764 100%)",
    icon: "★",
    questions: [
      { id: 1, question: "Effective delegation means:", options: ["Assigning tasks and forgetting about them", "Doing all important tasks yourself", "Assigning tasks with clear expectations and providing support", "Only delegating simple tasks"], correct: 2 },
      { id: 2, question: "A servant leader primarily focuses on:", options: ["Personal career growth", "Team performance metrics", "Serving the needs of the team to help them succeed", "Strict hierarchy"], correct: 2 },
    ],
  },
  {
    id: 7,
    title: "Figma Prototyping",
    category: "Design",
    duration: 35,
    difficulty: 2,
    status: "available",
    description: "Components, auto-layout, variables and interactive prototyping in Figma.",
    accent: "#e11d48",
    bannerBg: "linear-gradient(135deg, #4c0519 0%, #881337 100%)",
    icon: "◈",
    questions: [
      { id: 1, question: "What does Auto Layout in Figma do?", options: ["Automatically designs the UI for you", "Allows frames to resize and reflow based on content", "Exports designs automatically", "Syncs with developer tools"], correct: 1 },
      { id: 2, question: "Figma Components are:", options: ["Code snippets embedded in Figma", "Reusable design elements that can be instanced throughout the file", "Plugins installed in Figma", "Figma's version of HTML elements"], correct: 1 },
    ],
  },
  {
    id: 8,
    title: "Node.js & REST APIs",
    category: "Coding",
    duration: 75,
    difficulty: 4,
    status: "completed",
    score: 88,
    description: "Build scalable REST APIs with Express, middleware, authentication and error handling.",
    accent: "#16a34a",
    bannerBg: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    icon: "⬡",
    questions: [
      { id: 1, question: "Which HTTP method is used to update a resource partially?", options: ["PUT", "POST", "PATCH", "DELETE"], correct: 2 },
      { id: 2, question: "What does middleware do in Express.js?", options: ["Renders HTML templates", "Executes code between request and response", "Manages the database", "Handles CSS styling"], correct: 1 },
    ],
  },
];

const CAT_META = {
  Coding:        { bg: "#1e3a5f", color: "#60a5fa", dot: "#3b82f6" },
  Design:        { bg: "#3b1a5a", color: "#c084fc", dot: "#a855f7" },
  "Soft Skills": { bg: "#431407", color: "#fb923c", dot: "#f97316" },
  Management:    { bg: "#064e4a", color: "#2dd4bf", dot: "#14b8a6" },
};

// ── Test Screen ────────────────────────────────────────────────────────────────
function TestScreen({ assessment, onFinish, onExit }) {
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);

  // Timer
  useState(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  });

  const questions = assessment.questions;
  const total     = questions.length;
  const answered  = Object.keys(answers).length;
  const mins      = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs      = String(timeLeft % 60).padStart(2, "0");
  const q         = questions[current];

  function handleSubmit() {
    const correct = questions.filter((qu, i) => answers[i] === qu.correct).length;
    const score   = Math.round((correct / total) * 100);
    setSubmitted(true);
    onFinish(assessment.id, score);
  }

  // ── Results ──
  if (submitted) {
    const correct = questions.filter((qu, i) => answers[i] === qu.correct).length;
    const score   = Math.round((correct / total) * 100);
    return (
      <div style={{ minHeight: "100vh", background: "#080c14", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "48px 40px", maxWidth: 600, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{score >= 80 ? "🏆" : score >= 60 ? "👍" : "📚"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px" }}>Test Complete!</h2>
          <p style={{ color: "#94a3b8", marginBottom: 24 }}>{assessment.title}</p>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1, margin: "0 0 8px", color: score >= 80 ? "#4ade80" : score >= 60 ? "#fbbf24" : "#f87171" }}>{score}%</div>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>{correct} out of {total} correct</p>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, textAlign: "left", marginBottom: 28 }}>
            {questions.map((qu, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1, color: answers[i] === qu.correct ? "#4ade80" : "#f87171" }}>
                  {answers[i] === qu.correct ? "✓" : "✗"}
                </span>
                <span style={{ fontSize: 13, color: "#94a3b8", flex: 1 }}>{qu.question}</span>
                {answers[i] !== qu.correct && (
                  <span style={{ fontSize: 11, color: "#4ade80", whiteSpace: "nowrap" }}>→ {qu.options[qu.correct]}</span>
                )}
              </div>
            ))}
          </div>

          <button
            style={{ border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "inherit", background: `linear-gradient(135deg, ${assessment.accent}, ${assessment.accent}cc)` }}
            onClick={onExit}
          >
            ← Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div style={{ minHeight: "100vh", background: "#080c14", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "16px 32px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }} onClick={onExit}>✕ Exit</button>
          <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{assessment.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: timeLeft < 120 ? "#f87171" : "#94a3b8" }}>⏱ {mins}:{secs}</span>
          <span style={{ fontSize: 13, color: "#64748b" }}>{answered}/{total} answered</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: `${((current + 1) / total) * 100}%`, background: assessment.accent, transition: "width .4s ease" }} />
      </div>

      {/* Question body */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 680, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 40px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", letterSpacing: 1, marginBottom: 16 }}>Question {current + 1} of {total}</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, margin: "0 0 28px" }}>{q.question}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.options.map((opt, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: 12, fontSize: 14,
                    fontWeight: 500, cursor: "pointer", textAlign: "left",
                    fontFamily: "inherit", transition: "all .2s",
                    border: selected ? `2px solid ${assessment.accent}` : "1px solid rgba(255,255,255,0.08)",
                    background: selected ? `${assessment.accent}18` : "rgba(255,255,255,0.03)",
                    color: selected ? "#f1f5f9" : "#94a3b8",
                  }}
                  onClick={() => setAnswers(prev => ({ ...prev, [current]: i }))}
                >
                  <span style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: selected ? assessment.accent : "rgba(255,255,255,0.08)", color: selected ? "#fff" : "#64748b" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <button
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 10, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: current === 0 ? 0.3 : 1 }}
              disabled={current === 0}
              onClick={() => setCurrent(c => c - 1)}
            >
              ← Previous
            </button>

            {/* Question dots */}
            <div style={{ display: "flex", gap: 6 }}>
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{ width: 30, height: 30, borderRadius: "50%", border: i === current ? `2px solid ${assessment.accent}` : "1px solid rgba(255,255,255,0.1)", background: answers[i] !== undefined ? `${assessment.accent}33` : i === current ? "rgba(255,255,255,0.08)" : "transparent", color: i === current ? "#f1f5f9" : "#64748b", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {current < total - 1 ? (
              <button
                style={{ border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: assessment.accent, color: "#fff" }}
                onClick={() => setCurrent(c => c + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                style={{ border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: "#16a34a", color: "#fff" }}
                onClick={handleSubmit}
              >
                Submit Test ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Assessment Card ────────────────────────────────────────────────────────────
function AssessmentCard({ assessment, onStart }) {
  const [hovered, setHovered] = useState(false);
  const { title, category, duration, difficulty, status, score, progress, lastActive, description, accent, bannerBg, icon } = assessment;
  const catMeta = CAT_META[category] || CAT_META.Coding;

  return (
    <div
      style={{ background: "rgba(255,255,255,0.03)", border: status === "in_progress" ? `1px solid ${accent}44` : "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.4)" : "none", transition: "all .22s", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div style={{ height: 130, background: bannerBg, position: "relative", display: "flex", alignItems: "flex-end", padding: 14 }}>
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 46, opacity: 0.5, color: "#fff", fontWeight: 700, pointerEvents: "none" }}>{icon}</span>
        {status === "completed" && <div style={{ position: "absolute", top: 12, right: 12, background: "#059669", color: "#ecfdf5", fontSize: 11, fontWeight: 700, borderRadius: 99, padding: "4px 10px" }}>Score: {score}%</div>}
        {status === "in_progress" && <div style={{ position: "absolute", top: 12, right: 12, background: `${accent}22`, border: `1px solid ${accent}66`, color: accent, fontSize: 11, fontWeight: 700, borderRadius: 99, padding: "4px 10px" }}>↗ In Progress</div>}
        <div style={{ background: catMeta.bg, color: catMeta.color, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: catMeta.dot, fontSize: 8 }}>●</span>{category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: 0, lineHeight: 1.3 }}>{title}</h3>
          <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>{duration} MIN</span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 14px" }}>{description}</p>

        {status !== "completed" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: "#334155" }}>DIFFICULTY</span>
            <div style={{ display: "flex", gap: 5 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: i <= difficulty ? accent : "rgba(255,255,255,0.13)" }} />)}
            </div>
          </div>
        )}

        {status === "in_progress" && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", borderRadius: 99, width: `${progress}%`, background: accent }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>{progress}% complete</span>
              <span style={{ fontSize: 11, color: "#475569" }}>Last active {lastActive}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {status === "completed" ? (
            <>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>✓ COMPLETED</span>
              <button style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8", borderRadius: 10, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Review</button>
            </>
          ) : (
            <button
              style={{ border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: hovered ? `0 6px 20px ${accent}44` : "none", transition: "all .2s", fontFamily: "inherit" }}
              onClick={() => onStart(assessment)}
            >
              {status === "in_progress" ? "Resume Test →" : "Take Test →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function OnlineAssessmentTest() {
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [searchQuery, setSearchQuery]       = useState("");
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [activeTest, setActiveTest]         = useState(null);
  const [assessments, setAssessments]       = useState(ASSESSMENTS);

  function handleFinish(id, score) {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, status: "completed", score } : a));
    setActiveTest(null);
  }

  if (activeTest) {
    return <TestScreen assessment={activeTest} onFinish={handleFinish} onExit={() => setActiveTest(null)} />;
  }

  const filtered = assessments.filter(a => {
    const matchCat = activeCategory === "All Skills" || a.category === activeCategory;
    const matchQ   = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const completedCount  = assessments.filter(a => a.status === "completed").length;
  const inProgressCount = assessments.filter(a => a.status === "in_progress").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080c14", color: "#e2e8f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -200, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,#1d4ed818 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -200, right: 100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed14 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Sidebar */}
      {sidebarOpen && (
        <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "28px 18px", display: "flex", flexDirection: "column", gap: 28, position: "sticky", top: 0, height: "100vh", overflowY: "auto", zIndex: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 20, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", borderRadius: 10, padding: "5px 7px", lineHeight: 1 }}>⚡</div>
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.5px", color: "#f1f5f9" }}>SkillCert</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff", flexShrink: 0 }}>AJ</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>Alex Johnson</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Senior Frontend Dev</div>
            </div>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[{ icon: "⊞", label: "Overview" }, { icon: "✓", label: "My Assessments", active: true }, { icon: "🏅", label: "Credentials" }, { icon: "⏱", label: "History" }, { icon: "⚙", label: "Settings" }].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 13px", borderRadius: 10, fontSize: 14, color: item.active ? "#60a5fa" : "#64748b", fontWeight: item.active ? 600 : 400, background: item.active ? "rgba(59,130,246,0.13)" : "transparent", cursor: "pointer" }}>
                <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", marginLeft: "auto" }} />}
              </div>
            ))}
          </nav>
          <div style={{ marginTop: "auto", background: "linear-gradient(135deg,rgba(59,130,246,0.14),rgba(139,92,246,0.09))", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#60a5fa" }}>WEEKLY GOAL</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: "#f1f5f9", margin: "6px 0 10px" }}>2/3 Tests Done</div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.09)", borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ height: "100%", borderRadius: 99, width: "66%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)" }} />
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>Complete one more test to maintain your streak! 🔥</div>
          </div>
        </aside>
      )}

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,12,20,0.85)", backdropFilter: "blur(16px)", position: "sticky", top: 0, zIndex: 10 }}>
          <button style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer", padding: "4px 8px" }} onClick={() => setSidebarOpen(v => !v)}>☰</button>
          <div style={{ display: "flex", gap: 24, flex: 1 }}>
            {["Dashboard", "Assessments", "Certifications"].map(l => (
              <span key={l} style={{ fontSize: 14, color: l === "Assessments" ? "#3b82f6" : "#64748b", cursor: "pointer", borderBottom: l === "Assessments" ? "2px solid #3b82f6" : "none", paddingBottom: 2 }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 13px" }}>
              <span>🔍</span>
              <input style={{ background: "none", border: "none", outline: "none", color: "#94a3b8", fontSize: 13, width: 180, fontFamily: "inherit" }} placeholder="Search assessments..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <span>🔔</span>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>AJ</div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "32px 36px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
            <div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.8px", margin: 0 }}>Available Assessments</h1>
              <p style={{ color: "#475569", fontSize: 14, margin: "5px 0 0" }}>Track your skills, earn credentials, grow your career.</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {[{ dot: "#22d3ee", label: `${assessments.length} Total` }, { dot: "#4ade80", label: `${completedCount} Done` }, { dot: "#fb923c", label: `${inProgressCount} In Progress` }].map(c => (
                <div key={c.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 99, padding: "4px 12px", fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: c.dot, fontSize: 8 }}>●</span>{c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} style={{ background: "none", border: "none", color: activeCategory === cat ? "#60a5fa" : "#475569", fontSize: 13, fontWeight: activeCategory === cat ? 700 : 500, padding: "10px 18px", cursor: "pointer", borderRadius: "8px 8px 0 0", position: "relative", fontFamily: "inherit" }} onClick={() => setActiveCategory(cat)}>
                {cat}
                {activeCategory === cat && <div style={{ position: "absolute", bottom: -1, left: 18, right: 18, height: 2, background: "#3b82f6", borderRadius: 99 }} />}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#475569" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p>No assessments match your search.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {filtered.map(a => <AssessmentCard key={a.id} assessment={a} onStart={setActiveTest} />)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 36px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "#334155" }}>
          <span>© 2024 SkillCert Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Support"].map(l => <span key={l} style={{ cursor: "pointer", color: "#475569" }}>{l}</span>)}
          </div>
        </div>
      </main>
    </div>
  );
}
