
import { Button, Input, TextField} from "@mui/material";
import axios from "axios";
import React from "react";
import { UseAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import {BASE_URL} from "../../baseurl/Baseurl"
import { Botao, ContainerInput, Texto } from "./style";


export default function Endereco (){
  const auth = UseAuth()

  const [form, onChange] = useForm({rua:"", numero:"", complemento:"", bairro:"", cidade:"", estado:""})

  const endereco = () =>{
    const body = {
      street: form.rua,
      number: form.numero,
      neighbourhood:form.bairro,
      city: form.cidade,
      state: form.estado,
      complement:form.complemento

    }

    axios.put(`${BASE_URL}/address`, body, auth)
    .then((res)=>{
      alert("Cadastrado com sucesso")
     
    })
    .catch((err)=>{
      alert(err.response.message)
      console.log(err.response)
    })



  }

    return(
        <div>
          
          <Texto sx={{marginTop:"50px"}} variant="body1">Meu endereço</Texto>
        
         <ContainerInput>

         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Logradouro"
          placeholder="Rua/Av."
          value={form.rua}
          onChange={onChange}
          name="rua"
        />
        
         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Número"
          placeholder="Número"
          value={form.numero}
          onChange={onChange}
          name="numero"
        />
        
         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Complemento"
          placeholder="Apto./Bloco"
          value={form.complemento}
          onChange={onChange}
          name="complemento"
        />

         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={onChange}
          name="bairro"
        />

         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={onChange}
          name="cidade"
        />
       
         <TextField sx={{marginTop:"15px"}}
          required
          id="outlined-required"
          label="Estado"
          placeholder="Estado"
          value={form.estado}
          onChange={onChange}
          name="estado"
        />
        <div>
           {/* <Button sx={{backgroundColor:"red", color:"white", marginLeft:"130px", marginTop: "20px"}}>Enviar</Button> */}
           {/* <Button color="inherit" onClick={() => endereco()}>Enviar</Button> */}
           
           <Botao>
              <button>Enviar</button>
           </Botao>
          
        </div>
        
       
         </ContainerInput>

        </div>
    )
}