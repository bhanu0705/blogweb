import React, { useEffect, useState } from "react";
import axios from "axios";
import './MyBlogs.css'; // Ensure this file includes the same styling structure
import Header from "../LandingPage/Header/Header";
import CardSection from "../LandingPage/Cards/CardSection";
import { cards } from "../LandingPage/Cards/CardSection";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const MyBlogs = ({ isLoggedIn ,handleLogout}) => {
    const [myPosts, setMyPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate=useNavigate();
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
      <div className="cards-container">
        {myPosts && myPosts.map((card,index) => (
          <div className="card" key={card._id}>
            <img src={cards[index%7].cover} alt="cover image" className="card-image" />
            <h3 className='card-title'>{card.title}</h3>
            <button className="read-more-button" onClick={()=>navigate(`/BlogPage/${card._id}`)}>Read More</button>
          </div>
        ))}
      </div>
        </div>
    );
};

export default MyBlogs;
