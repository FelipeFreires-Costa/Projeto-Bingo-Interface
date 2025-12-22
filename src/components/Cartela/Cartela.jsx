import React from "react"
import './Cartela.css'
import Celula from "../Celula/Celula"

const LETRAS = ["B", "I", "N", "G", "O"];
function Cartela({ cartela, onMarcarNumero }){
  
  if(!cartela){
    return null
  }


  return(
    <div className='cartela'>
      <div className="linha-letras">
        {LETRAS.map((letra) => (
          <div key={letra} className="letra">
            {letra}
          </div>
        ))}
      </div>
      
      {/* percorre cada linha da cartela */}
      {cartela.map((linha, indexLinha) =>(
        // cada linha é um container horizontal
        <div key={indexLinha} style={{display: "flex"}}>
          {/* percorre cada celula da linha */}
          {linha.map((celula, indexColuna) => (
            <Celula
            key={indexColuna}
            valor={celula.valor}
            marcado={celula.marcado}
            onMarcarNumero={onMarcarNumero}
            />
          ))}
          </div>
      ) )}
    </div>
  )
}


export default Cartela 