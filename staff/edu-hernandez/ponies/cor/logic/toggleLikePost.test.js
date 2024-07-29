import 'dotenv/config.js'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('eduhv', 'postId', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
