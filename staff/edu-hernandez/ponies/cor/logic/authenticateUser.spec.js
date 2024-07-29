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

    it('succeeds on authenticate user parameters', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                // console.log('User created:', user)

                authenticateUser(
                    'rfederer',  // Authenticate username passed as parameter
                    '123123123', // Authenticate password passed as parameter
                    error => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(user.name).to.equal('Roger')
                        expect(user.surname).to.equal('Federer')
                        expect(user.email).to.equal('roger@federer.com')
                        expect(user.username).to.equal('rfederer')
                        expect(user.password).to.equal('123123123')

                        done()
                    })
                    .catch(error => done(error))
            })
    })

    it('succeeds on authenticate user parameters', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                // console.log('\nUser created:\n', user)

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
                            expect(user.name, 'string', 'name is a string')
                            expect(user.surname, 'string', 'surname is a string')
                            expect(user.email, 'string', 'email is a string')
                            expect(user.username, 'string', 'username is a string')
                            expect(user.password, 'string', 'password is a string')
                            done()
                        } catch (assertionError) {
                            done(assertionError)
                        }
                    }
                )
            })
            .catch(error => {
                // console.error('Error in User.create:', error)
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