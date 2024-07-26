import registerUser from './registerUser.js'
import 'dotenv/config.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        registerUser(
            'Peter',
            'Parker',
            'peter@parker.com',
            'peterparker',
            '123123123',
            '123123123',
            error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')

                mongoose.disconnect()
            })
    })
    .catch(error => console.error(error))