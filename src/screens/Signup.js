import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    geolocation: '',
  });
  

  const [passwordStrength, setPasswordStrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    if (name === 'phone') {
      setPhoneError(checkMobileNumber(value));
    }
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    setPasswordStrength(passwordRegex.test(password));
  };

  const checkMobileNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone) ? '' : 'Mobile number must be 10 digits';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (phoneError) {
      toast.error('Please correct the phone number');
      return;
    }

    const response = await fetch('https://backend-k4dp.onrender.com/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('user_credentials', JSON.stringify(credentials));
      toast.success('Signup successful');
      navigate('/auth/login');
    } else {
      toast.error(json.message || 'Signup failed');
    }
  };

  return (
    <Box className="container my-5 d-flex justify-content-center">
      <Paper elevation={3} sx={{ maxWidth: 400, p: 4, borderRadius: 2, bgcolor: '#f0f0f0' }}>
        <Typography variant="h1"  className='text-center text-secondary fs-1'gutterBottom sx={{ color: '#333333' }}>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            fullWidth
            autoComplete='off'
            required
            margin="normal"
            sx={{ bgcolor: '#ffffff' }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{ bgcolor: '#ffffff' }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={!passwordStrength && credentials.password.length > 0}
            helperText={!passwordStrength ? "Password is weak" : "Password is strong"}
            fullWidth
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: '#ffffff' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{ bgcolor: '#ffffff' }}
          />
          <TextField
            label="Phone"
            type="text"
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
            error={!!phoneError}
            helperText={phoneError}
            fullWidth
            required
            margin="normal"
            sx={{ bgcolor: '#ffffff' }}
          />
          <TextField
            label="Location"
            type="text"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{ bgcolor: '#ffffff' }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            <Button variant="submit" color="secondary" className='center p-2' component={Link} to="/auth/login">
              Already have an account?
            </Button>
          </Box>
        </form>
      </Paper>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Signup;
