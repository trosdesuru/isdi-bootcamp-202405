import logic from '../../logic'
import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import getAverageColor from '../../util/getAverageColor'

import Section from '../library/Section'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

const PopularEventsList = ({ userId }) => {
    // console.debug('PopularEventsList -> call')

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrowColor, setArrowColor] = useState('text-dark_white')

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? items.length - 1 : prevIndex - 1)
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === items.length - 1 ? 0 : prevIndex + 1)
    }

    useEffect(() => {
        const updateArrowColor = async () => {
            const image = items[currentIndex]?.image
            if (image) {
                const averageColor = await getAverageColor(image)
                if (averageColor) {
                    const brightness = (averageColor.r * 0.299 + averageColor.g * 0.587 + averageColor.b * 0.114) / 255
                    const newArrowColor = brightness > 0.5 ? 'text-grey' : 'text-dark_white'
                    setArrowColor(newArrowColor)
                }
            }
        }

        updateArrowColor()
    }, [currentIndex])

    useEffect(() => {
        logic.getAllGoingEvents(userId)
            .then(items => {
                setItems(items)
                setLoading(false)
            })
            .catch(error => {
                console.error('error fetching popular events:', error)

                setLoading(false)
            })
    }, [userId])

    if (loading) return <Paragraph>Loading..</Paragraph>

    if (items.length === 0) return <Container className="bg-grey p-10"><Paragraph className="font-bevan text-lg text-cities">Slide here<br /><span className="font-poppins font-normal text-lg">Wait for other users mark events to go...</span></Paragraph></Container>

    return (
        <Section className="popular-events px-4 mt-8 w-full relative overflow-hidden">
            <Heading level={2} className="text-2xl font-bevan ont-bold mb-4 text-cities">
                Popular Events
            </Heading>

            <Container className="relative w-full">
                <Container
                    className="flex transition-transform duration-500 ease-in-out space-x-4"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item) => (
                        <Container key={item.id} className="flex-shrink-0 w-60 p-2 shadow-lg rounded">
                            <Container className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                                <Container>
                                    <Heading level={3} className="text-lg font-bold dark:text-dark_white">{item.title}</Heading>
                                </Container>
                            </Container>
                        </Container>
                    ))}
                </Container>

                <Button
                    className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${arrowColor} p-2 rounded shadow-md bg-white opacity-70`}
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    title="Previous Slide"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>

                <Button
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${arrowColor} p-2 rounded shadow-md bg-white opacity-70`}
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    title="Next Slide"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </Button>

            </Container>
        </Section>
    )
}

export default PopularEventsList
