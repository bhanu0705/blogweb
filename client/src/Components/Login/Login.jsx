import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onLogin = () => {
    console.log('Login successful');
    // Perform any additional actions on login success (e.g., setting auth state)
  };
  const handleLogin =async (e) => {
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
    

    // Basic validation (you can improve this)
    
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleLoginChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;