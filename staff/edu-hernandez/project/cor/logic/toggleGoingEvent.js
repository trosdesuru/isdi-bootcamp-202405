import { User, Event } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    const { going } = user

                    const index = going.findIndex(userObjectId => userObjectId.toString() === eventId)

                    if (index < 0)
                        going.push(eventId)
                    else
                        going.splice(index, 1)

                    return User.updateOne({ _id: userId }, { $set: { going } })
                        .catch(error => { throw new SystemError(error.message) })
                })
            })
            .then(() => { })
}