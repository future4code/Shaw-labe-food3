import { AppBar, Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProduto from "../../components/CardProduto";
import Footer from "../../components/Footer";
import { baseURL } from "../../constants/constants";
import GlobalStateContext from "../../global/GlobalStateContext";
import { UseAuth } from "../../hooks/useAuth";
import { voltar } from "../../routes/coordinator";
import { Botao } from "./style";
import { Linha } from "./style";
import { MainContainerCarrinho } from "./style";
import { goToHome } from "../../routes/coordinator";
import { useToken } from "../../hooks/useToken";

export default function Carrinho() {
    useToken()
    const navigate = useNavigate()
    const headers = UseAuth()
    const { states, funcs } = useContext(GlobalStateContext)
    const [restaurante, setRestaurante] = useState({})
    const [pagamento, setPagamento] = useState('money')
    const [endereco, setEndereco] = useState({})

    useEffect(() => {
        getRestaurantDetail()
        getAddress()
    }, [])

    const handleChange = (event) => {
        setPagamento(event.target.value);
    };

    const confirmaCompra = (event) => {
        event.preventDefault()

        let itens = []
        states.carrinho.map(item => {
            itens.push({ id: item.produto.id, quantity: item.quantidade })
        })
        const body = {
            products: itens,
            paymentMethod: pagamento
        }
             
        axios.post(`${baseURL}/restaurants/${restaurante.id}/order`, body, headers)
        .then(response => {
            
            funcs.limpaCarrinho()
            goToHome(navigate)
        })
        .catch(error => {
            
        })
    }

    const getRestaurantDetail = () => {
        states.carrinho.length && axios.get(`${baseURL}/restaurants/${states.restaurante}`, headers)
            .then(response => {
                
                setRestaurante(response.data.restaurant)
            })
            .catch(error => {
                
            })
    }

    const getAddress = () => {
        axios.get(`${baseURL}/profile/address`, headers)
        .then(response => {
            
            setEndereco(response.data.address)
        })
        .catch(error => {
            
        })
    }

    const calculoSubtotal = () => {
        let subtotal = 0
        states.carrinho.map(item => {
            subtotal = subtotal + Number(item.quantidade) * Number(item.produto.price)
        })
        subtotal += restaurante.shipping
        return subtotal
    }

    const displayProdutosCarrinho = states.carrinho && states.carrinho.map(prod => {
        return (
            <CardProduto key={prod.produto.id} produto={prod.produto} quantidade={prod.quantidade} />
        )
    })

    return (
        <div>

            <AppBar
                position="static"
                sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}
            >
                <Toolbar sx={{ backgroundColor: "white" }}>
                    <Typography
                        component="div"
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            border: "none",
                            color: "black",
                            fontFamily: "Roboto",
                            fontSize: "1.1rem",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}
                    >
                        <strong>Meu Carrinho</strong>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ backgroundColor: " #eeeeee", pb: "4vw", pt: "2vh" }}>
                <Typography sx={{ color: "#B8B8B8", ml: "4vw" }}>
                    Endereço de entrega
                </Typography>

                <Typography sx={{ ml: "4vw"}}>
                     {endereco.street}, {endereco.number}
                </Typography>
            </Box>
            <MainContainerCarrinho>
                <Box sx={{ display: states.carrinho.length ? 'block' : 'none' }}>
                    <Typography sx={{ color: "#E8222E" }}>
                    <strong> {restaurante.name} </strong>
                    </Typography>
                    <Typography sx={{ color: "#B8B8B8" }}>
                        {restaurante.address}
                    </Typography>
                    <Typography sx={{ color: "#B8B8B8" }}>
                        {restaurante.deliveryTime} min
                    </Typography>
                </Box> 
                <Box sx={{ display: states.carrinho.length ? 'none' : 'block', pt: "5vw" }}>
                    <Typography sx={{ display: 'flex', justifyContent: "center", mt:"8px", mb:"30px" }}>
                        Carrinho vazio
                    </Typography>
                </Box>
                {displayProdutosCarrinho}
                <Box>
                    <Typography sx={{ display: 'flex', justifyContent: "flex-end" }}>
                          Frete {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(states.carrinho.length && restaurante.shipping)}

                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>
                        <strong> SUBTOTAL </strong>
                        </Typography>
                        <Typography sx={{ color: "#E8222E" }}>
                            <strong>R${states.carrinho.length && calculoSubtotal()},00</strong>
                        </Typography>
                    </Box>
                    <br/>
                </Box>
                <Box component='form' onSubmit={confirmaCompra}>
                    <Typography>

                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(states.carrinho.length && calculoSubtotal())}

                    </Typography>
                    <Linha />
                    <FormControl>
                        <RadioGroup
                            defaultValue="money"
                            onChange={handleChange}
                            name="forma-de-pagamento"
                        >

                            <FormControlLabel value="money" control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />} label="Dinheiro" />
                            <FormControlLabel value="creditcard" control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />} label="Cartão de crédito" />
                        </RadioGroup>
                        <Botao type="submit" variant="contained">Confirmar</Botao>
                    </FormControl>
                    <br /><br /><br /><br />
                </Box>
            </MainContainerCarrinho>
                <Footer />
        </div >
    )
}