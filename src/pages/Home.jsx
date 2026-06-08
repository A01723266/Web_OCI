import { useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LifecycleDemo from "../components/LifecycleDemo";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUser = user || {};
  const [showLifecycleDemo, setShowLifecycleDemo] = useState(true);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bienvenido {currentUser.name || currentUser.username}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            La aplicacion de React ya esta conectada con la REST API de Express y MongoDB.
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={() => navigate("/users")}>
              Administrar usuarios
            </Button>
            <Button variant="outlined" onClick={() => navigate("/profile")}>
              Ver perfil
            </Button>
          </Box>
        </Paper>

        <Box mt={3}>
          <Button
            variant="outlined"
            onClick={() => setShowLifecycleDemo((value) => !value)}
          >
            {showLifecycleDemo ? "Desmontar componente" : "Montar componente"}
          </Button>
          {showLifecycleDemo && <LifecycleDemo />}
        </Box>
      </Container>
    </>
  );
}

export default Home;
