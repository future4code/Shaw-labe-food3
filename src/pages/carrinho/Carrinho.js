import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import CardProduto from "../../components/CardProduto";
import { baseURL } from "../../constants/constants";
import GlobalStateContext from "../../global/GlobalStateContext";

export default function Carrinho() {
    const { states } = useContext(GlobalStateContext)
    const [pagamento, setPagamento] = useState('cash')

    const handleChange = (event) => {
        setPagamento(event.target.value);
      };

    const confirmaCompra = (event) => {
        event.preventDefault()

        // axios.post(`${baseURL}/restaurants/${idRestaurante}/order`)
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
            <Box>
                <Typography>
                    Restaurante
                </Typography>
                <Typography>
                    Rua tibiriba
                </Typography>
                <Typography>
                    30 min
                </Typography>
            </Box>
            {displayProdutosCarrinho}
            <Box>
                <Typography>
                    Frete R$x,00
                </Typography>
                <Box>
                    <Typography>
                        Subtotal
                    </Typography>
                    <Typography>
                        R$y,00
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
        </div>
    )
}