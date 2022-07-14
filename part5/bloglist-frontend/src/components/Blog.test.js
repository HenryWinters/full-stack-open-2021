import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('displays blog title and author only by default', () => {
    let container 

    const blog = {
      title: 'Component test title',
      author: 'Component test author',
      url: 'Component test url',
      likes: 10,
      user: 'Component test user'
    }

    const user = {
        username: 'Component-test-user',
        name: 'Component test user',
        password: 'Test'
    }

    container = render(<Blog blog={blog} user={user}/>).container

    const defaultDiv = container.querySelector('.defaultBlogDisplay')
    const fullDiv = container.querySelector('.fullBlogDisplay')
    expect(defaultDiv).toHaveStyle('display: flex')
    expect(fullDiv).toHaveStyle('display: none')
})