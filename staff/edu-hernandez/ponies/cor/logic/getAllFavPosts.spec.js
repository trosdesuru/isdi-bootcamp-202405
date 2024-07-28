import 'dotenv/config.js'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
const { ObjectId } = Types

describe('getAllFavPost', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on existing user and post has favs', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders'
            }))
            .then(post => {
                getAllFavPosts(user.username, post.id, error => {
                    if (error) {
                        console.log(error)

                        return
                    }

                    User.findOne({ username: 'rfederer' })
                        .then(user => {
                            expect(user.favs).to.include(post.id)

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })


    afterEach(done => {
        Post.deleteMany()
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