import 'dotenv/config.js'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError } = errors
const { ObjectId } = Types

describe('toggleLikePost', () => {
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

    it('succeeds on existing user and post has no likes', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders'
            }))
            .then(post => {
                toggleLikePost('rfederer', post.id, error => {
                    if (error) return done(error)

                    Post.findById(post.id).lean()
                        .then(post => {
                            expect(post.likes).to.include('rfederer')
                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and post has likes', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders',
                likes: ['rfederer']
            }))
            .then(post => {
                toggleLikePost('rfederer', post.id, error => {
                    if (error) return done(error)

                    Post.findById(post.id).lean()
                        .then(post => {
                            expect(post.likes).to.not.include('rfederer')
                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({
            author: 'rfederer',
            image: 'https://example.com/image.gif',
            caption: 'backanders'
        })
            .then(post => {
                toggleLikePost('nonexistent', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                toggleLikePost('rfederer', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('post not found')
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('User tries to like his/her own post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders'
            }))
            .then(post => {
                toggleLikePost('rfederer', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.not.equal('Cannot like your own post')
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('user like a post they have already liked', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => Post.create({
                author: 'someuser',
                image: 'https://example.com/image.gif',
                caption: 'another post',
                likes: ['rfederer']
            }))
            .then(post => {
                toggleLikePost('rfederer', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.not.equal('You have already liked this post')
                    done()
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
