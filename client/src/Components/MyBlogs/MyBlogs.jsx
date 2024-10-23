import React, { useEffect, useState } from "react";
import axios from "axios";
import './MyBlogs.css'; 
import Header from "../LandingPage/Header/Header";
import CardSection from "../LandingPage/Cards/CardSection";

const MyBlogs = ({ isLoggedIn, handleLogout }) => {
    const [myPosts, setMyPosts] = useState([]);
    const [error, setError] = useState('');
    const userEmail = localStorage.getItem('userEmail'); // Get the user email from local storage

    // Fetch blogs created by the user
    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!isLoggedIn || !userEmail) return; // If not logged in or no email, exit early

            try {
                const response = await axios.get(`/api/posts/my-blogs`, {
                    params: {
                        email: userEmail, // Pass the email in query parameters
                    },
                });

                setMyPosts(response.data); // Update the posts state with the fetched data
                setError(''); // Reset any previous error
            } catch (err) {
                setError('Error fetching your blogs.'); // Handle error in fetching blogs
                console.error('Error fetching blogs:', err);
            }
        };

        fetchMyPosts(); // Call the function to fetch the user's blogs
    }, [isLoggedIn, userEmail]); // Re-fetch if login status or userEmail changes

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            
            <div className="my-blogs-container">
                <h1>My Blogs</h1>
                
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                
                {myPosts.length > 0 ? (
                    <CardSection blog={myPosts} /> // Render the posts in a CardSection if available
                ) : (
                    <p>No blogs found.</p> // Display a message if no blogs are found
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
