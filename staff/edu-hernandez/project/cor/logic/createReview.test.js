import 'dotenv/config'
import createReview from './createReview.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createReview('66fa8a7f38c10dbc655f643c', '66fa8aa7bb07c6b35593a875', 5, 'Awesome event!'))
    .then(() => console.log('review created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())