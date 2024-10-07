const mockDB = {
    carouselItems: [
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
    ],

    recommendedEvents: [
        { id: 1, title: 'Festa Major Poblenou', image: '/eventImage/poblenou01.jpg' },
        { id: 2, title: '🇨🇮 Irish Pub Michael Collins', image: '/eventImage/collins01.jpg' },
        { id: 3, title: 'Sónar 2024', image: '/eventImage/sonar01.jpg' },
        { id: 4, title: '🚌 Paseo Tuk Tuk', image: '/eventImage/tukTuk01.jpg' }
    ],

    popularEvents: [
        { id: 10, title: 'September La Mercé', image: '/eventImage/merce01.jpg' },
        { id: 20, title: 'Octubre Festa Les Rambles', image: '/eventImage/ramblas01.jpg' },
        { id: 30, title: '🌹 Abril Sant Jordi', image: '/eventImage/santJordi01.jpg' },
        { id: 40, title: 'August Sant Roc', image: '/eventImage/santRoc01.jpg' },
        { id: 50, title: '⚔️ July Festes del Raval', image: '/eventImage/raval01.jpg' },
        { id: 60, title: '🍻 July Festes Poblesec', image: '/eventImage/poblesec01.jpg' },
        { id: 70, title: '🍬 March Sant Medir', image: '/eventImage/santMedir01.jpg' },
        { id: 80, title: 'December New Year Eve', image: '/eventImage/newYear01.webp' }
    ],

    bannerEvent: {
        title: 'Mercè 2024',
        description: 'This is a very important event happening soon!',
        image: '/eventImage/merce02.webp'
    },

    randomEvents: [
        {
            id: 101,
            title: 'Barcelona tourist guide',
            description: 'Experience discovering the city by walk...',
            thumbnail: '/eventImage/tour01.jpg'
        },
        {
            id: 102,
            title: 'Parc Güell',
            description: 'A surreal paradise created by the legendary Barcelona architect Antonì Gaudì...',
            thumbnail: '/eventImage/parcGuell01.jpg'
        },
        {
            id: 103,
            title: 'Palau de la Música',
            description: 'The Palau, an icon of modernist architecture in downtown Barcelona...',
            thumbnail: '/eventImage/palauMusica01.jpg'
        }
    ],
}

export default mockDB