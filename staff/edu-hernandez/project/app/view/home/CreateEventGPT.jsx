import { useState, useEffect } from 'react'
import logic from '../../logic'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'
import formatDate from '../../util/formatDate.js'

export default function CreateEvent({ onEventCreated, onCancelCreateEvent }) {
    const [formattedDate, setFormattedDate] = useState('')
    console.debug('CreateEvent -> call')

    useEffect(() => {
        // Suponiendo que formatDate necesita un argumento de fecha, si no es el caso, ajusta la llamada
        const currentDate = new Date() // Obtiene la fecha actual
        const newDate = formatDate(currentDate)
        setFormattedDate(newDate)
    }, []) // Este efecto se ejecutará una sola vez al montar el componente

    const handleCreateEventSubmit = event => {
        console.debug('CreateEvent -> handleCreateEventSubmit')

        event.preventDefault()

        const form = event.target

        const eventTitleInput = form['event-title-input']
        const eventImageInput = form['event-image-input']
        const eventCaptionInput = form['event-caption-input']
        const eventDateInput = form['event-date-input']
        const eventLocationInput = form['event-location-input']

        const eventTitle = eventTitleInput.value
        const eventImage = eventImageInput.value
        const eventCaption = eventCaptionInput.value
        const eventDate = new Date(eventDateInput.value)
        const eventLocation = eventLocationInput.value

        try {
            logic.createEvent(eventTitle, eventImage, eventCaption, eventDate,
                { coordinates: eventLocation.split(',').map(Number), type: 'Point' }
            )
                .then(() => onEventCreated())
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

    return (
        <section className="fixed bottom-0 left-0 w-full bg-white dark:bg-black dark:text-white p-2 box-border">
            <Heading level="2">Create Event</Heading>

            <Form className="flex-col" onSubmit={handleCreateEventSubmit}>
                <Container className="flex-col">
                    <Container className="flex-col items-start">
                        <Label htmlFor="event-title-input">Event Title</Label>
                        <Input className="text-black" id="event-title-input" />
                    </Container>

                    <Container className="flex-col items-start">
                        <Label htmlFor="event-image-input">Image</Label>
                        <Input className="text-black" id="event-image-input" />
                    </Container>

                    <Container className="flex-col items-start">
                        <Label htmlFor="event-caption-input">Description</Label>
                        <Input className="text-black" id="event-caption-input" />
                    </Container>

                    <Container className="flex-col items-start">
                        <Label htmlFor="event-date-input">Date</Label>
                        <Input
                            className="text-black"
                            id="event-date-input"
                            type="date"
                            defaultValue={formattedDate} // Establece el valor predeterminado de la fecha
                        />
                    </Container>

                    <Container className="flex-col items-start">
                        <Label htmlFor="event-location-input">Location</Label>
                        <Input className="text-black" id="event-location-input" placeholder="Enter coordinates (lat, long)" />
                    </Container>

                    <Container className="justify-center">
                        <Button type="submit">Ok</Button>
                        <Button type="reset" onClick={handleCancelCreateEventClick}>Cancel</Button>
                    </Container>
                </Container>
            </Form>
        </section>
    )
}
