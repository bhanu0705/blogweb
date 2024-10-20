// App.js
import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Blog from './Components/CreateBlog/Blog';
import BlogContent from './Components/CreateBlog/BlogPage';
import LoginRegister from './Components/Login/LoginRegister';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Manage login state

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true when login is successful
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login state to false on logout
    localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
  };

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  };

  // Call checkLoginStatus on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginRegister onLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route 
            path="/" 
            element={
              <LandingPage 
                isLoggedIn={isLoggedIn} 
                handleLogout={handleLogout} 
              /> 
            } 
          />
          <Route path="/CreateBlog" element={<Blog />} />
          <Route path="/BlogPage/:id" element={<BlogContent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
