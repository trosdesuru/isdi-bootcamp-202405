import React from 'react'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Image from '../library/Image'
import Avatar from './Avatar'

export default function EventCard({ event, onClose }) {
    return (
        <Container className="flex flex-col fixed items-start bottom-0 left-0 right-0 pb-20 bg-white dark:bg-background_grey pl-5 shadow-custom rounded-2xl z-10">
            <Container className="flex flex-row items-center">
                <Avatar url={'./avatar/avatarIcon.png'} className="w-12 h-12 rounded-full shadow-lg" />
                <Paragraph className="text-lg font-bevan text-light_grey dark:text-dark_white">{event.author.username}</Paragraph>
            </Container>

            <Heading level={2} className="text-lg font-bold dark:text-dark_white">{event.title}</Heading>
            <Paragraph className="mt-2 dark:text-dark_white">{event.caption}</Paragraph>
            <Image src={event.image} className="w-1/2 rounded-lg shadow-lg object-cover" />
            <Button onClick={onClose} className=" font-montserrat text-red-400">close card</Button>
        </Container>
    )
}