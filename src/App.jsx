import React from 'react'
import { useState } from 'react'
import Cartela  from './components/Cartela/Cartela'
import { verificarBingo } from './utils/verificarBingo';

function App() {
  const [cartela, setCartela] = useState(null);

  // Guarda o número sorteado atual (opcional, mas didático)
  const [numeroSorteado, setNumeroSorteado] = useState([]);

  const [numeroAtual, setNumeroAtual] = useState(null)

  function gerarCartela() {
    const novaCartela = [];
    let numerosUsados = []

    for (let linha = 0; linha < 5; linha++) {
      const linhaAtual = [];

      for (let coluna = 0; coluna < 5; coluna++) {
        if (linha === 2 && coluna === 2) {
          linhaAtual.push({
            valor: null,
            marcado: true,
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

    setCartela(novaCartela);

    setNumeroSorteado([])
    setNumeroAtual(null)
  }

  function sortearNumero() {

    if(numeroSorteado.length === 75) return;

    let numero
  
    do{
      numero = Math.floor(Math.random() * 75) + 1;
    }while(numeroSorteado.includes(numero))
    
    //atualiza o historico
    setNumeroSorteado((prev) => [...prev, numero])

    setNumeroAtual(numero)

    // Cria uma nova cartela baseada na atual
    const cartelaAtualizada = cartela.map((linha) =>
      linha.map((celula) => {
        // Se o valor da célula for igual ao número sorteado
        if (celula.valor === numero) {
          return {
            ...celula,
            marcado: true, // marca a célula
          };
        }

        // Se não, retorna a célula como está
        return celula;
      })
    );

    // Atualiza o estado
    setCartela(cartelaAtualizada);

    const deuBingo = verificarBingo(cartelaAtualizada)

    if(deuBingo){
      alert("🎉 BINGO! 🎉")
    }
  }

  return (
    <div>
      <h1>Bingo</h1>

      <button onClick={gerarCartela}>
        Gerar Cartela
      </button>

      <button onClick={sortearNumero} disabled={!cartela}>
        Sortear Número
      </button>

      {numeroSorteado && (
        <p>Número sorteado: {numeroSorteado}  </p>
      )}

      <Cartela cartela={cartela} />
    </div>
  );
}

export default App