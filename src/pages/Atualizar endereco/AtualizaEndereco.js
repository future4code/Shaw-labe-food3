
import { AppBar, Button, Input, TextField, Toolbar} from "@mui/material";
import axios from "axios";
import React from "react";
import { UseAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import {BASE_URL} from "../../baseurl/Baseurl"
import { Botao, ContainerInput, Texto } from "./style";
import seta from "../../Img/seta.png"
import { useNavigate } from "react-router-dom";
import { goToHome, goToLogin, goToPerfil, voltar } from "../../routes/coordinator";

export default function Endereco (){
  const auth = UseAuth()
  const navigate = useNavigate()
  const [form, onChange, clean] = useForm({rua:"", numero:"", complemento:"", bairro:"", cidade:"", estado:""})

  const atualizaEndereco = () =>{
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
      alert("Endereço atualizado !")
      goToPerfil(navigate)
      
    })
    .catch((err)=>{
      alert(err.response.message)
      
    })



  }

    return(
        <div>
        <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)"}}>
        <Toolbar sx={{backgroundColor: "white"}}>
          <img src={seta} onClick={() => voltar(navigate)}/>
          <Texto sx={{marginLeft: '110px', fontFamily: "Roboto", fontSize: "1.1rem", color: "black" }} >Meu endereço</Texto>

        </Toolbar>
        </AppBar>         

        
         <ContainerInput>

         <TextField sx={{marginTop:"16px",width:"86%"}}
          required
          id="outlined-required"
          label="Logradouro"
          placeholder="Rua/Av."
          value={form.rua}
          onChange={onChange}
          name="rua"
        />
        
         <TextField sx={{marginTop:"16px",width:"86%"}}
          required
          id="outlined-required"
          label="Número"
          placeholder="Número"
          value={form.numero}
          onChange={onChange}
          name="numero"
        />
        
         <TextField sx={{marginTop:"16px",width:"86%"}}
          required
          id="outlined-required"
          label="Complemento"
          placeholder="Apto./Bloco"
          value={form.complemento}
          onChange={onChange}
          name="complemento"
        />

         <TextField sx={{marginTop:"16px",width:"86%"}}
          required
          id="outlined-required"
          label="Bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={onChange}
          name="bairro"
        />

         <TextField sx={{marginTop:"16px",width:"86%"}}
          required
          id="outlined-required"
          label="Cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={onChange}
          name="cidade"
        />
       
         <TextField sx={{marginTop:"16px",width:"86%"}}
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
           
           
              <Botao onClick={() => atualizaEndereco()}>Salvar</Botao>
          
          
        </div>
        
       
         </ContainerInput>

        </div>
    )
}