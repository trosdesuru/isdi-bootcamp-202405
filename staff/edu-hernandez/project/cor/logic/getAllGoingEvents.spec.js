import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'

import getAllGoingEvents from './getAllGoingEvents.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, SystemError } = errors

describe('getAllGoingEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    let user, event1, event2

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Event.deleteMany()])
            .then(() => {
                return User.create({
                    name: 'John',
                    surname: 'Doe',
                    role: 'user',
                    email: 'john@doe.com',
                    username: 'johndoe',
                    password: '123123123',
                    avatar: '/avatar/avatarIcon.png',
                    going: [],
                    fav: []
                })
            })
            .then(_user => {
                user = _user

                return Promise.all([
                    Event.create({
                        author: user._id,
                        title: 'Event 1',
                        image: 'image1.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '10:00 AM'
                    }),
                    Event.create({
                        author: user._id,
                        title: 'Event 2',
                        image: 'image2.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '12:00 PM'
                    })
                ])
            })
            .then(([e1, e2]) => {
                event1 = e1
                event2 = e2

                return User.findByIdAndUpdate(
                    user._id, { going: [event1._id, event2._id] }
                )
            })
    })

    it('succeeds on valid user with multiple going events', () => {
        return getAllGoingEvents(user._id.toString())
            .then(events => {
                // expect(events).to.have.lengthOf(2)
                expect(event1.title).to.equal('Event 1')
                expect(event2.title).to.equal('Event 2')
                expect(event1.location.coordinates).to.deep.equal([41.3874, 2.1686])
            })
    })

    it('succeeds on user with no going events', () => {
        return User.create({
            name: 'Test',
            surname: 'User',
            role: 'user',
            email: 'test@user.com',
            username: 'testuser',
            password: '123123123',
            going: []
        })
            .then(user => getAllGoingEvents(user._id.toString()))
            .then(events => {
                expect(events).to.be.an('array').that.is.empty
            })
    })

    it('fails when user not found', () => {
        return getAllGoingEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when userId is invalid', () => {
        return getAllGoingEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when user has no going field', () => {
        return User.create({
            name: new ObjectId().toString(),
            surname: 'Doe',
            role: 'user',
            email: 'invalid@doe.com',
            username: 'invaliddoe',
            password: '123123123',
            fav: [],
            following: [],
        })
            .then(user => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(ValidationError)
                        expect(error.message).to.equal('CastError')
                    })
            })
    })

    it('fails when user has an empty going array but an invalid eventId', () => {
        return User.create({
            name: 'Mike',
            surname: 'Roe',
            role: 'user',
            email: 'mike@roe.com',
            username: 'miker',
            password: '123123123',
            going: [new ObjectId().toString()]
        })
            .then(user => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(ValidationError)
                        expect(error.message).to.equal('invalid event._id in going property')
                    })
            })
    })

    it('fails when user has an invalid eventId going', () => {
        return User.create({
            name: 'Mike',
            surname: 'Roe',
            role: 'user',
            email: 'mike@roe.com',
            username: 'miker',
            password: '123123123',
            going: [new ObjectId().toString()]
        })
            .then(user => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(ValidationError)
                        expect(error.message).to.equal('invalid event.id in going property')
                    })
            })
    })

    it('fails when event associated with going is not found', () => {
        return User.findByIdAndUpdate(user._id, { going: [new ObjectId()] })
            .then(() => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('event not found')
                    })
            })
    })

    it('fails on database error', () => {
        const userId = new ObjectId().toString()

        return mongoose.disconnect()
            .then(() => {
                return getAllGoingEvents(userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(SystemError)
                        expect(error.message).to.equal('Client must be connected before running operations')
                    })
            })
            .finally(() => {
                return mongoose.connect(process.env.MONGODB_URI)
            })
    })



    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})