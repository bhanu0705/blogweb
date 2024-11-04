import React from 'react'
import Header from '../LandingPage/Header/Header'
import Footer from '../LandingPage/Footer/Footer'
import BlogContent from './BlogMain/BlogContent'
import Comment from './BlogMain/Comment'


const BlogPage = ({isLoggedIn,handleLogout}) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <BlogContent/>
      
      <Footer/>
      
    </div>
  )
}

export default BlogPage;
