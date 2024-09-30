import 'dotenv/config'
import toggleGoingEvent from './toggleGoingEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleGoingEvent(
        '66fa92c16018e425775d4c2b', // userId
        '66fa92e422f8c8b1846f084e'  // eventId
    ))
    .then(eventId => console.log('event going toggled', eventId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())