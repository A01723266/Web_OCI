import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bienvenido {user.name || user.username}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            La aplicación de React ya está conectada con la REST API de Express y MongoDB.
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
      </Container>
    </>
  );
}

export default Home;
