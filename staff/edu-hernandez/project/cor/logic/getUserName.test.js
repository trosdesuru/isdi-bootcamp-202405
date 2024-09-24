import 'dotenv/config'
import getUserName from './getUserName.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66d876dc83e1efd0eb5e43a8', '66d876dc83e1efd0eb5e43a8'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())