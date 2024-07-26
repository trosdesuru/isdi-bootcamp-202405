import 'dotenv/config.js'
import deletePost from './deletePost.js'
import mongoose, { MongooseError } from 'mongoose'


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')
        
        deletePost('eduhv', '669fd29f128481eb60c4e49b', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
