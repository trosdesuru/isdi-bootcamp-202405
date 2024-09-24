import 'dotenv/config'
import createReview from './createReview.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createReview('66accdd2e9ee54b250431485', '66acce028f9a08e3fb4e26a7', 5, 'Awesome event!'))
    .then(() => console.log('review created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())