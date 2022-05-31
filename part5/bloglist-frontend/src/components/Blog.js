import { useState } from 'react'
import '../index.css'


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blogs'>
      <div>
        <p> {blog.title} {blog.author} </p>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>View</button>
        </div>
      </div>
      <div style={showWhenVisible}> 
        <p>URL: {blog.url}</p>
        <div className='likeSection'>
          <p>Likes: {blog.likes}</p>
          <button className='likeButton'>Like</button>
        </div>
        <p>User: {blog.user[0].name}</p>
        <button onClick={toggleVisibility}>Hide</button>
      </div> 
    </div>  
)}

export default Blog