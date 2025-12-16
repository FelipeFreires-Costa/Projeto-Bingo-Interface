import React from "react"
import './Cartela.css'

function Cartela({ cartela }){
  
  if(!cartela){
    return null
  }

  return(
    <div className='cartela'>
      {cartela.map((linha, indexLinha) =>(
        <div key={indexLinha} className="cartela-linha">
          {linha.map((celula, indexColuna) => (
            <div
            key={indexColuna}
            className={`cartela-celula ${celula.marcado ? "marcada" : ""}`}
            >
              {celula.valor ?? ""}
              </div>
          ))}
          </div>
      ) )}
    </div>
  )
}


export default Cartela 