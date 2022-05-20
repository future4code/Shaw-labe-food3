import { AppBar, TextField, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { MainContainer } from "./style";
import Logo from '../../Img/LogoCadastro.svg'
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import  seta  from '../../Img/seta.png'
import { goToLogin, voltar } from '../../routes/coordinator'


export default function Cadastro() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmeSenha, setConfirmeSenha] = useState('')

  const nomeValue = (event) => {
    setNome(event.target.value)
  }
  const emailValue = (event) => {
    setEmail(event.target.value)
  }
  const cpfValue = (event) => {
    setCpf(event.target.value)
  }
  const senhaValue = (event) => {
    setSenha(event.target.value)
  }
  const confirmeSenhaValue = (event) => {
    setConfirmeSenha(event.target.value)
  }


  const navigate = useNavigate()


  const postCriarRegistro = async () => {
    const body = {
      name: nome,
      email: email,
      cpf: cpf,
      password: senha
    }

    try {
      const response = await api.post('signup', body)
      navigate('/endereco')
      window.localStorage.setItem('token', response.data.token)
      alert('Cadastro criado com sucesso')


    } catch (error) {
     

      alert('Erro ao criar cadastro.')
    }
  }
  return (
    <div>
      <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}>
          <Toolbar sx={{ backgroundColor: "white" }}>
          <img src={seta} onClick={() => goToLogin(navigate)} />

          </Toolbar>
        </AppBar>
      <MainContainer>
        
        <img src={Logo} />
        <Typography sx={{ marginBottom:"30px", marginTop:"30px", fontFamily:"Roboto", fontSize:"1.1rem", color:"black"}}>Cadastrar</Typography>

        <TextField sx={{ marginBottom: '20px' }} label="Nome e sobrenome "
          value={nome}
          onChange={nomeValue}
        />
        <TextField sx={{ marginBottom: '20px' }} label="E-mail"
          value={email}
          onChange={emailValue}
        />
        <TextField sx={{ marginBottom: '20px' }} label="CPF" pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
          value={cpf}
          onChange={cpfValue}
        />
        <TextField sx={{ marginBottom: '20px' }} label="Senha" placeholder="Mínimo 6 caracteres" type="password"
          value={senha}
          onChange={senhaValue}
        />
        <TextField sx={{ marginBottom: '20px' }} label='Repita a senha anterior' placeholder="Confirme a senha anterior" type="password"
          value={confirmeSenha}
          onChange={confirmeSenhaValue}
        />
        <button onClick={postCriarRegistro} type={`submit`}><strong>Criar</strong></button>

      </MainContainer>
    </div>
  )
}