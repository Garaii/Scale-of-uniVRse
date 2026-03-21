export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="planet-container">
        <div className="planet">
            <div className="crater" />
            <div className="crater crater-2" />
        </div>
        <div className="orbit">
            <div className="moon" />
        </div>
        </div>
      <h1>Scale of the UniVRse</h1>
      <div className="progress-bar">
        <div className="progress-fill" />
      </div>
      <p>Initializing scale matrix...</p>
    </div>
  )
}