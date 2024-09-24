import 'dotenv/config'
import deletePost from './deleteEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66c1e45a876c92e20f312a9b', '66c4854f8d3fec26874e1e04'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
