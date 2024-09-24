import getAllMapEvents from './getAllMapEvents.js'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { errors } from 'com'
import { getTime } from 'date-fns'

const { NotFoundError, SystemError } = errors

const { ObjectId } = Types

describe('getAllMapEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    let userId, event1, event2

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
                userId = _user._id.toString()

                return Promise.all([
                    Event.create({
                        author: userId,
                        title: 'Event 1',
                        image: 'image1.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    }),
                    Event.create({
                        author: userId,
                        title: 'Event 2',
                        image: 'image2.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    })
                ])
            })
            .then(([e1, e2]) => {
                event1 = e1
                event2 = e2
            })
    })

    it('succeeds on getting all events', () => {
        return getAllMapEvents(userId)
            .then(events => {
                expect(events).to.have.lengthOf(2)
                expect(events[0]).to.have.property('title', 'Event 1')
                expect(events[1]).to.have.property('title', 'Event 2')
            })
    })

    it('succeeds on attaching author details to events', () => {
        return getAllMapEvents(userId)
            .then(events => {
                expect(events[0].author).to.have.property('username', 'johndoe')
                expect(events[1].author).to.have.property('username', 'johndoe')
            })
    })

    it('fails on user not found', () => {
        return getAllMapEvents(new ObjectId().toString())
            .then(() => {
                throw new Error('should have failed with NotFoundError')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on author not found', () => {
        return Event.deleteMany()
            .then(() => getAllMapEvents(userId))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})
