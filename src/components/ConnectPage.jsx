import { useState, useEffect, useRef } from "react"
import { createSession, watchSession } from "../hooks/useSession"

export default function ConnectPage({ onNext }) {
  const [stage, setStage] = useState("creating") // creating | waiting | connected
  const [code, setCode] = useState(null)
  const unsubRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    createSession().then((sessionCode) => {
      if (cancelled) return
      setCode(sessionCode)
      setStage("waiting")
      unsubRef.current = watchSession(sessionCode, (data) => {
        if (!data) return
        if (data.status === "connected") setStage("connected")
      })
    })
    return () => {
      cancelled = true
      unsubRef.current?.()
    }
  }, [])

  function handleNext() {
    onNext(code)
  }

  return (
    <div className="connect-page">
      <div className="stars-bg">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }} />
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
          }} />
        ))}
      </div>

      <div className="connect-header">
        <p className="logo-sub">SCALE OF THE UNIVERSE</p>
        <h2 className="connect-title">Connect Your Device</h2>
      </div>

      {/* Creating session */}
      {stage === "creating" && (
        <div className="search-container">
          <div className="sonar">
            <div className="sonar-ring ring1" />
            <div className="sonar-ring ring2" />
            <div className="sonar-ring ring3" />
            <div className="sonar-dot" />
          </div>
          <p className="search-text">Setting up session...</p>
        </div>
      )}

      {/* Waiting for VR headset */}
      {stage === "waiting" && code && (
        <div className="search-container">
          <div className="sonar">
            <div className="sonar-ring ring1" />
            <div className="sonar-ring ring2" />
            <div className="sonar-ring ring3" />
            <div className="sonar-dot" />
          </div>
          <p className="search-text">Share this code with the Voyager:</p>
          <div className="room-code-display">
            {code.split("").map((char, i) => (
              <span key={i} className="room-code-char">{char}</span>
            ))}
          </div>
          <p className="search-text" style={{ fontSize: "0.8rem", opacity: 0.6 }}>
            Waiting for VR headset to join...
          </p>
        </div>
      )}

      {/* Connected */}
      {stage === "connected" && (
        <div className="search-container">
          <div className="success-circle">
            <div className="success-check">✓</div>
          </div>
          <div className="success-text">
            <h3>Connected!</h3>
            <p>VR Headset is ready</p>
          </div>
          <button className="next-btn" onClick={handleNext}>
            NEXT →
          </button>
        </div>
      )}
    </div>
  )
}
