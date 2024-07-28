import 'dotenv/config.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
const { ObjectId } = Types
import createPost from './createPost.js'

describe('createPost', () => {
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

    it('succeeds on creating a new post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                createPost(
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
                            expect(post.author).to.include('rfederer')

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