import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CardProduto from "../../components/CardProduto";
import Footer from "../../components/Footer";
import { baseURL } from "../../constants/constants";
import GlobalStateContext from "../../global/GlobalStateContext";
import { UseAuth } from "../../hooks/useAuth";

export default function Carrinho() {
    const headers = UseAuth()
    const [restaurante, setRestaurante] = useState({})
    const { states } = useContext(GlobalStateContext)
    const [pagamento, setPagamento] = useState('cash')

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
            <Box>
                <Typography>
                    Endereço de entrega
                </Typography>
                <Typography>
                    Rua tralala
                </Typography>
            </Box>
            <Box sx={{ display: states.carrinho.length ? 'block' : 'none'}}>
                <Typography>
                    {restaurante.name}
                </Typography>
                <Typography>
                    {restaurante.address}
                </Typography>
                <Typography>
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
                <Typography>
                    Frete R${restaurante.shipping},00
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>
                        Subtotal
                    </Typography>
                    <Typography>
                        R${states.carrinho.length && calculoSubtotal()},00
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={confirmaCompra}>
                <Typography>
                    Forma de pagamento
                </Typography>
                <FormControl>
                    <RadioGroup
                        defaultValue="cash"
                        onChange={handleChange}
                        name="forma-de-pagamento"
                    >
                        <FormControlLabel value="cash" control={<Radio />} label="Dinheiro" />
                        <FormControlLabel value="creditcard" control={<Radio />} label="Cartão de crédito" />
                    </RadioGroup>
                <Button type="submit" variant="contained">Confirmar</Button>
                </FormControl>
            </Box>
            <Footer/>
        </div>
    )
}