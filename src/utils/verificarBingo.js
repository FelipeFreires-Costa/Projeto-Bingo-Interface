// utils/verificarBingo.js
// Essa função recebe a cartela e verifica
// se existe linha, coluna ou diagonal completa

export function verificarBingo(cartela) {
  const tamanho = 5;

  // 🔹 Verifica linhas
  for (let i = 0; i < tamanho; i++) {
    const linhaCompleta = cartela[i].every(
      (celula) => celula.marcado
    );

    if (linhaCompleta) return true;
  }

  // 🔹 Verifica colunas
  for (let col = 0; col < tamanho; col++) {
    let colunaCompleta = true;

    for (let lin = 0; lin < tamanho; lin++) {
      if (!cartela[lin][col].marcado) {
        colunaCompleta = false;
        break;
      }
    }

    if (colunaCompleta) return true;
  }

  // 🔹 Verifica diagonal principal
  let diagonalPrincipal = true;

  for (let i = 0; i < tamanho; i++) {
    if (!cartela[i][i].marcado) {
      diagonalPrincipal = false;
      break;
    }
  }

  if (diagonalPrincipal) return true;

  // 🔹 Verifica diagonal secundária
  let diagonalSecundaria = true;

  for (let i = 0; i < tamanho; i++) {
    if (!cartela[i][tamanho - 1 - i].marcado) {
      diagonalSecundaria = false;
      break;
    }
  }

  if (diagonalSecundaria) return true;

  // 🔹 Se nada foi encontrado
  return false;
}
