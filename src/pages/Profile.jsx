import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Avatar, Box } from "@mui/material";
import { getStoredUser } from "../utils/session";

function Profile() {
  const user = getStoredUser() || {};
  const initial = (user.name || user.username || "U").charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ padding: 4 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 60, height: 60 }}>{initial}</Avatar>

            <Box>
              <Typography variant="h5">{user.name || "Usuario"}</Typography>
              <Typography color="text.secondary">{user.username}</Typography>
            </Box>
          </Box>

          <Typography sx={{ mt: 3 }}>
            Esta informacion viene del usuario que inicio sesion por medio de la API.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Profile;
