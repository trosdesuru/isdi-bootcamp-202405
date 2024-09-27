import { FaHeart, FaStar } from 'react-icons/fa'
import Container from '../library/Container'
import Image from '../library/Image'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function EventCard({ event }) {
    return (
        <Container className="flex p-4 shadow-lg bg-transparent rounded-lg w-full max-w-full overflow-hidden">
            <Image src={event.image} alt={event.title} className="rounded-md w-full h-auto" />
            <Heading level={2}>alt={event.author.username} Hola, test</Heading>
            <Heading level={3} className="font-bold mt-2 truncate">{event.title}</Heading>
            <Paragraph className="line-clamp-3">{event.description}</Paragraph>
            <Container className="flex justify-between items-center mt-4">
                <Button className="text-pink-500"><FaHeart /></Button>
                <Button className="text-yellow-500"><FaStar /></Button>
            </Container>
        </Container>
    )
}
