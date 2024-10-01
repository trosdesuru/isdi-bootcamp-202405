import { Event, User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

// const ValidateUserId = (userId) => {
//     if (typeof userId !== 'string') { throw new ValidationError('userId is not a string') }
// }

export default (userId) => {
    validate.string(userId, 'userId')
    // ValidateUserId(userId)

    return User.findById(userId).populate('going').lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({ _id: { $in: user.going } }).lean()
        })
        .then(events => events)
        .catch(error => { throw new SystemError(error.message) })
}