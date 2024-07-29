import React from 'react'
import Header from '../LandingPage/Header/Header'
import Footer from '../LandingPage/Footer/Footer'
import BlogContent from './BlogMain/BlogContent'
import Comment from './BlogMain/Comment'


const BlogPage = () => {
  return (
    <div>
      <Header/>
      <BlogContent/>
      <Comment/>
      <Footer/>
    </div>
  )
}

export default BlogPage
