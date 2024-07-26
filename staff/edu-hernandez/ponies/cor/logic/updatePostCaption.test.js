import updatePostCaption from './updatePostCaption.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        updatePostCaption('eduhv', 'test', 'test1', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))