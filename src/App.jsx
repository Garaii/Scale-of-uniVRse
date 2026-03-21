import { useState, useEffect } from "react"
import LoadingScreen from "./components/LoadingScreen"
import logo from './uniVRse_logo.png';
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  

  return (
    <section className=""> 
     <div className="section-box">
      <h1 className="title-loading">Welcome to</h1>
      {/*<h1 className="title-loading"> Scale of the UniVRse</h1>*/}
      <img src={logo} alt="Description of the image"/>

      <h3 className="title-loading">Discover the  of the world through this immersive experience</h3>

      <div className='start-button'>
        <p>Start</p></div> </div>
     </section>
  )
}

export default App