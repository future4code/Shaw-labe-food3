import { useThemeProps } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import CardRestaurante from "../../components/CardRestaurante"
import { UseAuth } from "../../hooks/useAuth"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';



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
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 344 ,}}
      >
        
        <IconButton sx={{ p: '10px' }} aria-label="menu"
          onClick={pegandoRestaurante()}>

          <SearchIcon />
         
        </IconButton >
       
        <InputBase
          value={buscarRestaurante}
          onChange={onbuscarRestaurante}
          sx={{ ml: 1, flex: 1 }}
      
          placeholder="Restaurante"
          inputProps={{ 'aria-label': 'Restaurante' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">

        </IconButton>
        

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">

        </IconButton>
      </Paper>
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