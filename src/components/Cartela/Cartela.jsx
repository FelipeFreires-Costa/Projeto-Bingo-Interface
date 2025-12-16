import React from "react"

function Cartela({ cartela }){
  
  if(!cartela){
    return null
  }

  return(
    <div>
        {cartela.map((linha, indexLinha) =>(
          <div key={indexLinha} style={{ display: "flex"}}>
            {linha.map((numero, indexColuna) =>(
              <div
              key={indexColuna}
              style={{
                width: 40,
                height: 40,
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              >
              {numero ?? ""}
              </div>
            ))}
          </div> 
        ))}
      </div>
  )
}


export default Cartela 