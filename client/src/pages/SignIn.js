import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState();

  const performSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('/user/signin', { email: username, password });     
      const { token, authUser } = res.data; 
      setToken(token, authUser);
      navigate('/');
    } catch (e) {
      setErrMsg(e.response.data.message);
    }
  }

  return (
    <Box style={{ display:'flex', justifyContent:'center' }}>
      <Card elevation={0} style={{ maxWidth: 600 }}>
        <CardContent>
          <form onSubmit={performSignIn} autoComplete="off">
            <Grid 
              sx={{ pt: 2 }}
              container 
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={8}>            
                <Typography variant="h4" gutterBottom component="div">
                  Sign In
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Username" 
                  variant="standard"
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Password" 
                  variant="standard"
                  type="password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" type="submit">
                  Sign In
                </Button>
                {
                  errMsg && <p>{errMsg}</p>
                }
              </Grid>
              <Grid item xs={8}>
                Don't have an account? <Link to="/signup">Sign Up</Link> here.
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>   
  );
}

SignIn.propTypes = {
}

export default SignIn;