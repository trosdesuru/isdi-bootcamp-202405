import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

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
        debugger
        registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'rfederer' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Roger')
                    expect(user.surname).to.equal('Federer')
                    expect(user.email).to.equal('roger@federer.com')
                    expect(user.password).to.equal('123123123')

                    done()
                })
                .catch(error => done(error))
        })
    })

    // it('fails on existing user with same email', done => {
    //     User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
    //         .then(() => {
    //             registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
    //                 expect(error).to.be.instanceOf(Error)
    //                 expect(error.message).to.equal('user already exists')

    //                 done()
    //             })
    //         })
    //         .catch(error => done(error))
    // })

    // it('fails on existing user with same username', done => {
    //     User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
    //         .then(() => {
    //             registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => {
    //                 expect(error).to.be.instanceOf(Error)
    //                 expect(error.message).to.equal('user already exists')

    //                 done()
    //             })
    //         })
    //         .catch(error => done(error))
    // })

    // it('fails on non-string name', () => {
    //     let error

    //     try {
    //         registerUser(Roger, 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error.message).to.equal('name is not a string')
    //     }
    // })

    // it('fails on invalid name', () => {
    //     let error

    //     try {
    //         registerUser('otherRoger', 'Federer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid name')
    //     }
    // })

    // it('fails on non-string surname', () => {
    //     let error

    //     try {
    //         registerUser('Roger', Federer, 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error.message).to.equal('surname is not a string')
    //     }
    // })

    // it('fails on invalid surname', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'otherFederer', 'roger@federer.com', 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid surname')
    //     }
    // })

    // it('fails on non-string email', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', noString, 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error).to.equal('email is not a string')
    //     }
    // })

    // it('fails on invalid email', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid email')
    //     }
    // })

    // it('fails on non-string username', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'roger@federer.com', rfederer, '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error).to.equal('username is not a string')
    //     }
    // })

    // it('fails on invalid username', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'federer@roger.com', 'RFederer', '123123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid username')
    //     }
    // })

    // it('fails on non-string password', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', 123123123, '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error).to.equal('password is not a string')
    //     }
    // })

    // it('fails on password short', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(RangeError)
    //         expect(error.message).to.equal('password length is lower than 8 characters')
    //     }
    // })

    // it('fails on password with empty space', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'roger@federer.com', 'rfederer', '123123 123', '123123123', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxErrorError)
    //         expect(error).to.equal('password has empty space')
    //     }
    // })

    // it('fails on non-matching passwords', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123123', '123123132', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(Error)
    //         expect(error.message).to.equal('passwords do not match')
    //     }
    // })

    // it('fails on non-function callback', () => {
    //     let error

    //     try {
    //         registerUser('Roger', 'Federer', 'federer@roger.com', 'rfederer', '123123123', '123123132', notFunction)
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(TypeError)
    //         expect(error.message).to.equal('callback is not a function')
    //     }
    // })

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