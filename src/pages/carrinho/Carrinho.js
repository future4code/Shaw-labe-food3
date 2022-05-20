import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProduto from "../../components/CardProduto";
import Footer from "../../components/Footer";
import { baseURL } from "../../constants/constants";
import GlobalStateContext from "../../global/GlobalStateContext";
import { UseAuth } from "../../hooks/useAuth";
import { goToHome } from "../../routes/coordinator";

export default function Carrinho() {
    const navigate = useNavigate()
    const headers = UseAuth()
    const { states, funcs } = useContext(GlobalStateContext)
    const [restaurante, setRestaurante] = useState({})
    const [pagamento, setPagamento] = useState('cash')
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
            console.log(response.data);
            funcs.limpaCarrinho()
            goToHome(navigate)
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

    const getAddress = () => {
        axios.get(`${baseURL}/profile/address`, headers)
        .then(response => {
            console.log(response.data);
            setEndereco(response.data.address)
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
                    {endereco.street}, {endereco.number}
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
                    Frete {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(states.carrinho.length && restaurante.shipping)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>
                        Subtotal
                    </Typography>
                    <Typography>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(states.carrinho.length && calculoSubtotal())}
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={confirmaCompra}>
                <Typography>
                    Forma de pagamento
                </Typography>
                <FormControl>
                    <RadioGroup
                        defaultValue="money"
                        onChange={handleChange}
                        name="forma-de-pagamento"
                    >
                        <FormControlLabel value="money" control={<Radio />} label="Dinheiro" />
                        <FormControlLabel value="creditcard" control={<Radio />} label="Cartão de crédito" />
                    </RadioGroup>
                <Button disabled={!states.carrinho.length} type="submit" variant="contained">Confirmar</Button>
                </FormControl>
                <br/><br/><br/><br/>
            </Box>
            <Footer/>
        </div>
    )
}