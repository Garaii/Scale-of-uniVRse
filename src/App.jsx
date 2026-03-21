import { useState, useEffect } from "react"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="main-page">
  
            <h1 className="title-loading">Welcome to Scale of the UniVRse</h1>
            <h3>Discover the world and its greatness through this immersive experience</h3>
    </div>
      
     
  )
}

export default App