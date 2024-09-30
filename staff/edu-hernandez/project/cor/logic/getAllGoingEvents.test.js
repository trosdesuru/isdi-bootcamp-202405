import 'dotenv/config'
import getAllGoingEvents from './getAllGoingEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllGoingEvents('66fa92c16018e425775d4c35'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
