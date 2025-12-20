import React, { useState } from "react";
import Cartela from "./components/Cartela/Cartela";
import { verificarBingo } from "./utils/verificarBingo";
import '../src/App.css'

function App() {
  // -------------------------------
  // ESTADOS DO APLICATIVO
  // -------------------------------

  // Estado que guarda a cartela inteira
  // Começa como null porque ainda não foi gerada
  const [cartela, setCartela] = useState(null);

  // Guarda TODOS os números que já foram sorteados
  // Serve para não repetir números
  const [numerosSorteados, setNumerosSorteados] = useState([]);

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
    // Criamos uma NOVA cartela baseada na atual
    const novaCartela = cartela.map((linha) =>
      linha.map((celula) => {
        // Se for o centro vazio, não muda nada
        if (celula.valor === null) {
          return celula;
        }

        // Se o valor da célula for igual ao número sorteado
        if (celula.valor === numero) {
          return {
            ...celula,
            marcado: true, // marca a célula
          };
        }

        // Caso contrário, retorna a célula sem alteração
        return celula;
      })
    );

    // Atualiza o estado com a nova cartela
    setCartela(novaCartela);

    // Verifica se houve bingo usando a cartela ATUALIZADA
    const deuBingo = verificarBingo(novaCartela);

    if (deuBingo) {
      setBingo(true)
    }
  }

  // -------------------------------
  // FUNÇÃO PARA SORTEAR UM NÚMERO
  // -------------------------------

  function sortearNumero() {

    //se ja deu bingo, nao sorteia mais
    if(bingo) return

    // Se todos os números já foram sorteados, para
    if (numerosSorteados.length === 75) return;

    let numero;

    // Sorteia até encontrar um número que ainda não foi sorteado
    do {
      numero = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numero));

    const indiceLetra = Math.floor((numero -1) / 15)
    const letra = LETRAS[indiceLetra]

    // Atualiza o histórico de números sorteados
    setNumerosSorteados((prev) => [...prev, numero]);

    // Atualiza o número atual (visual)
    setNumeroAtual({numero, letra});

const cartelaAtualizada = cartela.map((linha) =>
    linha.map((celula) => {
      if (celula.valor === numero) {
        return { ...celula, marcado: true };
      }
      return celula;
    })
  );
    setCartela(cartelaAtualizada)
  }

  // -------------------------------
  // RENDERIZAÇÃO DA TELA
  // -------------------------------

  return (
    <div className="container-principal">
      <h1>Bingo</h1>

      <button onClick={gerarCartela}>
        Gerar Cartela
      </button>

      <button onClick={sortearNumero} disabled={!cartela}>
        Sortear Número
      </button>

      {/* Mostra apenas o último número sorteado */}
      {numeroAtual && (
        <p>Número sorteado: <strong> {numeroAtual.letra}: {numeroAtual.numero}</strong></p>
      )}

      {bingo && (
        <h2 style={{color: "green"}}>
          🎉 BINGO! 🎉
        </h2>
      )}

      {/* Renderiza a cartela */}
      <Cartela cartela={cartela} />
    </div>
  );
}

export default App;
