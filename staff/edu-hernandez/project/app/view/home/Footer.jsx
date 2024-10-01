import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, CalendarIcon, HeartIcon, MapIcon } from '@heroicons/react/outline'

import Button from '../library/Button'

export default function Footer({ onEventCreated, onMapClicked, onCalendarClicked, onGoingEventsClicked }) {

    const handleCreateClick = () => {
        if (onEventCreated) { onEventCreated }
    }

    const handleMapClick = () => {
        if (onMapClicked) { onMapClicked() }
    }

    const handleCalendarClick = () => {
        if (onCalendarClicked) { onCalendarClicked() }
    }

    const handleGoingClick = () => {
        if (onGoingEventsClicked) { onGoingEventsClicked() }
    }

    return (
        <footer className="flex flex-row py-2 fixed bottom-0 left-0 w-full justify-around items-center z-10
        bg-background_grey 
        text-white p-2 shadow-custom">

            <Link to="/" className="flex flex-col items-center space-y-1" onClick={handleCreateClick}>
                <HomeIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Link>

            <Button onClick={handleMapClick}>
                <MapIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Button>

            <Button onClick={handleCalendarClick}>
                <CalendarIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Button>

            <Button onClick={handleGoingClick} className="text-cities rounded-full p-3 font-normal font-bevan text-[20px] sm:text-[24px]">
                go!
            </Button>

            <Link to="/events/favs" className="flex flex-col items-center space-y-1">
                <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 stroke-dark_white" />
            </Link>
        </footer>
    )
}