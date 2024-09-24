import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { eventId, rating, comment } = req.body

    try {
        logic.createEvent(userId, eventId, rating, comment)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}