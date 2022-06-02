import { useState } from 'react'
import '../index.css'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    let blogWithOneMoreLike = {
      title: blog.title, 
      author: blog.author, 
      url: blog.url, 
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.addLikeToBlog(blog.id, blogWithOneMoreLike) 
    const updatedBlogList = await blogService.getAll()
    setBlogs(updatedBlogList)

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
          <button className='likeButton' onClick={addLike}>Like</button>
        </div>
        <p>User: {blog.user[0].name}</p>
        <button onClick={toggleVisibility}>Hide</button>
      </div> 
    </div>  
)}

export default Blog