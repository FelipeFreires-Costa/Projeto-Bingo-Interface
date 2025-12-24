import "./ModalVitoria.css"

export default function ModalVitoria({ onClose, onReiniciar}){
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal" onClick={onClose}>
          ✖
        </button>
        <h2>🎉 BINGO! 🎉</h2>
        <p>Parabéns, você venceu!</p>
          <button className="modal-reiniciar" onClick={onReiniciar}>
            Reiniciar cartela
          </button>
      </div>
    </div>
  )
}