import 'dotenv/config'
import createReview from './createReview.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createReview('66f44561d19777c2449d8617', '66f44570d19777c2449d861d', 5, 'Awesome event!'))
    .then(() => console.log('review created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())