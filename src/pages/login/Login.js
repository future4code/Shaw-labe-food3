import React, { useState } from "react";
import axios from "axios";
import { goToHome } from "../../routes/coordinator"
import { useNavigate } from "react-router-dom";



export default function Login() {
    const [usuarioNome, setUsuarioNome] = useState()
    const [usuarioSenha, setUsuarioSenha] = useState()
    const navigate = useNavigate()


    const onUsuarioNome = (event) => {
        setUsuarioNome(event.target.value)

    }
    const onUsuarioSenha = (event) => {
        setUsuarioSenha(event.target.value)

    }
    const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/login"
    const fazendoLogin = (event) => {
        event.preventDefault()
        const body = {

            "email": usuarioNome,
            "password": usuarioSenha

        }
        axios.post(`${baseUrl}`, body)
            .then(resp => {
                console.log(resp.data)
                window.localStorage.setItem("token", resp.data.token)
                alert("bem vindo!")
                goToHome(navigate)

            })
            .catch(error => {
                alert("error ao cadastrar")
                console.log({ error })
            })

    }


    return (
        <div>
            <form onSubmit={fazendoLogin}>
                <input placeholder="email@gmail.com"
                    value={usuarioNome}
                    onChange={onUsuarioNome}
                />
                <input placeholder="minimo de 6 caracteres"
                    value={usuarioSenha}
                    onChange={onUsuarioSenha}
                    type="password"
                    pattern={"^.{6,20}"}
                    title={"sua senha deve ter no minimo 6 caracteres é no maximo 20"} />

                <button type={`submit`}> entrar</button>

            </form>


        </div>
    )
}