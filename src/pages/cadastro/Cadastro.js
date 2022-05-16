import React from "react";

export default function Cadastro (){
    return(
        <div>
           {/* aki vira a img do projeto */}
           <form onSubmit={""}>
         <input placeholder="nome e sobrenome "
          value={""}
          onChange={""}
          />
         <input placeholder="email@gmail.com"
          value={""}
          onChange={""}
          />
         <input placeholder="000.000.000-00"
          value={""}
          onChange={""}
          />
         <input placeholder="minimo 6 caracteres"
          value={""}
          onChange={""}
          />
         <input placeholder="comfirme a senha anteriror"
          value={""}
          onChange={""}
          />
          <button type={`submit`}> criar</button>
          </form>
        </div>
    )
}