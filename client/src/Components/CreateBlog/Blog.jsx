import React from 'react';
import Header from '../LandingPage/Header/Header';
import Footer from '../LandingPage/Footer/Footer';
import CreateBlog from './BlogMain/CreateBlog';

const LandingPage = ({ isLoggedIn, handleLogout }) => {
  return (
    <div>
      {/* Pass isLoggedIn and handleLogout to the Header */}
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <CreateBlog />
      <Footer />
    </div>
  );
};

export default LandingPage;
