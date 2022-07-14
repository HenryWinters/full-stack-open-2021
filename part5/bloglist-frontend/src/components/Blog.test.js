import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog displays', () => {
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

    beforeEach(() => {
        container = render(<Blog blog={blog} user={user}/>).container
    })

    test('title and author only by default', () => {
        const defaultDiv = container.querySelector('.defaultBlogDisplay')
        const fullDiv = container.querySelector('.fullBlogDisplay')
        expect(defaultDiv).toHaveStyle('display: flex')
        expect(fullDiv).toHaveStyle('display: none')
    })

    test('url and number of likes when button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const defaultDiv = container.querySelector('.defaultBlogDisplay')
        const fullDiv = container.querySelector('.fullBlogDisplay')
        expect(defaultDiv).toHaveStyle('display: none')
        expect(fullDiv).toHaveStyle('display: block')
    })
})