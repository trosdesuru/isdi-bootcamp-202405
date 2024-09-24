import 'dotenv/config'
import toggleGoingEvent from './toggleGoingEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleGoingEvent(
        '66f1dbfad82759f737de0a08', // userId
        '66f28eb15afb1e361b0cad2e'  // eventId
    ))
    .then(eventId => console.log('event going toggled', eventId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())