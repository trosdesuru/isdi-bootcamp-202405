import React, { useState, useEffect } from 'react'
import getAllEvents from '../../logic/getAllEvents'
import Calendar from 'react-calendar'
import './calendar.css'

const CalendarPage = () => {
  console.debug('CalendarPage -> call')

  const [events, setEvents] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    console.debug('useEffect -> call')

    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents()
        console.debug(eventsData)

        setEvents(eventsData)
      } catch (error) {
        console.error('error getting events date', error)
      }
    }

    fetchEvents()
  }, [])

  const eventDates = Array.isArray(events) ? events.map(event => new Date(event.date).getDate()) : []

  return (
    <div className="flex flex-col items-center bg-transparent h-full w-screen">
      <main className="flex flex-col items-center my-0 w-full max-w-4xl mx-auto p-4">
        <div className="w-full max-w-lg mb-6">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) => {
              return eventDates.includes(date.toLocaleDateString()) ? 'highlighted-day' : ''
            }}
            className="calendar.css"
          />
        </div>

        <div className="w-full text-left my-6">
          <h3 className="text-2xl font-bold text-title">Event Title</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
          </p>
        </div>

        <div className="w-full">
          <h4 className="text-pink-500 font-bold text-lg mb-2">Events Images from Users</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-300 h-24 w-full rounded-md"></div>
            <div className="bg-gray-300 h-24 w-full rounded-md"></div>
            <div className="bg-gray-300 h-24 w-full rounded-md"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CalendarPage
