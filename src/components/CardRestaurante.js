import React from "react"
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { goToRestaurante } from "../routes/coordinator"


const CardRestaurante = (props) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => goToRestaurante(navigate, props.restaurante.id)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.restaurante && props.restaurante.logoUrl}
                    alt={props.restaurante && props.restaurante.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.restaurante && props.restaurante.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            {props.restaurante && props.restaurante.deliveryTime} min
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Frete R${props.restaurante && props.restaurante.shipping},00
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardRestaurante