import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Hello from './Hello'
import Container from '../library/Container'
import Carousel from './Carousel'
import RecommendedEventsList from './RecommendedEventsList'
import PopularEventsList from './PopularEventsList'
import BannerEvent from './BannerEvent'
import EventsList from './EventsList'
import UserEventsList from './UserEventsList'
import FavsEventsList from './FavsEventsList'
import ResultsEventsList from './ResultsEventsList'
import RandomEventsList from './RandomEventsList'
import SkeletonLoader from './SkeletonLoader'
import Map from './Map'

export default function Home({ onLogout }) {
    console.debug('Home -> call')

    const navigate = useNavigate()
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false)
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [])

    const handleHomeClick = () => {
        console.debug('Home -> handleHomeClick')
        navigate('/')
    }

    const handleEventCreated = () => {
        console.debug('Home -> handleEventCreated')
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleUsersClick = () => {
        console.debug('Home -> handleUsersClick')
        navigate('/users/events')
    }

    const handleFavsClick = () => {
        console.debug('Home -> handleFavsClick')
        navigate('/favs')
    }

    const handleMapClick = () => {
        console.debug('Home -> handleMapClick')
        navigate('/map')
    }

    const carouselItems = [
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
    ]

    const recommendedEvents = [
        { id: 1, title: 'Festa Major Poblenou', image: '/eventImage/poblenou01.jpg' },
        { id: 2, title: '🇨🇮 Irish Pub Michael Collins', image: '/eventImage/collins01.jpg' },
        { id: 3, title: 'Sónar 2024', image: '/eventImage/sonar01.jpg' },
        { id: 4, title: '🚌 Paseo Tuk Tuk', image: '/eventImage/tukTuk01.jpg' }
    ]

    const popularEvents = [
        { id: 10, title: 'September La Mercé', image: '/eventImage/merce01.jpg' },
        { id: 20, title: 'Octubre Festa Les Rambles', image: '/eventImage/ramblas01.jpg' },
        { id: 30, title: '🌹 Abril Sant Jordi', image: '/eventImage/santJordi01.jpg' },
        { id: 40, title: 'August Sant Roc', image: '/eventImage/santRoc01.jpg' },
        { id: 50, title: '⚔️ July Festes del Raval', image: '/eventImage/raval01.jpg' },
        { id: 60, title: '🍻 July Festes Poblesec', image: '/eventImage/poblesec01.jpg' },
        { id: 70, title: '🍬 March Sant Medir', image: '/eventImage/santMedir01.jpg' },
        { id: 80, title: 'December New Year Eve', image: '/eventImage/newYear01.webp' }
    ]

    const bannerEvent = {
        title: 'Mercè 2024',
        description: 'This is a very important event happening soon!',
        image: '/eventImage/merce02.webp'
    }

    const randomEvents = [
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
    ]

    return <>
        <Container>
            <Header onHomeClick={handleHomeClick} onUsersClick={handleUsersClick} onLogout={onLogout} />

            <main className="flex flex-col gap-4 pt-4 mt-16 min-h-wscreen overflow-y-auto bg-white dark:bg-background_grey">
                {loading ? (<> <SkeletonLoader /> </>) : (<> <Carousel items={carouselItems} />
                    <Routes>
                        <Route path="/" element={<EventsList refreshStamp={refreshStamp} />} />
                        <Route path="users/events" element={<UserEventsList />} />
                        <Route path="/favs" element={<FavsEventsList />} />
                        <Route path="/hello/:to" element={<Hello />} />
                        <Route path="/search" element={<ResultsEventsList />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="events/recommended" element={<RecommendedEventsList events={recommendedEvents} />} />
                        <Route path="events/popular" element={<PopularEventsList popularEvents={popularEvents} />} />
                        <Route path="events/random" element={<RandomEventsList events={randomEvents} />} />
                    </Routes>

                    <RecommendedEventsList recommendedEvents={recommendedEvents} />
                    <BannerEvent event={bannerEvent} />
                    <PopularEventsList popularEvents={popularEvents} />
                    <RandomEventsList events={randomEvents} />
                </>
                )}
            </main>
            <Footer onEventCreated={handleEventCreated} onMapClicked={handleMapClick} />
        </Container>
    </>
}