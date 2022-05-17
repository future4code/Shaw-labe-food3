import React from "react"
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"


const CardRestauranteCompleto = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://firebasestorage.googleapis.com/v0/b/missao-newton.appspot.com/o/futureFoodsRestaurants%2Fhabibs.jpg?alt=media&token=a30ea547-3a3b-4e80-b58e-b8dc976697de"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nome do Restaurante
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant="body2" color="text.secondary">
                50 - x min
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frete R$x,00
              </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                  Endereço
              </Typography>
            </CardContent>
        </Card>
    )
}

export default CardRestauranteCompleto