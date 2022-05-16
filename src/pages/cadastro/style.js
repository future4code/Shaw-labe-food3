import styled from 'styled-components'

export const MainContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin: 50px;

img{
    margin-bottom: 10px;
}

.Paragrafo{
    margin: 10px;
}

input {
    
  width: 20.5rem;
  height: 3.5rem;
  margin: 0.5rem 0 0;
  padding: 1.188rem 3rem 1.188rem 1rem;
  border-radius: 2px;
  border: solid 1px var(--greyish);
  width: 16.5rem;
  height: 1.125rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;  
 
  

}

button {
    
    width: 20.5rem;
    height: 2.625rem;
    padding: 0.75rem 1rem;
    border-radius: 2px;
    background-color: #e8222e;
    font-size: 1rem ;
    border-radius: 3px; 
    border: none;
    color: white;
    }
`