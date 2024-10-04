import 'dotenv/config'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { getTime } from 'date-fns'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllFavEvents from './getAllFavEvents.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, SystemError } = errors

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

    it('fails when author of the event is not found', () => {
        return Event.create({
            author: new ObjectId(),
            title: 'Event with no existing author',
            image: 'image_no_author.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
        .then(user => {
            return getAllFavEvents(user._id.toString())
                .then(() => {
                    throw new Error('Expected a NotFoundError to be thrown')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                })
        })
    })

    it('fails when the author of the event has been deleted', () => {
        return User.create({
            name: 'Paul',
            surname: 'Walker',
            role: 'user',
            email: 'paul@walker.com',
            username: 'paulwalker',
            password: '123123123',
            avatar: '/avatar/paulIcon.png',
            fav: [],
            going: []
        })
            .then(userPaul => {
                return Event.create({
                    author: userPaul._id,
                    title: 'Event with deleted author',
                    image: 'image5.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: getTime().toString()
                })
                    .then(eventWithDeletedAuthor => {
                        return User.findByIdAndDelete(userPaul._id)
                            .then(() => {
                                return getAllFavEvents(userPaul._id.toString())
                                    .then(() => {
                                        throw new Error('should not reach this point, author was deleted')
                                    })
                                    .catch(error => {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('user not found')
                                    })
                            })
                    })
            })
    })

    it('fails when user.fav is not an array', () => {
        return User.findByIdAndUpdate(user._id, { fav: null }, { new: true })
            .then(user => {
                return getAllFavEvents(user._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    it('fails when event has an invalid author ID', () => {
        return Event.create({
            author: new mongoose.Types.ObjectId(),
            title: 'Event with invalid author ID',
            image: 'image6.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
            .then(eventWithInvalidAuthor => {
                return getAllFavEvents(eventWithInvalidAuthor._id.toString())
                    .then(() => {
                        throw new Error('should not reach this point, author is invalid')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    it('fails when event has no author', () => {
        return Event.create({
            author: new ObjectId(),
            title: 'Event without author',
            image: 'image7.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
            .then(eventWithoutAuthor => {
                return getAllFavEvents(eventWithoutAuthor._id.toString())
                    .then(() => {
                        throw new Error('should not reach this point, event has no author')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    it('fails on user not found', () => {
        const nonExistentUserId = new ObjectId().toString()

        return getAllFavEvents(nonExistentUserId)
            .then(() => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user not found`)
            })
    })

    it('fails when user does not exist', () => {
        return getAllFavEvents('61616b5f4d778d7e7973b5d7')
            .then(() => {
                throw new Error('should have thrown a NotFoundError')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
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
                throw new NotFoundError('event not found')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.include('Event validation failed: author: Path `author` is required.')
            })
    })

    it('fails when an event in user favs does not exist', () => {
        return Event.findByIdAndDelete(event1._id)
            .then(() => getAllFavEvents(user._id.toString()))
            .then(() => {
                throw new NotFoundError('event not found')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.include('event not found')
            })
    })

    it('fails on invalid user ID format', () => {
        return getAllFavEvents('invalidUserId')
            .then(() => {
                throw new SystemError(error.message)
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.name).to.equal('SystemError')
            })
    })

    it('fails on invalid event ID in user favs', () => {
        return User.findByIdAndUpdate(user._id, { fav: ['invalidEventId'] })
            .then(() => getAllFavEvents(user._id.toString()))
            .then(() => {
                throw new ValidationError('user not found')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.name).to.equal('CastError')
            })
    })

    it('fails when user.fav is null or undefined', () => {
        return User.findByIdAndUpdate(user._id, { fav: null }, { new: true })
            .then(userWithNullFav => {
                return getAllFavEvents(userWithNullFav._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})