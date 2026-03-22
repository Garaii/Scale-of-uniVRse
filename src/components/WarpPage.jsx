import { useState } from "react"

export default function WarpPage({ onNext }) {
  const [warping, setWarping] = useState(false)

  function handleLaunch() {
    setWarping(true)
    setTimeout(() => onNext(), 4000)
  }

  return (
    <div className="warp-page">
      <canvas id="warp-canvas" />
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
      <div className={`warp-content ${warping ? "warp-hide" : ""}`}>
        <p className="logo-sub">MISSION STARTING</p>
        <h1 className="warp-title">Ready,<br />Voyager?</h1>
        <p className="warp-sub">Your Navigator is standing by</p>
        <button className="warp-btn" onClick={handleLaunch}>
          🚀 LAUNCH MISSION
        </button>
      </div>

      {warping && (
        <div className="warp-overlay">
          <p className="warp-text">Entering the Universe...</p>
        </div>
      )}

      <WarpStars warping={warping} />
    </div>
  )
}

function WarpStars({ warping }) {
  const stars = Array.from({ length: 400 }, (_, i) => ({
    id: i,
    angle: Math.random() * 360,
    speed: Math.random() * 3 + 1,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="warp-stars">
      {stars.map(star => (
        <div
          key={star.id}
          className={`warp-star ${warping ? "warping" : ""}`}
          style={{
            "--angle": `${star.angle}deg`,
            "--speed": `${star.speed}`,
            "--size": `${star.size}px`,
            animationDelay: `${star.delay}s`,
            left: "50%",
            top: "50%",
          }}
        />
      ))}
    </div>
  )
}