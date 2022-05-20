import { keyframes } from "styled-components";
import styled from "styled-components";

export const CardPai = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #e8222e;
`

export const Loading = keyframes`
to {transform:rotate(360deg);}

`
export const CardFilho = styled.div`
display: flex;
align-items: center;
justify-content: center;
animation-duration: 1s;
animation: ${Loading} 3.6s;
`
