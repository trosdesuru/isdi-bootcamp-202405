import 'dotenv/config'
import toggleGoingEvent from './toggleGoingEvent.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError } = errors

describe('toggleGoingEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        // User.deleteMany()
        //     .then(() => Event.deleteMany())
        Promise.all([User.deleteMany(), Event.deleteMany()])
    )

    it('succeeds on existing user and event has no likes', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test from cor',
                    image: 'https://randomImage.png',
                    caption: 'test from cor',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    likes: []
                })
                    .then(event =>
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Event.findById(event.id).lean())
                            .then(event => expect(event.going.map(userObjectId => userObjectId.toString())).to.include(user.id))
                    )
            )
    )

    it('succeeds on existing user and event has likes', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test from cor',
                    image: 'https://randomImage.png',
                    caption: 'test from cor',
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    likes: [user.id]
                })
                    .then(event =>
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Event.findById(event.id).lean())
                            .then(event => expect(event.likes).to.not.include(user.username))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Event.create({
            author: userObjectId,
            title: 'test from cor',
            image: 'https://randomImage.png',
            caption: 'test from cor',
            location: {
                type: 'Point',
                coordinates: [41.38879, 2.15899]
            },
            time: '08:00',
        })
            .then(event => toggleGoingEvent(userObjectId.toString(), event.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user => toggleGoingEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('event not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})