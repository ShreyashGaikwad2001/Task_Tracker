import React from 'react';

const AuthForm = ({ formData, setFormData, handleSubmit, isSignup }) => {
  return (
    <form onSubmit={handleSubmit}>
      {isSignup && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
