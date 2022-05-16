import React from "react";
// feito por mateus
export default function Endereco (){
    return(
        <div>
         <button> voltar page</button>
         <h3> meu endereco</h3>
         <form  onSubmit={""}> 
          <input placeholder="rua/av"
            value={""}
            onChange={""}
            />
          <input placeholder="numero" 
          value={""}
          onChange={""}
          />
          <input placeholder="apto/bloco"
            value={""}
            onChange={""}
            />
          <input placeholder="bairro"
            value={""}
            onChange={""}
            />
          <input placeholder="cidade"
            value={""}
            onChange={""}
            />
          <input placeholder="estado"
            value={""}
            onChange={""}
            />
          <button type={`submit`}>salvar</button>
         </form>
        </div>
    )
}