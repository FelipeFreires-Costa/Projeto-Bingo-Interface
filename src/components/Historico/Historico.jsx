import "./Historico.css"

function Historico({ numeros }){
  //se ainda nao tem numero sorteado
  if(numeros.lenght === 0){
    return <p>Nenhum numero sorteado ainda.</p>
  }

  return (
    <div className="historico">
      <h3>Historico de numeros</h3>

      <div className="lista-numeros">
        {numeros.map((item, index) => (
          <span key={index }className="numero">
            {item.letra}-{item.numero}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Historico