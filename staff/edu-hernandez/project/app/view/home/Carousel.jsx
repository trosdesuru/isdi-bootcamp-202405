import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon, BookmarkIcon, CalendarIcon, MapIcon } from '@heroicons/react/outline'
import logic from '../../logic'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'
import Button from '../library/Button'

import getAverageColor from '../../util/getAverageColor'

export default function Carousel({ event, items, onEventGoingToggled }) {
  console.debug('Carousel -> call')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [arrowColor, setArrowColor] = useState('text-white')
  const [iconColor, setIconColor] = useState('text-white')
  const [bgColor, setBgColor] = useState('bg-white')

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  useEffect(() => {
    const updateColors = () => {
      const image = items[currentIndex].image
      const averageColor = getAverageColor(image)

      if (averageColor) {
        const brightness = (averageColor.r * 0.299 + averageColor.g * 0.587 + averageColor.b * 0.114) / 255
        const newArrowColor = brightness > 0.5 ? 'text-black' : 'text-white'
        const newIconColor = brightness > 0.5 ? 'text-black' : 'text-white'
        const newBgColor = brightness > 0.5 ? 'bg-light_grey' : 'bg-dark_grey'

        setArrowColor(newArrowColor)
        setIconColor(newIconColor)
        setBgColor(newBgColor)
      }
    }

    updateColors()
  }, [currentIndex, items])

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

  return (
    <div className="relative w-full h-auto overflow-hidden">
      <Container className="relative w-full">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <Container key={index} className="w-full flex-shrink-0 h-[30rem] relative">
              <Image src={item.image} alt={item.title} className="w-full h-full object-cover" />

              <div className="absolute bottom-0 left-0 right-0 bg-white/70 ml-2 mr-2 mb-2 p-4 flex flex-col justify-end">
                <Heading level={2} className="text-xl font-bold text-grey font-moderustic">
                  {item.title}
                </Heading>

                <div className="relative flex-1">
                  <Paragraph className="text-grey font-moderustic text-md leading-relaxed mb-4 ml-0 pl-0">
                    {expandedIndex === index ? item.description : `${item.description.slice(0, 100)}...`} {item.description.length > 100 && (
                      <Button className="text-blue-500 inline ml-0" onClick={() => handleReadMore(index)}>
                          {expandedIndex === index ? 'read less' : 'read more'}
                      </Button>
                    )}
                  </Paragraph>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 p-4 flex justify-end">
                <Button onClick={handleGoingEventClick} className={`${iconColor} text-dark_white rounded-full p-3 font-normal font-bevan text-[15px] sm:text-[18px]`}>
                  go!
                </Button>

                <Button className={`${iconColor} px-4 py-2`}>
                  <ShareIcon className="w-6 h-6" />
                </Button>

                <Button className={`${iconColor} px-4 py-2`}>
                  <MapIcon className="w-6 h-6" />
                </Button>

                <Button className={`${iconColor} px-4 py-2`}>
                  <HeartIcon className="w-6 h-6" />
                </Button>
              </div>
            </Container>
          ))}
        </div>

        <Container className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {items.map((_, dotIndex) => (
            <span key={dotIndex} className={`h-3 w-3 rounded-full cursor-pointer ${dotIndex === currentIndex ? 'bg-cities-gradient' : 'bg-light_grey'}`} onClick={() => goToSlide(dotIndex)} />
          ))}
        </Container>

        <Button className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${arrowColor}`} onClick={prevSlide}>
          <ChevronLeftIcon className="w-8 h-8" />
        </Button>

        <Button className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${arrowColor}`} onClick={nextSlide}>
          <ChevronRightIcon className="w-8 h-8" />
        </Button>
      </Container>
    </div>
  )
}
