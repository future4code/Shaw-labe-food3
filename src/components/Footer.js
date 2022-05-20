import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { goToHome, goToCarrinho, goToPerfil } from "../routes/coordinator"
import axios from 'axios';
import { baseURL } from '../constants/constants';
import { UseAuth } from '../hooks/useAuth';
import clock from '../Img/clock.svg'

const MainContainerFooter = styled.div`
    bottom: 0;
    width: 100%;
    position: fixed;
`
const NavBar = styled.div`
    border-top: solid 1px gray;
    width: 100%;
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: white;
`
const ActiveOrder = styled.div`  
    width: 24.35rem;
    height: 7.965rem;
    background-color: red;
    ${({active}) => active ? `display: flex;` : `display: none;`}
    align-items: center;
`
const ImgClock = styled.img`
  width: 2.16rem;
  height: 2.16rem;
  margin: 1.24rem;
  object-fit: contain;
`
const InfoOrder = styled.div`
  width: 17.28rem;
  font-family: Montserrat;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const PedidoEmAndamento = styled.span`
    color: white;
    margin: 0.54rem 0;
`
const Subtotal = styled.span`
    font-weight: bold;
    margin: 0.54rem 0;
`


const Footer = (props) => {
    const navigate = useNavigate()
    const headers = UseAuth()
    const [pedido, setPedido] = useState({})
    const [active, setActive] = useState(false)

    useEffect(() => {
        getActiveOrder()
    }, [])

    const getActiveOrder = () => {
        axios.get(baseURL + '/active-order', headers)
            .then(response => {
                
                setPedido(response.data.order)
                setActive(response.data.order)
            })
            .catch(error => {
                
                setActive(false)
            })
    }

    return (
        <MainContainerFooter>
            <ActiveOrder active={props.home && active}>
                <ImgClock src={clock} />
                <InfoOrder>
                    <PedidoEmAndamento>
                        Pedido em andamento
                    </PedidoEmAndamento>
                    <span>{pedido && pedido.restaurantName}</span>
                    <Subtotal>
                        SUBTOTAL {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido && pedido.totalPrice)}
                    </Subtotal>
                </InfoOrder>
            </ActiveOrder>
            <NavBar>
                <HomeIcon
                    onClick={() => goToHome(navigate)}
                    sx={{ fontSize: "5vh", color: "#adadad" }}
                />
                <ShoppingCartIcon
                    onClick={() => goToCarrinho(navigate)}
                    sx={{ fontSize: "5vh", color: "#adadad" }}
                />
                <PersonIcon
                    onClick={() => goToPerfil(navigate)}
                    sx={{ fontSize: "5vh", color: "#adadad" }}
                />
            </NavBar>
        </MainContainerFooter>
    )
}

export default Footer