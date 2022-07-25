import React, { useReducer } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

test('creating new blog form calls the event handler with the correct details', async () => {

    const testUser = userEvent.setup()

    const blogFormRef = {
        current: {
            toggleVisibility: () => ''
        }
    }

    render(<BlogForm setBlogs={() => null} setNotification={() => null} blogFormRef={blogFormRef}/>)

    const titleInput = screen.getByPlaceholderText('Title of blog')
    const authorInput = screen.getByPlaceholderText('Author of blog')
    const urlInput = screen.getByPlaceholderText('Url of blog')
    const submitButton = screen.getByText('Create')

    await testUser.type(titleInput, 'Component test title')
    await testUser.type(authorInput, 'Component test author') 
    await testUser.type(urlInput, 'Component test url')

    await testUser.click(submitButton)

    expect(blogService.createBlog).toBeCalledTimes(1)
  
})