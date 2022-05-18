import React, { useEffect } from "react";
import { UseAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../baseurl/Baseurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, CardContent, Toolbar, Typography } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Linha } from "./style";

export default function Perfil() {
  const auth = UseAuth();
  const navigate = useNavigate();
  const [form, onChange] = useForm({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const getAddress = () => {
    axios
      .get(`${BASE_URL}/profile/address`, auth)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log("Error tente novamente");
      });
  };

  const getProfile = () => {
    axios
      .get(`${BASE_URL}/profile`, auth)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log("Erro carai", err.response);
      });
  };

  useEffect(() => {
    getAddress();
    getProfile();
  }, []);

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
            sx={{ fontSize: 14, display: "flex", flexDirection: "column" }}
            gutterBottom
          >
            Word of the Day
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            adjective
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            adjective
          </Typography>
        </div>

        <CreateOutlinedIcon />
      </CardContent>

      <CardContent
        sx={{
          boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.50)",
          height: "4.75rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            sx={{ fontSize: 14, display: "flex", flexDirection: "column" }}
            gutterBottom
          >
            Endereço cadastrado
          </Typography>

          <Typography
            sx={{ mb: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            adjective
          </Typography>
        </div>

        <CreateOutlinedIcon />
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
        <Linha></Linha>
      </div>
    </div>
  );

}



