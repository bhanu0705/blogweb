import React, { useEffect, useState } from "react";
import axios from "axios";
import './MyBlogs.css'; // Ensure this file includes the same styling structure
import Header from "../LandingPage/Header/Header";
import CardSection from "../LandingPage/Cards/CardSection";

const apiUrl = import.meta.env.VITE_API_URL;

const MyBlogs = ({ isLoggedIn ,handleLogout}) => {
    const [myPosts, setMyPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        
        const fetchMyPosts = async () => {
            if (!isLoggedIn) return; // Return early if not logged in

            const email = localStorage.getItem('userEmail'); // Retrieve the email from local storage
            if (!email) {
                setError('Email not found in local storage.');
                return;
            }

            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.get(`${apiUrl}/posts/my-blogs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        email, // Pass the email as a query parameter
                    },
                });
                setMyPosts(response.data); // Store the fetched posts in state
            } catch (error) {
                setError('Error fetching your blogs.'); // Handle errors
                console.error('Error fetching blogs:', error);
            }
        };

        fetchMyPosts(); // Call the function to fetch posts
    }, [isLoggedIn]); // Add isLoggedIn as a dependency

    return (
        <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <div className='my-blogs-container'>
            <h1>My Blogs</h1>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}
            {myPosts.length === 0 ? (
                <p>No blogs found</p> // Message when no blogs are available
            ) : (
                <div className="blogContent">
                    {myPosts.map(post => (
                        <div key={post._id} className="details">
                            <div className="blog-img">
                                <img src={post.imageUrl} alt={post.title} />
                            </div>
                            <h5 className='blog-title'>{post.title}</h5>
                            <div className='mainContent' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                            <small className='author-date'>
                                <span className="user-icon">
                                    <i className="fas fa-user"></i>
                                </span>
                                {post.author} | {new Date(post.date).toDateString()}
                            </small>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
};

export default MyBlogs;
