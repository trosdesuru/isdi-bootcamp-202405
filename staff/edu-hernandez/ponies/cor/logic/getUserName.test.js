import getUserName from './getUserName.js'
import 'dotenv/config.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')
        
        getUserName('eduhv', 'rtapia', (error, name) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(name)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))