import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllPopularEvents from './getAllPopularEvents.js'

const { ObjectId } = Types

const { ValidationError, NotFoundError } = errors

describe('getAllPopularEvents', () => {
    let user

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

    it('succeeds on finding popular events', done => {
        User.create({
            name: 'Bruno',
            surname: 'Diaz',
            role: 'user',
            email: 'bruno@diaz.com',
            username: 'brunodiaz',
            password: '123123123',
            going: []
        })
            .then(bruno => {
                return User.create({
                    name: 'Mary',
                    surname: 'Jane',
                    role: 'user',
                    email: 'mary@jane.com',
                    username: 'lamary',
                    password: '123123123',
                    going: []
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
                    going: [mary._id]
                }).then(event => ({ event, bruno }))
            })
            .then(({ event, bruno }) => {
                return User.updateOne(
                    { username: 'lamary' },
                    { $push: { going: event._id } }
                ).then(() => ({ event, userId: bruno._id }))
            })
            .then(({ event, userId }) => {
                debugger
                return getAllPopularEvents(userId.toString())
                    .then(popularEvents => {
                        expect(popularEvents).to.be.an('array')
                        expect(popularEvents.length).to.equal(1)
                        expect(popularEvents[0].id).to.equal(event._id.toString())
                        expect(popularEvents[0].author.username).to.equal('brunodiaz')

                        done()
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on no popular events found', done => {
        User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            going: []
        })
            .then(peter => {
                return getAllPopularEvents(peter._id.toString())
            })
            .then(popularEvents => {
                expect(popularEvents).to.be.an('array')
                expect(popularEvents.length).to.equal(0)

                done()
            })
            .catch(error => done(error))
    })

    it('fails on author is not found', async () => {
        let user1, user2, event

        user1 = await User.create({
            name: 'Peter',
            surname: 'Parker',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            going: []
        })

        event = await Event.create({
            author: user1._id.toString(),
            title: 'Awesome Event',
            image: 'https://randomImage.png',
            caption: 'This is an awesome event!',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: '18:00',
            going: []
        })
        
        user2 = await User.create({
            name: 'Mary',
            surname: 'Jane',
            email: 'jane@jane.com',
            username: 'lamary',
            password: '123123123',
            going: [event._id]
        })
        await getAllPopularEvents(user2._id.toString())
            .then(async () => {
                debugger
                let updateAuthor

                await Event.findOneAndUpdate(event._id, { $push: { going: user2._id } })
                console.log('After update - event.going:', event.going)

                updateAuthor = event.author.toString()
                console.log('Before update - author:', event.author)

                await User.findByIdAndUpdate(event._id, { $set: { updateAuthor: new ObjectId().toString() } })
                console.log('finByIdAndUpdate - author:', updateAuthor)

                updateAuthor = await User.findById(event.author.toString())
                console.log('After update - author:', updateAuthor, 'user2:', user2, 'event:', event)

                return getAllPopularEvents(user2._id.toString())
            })
            .then(() => {
                throw new Error('Test failed, expected NotFoundError to be thrown')
            })
            .catch(error => {
                console.log('error:', error)

                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    it('fails on user not found', done => {
        const nonExistentUserId = new ObjectId().toString()

        getAllPopularEvents(nonExistentUserId)
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')

                done()
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