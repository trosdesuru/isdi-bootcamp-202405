import 'dotenv/config'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllRecommendedEvents from './getAllRecommendedEvents.js'

const { ObjectId } = Types

const { SystemError, ValidationError, NotFoundError } = errors

describe('getAllRecommendedEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on getting recommended events', () => {
        let userId, eventId

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user => {
                userId = user.id
                return Event.create({
                    author: user._id,
                    title: 'Test Event',
                    image: 'image.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00'
                })
            })
            .then(event => {
                eventId = event.id
                return User.findByIdAndUpdate(userId, { $push: { going: eventId } })
            })
            .then(() => getAllRecommendedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(1)
                expect(events[0]._id.toString()).to.equal(eventId)
            })
    })

    it('succeeds on user has not attended events', () => {
        let userId

        return User.create({
            name: 'Lucy',
            surname: 'Van Pelt',
            role: 'user',
            email: 'lucy@vanpelt.com',
            username: 'lucy',
            password: '123123123'
        })
            .then(user => {
                userId = user.id
                return Event.create({
                    author: user._id,
                    title: 'Another Event',
                    image: 'image.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '20:00'
                })
            })
            .then(() => getAllRecommendedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(0)
            })
    })

    it('succeeds on when user has an empty going list', () => {
        let userId

        return User.create({
            name: 'Peppermint',
            surname: 'Patty',
            role: 'user',
            email: 'peppermint@patty.com',
            username: 'peppermint',
            password: '123123123'
        })
            .then(user => {
                userId = user.id;
                return User.findByIdAndUpdate(userId, { going: [] })
            })
            .then(() => getAllRecommendedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(0)
            })
    })

    it('succeeds on recommended events when user has attended events from different authors', () => {
        let userId, eventId1, eventId2

        return User.create({
            name: 'Snoopy',
            surname: 'Beagle',
            role: 'user',
            email: 'snoopy@beagle.com',
            username: 'snoopy',
            password: '123123123'
        })
            .then(user => {
                userId = user.id
                return Promise.all([
                    Event.create({
                        author: user._id,
                        title: 'Event A',
                        image: 'imageA.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '19:00'
                    }),
                    Event.create({
                        author: user._id,
                        title: 'Event B',
                        image: 'imageB.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '21:00'
                    })
                ])
            })
            .then(events => {
                eventId1 = events[0].id
                eventId2 = events[1].id
                return User.findByIdAndUpdate(userId, { $push: { going: [eventId1, eventId2] } })
            })
            .then(() => Event.create({
                author: new ObjectId().toString(),
                title: 'Event C',
                image: 'imageC.png',
                date: new Date(),
                location: {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                time: '22:00'
            }))
            .then(() => getAllRecommendedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(2)
                expect(events[0].title).to.equal('Event A')
            })
    })

    it('fails when user does not exist', () => {
        return getAllRecommendedEvents('invalidUserId')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal(error.message)
            })
    })

    it('fails when userId is an empty string', () => {
        return getAllRecommendedEvents(new ObjectId().toString())
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal(error.message)
            })
    })

    it('fails when user has references to non-existent events', () => {
        let userId;

        return User.create({
            name: 'Linus',
            surname: 'Van Pelt',
            role: 'user',
            email: 'linus@vanpelt.com',
            username: 'linus',
            password: '123123123'
        })
            .then(user => {
                userId = user.id
                return User.findByIdAndUpdate(userId, { $push: { going: new ObjectId() } })
            })
            .then(() => getAllRecommendedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(0)
            })
    })

    after(() => mongoose.disconnect())
})