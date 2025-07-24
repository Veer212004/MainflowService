import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import {  useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  function handleclick(){
    navigate('/');
  }
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-title">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
            required
          />
          <div className="input-highlight"></div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your password"
            required
          />
          <div className="input-highlight"></div>
        </div>
       
        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading} 
        >
          {isLoading ? '' : 'Sign In'}
        </button>
      </form>
      
      <div className="form-link">
        <p>Don't have an account? <button onClick={handleclick}>Go-to-Signup</button></p>
         
      </div>
    </div>
  );
}

export default Login;

