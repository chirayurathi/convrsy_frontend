import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {Link as RouterLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { login } from '../api/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const {state, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSuccess = (response)=>{
    console.log(response.data.data);
    localStorage.setItem("access",response.data.data.access_token);
    instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.access_token}`;
    dispatch({
        type:"LOGIN_SUCCESS",
        payload:{
            ...response.data.data,
            access:response.data.data.access_token
        }
    });
    toast.success("Logged In Successfully.");
    navigate('/dashboard');
  }

  const onChangeHandle = (index, value) => {
    let _formData = { ...formData };
    _formData[index] = value;
    setFormData(_formData);
  };

  const handleSubmit = (event) => {
        login(formData, onSuccess);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e)=>{onChangeHandle("email",e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e)=>{onChangeHandle("password",e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}