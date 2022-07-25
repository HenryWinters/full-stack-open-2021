import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

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

describe('blog displays', () => {
    let container 

    /*const blog = {
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
      }*/

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

jest.mock('../services/blogs')

test('clickling like button twice calls event handler twice', async () => {
    /*const blog = {
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
      }*/

   render(<Blog blog={blog} user={user} setBlogs={()=>null} />)

   const testUser = userEvent.setup()
   const viewButton = screen.getByText('View')
   await testUser.click(viewButton)
   const likeButton = screen.getByText('Like')
   await testUser.click(likeButton)
   await testUser.click(likeButton)
   expect(blogService.addLikeToBlog).toBeCalledTimes(2)
})

test('creating new blog form calls the event handler with the correct details', async () => {

})

