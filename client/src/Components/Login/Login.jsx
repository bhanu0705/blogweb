import React, { useState } from 'react';
import './Login.css'; // Keep the same CSS file for simplicity

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  });

  // Store user info from local storage if it exists
  const storedUser = localStorage.getItem('user');  
  const [loggedInUser, setLoggedInUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Assuming successful login (normally you would check login credentials with a server)
    if (loginData.email && loginData.password) {
      const user = {
        email: loginData.email,
      };
      // Save the logged-in user info in local storage
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedInUser(user); // Update state with logged-in user info
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Normally, you'd handle user registration by sending data to a server
    if (registerData.password === registerData.confirmPassword) {
      console.log('User registered:', registerData);
      setIsLogin(true); // After successful registration, switch to login view
    } else {
      alert('Passwords do not match.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    setLoggedInUser(null); // Clear user state
  };

  return (
    <>
      <div className="top-bar">
        <img src="https://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png" alt="Logo" className="logo" />
      </div>
      
      <div className="login-register">
        {loggedInUser ? (
          <div className="welcome-page">
            <h1>Welcome, {loggedInUser.email}</h1>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          isLogin ? (
            <div className="login">
              <h1>Login Page</h1>
              <form onSubmit={handleLoginSubmit} className="login-form">
                <input
                  type="text"
                  name="email"
                  placeholder="User ID / Email ID"
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
                  name="fullName"
                  placeholder="Full Name"
                  value={registerData.fullName}
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
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={registerData.mobile}
                  onChange={handleRegisterChange}
                  required
                />
                <button type="submit" className="register-btn">Register</button>
              </form>
              <div className="login-footer">
                <a onClick={() => setIsLogin(true)} className="login-link">Back to Login</a>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default LoginRegister;
