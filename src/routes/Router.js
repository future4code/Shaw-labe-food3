import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Cadastro from "../pages/cadastro/Cadastro"
import Endereco from "../pages/endereco/Endereco"
import Pedido from "../pages/pedido/Pedido"
import Perfil from "../pages/perfil/Perfil"
import Carrinho from "../pages/carrinho/Carrinho"
import Busca from "../pages/busca/Busca"
import Login from "../pages/login/Login"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index  element={<Home/>} />

                <Route path="/login" element={<Login/>} />

                <Route path="/cadastro" element={<Cadastro/>} />

                <Route path="/endereco" element={<Endereco/>} />

                <Route path="/pedido" element={<Pedido/>} />

                <Route path="/perfil" element={<Perfil/>} />

                <Route path="/carrinho" element={<Carrinho/>} />

                <Route path="/busca" element={<Busca/>} />
                
                
            </Routes>
        </BrowserRouter>
    )
}

