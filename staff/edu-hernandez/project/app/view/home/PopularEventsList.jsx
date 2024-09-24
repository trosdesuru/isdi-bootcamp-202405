import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Section from '../library/Section'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Button from '../library/Button'
import getAverageColor from '../../util/getAverageColor'

const PopularEventsList = ({ popularEvents }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrowColor, setArrowColor] = useState('text-dark_white')

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? popularEvents.length - 1 : prevIndex - 1
        )
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === popularEvents.length - 1 ? 0 : prevIndex + 1
        )
    }

    useEffect(() => {
        const updateArrowColor = async () => {
            const image = popularEvents[currentIndex]?.image
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

    return (
        <Section className="popular-events px-4 mt-8 w-full relative overflow-hidden">
            <Heading level={2} className="text-xl font-bold mb-4 text-cities">
                Popular Events
            </Heading>

            <div className="relative w-full">
                {/* Slides Container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out space-x-4"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {popularEvents.map((event) => (
                        <Container key={event.id} className="flex-shrink-0 w-60 p-2 shadow-lg rounded">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                    <Heading level={3} className="text-lg font-bold dark:text-dark_white">{event.title}</Heading>
                                </div>
                            </div>
                        </Container>
                    ))}
                </div>

                {/* Carousel Buttons */}
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

            </div>
        </Section>
    )
}

export default PopularEventsList
