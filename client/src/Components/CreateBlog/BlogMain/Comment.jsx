import React from 'react'
import './Comment.css'

const comment = () => {
  return (
    <div>
    <div className="comment-box">
      <h2>Leave a Reply</h2>
      <form>
        <div className='input-row'>
      <div>
          <input
            type="text"
            placeholder="Your Name"
            />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            />
        </div>
            </div>
        <div>
          <textarea
            placeholder="Write your comment here..."
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">Post Comment</button>
      </form>
    </div>
    </div>
  )
}

export default comment