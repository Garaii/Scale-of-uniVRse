import { useState, useEffect } from "react"
import { generateQuestions, formatSize } from "../data/triviaData"

const LETTERS = ["A", "B", "C", "D"]
const COLORS = ["#e63946", "#2a9d8f", "#e9c46a", "#457b9d"]
const TIME_PER_Q = 20

function getVoyagerAnswer(options) {
  return options[Math.floor(Math.random() * options.length)]
}

function calcScore(navAnswer, voyAnswer, correct) {
  const navRight = navAnswer === correct
  const voyRight = voyAnswer === correct
  const same = navAnswer === voyAnswer

  if (same && navRight) return { delta: 2, label: "🎉 BOTH CORRECT!", color: "#22c55e", detail: "+2 pts" }
  if (same && !navRight) return { delta: 0, label: "💥 GAME OVER", color: "#ef4444", detail: "Same wrong answer!", gameOver: true }
  if (!same && navRight) return { delta: 1, label: "✅ YOU'RE RIGHT!", color: "#86efac", detail: "+1 pt (Voyager missed it)" }
  if (!same && voyRight) return { delta: 1, label: "🥽 VOYAGER GOT IT!", color: "#86efac", detail: "+1 pt (You missed it)" }
  return { delta: -1, label: "❌ BOTH WRONG", color: "#f97316", detail: "-1 pt (Different wrong answers)" }
}

export default function TriviaPage({ onNext }) {
  const [questions] = useState(generateQuestions)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [voyagerPick, setVoyagerPick] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q)
  const [gameOver, setGameOver] = useState(false)
  const [phase, setPhase] = useState("question") // question | reveal | result

  const q = questions[qIndex]

  // Timer
  useEffect(() => {
    if (phase !== "question" || selected) return
    if (timeLeft <= 0) { handleSelect(null); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, phase, selected])

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(TIME_PER_Q)
    setSelected(null)
    setVoyagerPick(null)
    setResult(null)
    setPhase("question")
  }, [qIndex])

  function handleSelect(answer) {
    if (selected) return
    const voy = getVoyagerAnswer(q.options)
    const res = calcScore(answer, voy, q.correct)

    setSelected(answer || "⏱ TIME UP")
    setVoyagerPick(voy)
    setResult(res)
    setPhase("reveal")

    setTimeout(() => {
      const newScore = score + res.delta
      setScore(newScore)
      if (res.gameOver) {
        setGameOver(true)
        onNext({ score: newScore, total: qIndex + 1, reason: "gameover" })
      } else if (qIndex + 1 >= questions.length) {
        onNext({ score: newScore, total: questions.length, reason: "complete" })
      } else {
        setQIndex(i => i + 1)
      }
    }, 3000)
  }

  const timerPct = (timeLeft / TIME_PER_Q) * 100
  const timerColor = timeLeft > 10 ? "#22c55e" : timeLeft > 5 ? "#f59e0b" : "#ef4444"

  return (
    <div className="trivia-page">

      {/* Header */}
      <div className="trivia-header">
        <div className="trivia-score">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="trivia-progress">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < qIndex ? "done" : i === qIndex ? "active" : ""}`}
            />
          ))}
        </div>
        <div className="trivia-timer" style={{ color: timerColor }}>
          <span className="timer-value">{timeLeft}</span>
          <span className="timer-label">sec</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="timer-bar-track">
        <div
          className="timer-bar-fill"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
      </div>

      {/* Question */}
      <div className="trivia-body">
        <div className="q-meta">
          <span className="q-number">Q{qIndex + 1} of {questions.length}</span>
          <span className="q-type">{q.type === "comparison" ? "⚖️ Size Battle" : "🔍 Guess the Element"}</span>
        </div>

        <div className="q-card">
          {q.type === "guess" && (
            <div className="q-category">📂 {q.category}</div>
          )}
          <p className="q-question">{q.question}</p>
          <p className="q-hint">{q.hint}</p>

          {/* Show sizes for comparison questions */}
          {q.type === "comparison" && (
            <div className="comparison-sizes">
              <div className="comp-item">
                <span className="comp-name">{q.elemA.name}</span>
                <span className="comp-size">{formatSize(q.elemA.size_m)}</span>
              </div>
              <div className="comp-vs">VS</div>
              <div className="comp-item">
                <span className="comp-name">{q.elemB.name}</span>
                <span className="comp-size">{formatSize(q.elemB.size_m)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Voyager status */}
        <div className="voyager-status">
          <span className="voyager-dot" />
          {phase === "question"
            ? "🥽 Voyager is thinking..."
            : `🥽 Voyager picked: ${voyagerPick}`
          }
        </div>

        {/* Options */}
        <div className={`options-grid ${q.options.length === 2 ? "two-col" : "four-col"}`}>
          {q.options.map((opt, i) => {
            const isCorrect = opt === q.correct
            const isSelected = opt === selected
            const isVoyager = opt === voyagerPick

            let optClass = "option-btn"
            if (phase === "reveal") {
              if (isCorrect) optClass += " correct"
              else if (isSelected && !isCorrect) optClass += " wrong"
              else optClass += " dimmed"
            }

            return (
              <button
                key={opt}
                className={optClass}
                style={{ "--opt-color": COLORS[i] }}
                onClick={() => phase === "question" && handleSelect(opt)}
                disabled={phase === "reveal"}
              >
                <span className="opt-letter">{LETTERS[i]}</span>
                <span className="opt-text">{opt}</span>
                {phase === "reveal" && isVoyager && (
                  <span className="voyager-tag">🥽</span>
                )}
                {phase === "reveal" && isCorrect && (
                  <span className="correct-tag">✓</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Result banner */}
        {result && (
          <div className="result-banner" style={{ background: result.color + "22", borderColor: result.color }}>
            <div className="result-label">{result.label}</div>
            <div className="result-detail">{result.detail}</div>
          </div>
        )}
      </div>
    </div>
  )
}