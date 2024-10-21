import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Blog from './Components/CreateBlog/Blog';
import BlogContent from './Components/CreateBlog/BlogPage';
import LoginRegister from './Components/Login/LoginRegister';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginRegister onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={<LandingPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
          />
          {/* Pass isLoggedIn and handleLogout to Blog component */}
          <Route
            path="/CreateBlog"
            element={isLoggedIn ? <Blog isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/BlogPage/:id" element={<BlogContent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
