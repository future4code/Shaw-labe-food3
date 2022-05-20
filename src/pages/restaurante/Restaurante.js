import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduto from "../../components/CardProduto";
import CardRestauranteCompleto from "../../components/CardRestauranteCompleto";
import Footer from "../../components/Footer";
import { baseURL } from "../../constants/constants";
import { UseAuth } from "../../hooks/useAuth";
import { voltar } from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"
import seta from '../../Img/seta.png'
import { Text } from "./style";

const Restaurante = () => {
    const pathParams = useParams()
    const headers = UseAuth()
    const [restaurante, setRestaurante] = useState({})
    const [categorias, setCategorias] = useState([])
    const [produtos, setProdutos] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getRestaurantDetail()
    }, [])

    useEffect(() => {
        sortCategory()
    }, [restaurante])

    const sortCategory = () => {
        let divisaoPorCategorias = {}
        let divisaoDeCategorias = []
        restaurante.products && restaurante.products.map((product) => {
            if (!divisaoDeCategorias.includes(product.category)) {
                divisaoDeCategorias.push(product.category)
                divisaoPorCategorias = { ...divisaoPorCategorias, [product.category]: restaurante.products.filter((prod) => prod.category === product.category) }
            }
        })
        setProdutos(divisaoPorCategorias)
        setCategorias(divisaoDeCategorias)
    }

    const getRestaurantDetail = () => {
        axios.get(`${baseURL}/restaurants/${pathParams.id}`, headers)
            .then(response => {
                
                setRestaurante(response.data.restaurant)
            })
            .catch(error => {
               
            })
    }

    const displayProdutos = () => {
        return categorias && categorias.map((categoria) => {
            return (
                <Box key={categoria}>
                    <Typography variant="h5" component="div">
                        {categoria}
                    </Typography>
                    {produtos[categoria].map((produto) => {
                        return (
                            <CardProduto key={produto.id} produto={produto} restaurante={pathParams.id} />
                        )
                    })}
                </Box>
            )
        })
    }

    return (
        <Box>

            <AppBar position="static" sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}>                
                <Toolbar sx={{ backgroundColor: "white" }}>                
                    <img src={seta} onClick={() => voltar(navigate)} />
                    <Text>Restaurante</Text>
                </Toolbar>                
            </AppBar>

            <CardRestauranteCompleto restaurante={restaurante} />
            {displayProdutos()}
            <br/><br/><br/><br/>
            <Footer/>
        </Box>
    )
}

export default Restaurante