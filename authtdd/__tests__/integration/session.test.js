const request = require('supertest')

const app = require('../../src/app')
const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should authenticate with valid credentials', async () => {
        const user = await User.create({
            name: "Gabriel",
            email: "gabriel@google.com",
            password_hash: '1234'
        })

        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: '12345'
            })

        expect(response.status).toBe(200)
    })
})