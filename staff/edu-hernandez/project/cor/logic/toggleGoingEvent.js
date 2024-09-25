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

                    const userGoingIndex = user.going.findIndex(eventObjectId =>
                        eventObjectId.toString() === eventId)
                    const eventGoingIndex = event.going.findIndex(userObjectId =>
                        userObjectId.toString() === userId)

                    if (userGoingIndex < 0 && eventGoingIndex < 0) {
                        user.going.push(eventId)
                        event.going.push(userId)

                    } else {
                        user.going.splice(userGoingIndex, 1)
                        event.going.splice(eventGoingIndex, 1)
                    }

                    return Promise.all([
                        User.updateOne({ _id: userId }, { $set: { going: user.going } }),
                        Event.updateOne({ _id: eventId }, { $set: { going: event.going } })
                    ])
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}