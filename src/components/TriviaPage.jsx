import { useState, useEffect, useRef } from "react"
import { watchSession, writeNavigatorAnswer, cleanupSession } from "../hooks/useSession"
import { getAssetUrl } from "../data/assetMap"

const LETTERS = ["A", "B", "C"]
const COLORS = ["#e63946", "#2a9d8f", "#e9c46a"]

export default function TriviaPage({ sessionCode, onNext }) {
  const [session, setSession] = useState(null)
  const [selected, setSelected] = useState(null)
  const unsubRef = useRef(null)

  // Subscribe to session updates
  useEffect(() => {
    if (!sessionCode) return
    unsubRef.current = watchSession(sessionCode, setSession)
    return () => unsubRef.current?.()
  }, [sessionCode])

  // Reset Navigator's selection when a new question arrives
  const prevRoundRef = useRef(null)
  useEffect(() => {
    if (!session) return
    const round = session.round
    if (round !== prevRoundRef.current) {
      prevRoundRef.current = round
      setSelected(null)
    }
  }, [session?.round])

  // React to terminal states
  useEffect(() => {
    if (!session) return
    if (session.status === "gameover") {
      setTimeout(() => {
        cleanupSession(sessionCode)
        onNext({ score: session.score, total: session.round, reason: "gameover" })
      }, 3000)
    } else if (session.status === "complete") {
      setTimeout(() => {
        cleanupSession(sessionCode)
        onNext({ score: session.score, total: session.round, reason: "complete" })
      }, 3000)
    }
  }, [session?.status])

  async function handleSelect(answer) {
    if (selected) return
    setSelected(answer)
    await writeNavigatorAnswer(sessionCode, answer)
  }

  if (!session) {
    return (
      <div className="trivia-page">
        <div className="trivia-body" style={{ justifyContent: "center", alignItems: "center" }}>
          <p style={{ color: "#7d8590", fontFamily: "'Orbitron', monospace", fontSize: "14px" }}>
            Waiting for session...
          </p>
        </div>
      </div>
    )
  }

  const { status, score, round, question, voyagerAnswer, result } = session
  const phase = status // "question" | "reveal" | "gameover" | "complete"
  const objects = question?.objects ?? []
  const correct = question?.correctAnswer
  const prompt = question?.prompt ?? "Which is the LARGEST?"

  return (
    <div className="trivia-page">

      {/* Header */}
      <div className="trivia-header">
        <div className="trivia-score">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="trivia-progress">
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "12px", color: "#7d8590" }}>
            ROUND {round}
          </span>
        </div>
        <div className="voyager-status" style={{ margin: 0, padding: 0 }}>
          {phase === "question"
            ? (voyagerAnswer ? "🥽 Voyager answered" : "🥽 Voyager is thinking...")
            : `🥽 Voyager: ${voyagerAnswer ?? "—"}`}
        </div>
      </div>

      {/* Question */}
      <div className="trivia-body">
        <div className="q-meta">
          <span className="q-number">Round {round}</span>
          <span className="q-type">⚖️ Size Battle</span>
        </div>

        <div className="q-card">
          <p className="q-question">{prompt}</p>
        </div>

        {/* Options */}
        {objects.length > 0 && (
          <div className={`options-grid ${objects.length === 2 ? "two-col" : "two-col"}`}>
            {objects.map((obj, i) => {
              const isCorrect = obj.name === correct
              const isSelected = obj.name === selected
              const isVoyager = obj.name === voyagerAnswer
              const imgSrc = getAssetUrl(obj.name)

              let optClass = "option-btn"
              if (imgSrc) optClass += " opt-has-img"
              if (phase === "reveal" || phase === "gameover" || phase === "complete") {
                if (isCorrect) optClass += " correct"
                else if (isSelected && !isCorrect) optClass += " wrong"
                else optClass += " dimmed"
              }

              return (
                <button
                  key={obj.name}
                  className={optClass}
                  style={{ "--opt-color": COLORS[i % COLORS.length] }}
                  onClick={() => phase === "question" && !selected && handleSelect(obj.name)}
                  disabled={phase !== "question" || !!selected}
                >
                  {imgSrc && <img src={imgSrc} alt={obj.name} className="opt-img" />}
                  <div className="opt-row">
                    <span className="opt-letter">{LETTERS[i]}</span>
                    <span className="opt-text">{obj.name}</span>
                    {(phase === "reveal" || phase === "gameover") && isVoyager && (
                      <span className="voyager-tag">🥽</span>
                    )}
                    {(phase === "reveal" || phase === "gameover") && isCorrect && (
                      <span className="correct-tag">✓</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Waiting for Navigator to answer */}
        {phase === "question" && !selected && (
          <div className="voyager-status">
            <span className="voyager-dot" />
            Pick your answer above
          </div>
        )}

        {/* Waiting for Voyager after Navigator answered */}
        {phase === "question" && selected && !voyagerAnswer && (
          <div className="voyager-status">
            <span className="voyager-dot" />
            🥽 Waiting for Voyager...
          </div>
        )}

        {/* Result banner */}
        {result && (phase === "reveal" || phase === "gameover" || phase === "complete") && (
          <div
            className="result-banner"
            style={{
              background: (result.gameOver ? "#ef4444" : "#22c55e") + "22",
              borderColor: result.gameOver ? "#ef4444" : "#22c55e"
            }}
          >
            <div className="result-label">{result.label}</div>
            <div className="result-detail">{result.detail}</div>
          </div>
        )}
      </div>
    </div>
  )
}
