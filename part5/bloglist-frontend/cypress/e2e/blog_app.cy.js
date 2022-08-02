describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Test Person',
      name: 'Test Person',
      password: 'password'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Test Person')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Test Person is now logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Invalid Username')
      cy.get('#password').type('invalidpassword')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Test Person', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'Test Url',
        likes: 100
      })

      cy.contains('Test Blog Test Author')

    })

    it('A blog can be liked', function() { 
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'Test Url',
        likes: 100
      })

      cy.contains('Test Blog').parent().find('Button').click()
      cy.contains('Test Blog').parent().parent().find('#likeButton').click() 
 
      cy.contains('Likes: 101')

    })
  })
})