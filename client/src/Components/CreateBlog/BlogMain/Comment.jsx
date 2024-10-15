import React from 'react';
import './Comment.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Comment = () => { 
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [commentContent, setCommentContent] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const { id: postID } = useParams();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh
    const commentData = { username: name, comment: commentContent };
    console.log(commentData);

    toast.loading('Submitting...');
    
    try {
      const response = await axios.post(`${apiUrl}/posts/${postID}/comments/`, commentData);
      toast.dismiss();
      toast.success('Submitted successfully!');
      console.log('New Comment:', response.data);
      
      const newComment = {
        username: name,
        comment: commentContent,
        _id: response.data._id, 
        createdAt: new Date().toISOString(), 
        __v: 0
    };

      setComments((prevComments) => [...prevComments, newComment]);

      setName('');
      setEmail('');
      setCommentContent('');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to submit!');
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/${postID}/comments/`);
        setComments(response.data); // Set the fetched comments
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
          <div className='input-row'>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Write your comment here..."
              rows="4"
              cols="50"
              value={commentContent}
              onChange={handleCommentContentChange}
              required
            />
          </div>
          <button type="submit">Post Comment</button>
        </form>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <h4>{comment.username}</h4>
              <p>{comment.comment && typeof comment.comment === 'string' ? comment.comment : comment.Comment}</p>
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