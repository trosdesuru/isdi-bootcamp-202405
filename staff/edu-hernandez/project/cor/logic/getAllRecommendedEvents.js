import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('fav').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            if (!Array.isArray(user.fav)) user.fav = []

            const events = user.fav

            if (events.length < 2) return []

            const promises = events.map(event => {
                event.fav = true

                return User.findById(event.author).lean()
                    .then(author => {
                        if (!author) throw new NotFoundError('author not found')

                        event.author = {
                            id: author._id.toString(),
                            username: author.username,
                            avatar: author.avatar,
                            following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                        }

                        event.id = event._id.toString()
                        delete event._id

                        return event
                    })
            })

            return Promise.all(promises)
                .then(events => events)
        })
}