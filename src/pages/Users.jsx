import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ApiError, apiRequest } from "../utils/api";
import { getStoredUser } from "../utils/session";

const initialForm = { name: "", username: "", password: "" };

function Users() {
  const navigate = useNavigate();
  const loggedUser = getStoredUser();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectToLogin = (message) => {
    navigate("/", {
      replace: true,
      state: { message },
    });
  };

  const handleRequestError = (requestError, fallbackMessage) => {
    if (requestError instanceof ApiError && requestError.status === 401) {
      redirectToLogin("Tu sesion expiro o no es valida. Inicia sesion de nuevo.");
      return;
    }

    setError(requestError.message || fallbackMessage);
  };

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (requestError) {
      handleRequestError(requestError, "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const payload = {
          name: form.name,
          username: form.username,
        };

        if (form.password.trim()) {
          payload.password = form.password;
        }

        const updatedUser = await apiRequest(`/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        setUsers(users.map((user) => (user._id === editingId ? updatedUser : user)));
        setSuccess("Usuario actualizado correctamente");
      } else {
        const newUser = await apiRequest("/users", {
          method: "POST",
          body: JSON.stringify(form),
        });

        setUsers([newUser, ...users]);
        setSuccess("Usuario agregado correctamente");
      }

      resetForm();
    } catch (requestError) {
      handleRequestError(requestError, "No se pudo guardar el usuario");
    }
  };

  const handleEdit = (user) => {
    setError("");
    setSuccess("");
    setEditingId(user._id);
    setForm({
      name: user.name || "",
      username: user.username || "",
      password: "",
    });
  };

  const handleCancelEdit = () => {
    setError("");
    setSuccess("");
    resetForm();
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");

    try {
      await apiRequest(`/users/${id}`, {
        method: "DELETE",
      });

      setUsers(users.filter((user) => user._id !== id));

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Usuario eliminado correctamente");
    } catch (requestError) {
      handleRequestError(requestError, "Error al eliminar usuario");
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Usuarios
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {editingId ? "Editar usuario" : "Agregar usuario"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Usuario"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              label={editingId ? "Nueva contrasena (opcional)" : "Contrasena"}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required={!editingId}
            />
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained">
                {editingId ? "Actualizar" : "Guardar"}
              </Button>
              {editingId && (
                <Button type="button" variant="outlined" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Cargando usuarios...
                  </TableCell>
                </TableRow>
              )}

              {!loading && users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Button variant="outlined" onClick={() => handleEdit(user)}>
                        Editar
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        disabled={loggedUser?._id === user._id}
                        onClick={() => handleDelete(user._id)}
                      >
                        {loggedUser?._id === user._id ? "Sesion actual" : "Eliminar"}
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Users;
