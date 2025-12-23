import { useState, useEffect, useRef } from "react";
import Cartela from "./components/Cartela/Cartela";
import Historico from "./components/Historico/Historico";
import Welcome from "./components/Welcome/Welcome";
import { verificarBingo } from "./utils/verificarBingo";
import '../src/App.css'
import {CORES_LETRAS} from "./coresBingos"

const LETRAS = ["B", "I", "N", "G", "O"];

const LIMITES = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};

function App() {
  // -------------------------------
  // ESTADOS DO APLICATIVO
  // -------------------------------

  //tela bemvindo
  const [tela, setTela] = useState("welcome")

  // Estado que guarda a cartela inteira
  // Começa como null porque ainda não foi gerada
  const [cartela, setCartela] = useState(null);

  const [rodando, setRodando] = useState(false)



  // Guarda TODOS os números que já foram sorteados
  // Serve para não repetir números
  const [numerosSorteados, setNumerosSorteados] = useState([]);


      const numerosSorteadosRef = useRef([])
  
  useEffect(() => {
    numerosSorteadosRef.current = numerosSorteados
  }, [numerosSorteados])
  // Guarda apenas o último número sorteado
  // Serve para mostrar na tela
  const [numeroAtual, setNumeroAtual] = useState(null);

  //controla se bateu o bingo
  const [bingo, setBingo] = useState(false)

  // -------------------------------
  // FUNÇÃO PARA GERAR A CARTELA
  // -------------------------------

  const LETRAS = ["B", "I", "N", "G", "O"];


  function gerarCartela() {
    const novaCartela = [];

    // Loop para criar 5 linhas
    for (let linha = 0; linha < 5; linha++) {
      const linhaAtual = [];

      // Loop para criar 5 colunas
      for (let coluna = 0; coluna < 5; coluna++) {
        // Centro da cartela (linha 2, coluna 2)
        if (linha === 2 && coluna === 2) {
          linhaAtual.push({
            valor: null,
            marcado: true,
            letra: "N" // centro já começa marcado
          });
          continue
        }

        //definir o intervalo da coluna
        const min = coluna * 15 + 1;
        const max = min + 14

        let numero
        let repetido

        //sorteia ate achar um numero valido
        do{

          numero = Math.floor(Math.random() * (max - min + 1)) + min

          repetido = novaCartela.some((linhaExistente) =>
            linhaExistente[coluna]?.valor === numero
          )
        } while (repetido)

          //cria a celula
          linhaAtual.push({
            valor: numero,
            marcado: false,
            letra: LETRAS[coluna]
          })
      }

      //adiciona a linha pronta na cartela
      novaCartela.push(linhaAtual);
    }

    // Atualiza o estado da cartela
    setCartela(novaCartela);

    // Reseta o histórico e o número atual
    setNumerosSorteados([]);
    setNumeroAtual(null);

    //reseta o bingo ao gerar nova cartela
    setBingo(false)
  }

  // -------------------------------
  // FUNÇÃO QUE MARCA UM NÚMERO NA CARTELA
  // -------------------------------

  function marcarNumeroNaCartela(numero) {
    //so marca se o numero ja foi sorteado
    const foiSorteado = numerosSorteados.some(
      (item) => item.numero === numero
    )

    if(!foiSorteado) return

    const novaCartela = cartela.map((linha) => 
    linha.map((celula) =>{
      if(celula.valor === null) return celula

      if(celula.valor === numero){
        return {...celula, marcado: true}
      }
      return celula
    })
    )
    setCartela(novaCartela)

    const deuBingo = verificarBingo(novaCartela)
    if(deuBingo) setBingo(true)

      if(deuBingo){
        setBingo(true)
        setRodando(false)
      }
  }

  // -------------------------------
  // FUNÇÃO PARA SORTEAR UM NÚMERO
  // -------------------------------

  function sortearNumero() {

    //se ja deu bingo, nao sorteia mais
    if(bingo) return

    // Se todos os números já foram sorteados, para
    if (numerosSorteadosRef.length >= 75){
      setRodando(false)
      return
    }

    let numero, letra;

    // Sorteia até encontrar um número que ainda não foi sorteado
    do {
      letra = LETRAS[Math.floor(Math.random() * LETRAS.length)];
      const [min, max] = LIMITES[letra];
      numero = Math.floor(Math.random() * (max - min + 1)) + min;

    } while (numerosSorteadosRef.current.some((item) => item.numero === numero)
    );

    const novoSorteio = { letra, numero}

    setNumeroAtual(novoSorteio)
    setNumerosSorteados((prev) => [...prev, novoSorteio])

  }
function iniciarSorteio() {
  if (rodando) return;

  sortearNumero();
  setRodando(true);
}

function pararSorteio() {
  setRodando(false);
}

useEffect(() => {
  //se nao estiver rodando, nao faça nada
  if(!rodando) return

  //cria o intervalo
  const intervalo = setInterval(() => {
    sortearNumero()
  }, 4500)

  //funçao de limpeza (IMPORTANTE)
  return () => {
    clearInterval(intervalo)
  }
}, [rodando])

  // -------------------------------
  // RENDERIZAÇÃO DA TELA
  // -------------------------------

    return (
    <div className="container-principal">
      {/* ===== TELA DE BOAS-VINDAS ===== */}
      {tela === "welcome" && (
        <Welcome onStart={() => setTela("game")} />
      )}

      {/* ===== TELA DO JOGO ===== */}
      {tela === "game" && (
        <>
          <h1 className="neon">Bingo</h1>
        <div className="botoes">
          <button onClick={gerarCartela}
          >
            Gerar Cartela
          </button>

              {!rodando ? (
        <button onClick={iniciarSorteio}
          disabled={!cartela}
          className={!cartela ? "btn-disabled" : ""}>
          Iniciar Sorteio
        </button>
      ) : (
        <button onClick={pararSorteio}>
          Parar Sorteio
        </button>
)}
        </div>

        <div className="sorteados">
          <p>Numeros sorteados: </p>
          {numeroAtual && (
          <h3
            style={{ background: CORES_LETRAS[numeroAtual.letra]}}
          >
            {numeroAtual.letra}  {numeroAtual.numero}
          </h3>
        
          )}
        </div>

          {bingo && (
            <h2 style={{ color: "green" }}>
              🎉 BINGO! 🎉
            </h2>
          )}

          <Cartela
            cartela={cartela}
            onMarcarNumero={marcarNumeroNaCartela}
          />
          <div className="historico">
          <Historico numeros={numerosSorteados} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
