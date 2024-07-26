import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    Post.deleteOne({ _id: new ObjectId(postId) })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))

}