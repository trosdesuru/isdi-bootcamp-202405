import 'dotenv/config.js'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'

describe('authenticateUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on correct username and password', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                authenticateUser('rfederer', '123123123', error => {
                    expect(error).to.be.null
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        authenticateUser('nonexistent', '123123123', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
            done()
        })
    })

    it('fails on incorrect password', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                authenticateUser('rfederer', 'wrongpassword', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('wrong password')
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', done => {
        expect(() => authenticateUser('invalid username', '123123123', () => {})).to.throw('Invalid username')
        done()
    })

    it('fails on invalid password', done => {
        expect(() => authenticateUser('rfederer', 'short', () => {})).to.throw('Invalid password')
        done()
    })

    it('fails on invalid callback', done => {
        expect(() => authenticateUser('rfederer', '123123123', 'not a function')).to.throw('Invalid callback')
        done()
    })

    it('handles database errors gracefully', done => {
        const stub = sinon.stub(User, 'findOne').rejects(new Error('Database error'))
        
        authenticateUser('rfederer', '123123123', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Database error')

            stub.restore()
            done()
        })
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})
