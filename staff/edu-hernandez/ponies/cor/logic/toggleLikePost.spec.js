import 'dotenv/config.js'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
const { ObjectId } = Types

describe('toggleLikePost', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
    })
        .catch(error => done(error))


    it('succeeds on existing user and post has no likes', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                Post.create({ author: 'rfederer', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hmbjlxcDh6YjYzODQ1bjhsMjkzNnRhZDllMGx1YjRxdmxyd2tnNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7E8UPJzPuCMAh3XKN1/giphy.gif', caption: 'backanders' })
                    .then(post => {
                        toggleLikePost('monoloco', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

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
            .catch(error => done(error))
    })

    it('succeeds on existing user and post has likes', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                Post.create({ author: 'rfederer', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hmbjlxcDh6YjYzODQ1bjhsMjkzNnRhZDllMGx1YjRxdmxyd2tnNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7E8UPJzPuCMAh3XKN1/giphy.gif', caption: 'backanders', likes: ['rfederer'] })
                    .then(post => {
                        toggleLikePost('rfederer', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

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
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: 'rfederer', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hmbjlxcDh6YjYzODQ1bjhsMjkzNnRhZDllMGx1YjRxdmxyd2tnNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7E8UPJzPuCMAh3XKN1/giphy.gif', caption: 'backanders' })
            .then(post => {
                toggleLikePost('rfederer', post.id, error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'Roger', surname: 'Federer', email: 'roger@federer.com', username: 'rfederer', password: '123123123' })
            .then(() => {
                toggleLikePost('rfederer', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    

    afterEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })

})