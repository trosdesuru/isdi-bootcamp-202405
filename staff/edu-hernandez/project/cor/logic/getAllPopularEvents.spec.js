import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllPopularEvents from './getAllPopularEvents.js'

const { ObjectId } = Types
const { ValidationError, NotFoundError } = errors

describe('getAllPopularEvents', () => {
    before(() => { return mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => { return User.deleteMany().then(() => Event.deleteMany()) })

    it('succeeds on finding popular events', () => {
        return User.create({
            name: 'Pedro',
            surname: 'Park',
            role: 'user',
            email: 'bruno@diaz.com',
            username: 'pedropark',
            password: '123123123',
            going: []
        })
            .then(user => {
                return Promise.all([
                    Event.create({
                        author: user._id.toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'Caption event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    }),
                    Event.create({
                        author: user._id.toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'Caption event 2',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ username: 'pedropark' }, { $push: { going: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllPopularEvents(user._id.toString())
                            .then(popularEvents => {
                                expect(popularEvents).to.be.an('array')
                                expect(popularEvents).to.have.lengthOf(2)
                                expect(popularEvents[0].title).to.equal('Event 1')
                                expect(popularEvents[1].title).to.equal('Event 2')
                            })
                    })
            })
    })
    it('succeeds with less than two events', () => {
        return User.create({
            name: 'Pedro',
            surname: 'Park',
            role: 'user',
            email: 'bruno@diaz.com',
            username: 'pedropark',
            password: '123123123',
            going: []
        })
            .then(user => {
                return Event.create({
                    author: user._id.toString(),
                    title: 'Event 1',
                    image: 'https://randomImage.png',
                    caption: 'Caption event 1',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00',
                    going: []
                }).then(event => ({ event, user }))
            })
            .then(({ event, user }) => {
                return User.updateOne({ username: 'pedropark' }, { $push: { going: event._id } })
                    .then(() => {
                        return getAllPopularEvents(user._id.toString())
                            .then(popularEvents => {
                                expect(popularEvents).to.be.an('array')
                                expect(popularEvents.length).to.equal(0)
                            })
                    })
            })
    })

    it('fails on author not found', () => {
        let _error

        return User.create({
            name: 'Pedro',
            surname: 'Park',
            role: 'user',
            email: 'peter@parker.com',
            username: 'pedropark',
            password: '123123123',
            going: []
        })
            .then(user => {
                return Promise.all([
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'This is event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    }),
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'This is event 2',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ username: 'pedropark' }, { $push: { going: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllPopularEvents(user._id.toString())
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('author not found')
                            })
                    })
            })
    })

    it('fails on user not found', () => {
        return getAllPopularEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getAllPopularEvents(new ObjectId())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllPopularEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => { return Event.deleteMany().then(() => User.deleteMany()) })

    after(() => { return mongoose.disconnect() })
})