import React from 'react'
import { useState } from 'react'
import Cartela  from './components/cartela/cartela'

const App = () => {
  //estadi que guarda a cartela do bingo
  const [cartela, setCartela] = useState(null)

  //estado que guarda os numeros sorteados
  const [numerosSorteados, setNumerosSorteados] = useState([])

  //gera um numero aleatorio dentro de um intervalo
  function gerarNumero(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  //gera numeros unicos dentro de um intervalo
  function gerarNumerosUnicos(qtd, min, max){
    const numeros = []

    while(numeros.length < qtd){
      const numero = gerarNumero(min, max)

      if(!numeros.includes(numero)){
        numeros.push(numero)
      }
    }
  }

  function gerarCartela(){
    const colunas = [
      gerarNumerosUnicos(5, 1, 15),   // B
      gerarNumerosUnicos(5, 16, 30),  // I
      gerarNumerosUnicos(5, 31, 45),  // N
      gerarNumerosUnicos(5, 46, 60),  // G
      gerarNumerosUnicos(5, 61, 75),  // O
    ]

    const novaCartela = []

    for(let i = 0; i < 5; i++){
      const linha = []

      for(let j = 0; j < 5; i++){
        //centro da cartela vazio
        if(i === 2 && j === 2){
          linha.push({valor: null, marcado: true })
        } else {
          linha.push({
            valor: colunas[j][i],
            marcado: false,
          })
        }
      }
      
      novaCartela.push(linha)
    }
    setCartela(novaCartela)

    setNumerosSorteados([])
  }


  return (
    <div>
      <h1>bingo</h1>
      <button onClick={gerarCartela}>Gerar Cartela</button>

      <Cartela cartela ={cartela} />
    </div>

  )
}

export default App

