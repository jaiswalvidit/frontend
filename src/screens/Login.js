import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress, Card, Typography } from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('https://backend-k4dp.onrender.com/api/auth/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
  
      const json = await response.json();
  
      if (!json.success) {
        setError('Invalid credentials');
        toast.error('Invalid credentials');
      } else {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        localStorage.setItem('userdetails', JSON.stringify(json));
  
        navigate('/');
        toast.success('Login successful!');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while logging in');
      toast.error('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <Card className="card p-4">
        <Typography variant="h4"  className='text-center text-secondary fs-1'gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              type="email"
              name="email"
              label="Email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: <EmailOutlined />,
              }}
            />
          </div>
          <div className="mb-3">
            <TextField
              type="password"
              name="password"
              label="Password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: <LockOutlined />,
              }}
            />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="mb-3 d-flex justify-content-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Link to="/auth/createuser">
                <Button variant="contained" color="secondary">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password
          </Link>
        </form>
      </Card>
      <ToastContainer/>
    </div>
  );
};

export default Login;
