import { Event } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId) => {
    validate.string(userId, 'userId')

    try {
        const events = Event.find({})
        return events

    } catch (error) {
        throw new SystemError('Error fetching events from the database')
    }
}