import getAllPoniesPosts from './getAllPoniesPosts.js'
import 'dotenv/config'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getAllPoniesPosts('clark', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))