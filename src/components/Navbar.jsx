import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { logout: clearAuthSession } = useAuth();

  const logout = () => {
    clearAuthSession();
    navigate("/", { replace: true });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App React
        </Typography>

        <Button color="inherit" onClick={() => navigate("/home")}>
          Home
        </Button>

        <Button color="inherit" onClick={() => navigate("/users")}>
          Usuarios
        </Button>

        <Button color="inherit" onClick={() => navigate("/profile")}>
          Perfil
        </Button>

        <Button color="inherit" onClick={logout}>
          Cerrar sesion
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
