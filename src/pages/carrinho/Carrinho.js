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
import { Botao } from "../endereco/style";
import { Linha } from "../perfil/style";
import { MainContainerCarrinho } from "./style";

export default function Carrinho() {
    const headers = UseAuth()
    const [restaurante, setRestaurante] = useState({})
    const { states } = useContext(GlobalStateContext)
    const [pagamento, setPagamento] = useState('cash')
    const navigate = useNavigate()

    useEffect(() => {
        getRestaurantDetail()
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
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const getRestaurantDetail = () => {
        states.carrinho.length && axios.get(`${baseURL}/restaurants/${states.restaurante}`, headers)
            .then(response => {
                console.log(response.data);
                setRestaurante(response.data.restaurant)
            })
            .catch(error => {
                console.log(error.response);
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

            <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}>
                <Toolbar sx={{ backgroundColor: "white", color: "black", fontFamily: "Roboto" }}>
                    <p><strong>Meu Carrinho</strong></p>
                </Toolbar>
            </AppBar>

                <Box sx={{ backgroundColor: " #eeeeee" }}>
                    <Typography sx={{ color: "#B8B8B8" }}>
                        Endereço de entrega
                    </Typography>
                    <Typography>
                        <strong>Rua tralala</strong>
                    </Typography>
                </Box>
            <MainContainerCarrinho>
                <Box sx={{ display: states.carrinho.length ? 'block' : 'none' }}>
                    <Typography sx={{ color: "#E8222E" }}>
                        {restaurante.name}
                    </Typography>
                    <Typography sx={{ color: "#B8B8B8" }}>
                        {restaurante.address}
                    </Typography>
                    <Typography sx={{ color: "#B8B8B8" }}>
                        {restaurante.deliveryTime} min
                    </Typography>
                </Box>
                <Box sx={{ display: states.carrinho.length ? 'none' : 'block' }}>
                    <Typography>
                        Carrinho vazio
                    </Typography>
                </Box>
                {displayProdutosCarrinho}
                <Box>
                    <Typography sx={{ display: 'flex', textAlign: "left" }}>
                        Frete R${restaurante.shipping},00
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>
                            SUBTATAL
                        </Typography>
                        <Typography sx={{ color: "#E8222E" }}>
                            R${states.carrinho.length && calculoSubtotal()},00
                        </Typography>
                    </Box>
                </Box>
                <Box component='form' onSubmit={confirmaCompra}>
                    <Typography>
                        Forma de pagamento
                    </Typography>
                    <Linha />
                    <FormControl>
                        <RadioGroup
                            defaultValue="cash"
                            onChange={handleChange}
                            name="forma-de-pagamento"
                        >

                            <FormControlLabel value="cash" control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />} label="Dinheiro" />
                            <FormControlLabel value="creditcard" control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />} label="Cartão de crédito" />
                        </RadioGroup>
                        <Botao type="submit" variant="contained">Confirmar</Botao>
                    </FormControl>
                    <br /><br /><br /><br />
                </Box>
                <Footer />
            </MainContainerCarrinho>
        </div >
    )
}