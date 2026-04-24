import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const cards = [
    { title: 'Estado de cuenta', description: 'Tu cuenta se encuentra activa y sin bloqueos.' },
    { title: 'Ultimo acceso', description: 'Ingreso registrado hoy desde navegador web.' },
    { title: 'Rol', description: 'Usuario estandar con acceso al perfil personal.' },
]

const Profile = ({ username }) => {
    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                    Bienvenido, {username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Esta es tu vista secundaria. Desde aqui puedes revisar informacion general de tu usuario.
                </Typography>
            </Paper>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item xs={12} md={4} key={card.title}>
                        <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Profile