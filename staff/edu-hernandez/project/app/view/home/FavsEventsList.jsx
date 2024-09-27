import { useState, useEffect } from 'react'
import logic from '../../logic'
import Event from './Event'

export default function FavsEventsList() {
    console.debug('FavsEventsList -> call')

    const [events, setEvents] = useState([])

    useEffect(() => {
        console.debug('FavsEventsList -> useEffect')

        loadEvents()
    }, [])

    const handleEventDeleted = () => {
        console.debug('FavsEventsList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        console.debug('FavsEventsList -> handleEventEdited')

        loadEvents()
    }

    const handleEventLikeToggled = () => {
        console.debug('FavsEventsList -> handleEventLikeToggled')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        console.debug('FavsEventsList -> handleEventFavToggled')

        loadEvents()
    }

    const handleUserFollowToggled = () => {
        console.debug('FavsEventsList -> handleUserFollowToggled')

        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.getAllFavEvents()
                .then(events => setEvents(events))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section className="flex flex-col gap-4">
        {events.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
            onEventFavToggled={handleEventFavToggled}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </section>
}
