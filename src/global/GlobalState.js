import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
    const [carrinho, setCarrinho] = useState([])

    const updateCarrinho = (id, quantidade) => {
        const novoCarrinho = [...carrinho]
        if(novoCarrinho.some(produto => produto.id === id)){
            const index = novoCarrinho.findIndex(produto => produto.id === id)
            const novoProduto = { id: id, quantity: quantidade}
            quantidade ? novoCarrinho.splice(index, 1, novoProduto) : novoCarrinho.splice(index, 1)
        } else {
            novoCarrinho.push({ id: id, quantity: quantidade})
        }
        setCarrinho(novoCarrinho)
    }

    const states = {carrinho}

    return (
        <GlobalStateContext.Provider value={{states, updateCarrinho}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState