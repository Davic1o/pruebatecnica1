import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginAxios from '../data/LoginAxios'; // Asegúrate de que la ruta sea correcta

const theme = createTheme();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await LoginAxios.InicioSession({
        username,
        password,
      });

      setError(''); // Limpiar errores previos

      // Verifica la respuesta del servidor
      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', response.data);
        // Aquí puedes redirigir al usuario a otra página
        // Ejemplo: history.push('/dashboard');
      } else {
        handleServerError(response.status);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al comunicarse con el servidor');
    }
  };

  const handleServerError = (status) => {
    switch (status) {
      case 400:
        setError('Contraseña incorrecta');
        break;
      case 401:
        setError('Campos requeridos no enviados');
        break;
      case 402:
        setError('Existe otro token activo');
        break;
      case 403:
        setError('Usuario bloqueado');
        break;
      case 404:
        setError('Usuario no encontrado');
        break;
      default:
        setError('Error en el servidor');
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* Puedes agregar un ícono aquí */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
