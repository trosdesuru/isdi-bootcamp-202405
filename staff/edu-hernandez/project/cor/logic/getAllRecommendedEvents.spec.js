import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllRecommendedEvents from './getAllRecommendedEvents.js'

const { ObjectId } = Types

const { SystemErrors, ValidationError, NotFoundError } = errors

describe('getAllRecommendedEvents', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => Event.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on finding recommended events', done => {
        User.create({
            name: 'Bruno',
            surname: 'Diaz',
            role: 'user',
            email: 'bruno@diaz.com',
            username: 'brunodiaz',
            password: '123123123',
            fav: []
        })
            .then(bruno => {
                return User.create({
                    name: 'Mary',
                    surname: 'Jane',
                    role: 'user',
                    email: 'mary@jane.com',
                    username: 'lamary',
                    password: '123123123',
                    fav: []
                }).then(mary => ({ bruno, mary }))
            })
            .then(({ bruno, mary }) => {
                return Event.create({
                    author: bruno._id,
                    title: 'Awesome Event',
                    image: 'https://randomImage.png',
                    caption: 'This is an awesome event!',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00',
                    fav: [mary._id]
                }).then(event => ({ event, bruno }))
            })
            .then(({ event, bruno }) => {
                return User.updateOne(
                    { username: 'lamary' },
                    { $push: { fav: event._id } }
                ).then(() => ({ event, userId: bruno._id }))
            })
            .then(({ event, userId }) => {
                getAllRecommendedEvents(userId.toString())
                    .then(recommendedEvents => {
                        expect(recommendedEvents).to.be.an('array')
                        expect(recommendedEvents.length).to.equal(1)
                        expect(recommendedEvents[0].id).to.equal(event._id.toString())
                        expect(recommendedEvents[0].author.username).to.equal('brunodiaz')

                        done()
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on user not found', done => {
        const nonExistentUserId = new ObjectId().toString()

        getAllRecommendedEvents(nonExistentUserId)
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')

                done()
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

    afterEach(done => {
        Event.deleteMany()
            .then(() => User.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})
