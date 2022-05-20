import { AppBar,Paper } from '@mui/material'
import react from 'react'
import styled from 'styled-components'


export const AppBarr = styled(AppBar) `
display: flex;
justify-content: space-around;
text-align: center;
border-bottom-color: black;
color: black;
p{
    margin: 0 0 0 40vw;
    font-family: Roboto-Regular;
    font-size: 1.3rem;

}
`


export const MainContainerHome = styled.div `
    scroll-behavior: none;
`
export const DivCards = styled.div `
      width: auto;
      height: 36vh;
      margin: 0 1.45rem 0;
      /* padding: 0 0 2rem;
      border-radius: 8px;
      border: solid 1px var(--greyish); */
`

export const Filtro = styled.div `

    display: flex;

    width: 22.5rem;
    height: 2.625rem;
    margin: 0.5rem 0 0;
    padding: 0.75rem 0 0 1rem;
    

    overflow-x: scroll;
    ::-webkit-scrollbar-thumb {
      background: transparent;
      height:0px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    
    p{
        width: 5.438rem;
        height: 1.125rem;
        margin: 0 0.5rem;
        font-family: Roboto;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        text-align: center;
        color: "black";
    }
`

export const Papel = styled(Paper)`
display: flex;
width: 21rem;
height: 3.5rem ;
justify-content: center;
margin-top: 10px;
margin-left: 20px;
margin-bottom: 10px;
align-items: center;
border-radius: 2px;
`