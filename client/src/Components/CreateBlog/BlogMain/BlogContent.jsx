import React, { useEffect, useState } from 'react';
import './BlogContent.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { cards } from '../../LandingPage/Cards/CardSection';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const BlogContent = () => {
  const { id } = useParams(); // Get the card ID from the route parameter
  const navigate = useNavigate(); // Hook for navigation
  const card = cards.find(card => card.id === parseInt(id, 10)); // Find the specific card by ID
  const [blogContent, setBlogContent] = useState({});
  const [date, setDate] = useState('');
  const userEmail = localStorage.getItem('userEmail');

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${id}`);
      if (response.status === 200) {
        setBlogContent(response.data);
        const createdAt = response.data.date;
        setDate((new Date(createdAt)).toDateString());
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Post not found!');
      } else {
        console.error('Failed to load post!');
      }
      console.error('Error fetching post:', error);
    }
  };

  const deletePost = async () => {
  // Show confirmation dialog
  const confirmed = window.confirm('Are you sure you want to delete this post?');
  if (confirmed) {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`, {
        data: { email: userEmail } // Send the user's email in the request body
      });
      if (response.status === 200) {
        alert('Post deleted successfully!');
        navigate('/'); // Redirect to homepage after deletion
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Error deleting post.');
    }
  }
};

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!blogContent) {
    return <p> NO data found....</p>;
  }

  return (
    <div className='blog-content-container'>
      <div className='blogContent'>
        <div className='details'>
          <div className='blog-img'>
            <img src={blogContent.imageUrl || cards[0].cover} alt="Thumbnail Image" />
          </div>
          <div className='blog-title-bar'>
            <span className='blog-title'><h2>{blogContent.title}</h2></span>
            <span className='icon'>
              <span className="edit-icon">
                <i className="fas fa-edit"></i>
              </span>
              {blogContent.email === userEmail && (
                <span className="delete-icon" onClick={deletePost}>
                  <i className="fas fa-trash"></i>
                </span>
              )}
            </span>
          </div>
          <p className='author-date'>
            <span className="user-icon">
              <i className="fas fa-user"></i>
            </span>
            {blogContent.author} | {date}
          </p>
          <div className='mainContent' dangerouslySetInnerHTML={{ __html: blogContent.content }}></div>
        </div>
      </div>
      <div className='sidebar'>
        <h3>Latest Reads</h3>
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <a href={card.link}>{card.title}</a>
              <p>
                <Link to={card.link}>Read More<span><i className="fa-solid fa-arrow-right"></i></span></Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogContent;
