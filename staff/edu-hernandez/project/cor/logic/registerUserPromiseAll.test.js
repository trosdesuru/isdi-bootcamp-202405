import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import { User } from '../data/models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        return Promise.all([
            registerUser('Eduard', 'Hernandez', 'edu@hdz.com', 'eduhv', '123123123', '123123123')
                .then(user => console.log('user registered', user)),
            registerUser('Charlie', 'Brown', 'charlie@brown.com', 'charlie', '123123123', '123123123')
                .then(user => console.log('user registered', user)),
            registerUser('Bruce', 'Wayne', 'bruce@wayne.com', 'brucewayne', '123123123', '123123123')
                .then(user => console.log('user registered', user)),
            registerUser('Ricardo', 'Tapia', 'ricardo@tapia.com', 'ricardotapia', '123123123', '123123123')
                .then(user => console.log('user registered', user)),
            registerUser('Mary', 'Jane', 'mary@jane.com', 'lamary', '123123123', '123123123')
                .then(user => console.log('user registered', user)),
            registerUser('Charlie', 'Brown', 'charlie@brown.com', 'charlie', '123123123', '123123123')
                .then(user => console.log('user registered', user))
        ])
    })
    .then(() => {
        console.log('Model:', mongoose.model('User', User))
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => {
        mongoose.disconnect()
    })