import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await fetch('https://backend-k4dp.onrender.com/api/sendotp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP with backend
      // Example API call:
      // const response = await fetch('/api/verifyOTP', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, otp }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // if (data.success) {
      //   setOtpVerified(true);
      // } else {
      //   setError('Invalid OTP');
      // }
      setOtpVerified(true); // For demonstration purposes
    } catch (err) {
      setError('Failed to verify OTP');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update password with backend
      await fetch('https://backend-k4dp.onrender.com/api/auth/resetPassword', {
        method: 'PATCH',
        body: JSON.stringify({ email, newPassword }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(email);
      // Redirect to login page after successful password update
      // history.push('/login'); // You need to import useHistory from 'react-router-dom'
      console.log('Password updated successfully'); // Placeholder
      console.log(newPassword);
    } catch (err) {
      setError('Failed to update password');
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {!otpVerified && (
        <form onSubmit={handleEmailSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" disabled={loading}>
            Send OTP
          </button>
        </form>
      )}
      {otpSent && !otpVerified && (
        <form onSubmit={handleVerifyOtp}>
          <label>OTP</label>
          <p>Otp has been sent to registered email address</p>
          <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit px-2" disabled={loading}>
            Verify OTP
          </button>
        </form>
      )}
      {otpVerified && (
        <form onSubmit={handlePasswordSubmit}>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
