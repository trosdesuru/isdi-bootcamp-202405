import { useState, useEffect } from 'react'
import logic from '../../logic'
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

    const handleEventGoingToggled = () => {
        console.debug('EventsList -> handleEventGoingToggled')

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

    return <section className="flex flex-wrap flex-cols-1 md:flex-cols-2 lg:flex-cols-3 gap-4 w-full max-w-screen-xl overflow-hidden">
        {events.map(event =>
            <Event
                key={event.id}
                event={event}
                onEventDeleted={handleEventDeleted}
                onEventEdited={handleEventEdited}
                onEventGoingToggled={handleEventGoingToggled}
                onEventFavToggled={handleEventFavToggled}
                onUserFollowToggled={handleUserFollowToggled}
            />)}
    </section>
}
