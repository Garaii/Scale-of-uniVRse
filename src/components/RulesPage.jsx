import { useState } from "react"

export default function RulesPage({ onNext }) {
  const [flipped, setFlipped] = useState({ voyager: false, navigator: false })

  return (
    <div className="rules-page">
   {/**/} 
        <div className="stars-bg">
            {[...Array(24)].map((_, i) => (
            <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            }} 
            />
        ))}
      </div>
      <div className="starzz-bg">
        {[...Array(24)].map((_, i) => (
        <div key={i} className="star" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        width: `${Math.random() * 1 + 1}px`,
        height: `${Math.random() * 1 + 1}px`,
        }} 

        />
        ))}
      </div>
      {/**/}
      <div className="connect-header">
        <p className="logo-sub">BEFORE YOU BEGIN</p>
        <h2 className="connect-title">Mission Briefing</h2>
        <p className="rules-subtitle">Tap the cards to learn your role</p>
      </div>

      <div className="cards-row">

        {/* Voyager card */}
        <div
          className={`flip-card ${flipped.voyager ? "flipped" : ""}`}
          onClick={() => setFlipped(f => ({ ...f, voyager: true }))}
        >
          <div className="flip-inner">
            <div className="flip-front voyager-front">
              <div className="card-role-emoji">🥽</div>
              <div className="card-role-name">Voyager</div>
              <div className="card-tap">Tap to reveal</div>
            </div>
            <div className="flip-back voyager-back">
              <div className="card-role-name small">🥽 Voyager</div>
              <ul className="rules-list">
                <li>You explore the universe in VR</li>
                <li>Answer trivia questions you see in the headset</li>
                <li>Trust your Navigator for hints</li>
                <li>You both must pick the same answer!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigator card */}
        <div
          className={`flip-card ${flipped.navigator ? "flipped" : ""}`}
          onClick={() => setFlipped(f => ({ ...f, navigator: true }))}
        >
          <div className="flip-inner">
            <div className="flip-front navigator-front">
              <div className="card-role-emoji">📱</div>
              <div className="card-role-name">Navigator</div>
              <div className="card-tap">Tap to reveal</div>
            </div>
            <div className="flip-back navigator-back">
              <div className="card-role-name small">📱 Navigator</div>
              <ul className="rules-list">
                <li>You guide from the tablet app</li>
                <li>See the same question as the Voyager</li>
                <li>Discuss and agree on one answer</li>
                <li>You both must pick the same answer!</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="slogan-banner">
        🏆 WE WIN TOGETHER · WE LOSE TOGETHER
      </div>

      <button className="next-btn" onClick={onNext}>
        START MISSION 🚀
      </button>

    </div>
  )
}