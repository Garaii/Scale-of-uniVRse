import { useState, useEffect } from "react"
import LoadingScreen from "./components/LoadingScreen"
import LogoPage from "./components/LogoPage"
import ConnectPage from "./components/ConnectPage"
import RulesPage from "./components/RulesPage"
import WarpPage from "./components/WarpPage"



function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState("logo")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="app-shell">
      {/* Stars always visible on every page */}
      <div className="stars-bg">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }} />
        ))}
      </div>
      {page === "rules" && <RulesPage onNext={() => setPage("warp")} />}
      {page === "warp" && <WarpPage onNext={() => setPage("trivia")} />}
      {page === "logo" && <LogoPage onStart={() => setPage("connect")} />}
      {page === "connect" && <ConnectPage onNext={() => setPage("rules")} />}
      {page === "rules" && <RulesPage onNext={() => setPage("trivia")} />}
    </div>
  )
}

export default App