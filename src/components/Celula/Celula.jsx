import React from "react";

function Celula({valor, marcado}){
  return (
    <div
    style={{
      width: 40,
        height: 40,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: marcado ? "#4caf50" : "white",
        color: marcado ? "white" : "black",
        fontWeight: marcado ? "bold" : "normal",
    }}
    >
      {valor ?? ""}
    </div>
  )
}

export default Celula