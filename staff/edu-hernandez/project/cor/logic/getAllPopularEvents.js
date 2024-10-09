import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ _id: { $ne: userId } }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(users => {
            const userGo = users.flatMap(user => user.going)

            return Event.find({ _id: { $in: userGo } }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const popularEvents = events.filter(event => {
                        const goCount = userGo.filter(goEventId => goEventId.toString() === event._id.toString()).length
                        return goCount >= 1
                    })

                    const promises = popularEvents.map(event => {
                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    username: author.username,
                                    avatar: author.avatar
                                }

                                event.id = event._id.toString()
                                delete event._id

                                return event
                            })
                    })

                    return Promise.all(promises)
                        .then(recommendedEvents => recommendedEvents)
                })
        })
}