import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
    const [carrinho, setCarrinho] = useState([])

    const updateCarrinho = (id, quantidade) => {
        const novoCarrinho = [...carrinho]
        if(novoCarrinho.some(produto => produto.id === id)){
            const index = novoCarrinho.findIndex(produto => produto.id === id)
            const novoProduto = { id: id, quantity: quantidade}
            novoCarrinho.splice(index, 1, quantidade > 0 && novoProduto)
        } else {
            novoCarrinho.push({ id: id, quantity: quantidade})
        }
        setCarrinho(novoCarrinho)
    }

    return (
        <GlobalStateContext.Provider value={{carrinho, updateCarrinho}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState