import toggleFollowUser from './toggleFollowUser.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFollowUser('eduhv', 'peterparker', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('follow user toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))