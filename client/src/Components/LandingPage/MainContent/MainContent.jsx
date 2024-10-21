import React from 'react';
import './MainContent.css';
import bloggingIllustration from '../../../assets/blog2.jpg';
import { useNavigate } from 'react-router-dom';

function MainContent({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (isLoggedIn) {
      navigate("/CreateBlog"); // Navigate to the create blog page if logged in
    } else {
      navigate("/login"); // Navigate to the login page if not logged in
    }
  };

  return (
    <main className="main-content">
      <div className="illustration">
        <img src={bloggingIllustration} alt="Blogging Illustration" />
      </div>
      <div className="blogging-content">
        <h1>BLOGGING</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button
          className="read-more-button"
          onClick={handleCreatePost}
        >
          {isLoggedIn ? 'Create Post' : 'Login to Create Post'}
        </button>
      </div>
    </main>
  );
}

export default MainContent;
