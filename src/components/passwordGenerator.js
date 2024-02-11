import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('https://backend-k4dp.onrender.com/api/sendotp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setOtpSent(true);
      } else {
        setError('Failed to send OTP');
      }
    } catch (err) {
      setError('Some error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("https://backend-k4dp.onrender.com/api/verifyotp", {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setUserToken(data.userToken); // Set the token received from the response
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please enter both new password and confirm password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('https://backend-k4dp.onrender.com/api/auth/userdata', {
        method: 'PATCH',
        body: JSON.stringify({ password: newPassword }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}` // Send the token in the Authorization header
        }
      });
      if (response.ok) {
        console.log('Password updated successfully');
        navigate('/auth/login');
      } else {
        setError('Failed to update password');
      }
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {!otpVerified && !otpSent && (
                <form onSubmit={handleEmailSubmit}>
                  <div className="form-group">
                    <label>Welcome back,write an email to generate otp </label>
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Send OTP
                  </button>
                </form>
              )}
              {otpSent && !otpVerified && (
                <form onSubmit={handleVerifyOtp} className="mt-3">
                  <div className="form-group">
                    <label>OTP</label>
                    <p>Otp has been sent to {email}</p>
                    <input type="number" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Verify OTP
                  </button>
                </form>
              )}
              {otpVerified && (
                <form onSubmit={handlePasswordSubmit} className="mt-3">
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
