import { useThemeProps } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import CardRestaurante from "../../components/CardRestaurante"
import { UseAuth } from "../../hooks/useAuth"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Papel} from "./style"


export default function Busca() {
  const [buscarRestaurante, setBuscarRestaurante] = useState("")
  const [filtrarRestaurante, setFiltrarRestaurante] = useState("")
  const [arrayRestaurantes, setArrayRestaurantes] = useState([])
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
        console.log({ error })
      })
  }
  const filtrarBuscaRestaurantes = arrayRestaurantes && arrayRestaurantes.filter((restaurante) => {
    return restaurante.name.toLowerCase().includes(buscarRestaurante.toLowerCase())
  })
{/*console.log(filtrarBuscaRestaurantes);*/}
  const retornaBuscaPeloRestaurante = filtrarBuscaRestaurantes.map((retornoRestaurante) => {
    return (
      <div>
        <CardRestaurante
          restaurante={retornoRestaurante}
        />
      </div>
    )
  })


  return (
    <div>
      <Papel
        component="form"
        
      >
        
        <IconButton sx={{display:"flex", marginRight:"60px", color:"#B8B8B8"}} aria-label="menu"
          onClick={pegandoRestaurante()}>
          

          <SearchIcon/>
         
        </IconButton >
       
        <InputBase 
          value={buscarRestaurante}
          onChange={onbuscarRestaurante}
          sx={{display:"flex", justifyContent:"center", marginRight:"40px"}}
          placeholder="Restaurante"
          inputProps={{ 'aria-label': 'Restaurante' }}
        />
        
      
       
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">

        </IconButton>
      </Papel>
      {retornaBuscaPeloRestaurante}

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