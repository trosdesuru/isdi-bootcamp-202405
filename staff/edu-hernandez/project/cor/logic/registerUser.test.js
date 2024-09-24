import 'dotenv/config'
import { User } from '../data/models.js'
import { expect } from 'chai'

import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// const { ValidationError, DuplicityError } = errors
describe('registerUser', () => {
        before(() => mongoose.connect(process.env.MONGODB_URI))

        beforeEach(() => User.deleteMany().exec)

        it('succeeds on valid user registration with role "user"', async () => {
                const user = await registerUser(
                        'Charlie',
                        'Brown',
                        'user',
                        'charlie@gbrown.com',
                        'charlie',
                        '123123123',
                        '123123123'
                )
                        .then(user => {
                                expect(user).to.exist
                                expect(user.role).to.equal('user')
                        })
        })

        it('succeeds on valid user registration with role "organizer"', async () => {
                const user = await registerUser(
                        'Mary',
                        'Jane',
                        'organizer',
                        'mary@jane.com',
                        'lamary',
                        '123123123',
                        '123123123'
                )

                expect(user).to.exist
                expect(user.role).to.equal('organizer')
        })

        it('fails on invalid role', async () => {
                try {
                        await registerUser(
                                'Charlie',
                                'Brown',
                                'invalidRole',
                                'john.doe@gmail.com',
                                'johndoe',
                                '123123123',
                                '123123123'
                        )

                        throw new Error('should not reach this point')
                } catch (error) {
                        expect(error).to.exist
                        expect(error.message).to.equal('invalid role')
                }
        })

        it('fails when passwords do not match', async () => {
                try {
                        await registerUser(
                                'Jhon',
                                'Snow',
                                'user',
                                'john@snow.com',
                                'jhonnieve',
                                '123123123',
                                '123123123'
                        )

                        throw new Error('should not reach this point')
                } catch (error) {
                        expect(error).to.exist
                        expect(error.message).to.equal('passwords do not match')
                }
        })

        it('fails when email is already taken', async () => {
                const hashedPassword = await bcrypt.hash('Password123', 8)
                await User.create({
                        name: 'Charlie',
                        surname: 'Brown',
                        role: 'user',
                        email: 'charlie@brown.com',
                        username: 'charlie',
                        password: hashedPassword
                })

                try {
                        await registerUser(
                                'Charlie',
                                'Brown',
                                'organizer',
                                'charlie@brown.com',
                                'charlie',
                                '123123123',
                                '123123123'
                        )

                        throw new Error('should not reach this point')
                } catch (error) {
                        expect(error).to.exist
                        expect(error.message).to.equal('user already exists')
                }
        })
        // afterEach(() => User.deleteMany().exec())
        after(() => mongoose.disconnect())
})