import React from 'react'
import { useState } from 'react'
import Cartela  from './components/cartela/cartela'

const App = () => {
  const [cartela, setCartela] = useState(null)

  function gerarCartela(){
    const novaCartela = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, null, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ];
    setCartela(novaCartela)
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

