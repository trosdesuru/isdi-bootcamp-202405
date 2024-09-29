import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'
import { Types } from 'mongoose'

const { NotFoundError, SystemError, ValidationError } = errors
const { ObjectId } = Types


export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('going').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            if (!user.going.every(event => ObjectId.isValid(event._id)))
                throw new ValidationError('invalid event._id in going property')

            if (!Array.isArray(user.going)) user.going = []

            const events = user.going

            const promises = events.map(event => {
                event.going = true

                return User.findById(event.author).lean()
                    .then(author => {
                        if (!author) throw new NotFoundError('author not found')

                        event.author = {
                            id: author._id.toString(),
                            username: author.username,
                            avatar: author.avatar,
                            going: user.going.some(userObjectId => userObjectId.toString() === author._id.toString())
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