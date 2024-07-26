import 'dotenv/config.js'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect()
    .then(() => {
        console.log('connected')

        toggleLikePost('eduhv', '', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
