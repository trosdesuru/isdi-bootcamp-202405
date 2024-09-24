import React from 'react'
import Container from '../library/Container'

const RandomEventsList = ({ events }) => {
    return (
        <section className="random-events px-4 mt-8 mb-20 w-full overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-cities dark:text-dark_white">Randomly events for you</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Container key={event.id} className="p-4 shadow-lg rounded bg-white flex flex-col items-start dark:bg-inherit">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-bold text-grey mb-2 dark:text-dark_white">{event.title}</h3>
                        <p className="text-gray-600 dark:text-dark_white">{event.description}</p>
                    </Container>
                ))}
            </div>
        </section>
    )
}

export default RandomEventsList