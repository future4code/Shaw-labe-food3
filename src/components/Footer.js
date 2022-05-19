import React from 'react';
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import {goToHome, goToCarrinho, goToPerfil} from "../routes/coordinator"

const MainConstainerFooter = styled.div `
    border-top: solid 1px gray;
    bottom: 0;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: white;
`



const Footer = () => {
    const navigate = useNavigate()
    return (
      <MainConstainerFooter>
          <HomeIcon
           onClick={()=> goToHome(navigate)}
           sx={{fontSize: "5vh", color: "#adadad"}}
        />
          <ShoppingCartIcon
          onClick={()=> goToCarrinho(navigate)}
           sx={{fontSize: "5vh", color: "#adadad"}}
          />
          <PersonIcon
          onClick={()=> goToPerfil(navigate)}
           sx={{fontSize: "5vh", color: "#adadad"}}
          />
      </MainConstainerFooter>
    )
}

export default Footer