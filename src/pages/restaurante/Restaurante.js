import { Box } from "@mui/material";
import React from "react";
import CardProduto from "../../components/CardProduto";
import CardRestauranteCompleto from "../../components/CardRestauranteCompleto";

const Restaurante = () => {
    return (
        <Box>
            <CardRestauranteCompleto />
            <CardProduto />
        </Box>
    )
}

export default Restaurante