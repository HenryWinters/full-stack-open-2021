import { useState } from 'react'
import '../index.css'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : 'flex',
  }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const blogWithOneMoreLike = {
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

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      const updatedBlogList = await blogService.getAll()
      setBlogs(updatedBlogList)
    }
  }

  if (user.username === blog.user[0].username) {
    return (
      <div className='blogs'>
        <div className='blogTitle' style={hideWhenVisible}>
          <p> {blog.title} {blog.author} </p>
          <button onClick={toggleVisibility}>View</button>
        </div>
        <div style={showWhenVisible}>
          <div className='blogTitle'>
            <p> {blog.title} {blog.author} </p>
            <button onClick={toggleVisibility}>Hide</button>
          </div>
          <p>URL: {blog.url}</p>
          <div className='likeSection'>
            <p>Likes: {blog.likes}</p>
            <button className='likeButton' onClick={addLike}>Like</button>
          </div>
          <p>User: {blog.user[0].name}</p>
          <button onClick={handleDelete}>Remove</button>
        </div>
      </div>
    )
  } else return (
    <div className='blogs'>
      <div className='blogTitle defaultBlogDisplay' style={hideWhenVisible}>
        <p> {blog.title} {blog.author} </p>
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div className='fullBlogDisplay' style={showWhenVisible}>
        <div className='blogTitle'>
          <p> {blog.title} {blog.author} </p>
          <button onClick={toggleVisibility}>Hide</button>
        </div>
        <p>URL: {blog.url}</p>
        <div className='likeSection'>
          <p>Likes: {blog.likes}</p>
          <button className='likeButton' onClick={addLike}>Like</button>
        </div>
        <p>User: {blog.user[0].name}</p>
      </div>
    </div>
  )}

export default Blog