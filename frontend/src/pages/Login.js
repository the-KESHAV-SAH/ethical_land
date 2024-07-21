import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { post } from '../services/apiEndpoint';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import { Container, Box, TextField, Button, Typography, Tabs, Tab, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Auth = () => {
  const user = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('http://localhost:8000/api/auth/login', { email, password });
      const { data, status } = response;
      if (status === 200) {
        const { user, message, token } = data;
        navigate('/', { replace: true });
        toast.success(message);
        dispatch(SetUser(user));
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
      }
    } catch (error) {
      toast.error('Failed to login. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', { name, email, password });
      toast.success('User successfully registered!');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      await axios.get('http://localhost:4000/sync-google-users');
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('email', result.user.email);
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setIsLogin(newValue === 0);
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Tabs value={isLogin ? 0 : 1} onChange={handleTabChange} variant="fullWidth" sx={{ marginBottom: 2 }}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <Box component="form" onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} sx={{ mt: 1 }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLogin ? 'Log In' : 'Register'}
          </Button>
          {isLogin && (
            <Typography variant="body2" align="center">
              Forgot password?{' '}
              <Link to="/forgotPassword" style={{ color: '#667eea' }}>
                Reset it here
              </Link>
            </Typography>
          )}
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={loginWithGoogle}>
            Continue with Google
          </Button>
          {!isLogin && (
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#667eea' }}>
                Login here
              </Link>
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
