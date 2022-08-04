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

    describe('And a note exists', function() { 
      beforeEach(function() {
        cy.createBlog({
          title: 'Test Blog',
          author: 'Test Author',
          url: 'Test Url',
          likes: 100
        })
      })

      it('A blog can be liked', function() { 
        cy.contains('Test Blog').parent().find('Button').click()
        cy.contains('Test Blog').parent().parent().find('#likeButton').click() 
   
        cy.contains('Likes: 101')
      })

      it('A blog can be deleted by creator', function() {
        cy.contains('Test Blog').parent().find('Button').click()
        cy.contains('Test Blog').parent().parent().find('#removeButton').click()

        cy.contains('Test Blog').should('not.exist')
      })

      it.only('Blogs are ordered descending according to likes', function() {
        cy.createBlog({
          title: 'Test Blog 2',
          author: 'Test Author 2',
          url: 'Test Url',
          likes: 300
        })
        cy.createBlog({
          title: 'Test Blog 3',
          author: 'Test Author 3',
          url: 'Test Url 3',
          likes: 200
        })
        cy.createBlog({
          title: 'Test Blog 4',
          author: 'Test Author 4',
          url: 'Test Url 4',
          likes: 400
        })

        cy.get('.blogs')
          .then(($blogs) => Cypress._.map($blogs, (el) => el.innerHTML))
          .then((list) => list.map((text) => text.match(/Likes:(.*?)<\/p>/)[1]))
          .then((list) => list.map(parseFloat)) 
          .then((list) => {
            const sortedList = Cypress._.orderBy(list, 'desc')
            expect(sortedList).to.deep.equal(list)
          })
      })
    })
  })
})