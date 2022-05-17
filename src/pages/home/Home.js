import React from "react";
import CardProduto from "../../components/CardProduto";
import CardRestaurante from "../../components/CardRestaurante";

export default function Home (){
    return(
        <div>
            <h1>Home</h1>
            <CardRestaurante/>
            <CardProduto/>
        </div>
    )
}