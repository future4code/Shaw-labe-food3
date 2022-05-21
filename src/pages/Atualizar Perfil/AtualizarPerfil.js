import React, { useState } from "react";
import { AppBar, TextField, Toolbar } from "@mui/material";
import { Botao, ContainerInput, Texto } from "./style";
import seta from "../../Img/seta.png"
import { useNavigate } from "react-router-dom";
import { goToPerfil, voltar } from "../../routes/coordinator";
import api from "../../Services/api";
import { MarkEmailRead } from "@mui/icons-material";
import { useToken } from "../../hooks/useToken";


export default function AtualizarPerfil() {
    useToken()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')

    const onChangeNome = (event) => {
        setNome(event.target.value)
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const onChangeCpf = (event) => {
        setCpf(event.target.value)
    }

    const putAtualizaCadastro = async () => {

        const token = window.localStorage.getItem('token')

        const body = {
            name: nome,
            email: email,
            cpf: cpf,
        }

        try {
            await api.put('profile', body, 
            {headers: {
                auth: token
            }})
            goToPerfil(navigate)           
            alert('Cadastro atualizado com sucesso!')


        } catch (error) {           

            alert('Erro ao atualizar cadastro!')
        }
    }





    const navigate = useNavigate()
    return (
        <div>
            <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}>
                <Toolbar sx={{ backgroundColor: "white" }}>
                    <img src={seta} onClick={() => voltar(navigate)} />
                    <Texto sx={{marginLeft: '135px', fontFamily: "Roboto", fontSize: "1.1rem", color: "black" }} >Editar</Texto>

                </Toolbar>
            </AppBar>

            

            <ContainerInput>

                <TextField sx={{ marginTop: "16px", width: "86%" }}
                    required
                    id="outlined-required"
                    label="Nome"
                    placeholder="Nome"
                    value={nome}
                    onChange={onChangeNome}


                />

                <TextField sx={{ marginTop: "16px", width: "86%" }}
                    required
                    id="outlined-required"
                    label="E-mail"
                    placeholder="E-mail"
                    value={email}
                    onChange={onChangeEmail}

                />

                <TextField sx={{ marginTop: "16px", width: "86%" }}
                    required
                    id="outlined-required"
                    label="CPF"
                    placeholder="CPF"
                    value={cpf}
                    onChange={onChangeCpf}

                />


                <div>
                    {/* <Button sx={{backgroundColor:"red", color:"white", marginLeft:"130px", marginTop: "20px"}}>Enviar</Button> */}
                    {/* <Button color="inherit" onClick={() => endereco()}>Enviar</Button> */}


                    <Botao onClick={putAtualizaCadastro}>Salvar</Botao>


                </div>


            </ContainerInput>

        </div>
    )
}
