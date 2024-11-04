import React, { useEffect, useState } from "react";
import axios from "axios";
import './MyBlogs.css'; 
import Header from "../LandingPage/Header/Header";
import CardSection from "../LandingPage/Cards/CardSection";
import { cards } from "../LandingPage/Cards/CardSection";
import { useNavigate } from "react-router-dom";
import Comment from "../CreateBlog/BlogMain/Comment";

const apiUrl = import.meta.env.VITE_API_URL

const MyBlogs = ({ isLoggedIn, handleLogout }) => {
    const [myPosts, setMyPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        const fetchMyPosts = async () => {
          const userEmail = localStorage.getItem('userEmail');
            if (!isLoggedIn || !userEmail) return; // If not logged in or no email, exit early

            try {
                const response = await axios.get(`${apiUrl}/posts/my-blogs`, {
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

        fetchMyPosts(); // Call the function to fetch posts
    }, [isLoggedIn]); // Add isLoggedIn as a dependency
    return (
        <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="cards-container">
            {myPosts.length > 0 ? (
                myPosts.map((card, index) => (
                    <div className="card" key={card._id}>
                        <img src={cards[index % 7].cover} alt="cover image" className="card-image" />
                        <h3 className='card-title'>{card.title}</h3>
                        <button className="read-more-button" onClick={() => navigate(`/BlogPage/${card._id}`)}>Read More</button>
                    </div>
                    
                ))
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
        
        </div>
    );
};

export default MyBlogs;
