import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import LandingPage from './Components/LandingPage/LandingPage';
import Blog from './Components/CreateBlog/Blog';
import BlogContent from './Components/CreateBlog/BlogPage';
import LoginRegister from './Components/Login/LoginRegister';
import MyBlogs from './Components/MyBlogs/MyBlogs';
import BlogPage from './Components/CreateBlog/BlogPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogs,setBlogs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
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
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllBlogs(); 
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
            element={<LandingPage blogs={blogs} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
          />
          {/* Pass isLoggedIn and handleLogout to Blog component */}
          <Route
            path="/CreateBlog"
            element={isLoggedIn ? <Blog isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/BlogPage/:id" element={<BlogPage blogs={blogs} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path='/my-blogs' element={<MyBlogs isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
