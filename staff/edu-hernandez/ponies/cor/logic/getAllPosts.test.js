import getAllPosts from './getAllPosts.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')
        
        getAllPosts('rubendiaz', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))