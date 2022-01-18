import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from './UserContext';
import useAuth from './hooks/useAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Layout = ({ maxWidth, children }) => {
  const { authUser } = useContext(UserContext);
  const { deleteToken } = useAuth();

  const theme = createTheme({
    palette: {
      background: {
        default: "#eeeeee",
      },
      mode: 'light',
    },
  });

  const signOut = () => {
    deleteToken();
    window.location.reload();
  }

  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{ background: '#ffffff', color: '#000000de' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Simple-Library-App
          </Typography>
          {
            authUser && (
              <>
                <Button component={Link} to="/" color="inherit" sx={{mr: 1 }}>
                  Search
                </Button>
                <Button component={Link} to="/browse" color="inherit" sx={{mr: 1 }}>
                  Browse
                </Button>
                <Button component={Link} to="/bookslended" color="inherit" sx={{mr: 1 }}>
                  Books Lended
                </Button>
                <Button component={Link} to="/cart" color="inherit" sx={{ mr: 1 }}>
                  <ShoppingCartIcon />
                  {
                    authUser.cart.length > 0 && `(${authUser.cart.length})`
                  }
                </Button>
                <Button color="inherit" onClick={signOut} sx={{ mr: 1 }}>
                  Sign Out
                </Button>
              </>
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
