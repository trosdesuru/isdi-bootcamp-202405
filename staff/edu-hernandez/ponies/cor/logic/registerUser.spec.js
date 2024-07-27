import 'dotenv/config'
import mongoose from 'mongoose'
import { expect, assert } from 'chai'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

describe('registerUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on new user', done => {
        registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'rfederer' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Roger')
                    assert.typeOf(user.name, 'string', 'name is a string')
                    expect(user.surname).to.equal('Federer')
                    assert.typeOf(user.surname, 'string', 'surname is a string')
                    expect(user.email).to.equal('roger@federer.com')
                    assert.typeOf(user.email, 'string', 'email is a string')
                    expect(user.password).to.equal('123123123')
                    assert.typeOf(user.password, 'string', 'password is a string')

                    done()
                })
                .catch(error => done(error))
        })
    })

    it('fails on existing user with same email', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user with same username', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(45, 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('Ro', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            registerUser('Roger', 45, 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('Roger', 'RF', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 43, 'rfederer', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    it('fails on invalid email', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'rf@rf.com', 'roger', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'roger@federer.com', 43, '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'federer@roger.com', 'R', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', 123123123, '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password short', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password with empty spaces', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123 123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123123', '123123132', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123123', '123123132', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})