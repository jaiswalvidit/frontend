import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordGenerator from '../components/passwordGenerator';

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
      } else {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        localStorage.setItem('userdetails', JSON.stringify(json));

        navigate('/');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container-fluid my-5 mx-auto text-center d-flex justify-content-center">
      <div className="card text-secondary">
        <div className="card-body">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="text-box"
                placeholder=""
                id="email"
                autoComplete="off"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <i className="input-icon uil uil-at"></i>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="text-box"
                id="password"
                name="password"
                placeholder=""
                autoComplete="off"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>
            <div className="text-center">
              {loading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="input-added px-2 py-2">
                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/auth/createuser" className="btn btn-danger ms-2">
                  Sign up
                </Link>
              </div>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
