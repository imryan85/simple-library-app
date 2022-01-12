import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import useAuth from './hooks/useAuth'

const Layout = ({ maxWidth, children }) => {
  const { token } = useAuth();

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <Container maxWidth={maxWidth} sx={{ p: 4 }}>
        {
          token && (
            <>
              <Link href="/" sx={{ pr: 2 }}>Carousel Page</Link>
              <Link href="/admin">Admin Page</Link>
            </>
          )
        }
        {children}
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
