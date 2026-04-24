import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";
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

function Users() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al obtener usuarios");
      }

      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al crear usuario");
      }

      setUsers([...users, data]);
      setForm({ name: "", username: "", password: "" });
      setSuccess("Usuario agregado correctamente");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al eliminar usuario");
      }

      setUsers(users.filter((user) => user._id !== id));
      setSuccess("Usuario eliminado correctamente");
    } catch (error) {
      setError(error.message);
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
            Agregar usuario
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
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained">
              Guardar
            </Button>
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
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell align="right">
                    <Button color="error" variant="outlined" disabled={loggedUser?._id === user._id} onClick={() => handleDelete(user._id)}>
                      {loggedUser?._id === user._id ? "Sesión actual" : "ELIMINAR"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
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
