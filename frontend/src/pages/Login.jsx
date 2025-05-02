import React, { useState, useEffect } from 'react';
import { login, resetPassword } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false); // toggle between login/reset
  const [resetData, setResetData] = useState({ email: '', newPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if the token exists
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      setFormData({ email: '', password: '' }); // Reset form data
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Login failed';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(resetData); // expects email + newPassword
      alert('Password reset successfully. You can now log in.');
      setResetMode(false); // Switch back to login mode
      setResetData({ email: '', newPassword: '' }); // Reset reset data
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Password reset failed';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{resetMode ? 'Reset Password' : 'Login'}</h2>

      {resetMode ? (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetData.email}
            onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={resetData.newPassword}
            onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <p>
            Remember your password?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setResetMode(false)}
            >
              Go back to Login
            </span>
          </p>
        </form>
      ) : (
        <>
          <AuthForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isSignup={false}
          />
          {loading && <p>Logging in...</p>}
          <p>
            Don't have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
              Sign up here
            </span>
          </p>
          <p>
            Forgot your password?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setResetMode(true)}>
              Reset it here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
