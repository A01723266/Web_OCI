import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

const Login = ({ onLogin }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        const isValid = onLogin(username, password)
        if (isValid) {
            setError('')
            navigate('/profile', { replace: true })
            return
        }

        setError('Debes ingresar usuario y contrasena para continuar.')
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                px: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 3,
                    textAlign: 'left',
                }}
            >
                <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
                    Iniciar sesion
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    Ingresa tus credenciales para acceder a tu perfil.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                        label="Nombre de usuario"
                        variant="outlined"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Contrasena"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Iniciar sesion
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login