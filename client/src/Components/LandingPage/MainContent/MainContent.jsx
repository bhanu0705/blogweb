import React from 'react';
import './MainContent.css';
import bloggingIllustration from '../../../assets/blog2.jpg';
import { useNavigate } from 'react-router-dom';

function MainContent() {
  const navigate=useNavigate();
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
        <button className="read-more-button" onClick={()=>navigate("/CreateBlog")}>Create Post</button>
      </div>
    </main>
  );
}

export default MainContent;
