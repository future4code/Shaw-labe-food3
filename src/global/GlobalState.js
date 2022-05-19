import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
    const [carrinho, setCarrinho] = useState([])
    const [restaurante, setRestaurante] = useState(-1)

    const updateCarrinho = (product, quantity, restaurant, newCart = false) => {
        const novoCarrinho = newCart? [] : [...carrinho]
        if(novoCarrinho.some(produto => produto.produto.id === product.id)){
            const index = novoCarrinho.findIndex(produto => produto.produto.id === product.id)
            const novoProduto = { produto: product, quantity: quantity}
            quantity ? novoCarrinho.splice(index, 1, novoProduto) : novoCarrinho.splice(index, 1)
        } else {
            novoCarrinho.push({ produto: product, quantity: quantity})
        }
        setCarrinho(novoCarrinho)
        setRestaurante(restaurant)
    }

    const states = {carrinho, restaurante}

    return (
        <GlobalStateContext.Provider value={{states, updateCarrinho}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState