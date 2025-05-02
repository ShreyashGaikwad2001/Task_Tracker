import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', country: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state for signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    try {
      const res = await signup(formData);
      localStorage.setItem('token', res.data.token);
      setFormData({ name: '', country: '', email: '', password: '' }); // Reset form fields
      navigate('/dashboard'); // Redirect to dashboard on successful signup
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <AuthForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isSignup={true} />
      {loading && <p>Signing up...</p>} {/* Loading state */}
      <p>
        Already have an account?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Signup;
