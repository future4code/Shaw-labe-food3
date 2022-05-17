import React from "react"
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"


const CardProduto = () => {
    return (
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg"
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Produto
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Descrição do produto
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                R$x,00
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <Button variant="outlined">adicionar</Button>
          </Box>
        </Card>
    )
}

export default CardProduto