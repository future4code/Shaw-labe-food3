import React, { useState, useEffect } from "react";
import CardProduto from "../../components/CardProduto";
import CardRestaurante from "../../components/CardRestaurante";
import api from "../../Services/api";
import { UseAuth } from "../../hooks/useAuth";
import AppBar from '@mui/material/AppBar'
import { goToBusca, voltar } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Toolbar, tabsClasses, InputBase, IconButton, Divider } from "@mui/material";
import { AppBarr, Filtro, Papel } from "./style"
import { MainContainerHome, DivCards } from "../home/style";
import { fontFamily } from "@mui/material/node_modules/@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from "@material-ui/core";
import Footer from "../../components/Footer"
import { useToken } from "../../hooks/useToken";

export default function Home() {
    useToken()

    const auth = UseAuth()
    const [restaurantes, setRestaurantes] = useState([])
    const [filtragem, setFiltragem] = useState([])
    const navigate = useNavigate()


    const getRestaurantes = () => {
        api
            .get(`restaurants`, auth)
            .then((res) => {
              
                setRestaurantes(res.data.restaurants)
            })
            .catch((err) => { 

             })
    }

    useEffect(() => {
        getRestaurantes()
    }, [])
    useEffect(() => {
        filtrarRestaurante()
    }, [restaurantes])


    const filtrarRestaurante = (id) => {
        if (id === filtragem) {
            setFiltragem("");
        } else {
            setFiltragem(id);
        };
    }

    const filtrarRestaurantes = filtragem ? restaurantes.filter((item) => {
        return item.category === filtragem
    }) : restaurantes

    return (
        <MainContainerHome>

            <AppBarr position="static"
                
            >
                <Toolbar sx={{ backgroundColor: "white", color: "black" }}>
                    <p> Ifuture </p>
                </Toolbar>
            </AppBarr>

            <Papel
                onClick={() => goToBusca(navigate)}
                component="form"
            
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu"
                    onClick={""}>
                    <SearchIcon />
                </IconButton >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Restaurante"
                    inputProps={{ 'aria-label': 'Restaurante' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" />
            </Papel>

            <Tabs
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    }, width: "98vw"
                }}
            >
                < Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Árabe"} onClick={() => filtrarRestaurante("Árabe")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Asiática"} onClick={() => filtrarRestaurante("Asiática")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Hamburguer"} onClick={() => filtrarRestaurante("Hamburguer")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Italiana"} onClick={() => filtrarRestaurante("Italiana")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Sorvetes"} onClick={() => filtrarRestaurante("Sorvetes")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Carnes"} onClick={() => filtrarRestaurante("Carnes")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Baiana"} onClick={() => filtrarRestaurante("Baiana")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Petiscos"} onClick={() => filtrarRestaurante("Petiscos")} />
                <Tab sx={{ color: "black", "&:focus": { color: "red" }, fontSize: "0.8rem" }} label={"Mexicana"} onClick={() => filtrarRestaurante("Mexicana")} />
            </Tabs>

            {
                filtrarRestaurantes.length > 0 ?

                    filtrarRestaurantes.map((item) => {
                        return (
                            <DivCards>
                                <CardRestaurante
                                    restaurante={item}
                                />
                            </DivCards>
                        )
                    })
                    : <p>Carregando...</p>
            }
            <Footer home={true} />
        </MainContainerHome >
    )
}