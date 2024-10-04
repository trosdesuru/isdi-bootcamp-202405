import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { mockDB } from 'com'

import Header from './Header'
import Footer from './Footer'
import Hello from './Hello'
import Carousel from './Carousel'
import RecommendedEventsList from './RecommendedEventsList'
import PopularEventsList from './PopularEventsList'
import BannerEvent from './BannerEvent'
import EventsList from './EventsList'
import FavsEventsList from './FavsEventsList'
import ResultsEventsList from './ResultsEventsList'
import RandomEventsList from './RandomEventsList'
import GoingEventsList from './GoingEventsList'
import SkeletonLoader from './SkeletonLoader'
import Map from './Map'
import Calendar from './Calendar'

const { events, carouselItems, recommendedEvents, goingEvents, popularEvents, bannerEvent, randomEvents } = mockDB

export default function Home({ onLogout }) {
    // console.debug('Home -> call')

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
        // console.debug('Home -> handleHomeClick')
        navigate('/')
    }

    const handleEventCreated = () => {
        // console.debug('Home -> handleEventCreated')
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleUsersClick = () => {
        // console.debug('Home -> handleUsersClick')
        navigate('/users/events')
    }

    const handleFavsClick = () => {
        // console.debug('Home -> handleFavsClick')
        navigate('/events/favs')
    }

    const handleMapClick = () => {
        // console.debug('Home -> handleMapClick')
        navigate('/map')
    }

    const handleCalendarClick = () => {
        // console.debug('Home -> handleCalendarClick')
        navigate('/calendar')
    }

    const handleGoingClick = () => {
        // console.debug('Home -> handleGoingClick')
        navigate('/events/going')
    }

    return (
        <>
            <Header onHomeClick={handleHomeClick} onEventCreated={handleEventCreated} onUsersClick={handleUsersClick} onLogout={onLogout} />

            <main className="flex flex-col gap-4 pt-4 mt-16 mr-0 min-h-screen max-w-screen overflow-auto 
                bg-white 
                dark:bg-background_grey">
                {loading ? (
                    <SkeletonLoader />) : (<Routes>
                        <Route path="/" element={
                            <>
                                <Carousel items={carouselItems} />
                                <EventsList refreshStamp={refreshStamp} />
                                <RecommendedEventsList recommendedEvents={recommendedEvents} />
                                <BannerEvent event={bannerEvent} />
                                <PopularEventsList popularEvents={popularEvents} />
                                <RandomEventsList events={randomEvents} />
                            </>
                        }
                        />
                        <Route path="/search" element={<ResultsEventsList />} />
                        <Route path="/hello/:to" element={<Hello />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/calendar" element={<Calendar events={events} />} />
                        <Route path="events/recommended" element={<RecommendedEventsList events={recommendedEvents} />} />
                        <Route path="events/popular" element={<PopularEventsList popularEvents={popularEvents} />} />
                        <Route path="events/random" element={<RandomEventsList events={randomEvents} />} />
                        <Route path="events/going" element={<GoingEventsList events={goingEvents} />} />
                        <Route path="events/favs" element={<FavsEventsList />} />
                    </Routes>
                )}
            </main>

            <Footer onEventCreated={handleEventCreated} onMapClicked={handleMapClick} onCalendarClicked={handleCalendarClick} onGoingEventsClicked={handleGoingClick} onFavsEventsClicked={handleFavsClick} />
        </>
    )
}