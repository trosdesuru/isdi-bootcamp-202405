import 'dotenv/config'
import getAllEvents from './getAllEvents.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllEvents('66eb3089408473e1102fce1d', '66eb3089408473e1102fce19'))
    .then(() => console.log('Event successfully deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())