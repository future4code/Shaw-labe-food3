import React from "react"
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"


const CardProduto = (props) => {
    return (
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={props.produto && props.produto.photoUrl}
            alt={props.produto && props.produto.name}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {props.produto && props.produto.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {props.produto && props.produto.description}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                R${props.produto && props.produto.price},00
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