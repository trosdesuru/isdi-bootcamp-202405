import 'dotenv/config.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
const { ObjectId } = Types
import deletePost from './deletePost.js'

describe('deletePost', () => {
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

    it('succeeds on deleting a post', done => {
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
                caption: 'anycaption'
            }))
            .then(() => {
                deletePost(
                    'rfederer',
                    'https://example.com/image.gif',
                    'any caption',
                    error => {
                        if (error) {
                            console.log(error)

                            return
                        }
                        Post.findOne({ author: 'rfederer' })
                            .then(post => {
                                expect(post.author).to.include(null)

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