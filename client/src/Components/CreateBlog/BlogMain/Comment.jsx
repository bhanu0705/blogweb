import React, { useState, useEffect } from 'react';
import './Comment.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;
const role = localStorage.getItem('role');

const Comment = ({blogContent}) => { 
  const [name, setName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(null); // Track which comment's options are open
  const { id: postID } = useParams();
  const userEmail = localStorage.getItem("userEmail");

  const handleNameChange = (event) => setName(event.target.value);
  const handleCommentContentChange = (event) => setCommentContent(event.target.value);

  const commentData = { username: name, comment: commentContent };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading('Submitting...');

    try {
      const response = await axios.post(`${apiUrl}/posts/${postID}/comments/`, commentData);
      console.log(comments);
      toast.dismiss();
      toast.success('Submitted successfully!');

      // Add the new comment to the comments list with the ID from the server response
      // setComments((prevComments) => [
      //   ...prevComments, 
      //   {
      //     ...commentData,
      //     _id: response.data._id, 
      //     createdAt: new Date().toISOString()
      //   }
      // ]);

      const newComment = {
        ...commentData,
        _id: response.data._id,
        createdAt: new Date().toISOString()
      };
  
      setComments((prevComments)=>[...prevComments, newComment]);

      console.log(comments);
      setName('');
      setCommentContent('');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to submit!');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (commentID) => {
    try {
      await axios.delete(`${apiUrl}/posts/${postID}/comments/${commentID}`, {
                  data: { role: role , userEmail: userEmail},
                });
      // setComments(comments.filter(comment => comment._id !== commentID));
      setComments((prevComments) => prevComments.filter(comment => comment._id !== commentID));
      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete comment!');
      console.error('Error:', error);
    }
  };


  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/${postID}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    

    fetchComments();
  }, [postID]);

  return (
    <div>
      <div className="comment-box">
        <h2>Leave a Reply</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <textarea
            placeholder="Write your comment here..."
            rows="4"
            value={commentContent}
            onChange={handleCommentContentChange}
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
      
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <img 
                src="https://cdn.vectorstock.com/i/500p/39/32/silhouette-of-a-mans-head-with-picture-the-m-vector-3013932.avif"
                alt="Profile"
                className="profile-image"
              />
              <div className="comment-content">
                <h4>{comment.username}</h4>
                <p>{comment.comment}</p>
                
                <div className="options-container">
                {(blogContent.email == userEmail || role === "admin" ) && (

                  <span 
                    className="three-dots" 
                    onClick={() => setShowOptions(showOptions === comment._id ? null : comment._id)}
                  >
                    ⋮
                  </span>
                  )
                  }
                  {(showOptions === comment._id ) && (
                    <div className="options-menu">
                      <button className="delete-button" onClick={() => handleDelete(comment._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
