import { useState, useEffect } from 'react'

import logic from '../../logic'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'
import formatDate from '../../util/formatDate.js'

export default function CreateEvent({
    onEventCreated,
    onCancelCreateEvent
}) {
    const [formattedDate, setformattedDate] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    const [eventTime, setEventTime] = useState('')

    console.debug('CreateEvent -> call')

    useEffect(() => {
        const currentDate = formatDate()
        setformattedDate(currentDate)

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        setCurrentTime(`${hours}:${minutes}`)
        setEventTime(`${hours}:${minutes}`)
    }, [])

    const parseCoordinates = (coordinatesString) => {
        const coordinates = coordinatesString.split(',').map(coord => parseFloat(coord.trim()))

        if (coordinates.length !== 2 || coordinates.some(isNaN)) {
            throw new Error('Invalid coordinates format. Please provide valid latitude and longitude.')
        }

        const [latitude, longitude] = coordinates
        if (latitude < -90 || latitude > 90) {
            throw new Error('Latitude must be between -90 and 90.')
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error('Longitude must be between -180 and 180.')
        }

        return coordinates
    }

    const handleCreateEventSubmit = event => {
        console.debug('CreateEvent -> handleCreateEventSubmit')

        event.preventDefault()

        const form = event.target

        const eventTitleInput = form['event-title-input']
        const eventImageInput = form['event-image-input']
        const eventCaptionInput = form['event-caption-input']
        const eventDateInput = form['event-date-input']
        const eventLocationInput = form['event-location-input']
        const eventTimeInput = form['event-time-input']

        const eventTitle = eventTitleInput.value
        const eventImage = eventImageInput.value
        const eventCaption = eventCaptionInput.value
        const eventDate = new Date(eventDateInput.value)
        const eventLocation = eventLocationInput.value
        const eventTime = eventTimeInput.value

        try {
            const location = {
                coordinates: parseCoordinates(eventLocation),
                type: 'Point'
            }

            logic.createEvent(eventTitle, eventImage, eventCaption, eventDate, location, eventTime)
                .then(() => {
                    if (typeof onEventcreated === 'function') {
                        onEventCreated()
                    } else {
                        console.warn('onEventcreated is not a function')
                    }
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

    const handleCancelCreateEventClick = () => {
        console.debug('CreateEvent -> handleCancelCreateEventClick')

        onCancelCreateEvent()
    }

    return <section className="fixed bottom-0 left-0 w-full
    bg-white shadow-2xl rounded-xl border-t-dark_white
    dark:bg-background_grey 
    dark:text-white p-2 box-border border-t 
    dark:border-t-light_grey">

        <Heading className="font-bevan text-2xl text-bold pt-4 pl-5 text-cities" level={2}>Create Event</Heading>

        <Form className="flex-col font-moderustic text-[14px]" onSubmit={handleCreateEventSubmit}>
            <Container className="flex-col">
                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-title-input">Event Title</Label>
                    <Input className="text-light_grey" id="event-title-input" />
                </Container>

                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-image-input">Image</Label>
                    <Input className="text-light_grey" id="event-image-input" />
                </Container>

                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-caption-input">Description</Label>
                    <Input className="text-light_grey" id="event-caption-input" />
                </Container>

                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-date-input">Date</Label>
                    <Input
                        className="text-light_grey"
                        id="event-date-input"
                        defaultValue={formattedDate}
                    />
                </Container>

                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-location-input">Location</Label>
                    <Input
                        className="text-light_grey"
                        id="event-location-input"
                        placeholder="Enter coordinates (lat, long)"
                        defaultValue="41.38879, 2.15899"
                    />
                </Container>

                <Container className="flex-col items-start text-light_grey">
                    <Label htmlFor="event-time-input">Time</Label>
                    <Input
                        className="text-light_grey"
                        id="event-time-input"
                        value={currentTime}
                    />
                </Container>

                <Container className="justify-center">
                    <Button className="text-white bg-grass p-2 rounded" type="submit">Submit</Button>
                    <Button className="font-modersutic dark:text-dark_white" type="reset" onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>
            </Container>
        </Form>
    </section>
}