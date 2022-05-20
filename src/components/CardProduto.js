import React, { useContext, useState } from "react"
import { AppBar, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Modal, OutlinedInput, Select, Toolbar, Typography } from "@mui/material"
import GlobalStateContext from "../global/GlobalStateContext"



const CardProduto = (props) => {
    const [quantidade, setQuantidade] = useState(props.quantidade ? props.quantidade : 0)
    const [addQuantidade, setAddQuantidade] = useState(props.quantidade ? props.quantidade : 0)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { states, updateCarrinho } = useContext(GlobalStateContext)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleChange = (event) => {
        setAddQuantidade(Number(event.target.value));
    };
    const handleAdd = () => {
        if (states.restaurante == props.restaurante || !states.carrinho.length) {
            handleClose()
            setQuantidade(addQuantidade)
            updateCarrinho(props.produto, addQuantidade, props.restaurante)
        } else {
            console.log('handleadd else');
            console.log(states.carrinho);
            handleOpen2()
        }
    }
    const handleConflitoCarrinho = (continuar) => {
        if (continuar) {
            handleClose2()
            handleClose()
            setQuantidade(addQuantidade)
            updateCarrinho(props.produto, addQuantidade, props.restaurante, true)
        } else {
            handleClose2()
            handleClose()
        }
    }

    return (
        
        <Card sx={{mb:"15px", width:"340px", display:"flex"}}>
            
            <CardMedia
                component="img"
                sx={{ width: "120px" }}
                image={props.produto && props.produto.photoUrl}
                alt={props.produto && props.produto.name}
            />
            <Box sx={{ display: 'flex', wordBreak: "break-word", height:"150px" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6" sx={{color:"#E8222E"}}>
                        {props.produto && props.produto.name}
                    </Typography>
                    <Typography sx={{display:"flex"}} variant="body2" color="text.secondary" component="div">
                        {props.produto && props.produto.description}
                    </Typography>
                    <Typography sx={{ fontWeight:"bold" }} >
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.produto && props.produto.price)}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <Button variant="outlined" onClick={handleOpen}>{quantidade ? 'remover' : 'adicionar'}</Button>
                <Button variant="outlined" onClick={handleOpen} sx={{ display: quantidade || 'none' }}>{quantidade}</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Selecione a quantidade desejada</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ minWidth: '17rem' }}>
                                {/* <InputLabel htmlFor="demo-dialog-native">quantidade</InputLabel> */}
                                <Select
                                    native
                                    value={addQuantidade}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addQuantidade ? handleAdd : handleClose }>{quantidade ? 'alterar quantidade' : 'adicionar ao carrinho'}</Button>
                    </DialogActions>
                </Dialog>
                <Dialog disableEscapeKeyDown open={open2} onClose={handleClose2}>
                    <DialogTitle>Seu carrinho não está vazio!</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography>Você tem produtos de outro restaurante em seu carrinho, você deseja limpá-lo e continuar com este pedido aqui?</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleConflitoCarrinho(true)}>Pedir aqui!</Button>
                        <Button onClick={() => handleConflitoCarrinho(false)}>Cancelar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Card>
    )
}

export default CardProduto