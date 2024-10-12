import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'

import getAllRecommendedEvents from './getAllRecommendedEvents.js'

const { ObjectId } = Types
const { ValidationError, NotFoundError } = errors

describe('getAllRecommendedEvents', () => {
    before(() => { return mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => { return User.deleteMany().then(() => Event.deleteMany()) })

    it('succeeds on finding recommended events', () => {
        return User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            fav: []
        })
            .then(user => {
                return Promise.all([
                    Event.create({
                        author: user._id.toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'This event 1 an awesome event!',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    }),
                    Event.create({
                        author: user._id.toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'This event 2 an awesome event!',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ username: 'peterparker' }, { $push: { fav: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllRecommendedEvents(user._id.toString())
                            .then(recommendedEvents => {
                                expect(recommendedEvents).to.be.an('array')
                                expect(recommendedEvents).to.have.lengthOf(2)
                                expect(recommendedEvents[0].title).to.equal('Event 1')
                                expect(recommendedEvents[1].title).to.equal('Event 2')
                            })
                    })
            })
    })

    it('succeeds on no recommended events found', () => {
        return User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            fav: []
        })
            .then(peter => getAllRecommendedEvents(peter._id.toString()))
            .then(recommendedEvents => {
                expect(recommendedEvents).to.be.an('array')
                expect(recommendedEvents.length).to.equal(0)
            })
    })

    it('fails on author not found', () => {
        let _error

        return User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            fav: []
        })
            .then(user => {
                return Promise.all([
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'This event 1 an awesome event!',
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
                        caption: 'This event 2 an awesome event!',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ username: 'peterparker' }, { $push: { fav: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllRecommendedEvents(user._id.toString())
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('author not found')
                            })
                    })
            })
    })

    it('fails on author not found', () => {
        return Promise.all([
            User.create({
                name: 'Peter',
                surname: 'Parker',
                role: 'user',
                email: 'peter@parker.com',
                username: 'peterparker',
                password: 'spiderman123',
                fav: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'jane@jane.com',
                username: 'lamary',
                password: '123123123',
                fav: []
            })
        ])
            .then(([user1, user2]) =>
                Event.create({
                    author: user2._id,
                    title: 'Awesome Event',
                    image: 'https://randomImage.png',
                    caption: 'This is an awesome event!',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00'
                })
                    .then(event => {
                        user1.fav.push(event._id)
                        user2.fav.push(event._id)

                        return Promise.all([user1.save(), user2.save(), event.save()])
                    })
            )
            .then(([user1]) => {
                return getAllRecommendedEvents(user1._id.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on user not found', () => {
        return getAllRecommendedEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getAllRecommendedEvents(new ObjectId())
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
            getAllRecommendedEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => {
        return Event.deleteMany()
            .then(() => User.deleteMany())
    })

    after(() => {
        return mongoose.disconnect()
    })
})