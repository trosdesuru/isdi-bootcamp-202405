import logic from '../../logic'

import { useState, useEffect } from 'react'

import Event from './Event'

export default function EventsList() {
    console.debug('EventsList -> call')

    const [events, setEvents] = useState([])

    useEffect(() => {
        console.debug('EventsList -> useEffect')

        loadEvents()
    }, [])

    const handleEventDeleted = () => {
        console.debug('EventsList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        console.debug('EventsList -> handleEventEdited')

        loadEvents()
    }

    const handleEventLikeToggled = () => {
        console.debug('EventsList -> handleEventLikeToggled')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        console.debug('EventsList -> handleEventFavToggled')

        loadEvents()
    }

    const handleUserFollowToggled = () => {
        console.debug('EventsList -> handleUserFollowToggled')

        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.getAllEvents()
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

    return <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl">
        {events.map(event =>
            <Event
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
