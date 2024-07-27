import 'dotenv/config.js'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import { expect, assert } from 'chai'
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

    // it('succeeds on authenticate user parameters', done => {
    //     User.create({
    //         name: 'Roger',
    //         surname: 'Federer',
    //         email: 'roger@federer.com',
    //         username: 'rfederer',
    //         password: '123123123'
    //     })
    //         .then(user => {
    //             console.log('User created:', user)

    //             authenticateUser(
    //                 'rfederer',  // Authenticate username passed as parameter
    //                 '123123123', // Authenticate password passed as parameter
    //                 error => {
    //                     if (error) {
    //                         console.log('Error in authenticateUser', error)
    //                         done(error)

    //                         return
    //                     }

    //                     try {
    //                         assert.TypeOf(user.name, 'string', 'name is a string')
    //                         assert.TypeOf(user.surname, 'string', 'surname is a string')
    //                         assert.TypeOf(user.email, 'string', 'email is a string')
    //                         assert.TypeOf(user.username, 'string', 'username is a string')
    //                         assert.TypeOf(user.password, 'string', 'password is a string')
    //                     }catch (assertionError) {
    //                         done(assertionError)
    //                     }
    //                 })
    //         })
    //         .catch(error => {
    //             console.log('Error in User.create', error)
    //             done(error))}
    // })

    it('succeeds on authenticate user parameters', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                console.log('\nUser created:\n', user)

                authenticateUser(
                    'rfederer',
                    '123123123',
                    error => {
                        if (error) {
                            console.error('Error in authenticateUser:', error)
                            done(error)
                            return
                        }

                        try {
                            assert.typeOf(user.name, 'string', 'name is a string')
                            assert.typeOf(user.surname, 'string', 'surname is a string')
                            assert.typeOf(user.email, 'string', 'email is a string')
                            assert.typeOf(user.username, 'string', 'username is a string')
                            assert.typeOf(user.password, 'string', 'password is a string')
                            done()
                        } catch (assertionError) {
                            done(assertionError)
                        }
                    }
                )
            })
            .catch(error => {
                console.error('Error in User.create:', error)
                done(error)
            })
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