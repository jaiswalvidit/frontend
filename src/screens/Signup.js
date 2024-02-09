import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './Signup.css'; // Make sure to create Signup.css for your styles
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
      passwordStrength:
        name === 'password'
          ? checkPasswordStrength(value)
          : prevCredentials.passwordStrength,
      phoneError: name === 'phone' ? checkMobileNumber(value) : prevCredentials.phoneError,
    }));
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    const isStrong = passwordRegex.test(password);
    setPasswordStrength(isStrong);
    return isStrong ? 'strong' : 'weak';
  };

  const checkMobileNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone) ? '' : 'Mobile number must be 10 digits';
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.phoneError) {
      alert('Please correct the form errors before submitting.');
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
    toast.success('Data updated successfully....');

    if (json.success) {
      localStorage.setItem('user_credentials', JSON.stringify(credentials));
      navigate('/auth/login');
    }
  };

  return (
    <div className="container  my-5  mx-auto text-center  d-flex justify-content-center">
      <div className="">
        <div className="">
          <div className="card  text-info d-flex justify-content-center">
            <div className="card-body">
              <h1 className="text-center mb-4 mx-auto">Signup Page</h1>
              <form onSubmit={handleSubmit}>
                <div className="form mb-3">
                  <input
                    type="text"
                    className="text-box"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                </div>

                <div className="form mb-3 ">
                  <input
                    type="text"
                    className="text-box"
                    id="email"
                    name="email"
                    placeholder=''
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>

                <div className="form mb-3">
                  <input
                    type='password'
                    className={`text-box ${passwordStrength ? 'is-valid' : 'is-invalid'}`}
                    id="password"
                    name="password"
                    placeholder=''
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  {passwordStrength && (
                    <div className="valid-feedback">{credentials.passwordMessage}</div>
                  )}
                  {!passwordStrength && (
                    <div className="invalid-feedback">{credentials.passwordMessage}</div>
                  )}
                </div>

                <div className="form mb-3">
                  <input
                    type='password'
                    className="text-box"
                    id="confirmPassword"
                    placeholder=''
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm 
                  </label>
                </div>

                <div className="form mb-3">
                  <input
                    type="text"
                    className={`text-box ${credentials.phoneError ? 'is-invalid' : ''} ${
                      credentials.phone ? 'active' : ''
                    }`}
                    id="phone"
                    name="phone"
                    value={credentials.phone}
                    placeholder=''
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  {credentials.phoneError && (
                    <div className="invalid-feedback">{credentials.phoneError}</div>
                  )}
                </div>

                <div className="form mb-3">
                  <input
                    type="text"
                    className="text-box"
                    id="geolocation"
                    placeholder=''
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="geolocation" className="form-label">
                    Location
                  </label>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                  <Link to="/auth/login" className="btn btn-danger ms-2">
                    Already Signin
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signup;