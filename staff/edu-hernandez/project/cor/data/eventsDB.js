import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { User, Event, Comment, Location, City } from './models.js'

const { ObjectId } = Types

mongoose.connect(process.env.MONGODB_URI)
console.debug(`Connected to ${process.env.MONGODB_URI}`)
    .then(() => Event.deleteMany())
    .then(() => Event.create([

        {
            date: '2024-08-08',
            title: 'Concert in the Park',
            description: 'Join us for a night of music under the stars.',
            images: ['/path/to/image1.jpg', '/path/to/image2.jpg']
        },
        {
            date: '2024-08-20',
            title: 'Art Gallery Opening',
            description: 'Explore the latest works from local artists.',
            images: ['/path/to/image3.jpg', '/path/to/image4.jpg']
        },
        {
            image: '/eventImage/gracia01.jpg',
            title: 'Festa Major de Gràcia',
            description: 'The Festa Major de Gràcia is one of the most vibrant and beloved neighborhood festivals in Barcelona. Held every August, the streets of Gràcia transform into an outdoor art gallery with colorful decorations, concerts, and activities. Each street competes for the best decoration, creating an atmosphere full of creativity and celebration. The festival also features live music, cultural performances, and traditional Catalan food, drawing locals and tourists alike.'
        },
        {
            image: '/eventImage/fleadonia02.jpg',
            title: 'Fleadonia',
            description: 'Fleadonia is a popular flea market in the Raval neighborhood of Barcelona, offering a wide range of second-hand and vintage items. Held on the first Sunday of every month, it is a perfect place for bargain hunters and vintage lovers to explore unique clothes, accessories, antiques, and books. The market has a relaxed and friendly atmosphere, often accompanied by live music and food stalls, creating a lively weekend experience.'
        },
        {
            image: '/eventImage/cinemaFresca01.jpg',
            title: 'Cinema a la Fresca',
            description: 'Cinema a la Fresca is a popular outdoor summer cinema event in Barcelona, typically held at Montjuïc Castle. Throughout the summer months, locals and visitors gather under the stars to enjoy classic films, independent movies, and international cinema. Attendees bring blankets, food, and drinks to enjoy a relaxed evening, with the backdrop of the city skyline and fresh air making it a memorable summer experience.'
        }
    ]))
    .then(() => mongoose.disconnect())
    .then(() => console.log(`Disconnected from ${process.env.MONGODB_URI}`))
    .then(() => console.log('events'))
    .catch(error => console.error(error))
