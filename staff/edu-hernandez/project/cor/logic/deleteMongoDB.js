import 'dotenv/config'
import { mongoose } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Connected to ${process.env.MONGODB_URI} MongoDB`)

        mongoose.connection.db.dropDatabase()
            .then(() => {
                console.log('Database deleted successfully')
            })
            .catch(error => console.error('Error deleting database:', error))
            .finally(() => { mongoose.connection.close() })
    })
    .catch(error => { console.error('Error connecting to MongoDB:', error) })