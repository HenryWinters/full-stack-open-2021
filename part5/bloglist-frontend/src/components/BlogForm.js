import blogService from '../services/blogs'

const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs, newBlog, setNewBlog }) => {
    
    const handleBlogCreation = async (event) => { 
        event.preventDefault()
        const blog = { title, author, url }
        const response = await blogService.createBlog(blog)
        console.log(response)
        setBlogs(blogs.concat(response)) 
        setTitle('')
        setAuthor('')
        setUrl('')
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