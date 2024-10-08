import React from 'react'
import { useState, useEffect } from 'react'
import logic from '../../logic'

import Container from '../library/Container'
import Image from '../library/Image'
import Heading from '../library/Heading'
import Section from '../library/Section'
import Paragraph from '../library/Paragraph'

function getRandomEvents(events, n) {
    if (typeof n !== 'number' || n < 1) {
        throw new Error('n must be an integer greater than 0')
    }

    const shuffled = [...events]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, Math.min(n, shuffled.length))
}

const getFirstNWords = (text, n) => {
    if (!text) return '...'
    const words = text.split(' ')

    const splitted = words.slice(0, n).join(' ')

    return words.length > n ? `${splitted} ...` : splitted
}

const RandomEventsList = ({ refreshStamp }) => {
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        try {
            logic.getAllEvents()
                .then(allEvents => {

                    const randomEvents = getRandomEvents(allEvents, 3)
                    setEvents(randomEvents)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [refreshStamp])

    return (
        <Section className="random-events px-4 mt-8 mb-20 w-full overflow-auto">
            <Heading level={2} className="text-2xl font-bevan font-bold mb-4 text-cities dark:text-dark_white">Randomly events for you</Heading>
            <Container className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Container key={event.id} className="p-4 shadow-lg rounded bg-white flex flex-col items-start dark:bg-inherit">
                        <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded mb-4" />
                        <Heading level={3} className="text-lg font-bold text-grey mb-2 dark:text-dark_white">{event.title}</Heading>
                        <Paragraph className="text-gray-600 dark:text-dark_white">{getFirstNWords(event.caption, 6)}</Paragraph>
                    </Container>
                ))}
            </Container>
        </Section>
    )
}

export default RandomEventsList