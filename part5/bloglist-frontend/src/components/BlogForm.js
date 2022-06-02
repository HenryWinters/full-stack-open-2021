import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogCreation = async (event) => { 
        event.preventDefault()
        if (!title || !author || !url) {
            setNotification({message: 'Title, author, and Url required', type: 'error'})
            setTimeout(() => {
                setNotification({message: null, type: null})
            }, 5000)
        } else 
        
        try {
            blogFormRef.current.toggleVisibility()
            const blog = { title, author, url }
            const response = await blogService.createBlog(blog)
            const updatedBlogList = await blogService.getAll()
            setBlogs(updatedBlogList)
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotification({message: `Added ${blog.title} by ${blog.author}`, type: 'success'})
            setTimeout(() => {
                setNotification({message: null, type: null})
            }, 5000)
        } catch (exception) {
            setNotification({message: exception, type: 'error'})
            setTimeout(() => {
                setNotification({message: null, type: null})
            }, 5000)
        }
    }

    return (
        <div> 
            <form onSubmit={handleBlogCreation}> 
                <div>
                    Title
                        <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        />
                </div>
                <div>
                    Author
                        <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        />
                </div> 
                <div>
                    Url
                        <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        />
                </div>
                <button type="submit">Create</button>

            </form> 
        </div> 
    )
}

export default BlogForm