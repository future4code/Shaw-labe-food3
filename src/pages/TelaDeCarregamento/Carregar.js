import React from "react";
import { CardFilho, CardPai, Loading } from "./style";
import logo from "../../Img/logo.svg"

export default function Carregar () {
    return(
        <CardPai>
           
            <CardFilho>
                <img src={logo} />
            </CardFilho>
          
           
        </CardPai>
    )
}