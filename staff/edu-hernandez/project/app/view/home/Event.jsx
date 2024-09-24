import logic from '../../logic'

import formatTime from '../../util/formatTime'

import { useState } from 'react'

import Button from '../library/Button'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'

import Avatar from './Avatar'

export default function Event({
    event,
    onEventDeleted,
    onEventEdited,
    onEventFavToggled,
    onEventGoingToggled,
    onUserFollowToggled
}) {
    console.debug('Event -> call')

    const [editEventVisible, setEditEventVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteEventClick = () => setConfirmMessage('Delete Event?')

    const handleDeleteEventAccept = () => {
        try {
            logic.deleteEvent(event.id)
                .then(() => onEventDeleted())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteEventCancel = () => setConfirmMessage(null)


    const handleEditEventClick = () => {
        console.debug('Event -> handleEditEvent')

        setEditEventVisible(true)
    }

    const handleCancelEditEventClick = () => {
        console.debug('Event -> handleCancelEditEventClick')

        setEditEventVisible(false)
    }

    const handleEditEventSubmit = event => {
        console.debug('Event -> handleEditEventSubmit')

        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updateEventCaption(event.id, newCaption)
                .then(() => {
                    setEditEventVisible(false)

                    onEventEdited()
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

    const handleGoingEventClick = () => {
        console.debug('Event -> handleGoingEventClick')

        try {
            logic.toggleGoingEvent(event.id)
                .then(() => onEventGoingToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFavEventClick = () => {
        console.debug('Event -> handleFavEventClick')

        try {
            logic.toggleFavEvent(event.id)
                .then(() => onEventFavToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFollowUserClick = () => {
        console.debug('Event -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(event.author.id)
                .then(() => onUserFollowToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return (
        <article className="shadow-[1px_lightgray] bg-[DimGray] dark:bg-dimgray">
            <Container className="items-center">
                <Avatar url={'/avatar/'} />

                <Heading level="1" className="dark:text-white">{event.author.username}</Heading>

                <Button onClick={handleFollowUserClick}>{event.author.following ? 'follow' : 'unfollow'}</Button>
            </Container>

            <Heading level='2' className="dark:title-white">{event.title}</Heading>

            <Image src={event.image} title={event.title} alt={event.caption} caption={event.caption} className="w-full" />

            <Paragraph className="dark:text-white">{event.caption}</Paragraph>

            <Container>
                <Button onClick={handleGoingEventClick}>{(event.going ? 'going' : 'not going')}</Button>
                <Button onClick={handleFavEventClick}>{event.fav ? 'fav' : 'include fav'}</Button>

                {event.author.id === logic.getUserId() && (
                    <>
                        <Button onClick={handleDeleteEventClick}>delete</Button>
                        <Button onClick={handleEditEventClick}>edit comment</Button>
                    </>
                )}
            </Container>

            <Time>{formatTime(new Date(event.date))}</Time>

            {editEventVisible && (
                <Form onSubmit={handleEditEventSubmit} className="flex-col">
                    <Container className="flex-col">
                        <Label htmlFor="edit-caption-input">Caption</Label>
                        <Input id="edit-caption-input" defaultValue={event.caption} />
                    </Container>

                    <Container className="justify-center">
                        <Button type="submit">Save</Button>
                        <Button type="button" onClick={handleCancelEditEventClick}>Cancel</Button>
                    </Container>
                </Form>
            )}

            {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel} />}
        </article>
    )
}
