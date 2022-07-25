import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    setNotification({ message: `${user.name} logged out`, type: 'error' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  console.log(blogFormRef)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={ notification } />
        <Login setUser={setUser} setNotification={setNotification} />
      </div>
    )
  } else return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} is logged in</p>
      <button onClick={handleLogOut}>Log Out</button>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm setBlogs={setBlogs} setNotification={setNotification} blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
      )}
    </div>
  )
}

export default App