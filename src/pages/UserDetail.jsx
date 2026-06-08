import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ApiError, apiRequest } from "../utils/api";

function formatDate(value) {
  if (!value) {
    return "No disponible";
  }

  return new Date(value).toLocaleString();
}

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await apiRequest(`/users/${id}`);
        setUser(data);
      } catch (requestError) {
        if (requestError instanceof ApiError && requestError.status === 401) {
          navigate("/", {
            replace: true,
            state: { message: "Tu sesion expiro o no es valida. Inicia sesion de nuevo." },
          });
          return;
        }

        setError(requestError.message || "Error al obtener el detalle del usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate("/users")}>
          Regresar a usuarios
        </Button>

        <Typography variant="h4" gutterBottom>
          Detalle del usuario
        </Typography>

        {loading && <Alert severity="info">Cargando detalle del usuario...</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && user && (
          <Paper sx={{ p: 3 }}>
            <Box display="grid" gap={1}>
              <Typography variant="h6">{user.name || "Sin nombre"}</Typography>
              <Typography>Usuario: {user.username}</Typography>
              <Typography>ID dinamico de la URL: {id}</Typography>
              <Typography>Creado: {formatDate(user.createdAt)}</Typography>
              <Typography>Actualizado: {formatDate(user.updatedAt)}</Typography>
            </Box>
          </Paper>
        )}

        {!loading && !error && !user && (
          <Alert severity="warning">Usuario no encontrado</Alert>
        )}
      </Container>
    </>
  );
}

export default UserDetail;
