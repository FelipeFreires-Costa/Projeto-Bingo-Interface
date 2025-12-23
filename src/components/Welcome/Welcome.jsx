import "./Welcome.css"

function Welcome({onStart}){
  return(
    <div className="welcome-container">
      <h1 className="logo">BINGO</h1>

      <button className="start-button" onClick={onStart}>
        Iniciar
      </button>
    </div>
  )
}

export default Welcome;