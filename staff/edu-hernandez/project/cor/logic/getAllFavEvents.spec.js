import 'dotenv/config'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { getTime } from 'date-fns'
import { errors } from 'com'
import mongoose from 'mongoose'
import getAllFavEvents from './getAllFavEvents.js'

const { NotFoundError } = errors

describe('getAllFavEvents', () => {
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
                        time: getTime().toString()
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
                        time: getTime().toString()
                    })
                ])
            })
            .then(([e1, e2]) => {
                event1 = e1
                event2 = e2

                return User.findByIdAndUpdate(
                    user._id, { fav: [event1._id, event2._id], going: [event1._id] })
            })
    })

    it('succeeds on existing favourite events', () => {
        return getAllFavEvents(user._id.toString())
            .then(events => {
                expect(events).to.have.lengthOf(2)
                events.forEach(event => {
                    expect(event.id).to.be.oneOf([event1._id.toString(), event2._id.toString()])
                    expect(event.fav).to.be.true
                    expect(event.author.id).to.equal(user._id.toString())
                    expect(event.author.username).to.equal('johndoe')
                    expect(event.author.avatar).to.equal('/avatar/avatarIcon.png')
                })
            })
    })

    it('succeeds when user has no favourite events', () => {
        return User.create({
            name: 'Jane',
            surname: 'Doe',
            role: 'user',
            email: 'jane@doe.com',
            username: 'janedoe',
            password: '123123123',
            avatar: '/avatar/avatarIcon.png',
            going: [],
            fav: []
        })
            .then(userNoFavs => {
                return getAllFavEvents(userNoFavs._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    it('succeeds on events with different authors', () => {
        return User.create({
            name: 'Alice',
            surname: 'Smith',
            role: 'user',
            email: 'alice@smith.com',
            username: 'alicesmith',
            password: '123123123',
            avatar: '/avatar/aliceIcon.png',
            going: [],
            fav: []
        })
            .then(userWithDiffAuth => {
                return Promise.all([
                    Event.create({
                        author: userWithDiffAuth._id,
                        title: 'Event 3',
                        image: 'image3.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    }),
                    Event.create({
                        author: userWithDiffAuth._id,
                        title: 'Event 4',
                        image: 'image4.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    })
                ])
                    .then(([e3, e4]) => {
                        return User.findByIdAndUpdate(
                            userWithDiffAuth._id, { fav: [e3._id, e4._id] })
                            .then(() => getAllFavEvents(userWithDiffAuth._id.toString()))
                            .then(events => {
                                expect(events).to.have.lengthOf(2)
                                events.forEach(event => {
                                    expect(event.id).to.be.oneOf([e3._id.toString(), e4._id.toString()])
                                    expect(event.fav).to.be.true
                                    expect(event.author.id).to.equal(userWithDiffAuth._id.toString())
                                    expect(event.author.username).to.equal('alicesmith')
                                    expect(event.author.avatar).to.equal('/avatar/aliceIcon.png')
                                })
                            })
                    })
            })
    })

    it('succeeds when user follows authors of their favourite events', () => {
        return User.create({
            name: 'Bob',
            surname: 'Brown',
            role: 'user',
            email: 'bob@brown.com',
            username: 'bobbrown',
            password: '123123123',
            avatar: '/avatar/bobIcon.png',
            following: [],
            going: [],
            fav: []
        })
            .then(userWithFollow => {
                return Promise.all([
                    Event.create({
                        author: user._id,
                        title: 'Event 5',
                        image: 'image5.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    })
                ])
                    .then(([e5]) => {
                        return User.findByIdAndUpdate(
                            userWithFollow._id,
                            { fav: [e5._id], following: [user._id] })
                            .then(() => getAllFavEvents(userWithFollow._id.toString()))
                            .then(events => {
                                expect(events).to.have.lengthOf(1)
                                expect(events[0].id).to.equal(e5._id.toString())
                                expect(events[0].fav).to.be.true
                                expect(events[0].author.id).to.equal(user._id.toString())
                                expect(events[0].author.username).to.equal('johndoe')
                                expect(events[0].author.avatar).to.equal('/avatar/avatarIcon.png')
                                expect(events[0].author.following).to.be.true
                            })
                    })
            })
    })

    it('fails on creating event without author', () => {
        return Event.create({
            title: 'Event without author',
            image: 'image_no_author.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
            .then(() => {
                throw new Error('event without author should not be created')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.include('Event validation failed: author: Path `author` is required.')
            })
    })


    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})