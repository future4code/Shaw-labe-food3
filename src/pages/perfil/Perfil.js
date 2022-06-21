import React, { useEffect, useState } from "react";
import { UseAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../baseurl/Baseurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, CardActions, CardContent, Toolbar, Typography } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { ContainerAdress, Linha } from "./style";
import Footer from "../../components/Footer"
import { goToAtualizaEndereco, goToAtualizaPerfil, goToEndereco } from "../../routes/coordinator";
import { useToken } from "../../hooks/useToken";


export default function Perfil() {
  useToken()
  const auth = UseAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({})
  const [history, setHistory] = useState([])


  const getAddress = (event) => {
    axios
      .get(`${BASE_URL}/profile/address`, auth)
      .then((res) => {

      })
      .catch((err) => {
        
      });
  };

  const getProfile = () => {
    axios
      .get(`${BASE_URL}/profile`, auth)
      .then((res) => {
        setPerfil(res.data.user)
       
      })
      .catch((err) => {
       
      });
  };

  useEffect(() => {
    getProfile();
    getHistory();
  }, []);



  const getHistory = () => {
    axios
      .get(`${BASE_URL}/orders/history`, auth)
      .then((res) => {
        setHistory(res.data.orders)
       

      })
      .catch((err) => {
        
      });
  };

  useEffect(() => {
    getHistory();
  }, []);


  const historico = history.map((item) => {
    return (
      <div>


        <CardContent sx={{ width: "20.9rem", height: "6.375", margin: "1rem 1rem 0.5rem", border: "1px solid #B8B8B8", borderRadius: "8px" }}>
          <Typography sx={{ color: "#E8222E", marginBottom: "2px" }} >
            {item.restaurantName}
          </Typography>

          <Typography sx={{ marginBottom: "2px" }}>
            {new Intl.DateTimeFormat('pt-BR').format(item.createdAt)}

          </Typography>
          <Typography sx={{ fontWeight: "bold", marginBottom: "2px" }}>
            SubTotal {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalPrice)}
          </Typography>
        </CardContent>
        <CardActions>

        </CardActions>


      </div>

    )
  })

  return (
    <div>
      <AppBar
        position="static"
        sx={{ boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.25)" }}
      >
        <Toolbar sx={{ backgroundColor: "white" }}>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              backgroundColor: "white",
              border: "none",
              color: "black",
              fontFamily: "Roboto",
              fontSize: "1.1rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            Meu Perfil
          </Typography>
        </Toolbar>
      </AppBar>

      <CardContent
        sx={{
          boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.50)",
          height: "7rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            sx={{ display: "flex", flexDirection: "column" }}
            gutterBottom
          >
            {perfil.name}
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            {perfil.email}
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            {perfil.cpf}
          </Typography>
        </div>

        <CreateOutlinedIcon onClick={() => goToAtualizaPerfil(navigate)} />
      </CardContent>

      <CardContent
        sx={{
          boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.50)",
          height: "7rem",
          display: "flex",
          justifyContent: "space-between"          
        }}
      >
        <div>
          <Typography
            sx={{ fontSize: 14, display: "flex", flexDirection: "column", color: "#A9A9A9" }}
            gutterBottom
          >
            Endereço cadastrado
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: 'column'}}
            >
            {perfil.address}
            
          </Typography>
        </div>
        <CreateOutlinedIcon onClick={() => goToAtualizaEndereco(navigate)} />
        
      </CardContent>

      <div>
        <Typography
          sx={{
            width: "20.5rem",
            height: "1.125rem",
            margin: "1rem 1rem 0.5rem",
          }}
        >
          Histórico de pedidos
        </Typography>
        <Linha />

        {historico}

      </div>
      <Footer />
    </div>
  );

}

