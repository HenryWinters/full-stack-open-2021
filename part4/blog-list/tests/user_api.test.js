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

    test('adding new invalid user with less than 3 characters', async () => {
        const usersAtStartJSON = await api.get('/api/users')
        const usersAtStart = usersAtStartJSON.body

        const newUser = { 
            username: 'Te',
            name: 'Invalid User',
            password: 'Pe'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEndJSON = await api.get('/api/users')
        const usersAtEnd = usersAtEndJSON.body
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map(r => r.username)
        expect(usernames).not.toContain(newUser.username)
    })

    test('adding new invalid user with no username', async () => {
        const usersAtStartJSON = await api.get('/api/users')
        const usersAtStart = usersAtStartJSON.body

        const newUser = { 
            name: 'Invalid User',
            password: 'Pe'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEndJSON = await api.get('/api/users')
        const usersAtEnd = usersAtEndJSON.body
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const names = usersAtEnd.map(r => r.name)
        expect(names).not.toContain(newUser.name)
    })

})

afterAll(() => {
    mongoose.connection.close()
  })