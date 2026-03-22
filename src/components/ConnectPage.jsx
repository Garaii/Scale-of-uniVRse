import { useState, useEffect } from "react"

const STAGES = ["searching", "found", "connecting", "connected"]

export default function ConnectPage({ onNext }) {
  const [stage, setStage] = useState("searching")
/*DOING THE TIMEOUTS FOR CONNECT AND SEARCHING SO WE CAN SEE ANIMATION  */
  useEffect(() => {
    const t1 = setTimeout(() => setStage("found"), 4500)
    const t2 = setTimeout(() => {}, 0) // placeholder
    return () => { clearTimeout(t1); clearTimeout(t2) }}, [])
/* TO INCLUDE*/ 
  function handleConnect() {
    setStage("connecting")
    setTimeout(() => setStage("connected"), 3000)}

  return (
    <div className="connect-page">
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
        <p className="logo-sub">SCALE OF THE UNIVERSE</p>
        <h2 className="connect-title">Connect Your Device</h2>
      </div>

      {/* Searching animation */}
      {stage === "searching" && (
        <div className="search-container">
          <div className="sonar">
            <div className="sonar-ring ring1" />
            <div className="sonar-ring ring2" />
            <div className="sonar-ring ring3" />
            <div className="sonar-dot" />
          </div>
          <p className="search-text">Scanning for devices...</p>
        </div>
      )}

      {/* Device found */}
      {(stage === "found" || stage === "connecting") && (
        <div className="search-container">
          <div className="device-card">
            <div className="device-icon">🥽</div>
            <div className="device-info">
              <div className="device-name">VR Headset Meta 3S</div>
              <div className="device-status">Device found nearby</div>
            </div>
            <div className="device-signal">
              <div className="signal-bar" />
              <div className="signal-bar" />
              <div className="signal-bar" />
            </div>
          </div>

          <p className="search-text">
            Want to connect to <strong>"VR Headset Meta 3S"</strong>?
          </p>

          <button
            className="connect-btn"
            onClick={handleConnect}
            disabled={stage === "connecting"}
          >
            {stage === "connecting" ? (
              <span className="btn-loading">Connecting<span className="dots" /></span>
            ) : "CONNECT"}
          </button>
        </div>
      )}

      {/* Connected success */}
      {stage === "connected" && (
        <div className="search-container">
          <div className="success-circle">
            <div className="success-check">✓</div>
          </div>
          <div className="success-text">
            <h3>Connected!</h3>
            <p>VR Headset Meta 3S is ready</p>
          </div>
          <button className="next-btn" onClick={onNext}>
            NEXT →
          </button>
        </div>
      )}

    </div>
  )
}