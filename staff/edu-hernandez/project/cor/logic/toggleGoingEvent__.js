import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetEventId) => {
    validate.string(userId, 'userId')
    validate.string(targetEventId, 'targetEventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(targetEventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    const userGoingIndex = user.going.findIndex(eventObjectId => eventObjectId.toString() === targetEventId)
                    const eventGoingIndex = event.going.findIndex(userObjectId => userObjectId.toString() === userId)

                    if (userGoingIndex < 0 && eventGoingIndex < 0) {
                        user.going.push(targetEventId)
                        event.going.push(userId)
                    }
                    else {
                        if (userGoingIndex >= 0) user.going.splice(userGoingIndex, 1)
                        if (eventGoingIndex >= 0) event.going.splice(eventGoingIndex, 1)
                    }

                    return Promise.all([
                        User.updateOne({ _id: userId }, { $set: { going: user.going } }),
                        Event.updateOne({ _id: targetEventId }, { $set: { going: event.going } })
                    ])
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}