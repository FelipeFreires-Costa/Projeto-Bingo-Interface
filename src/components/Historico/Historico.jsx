import "./Historico.css"
import { CORES_LETRAS} from "../../coresBingos"

function Historico({ numeros }){
  //se ainda nao tem numero sorteado
  if(numeros.lenght === 0){
    return <p>Nenhum numero sorteado ainda.</p>
  }

   return (
     <div className="historico-container">
      <h3>Histórico</h3>
    <div className="sorteios">
          {numeros.map((item, index) => (
        <span
          key={index}
          style={{
            fontWeight: "bold",
            background: CORES_LETRAS[item.letra]
          }}
        >
          {item.letra}:{item.numero}
        </span>
      ))}
    </div>


    </div>
  );
}

export default Historico