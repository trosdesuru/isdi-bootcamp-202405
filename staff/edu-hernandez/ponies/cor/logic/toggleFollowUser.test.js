import toggleFollowUser from './toggleFollowUser.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'

mongoose.connect()
    .then(() => {
        console.log('connected')

        toggleFollowUser('eduhv', 'lucas', error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            console.log('follow user toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))