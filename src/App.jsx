import React, { useState } from "react";
import Cartela from "./components/Cartela/Cartela";
import { verificarBingo } from "./utils/verificarBingo";

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

  // -------------------------------
  // FUNÇÃO PARA GERAR A CARTELA
  // -------------------------------

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
            marcado: true, // centro já começa marcado
          });
        } else {
          linhaAtual.push({
            valor: Math.floor(Math.random() * 75) + 1,
            marcado: false,
          });
        }
      }

      novaCartela.push(linhaAtual);
    }

    // Atualiza o estado da cartela
    setCartela(novaCartela);

    // Reseta o histórico e o número atual
    setNumerosSorteados([]);
    setNumeroAtual(null);
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
      alert("🎉 BINGO! 🎉");
    }
  }

  // -------------------------------
  // FUNÇÃO PARA SORTEAR UM NÚMERO
  // -------------------------------

  function sortearNumero() {
    // Se todos os números já foram sorteados, para
    if (numerosSorteados.length === 75) return;

    let numero;

    // Sorteia até encontrar um número que ainda não foi sorteado
    do {
      numero = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numero));

    // Atualiza o histórico de números sorteados
    setNumerosSorteados((prev) => [...prev, numero]);

    // Atualiza o número atual (visual)
    setNumeroAtual(numero);

    // Marca o número na cartela
    marcarNumeroNaCartela(numero);
  }

  // -------------------------------
  // RENDERIZAÇÃO DA TELA
  // -------------------------------

  return (
    <div>
      <h1>Bingo</h1>

      <button onClick={gerarCartela}>
        Gerar Cartela
      </button>

      <button onClick={sortearNumero} disabled={!cartela}>
        Sortear Número
      </button>

      {/* Mostra apenas o último número sorteado */}
      {numeroAtual !== null && (
        <p>Número sorteado: {numeroAtual}</p>
      )}

      {/* Renderiza a cartela */}
      <Cartela cartela={cartela} />
    </div>
  );
}

export default App;
