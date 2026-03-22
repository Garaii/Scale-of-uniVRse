export default function ResultPage({ result, onRestart }) {
  const { score, total, reason } = result
  const isGameOver = reason === "gameover"
  const maxScore = total * 2
  const pct = Math.max(0, (score / maxScore) * 100)

  const getMessage = () => {
    if (isGameOver) return { emoji: "💥", title: "Mission Failed", sub: "You both picked the same wrong answer. Trust your instincts next time!" }
    if (score >= maxScore * 0.8) return { emoji: "🏆", title: "Legendary Crew!", sub: "You and your Voyager are perfectly in sync!" }
    if (score >= maxScore * 0.5) return { emoji: "🚀", title: "Good Mission!", sub: "Solid teamwork. Keep exploring the universe!" }
    return { emoji: "🌌", title: "Keep Exploring!", sub: "The universe is vast — you'll get better!" }
  }

  const msg = getMessage()

  return (
    <div className="result-page">

      <div className="result-hero">
        <div className="result-emoji">{msg.emoji}</div>
        <h1 className="result-title">{msg.title}</h1>
        <p className="result-sub">{msg.sub}</p>
      </div>

      <div className="result-score-card">
        <div className="final-score-label">FINAL SCORE</div>
        <div className="final-score-value">{score}</div>
        <div className="final-score-max">out of {maxScore} pts</div>

        <div className="score-bar-track">
          <div
            className="score-bar-fill"
            style={{
              width: `${pct}%`,
              background: isGameOver ? "#ef4444" : score > 0 ? "#22c55e" : "#f97316"
            }}
          />
        </div>
      </div>

      <div className="slogan-banner">
        🏆 WE WIN TOGETHER · WE LOSE TOGETHER
      </div>

      <button className="next-btn" onClick={onRestart}>
        🔄 PLAY AGAIN
      </button>

    </div>
  )
}