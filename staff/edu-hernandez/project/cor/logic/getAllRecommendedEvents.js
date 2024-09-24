import { Event, User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('going').lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({ _id: { $in: user.going } }).lean()
        })
        .then(events => events)
        .catch(error => { throw new SystemError(error.message) })
}