import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useNavigate,
  Link,
} from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignUp = ({ setToken }) => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState();

  const performSignUp = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        await axios.post('/user/signup', { 
          fullname,
          password,
          email: username, 
        });      
        alert("Sign up was successful");
        navigate("/signin");
      }
    } catch (e) {
      setErrMsg(e.response.data.message);
    }
  }

  const validateForm = () => {
    if (password !== passwordConfirm) {
      setErrMsg("Passwords must be the same");
      return false;
    }
    return true;
  }

  return (
    <Box style={{ display:'flex', justifyContent:'center' }}>      
      <Card elevation={0} style={{ maxWidth: 600 }}>
        <CardContent>
          <form onSubmit={performSignUp} autoComplete="off">
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
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Your Name" 
                  variant="standard"
                  value={fullname} 
                  onChange={e => setFullname(e.target.value)}
                />
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
                <TextField
                  fullWidth
                  label="Confirm Password" 
                  variant="standard"
                  type="password"
                  value={passwordConfirm} 
                  onChange={e => setPasswordConfirm(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" type="submit">
                  Sign Up
                </Button>
                {
                  errMsg && <p>{errMsg}</p>
                }
              </Grid>
              <Grid item xs={8}>
                Already have an account? <Link to="/signin">Sign In</Link> here.
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>      
    </Box>
  );
}

SignUp.propTypes = {
}

export default SignUp;