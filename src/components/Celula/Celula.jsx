import "./Celula.css";

function Celula({ valor, marcado, onMarcarNumero }) {
  function handleClick() {
    if (valor !== null) {
      onMarcarNumero(valor);
    }
  }

  const classes = [
    "celula",
    marcado ? "celula-marcada" : "",
    valor === null ? "celula-centro" : ""
  ].join(" ");

  return (
    <div className={classes} onClick={handleClick}>
      {valor === null ? "FREE" : valor}
    </div>
  );
}

export default Celula;
