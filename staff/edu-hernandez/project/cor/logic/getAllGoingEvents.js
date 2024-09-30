import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('going').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({ _id: { $in: user.going } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const promises = events.map(event => {
                        event.going = event.going.some(userGoing => userGoing.toString() === userId)

                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    title: author.title,
                                    time: author.time,
                                    date: author.date,
                                    going: event.going
                                }

                                event.id = event._id.toString()
                                delete event._id

                                return event
                            })
                    })

                    return Promise.all(promises)
                        .then(events => events)
                })
        })
}
