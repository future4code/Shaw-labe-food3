import React from "react"
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { CardPai } from "../pages/restaurante/style"

const CardRestauranteCompleto = (props) => {
    return (
      <CardPai>
        <Card sx={{ width: "340px"}}>
            <CardMedia
              component="img"
              height="140"
              image={props.restaurante && props.restaurante.logoUrl}
              alt={props.restaurante && props.restaurante.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{color:"#E8222E"}}>
              {props.restaurante && props.restaurante.name}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant="body2" color="text.secondary">
              {props.restaurante && props.restaurante.deliveryTime} min
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frete R${props.restaurante && props.restaurante.shipping},00
              </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
              {props.restaurante && props.restaurante.address}
              </Typography>
            </CardContent>
        </Card>
        </CardPai>
    )
}

export default CardRestauranteCompleto