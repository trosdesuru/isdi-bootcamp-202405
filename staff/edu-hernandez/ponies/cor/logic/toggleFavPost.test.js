import toggleFavPost from './toggleFavPost.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('eduhv', '669fd29f128481eb60c4e49b', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('fav post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))