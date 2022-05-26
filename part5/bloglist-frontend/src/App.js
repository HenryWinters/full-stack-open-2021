import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [newBlog, setNewBlog] = useState({})
  const [notification, setNotification] = useState({message: null, type: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = (event) => { 
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload(false)
    setNotification({message: `${user.name} logged out`, type: 'error'})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  }

  if (user === null) {
    return (
      <div> 
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} user={user} setUser={setUser} setNotification={setNotification} />
      </div> 
    )
  } else return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>{user.name} is logged in</p>
        <button onClick={handleLogOut}>Log Out</button>
        <h2>Create New</h2>
        <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} newBlog={newBlog} setNewBlog={setNewBlog} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App
