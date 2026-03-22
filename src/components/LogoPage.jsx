export default function LogoPage({ onStart }) {
  return (
    <div className="logo-page">

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

      <div className="logo-text">
        <p className="logo-sub">WELCOME TO</p>
        <h1 className="logo-title">Scale of the<br />UniVRse</h1>
        <p className="logo-slogan">✦ WE WIN TOGETHER · WE LOSE TOGETHER ✦</p>
      </div>

      <button className="start-btn" onClick={onStart}>
        TAP TO START
      </button>

    </div>
  )
}