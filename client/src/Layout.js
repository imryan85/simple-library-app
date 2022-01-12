import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuth from './hooks/useAuth'

const Layout = ({ maxWidth, children }) => {
  const { token } = useAuth();

  const theme = createTheme({
    palette: {
      background: {
        default: "#ADD8E6",
      },
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <AppBar position="static" elevation={0} style={{ background: '#ffffff', color: '#000000de' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simple-Library-App
          </Typography>
          {
            token && (
              <Button color="inherit">Sign Out</Button>
            )
          }          
        </Toolbar>
      </AppBar>
      <Container maxWidth={maxWidth} sx={{ p: 4 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
