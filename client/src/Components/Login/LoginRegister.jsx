import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function LoginRegister({onLogin}) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post('http://localhost:5000/login', loginData); // Corrected to '/login'
      console.log(response.data); // Handle success (store token, redirect, etc.)
      onLogin();
      navigate('/'); // Call onLogin to update the login state

    }
     catch (error) {
      console.error('Login failed:'); // Handle error
    }
  };

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    };
    try {
        
        const response = await axios.post('http://localhost:5000/register', registerData); // Corrected to '/login'
        console.log(response.data); // Handle success (store token, redirect, etc.)
        onLogin();
        navigate('/'); // Call onLogin to update the login state

      }
       catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
      }
  };

  return (
    <div className="login-register">
      {isLogin ? (
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <div className="login-footer">
            <a href="#" className="forgot-password">Forgot Password?</a>
            <a onClick={() => setIsLogin(false)} className="register-link">Register</a>
          </div>
        </div>
      ) : (
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={handleRegisterSubmit} className="register-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" className="register-btn">Register</button>
          </form>
          <div className="login-footer">
            <a onClick={() => setIsLogin(true)} className="login-link">Back to Login</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginRegister;