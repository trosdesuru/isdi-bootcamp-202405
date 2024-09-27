import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, CalendarIcon, HeartIcon, MapIcon } from '@heroicons/react/outline'

import Button from '../library/Button'

export default function Footer({ onEventCreated, onMapClicked }) {
    const handleMapClick = () => {
        if (onMapClicked) { onMapClicked() }
    }

    return (
        <footer className="flex flex-row py-2 fixed bottom-0 left-0 w-full justify-around items-center
        bg-background_grey 
        text-white p-2 shadow-custom">

            <Link to="/" className="flex flex-col items-center space-y-1">
                <HomeIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Link>

            <Button onClick={handleMapClick}>
                <MapIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Button>

            <Link to="/users/events" className="flex flex-col items-center space-y-1">
                <CalendarIcon className="stroke-dark_white h-8 w-8 sm:h-10 sm:w-10" />
            </Link>

            <Link to="/your-events" className="text-cities rounded-full p-3 font-normal font-bevan text-[20px] sm:text-[24px]">
                go!
            </Link>

            <Link to="/events/favs" className="flex flex-col items-center space-y-1">
                <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 stroke-dark_white" />
            </Link>
        </footer>
    )
}