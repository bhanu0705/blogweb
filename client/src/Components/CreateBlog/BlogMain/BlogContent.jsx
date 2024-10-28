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
  const [showEditModal, setShowEditModal] = useState(false); // State to show or hide modal
  const [updatedContent, setUpdatedContent] = useState({
    title: '',
    content: ''
  });
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

  const handleEditClick = () => {
    setUpdatedContent({
      title: blogContent.title,
      content: blogContent.content
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
console.log("API URL:", apiUrl);
console.log("Editing Post URL:", `${apiUrl}/posts/${id}`);

    try {
      const response = await axios.put(`${apiUrl}/posts/${id}`, updatedContent);
      if (response.status === 200) {
        alert('Post edited successfully!');
        setBlogContent(updatedContent); // Update the local state with the new content
        setShowEditModal(false); // Close modal after submission
        navigate('/my-blogs'); // Redirect to my-blogs after editing
      }
    } catch (error) {
      console.error('Failed to edit post:', error);
      alert('Error editing post.');
    }
  };

  const deletePost = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        const response = await axios.delete(`${apiUrl}/posts/${id}`, {
          data: { email: userEmail } // Send the user's email in the request body
        });
        if (response.status === 200) {
          alert('Post deleted successfully!');
          navigate('/my-blogs'); // Redirect to homepage after deletion
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
    return <p>No data found....</p>;
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
              {blogContent.email === userEmail &&
              <span className="edit-icon" onClick={handleEditClick}>
                <i className="fas fa-edit"></i>
              </span>
              }
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

      {showEditModal && (
        <div className="edit-modal">
          <form onSubmit={handleEditSubmit}>
            <h3>Edit Post</h3>
            <label>
              Title:
              <input
                type="text"
                value={updatedContent.title}
                onChange={(e) => setUpdatedContent({ ...updatedContent, title: e.target.value })}
              />
            </label>

            <label>
              Content:
              <textarea
                value={updatedContent.content}
                onChange={(e) => setUpdatedContent({ ...updatedContent, content: e.target.value })}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default BlogContent;