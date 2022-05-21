import { AppBar, Toolbar, useThemeProps } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import CardRestaurante from "../../components/CardRestaurante"
import { UseAuth } from "../../hooks/useAuth"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Papel, Text, DivRestaurantes, P } from "./style"
import seta from '../../Img/seta.png'
import { goToHome, voltar } from '../../routes/coordinator'
import { useNavigate } from "react-router-dom"
import { useToken } from "../../hooks/useToken"


export default function Busca() {
    useToken()
    const [buscarRestaurante, setBuscarRestaurante] = useState("")
    const [filtrarRestaurante, setFiltrarRestaurante] = useState("")
    const [arrayRestaurantes, setArrayRestaurantes] = useState([])
    const navigate = useNavigate()
    /*
    useEffect(()=>{
      pegandoRestaurante()
    },[])*/
    // falta fazer a estetica agr 
    const onFiltrarRestaurante = (event) => {
        setFiltrarRestaurante(event.target.value)
    }
    const onbuscarRestaurante = (event) => {
        setBuscarRestaurante(event.target.value)
    }
    const auth = UseAuth()
    const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants"
    const pegandoRestaurante = (event) => {



        axios.get(`${baseUrl}`, auth)
            .then(resp => {

                setArrayRestaurantes(resp.data.restaurants)
            })
            .catch(error => {
                alert("error ao cadastrar")
                
            })
    }
    const filtrarBuscaRestaurantes = arrayRestaurantes && arrayRestaurantes.filter((restaurante) => {
        return restaurante.name.toLowerCase().includes(buscarRestaurante.toLowerCase())
    })
    
    const retornaBuscaPeloRestaurante = () => {
        if (!buscarRestaurante) {
            return (
                <P>Busque por nome de restaurante</P>
            )
        } else if (filtrarBuscaRestaurantes.length) {
            return filtrarBuscaRestaurantes.map((retornoRestaurante) => {
                return (
                    <div>
                        <CardRestaurante
                            restaurante={retornoRestaurante}
                        />
                    </div>
                )
            })
        } else {
            return (
                <P>Não encontramos :(</P>
            )
        }
    }

    return (
        <div>
            <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}>
                <Toolbar sx={{ backgroundColor: "white" }}>
                    <img src={seta} onClick={() => voltar(navigate)} />
                    <Text>Busca</Text>
                </Toolbar>
            </AppBar>
            <Papel
                component="form"

            >

                <IconButton sx={{ display: "flex", color: "#B8B8B8" }} aria-label="menu"
                    onClick={pegandoRestaurante()}>

                    <SearchIcon />

                </IconButton >

                <InputBase
                    value={buscarRestaurante}
                    onChange={onbuscarRestaurante}
                    sx={{ display: "flex", marginRight: "110px" }}
                    placeholder="Restaurante"
                    inputProps={{ 'aria-label': 'Restaurante' }}
                />




            </Papel>


            {retornaBuscaPeloRestaurante()}



            {/*  <input
        value={buscarRestaurante}
        onChange={onbuscarRestaurante}
      />
      <button onClick={pegandoRestaurante}>aaaaaaa</button>
      {retornaBuscaPeloRestaurante}
*/}
        </div>
    )
}