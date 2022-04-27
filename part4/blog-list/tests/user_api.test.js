const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe('initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('firstPassword', 10)
        const user = new User({
            username: 'First User',
            name: 'Mr. First',
            passwordHash: passwordHash 
        })

        await user.save() 
    })

    test('adding new user', async () => {
        const usersAtStartJSON = await api.get('/api/users')
        const usersAtStart = usersAtStartJSON.body

        const newUser = { 
            username: 'Test Person',
            name: 'Mr. Test',
            password: 'TestPerson123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEndJSON = await api.get('/api/users')
        const usersAtEnd = usersAtEndJSON.body
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(r => r.username)
        expect(usernames).toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })