import React, { useState } from 'react'
import Calendar from 'react-calendar'
import './calendarStyles.css'
import { FaHeart, FaCheck, FaStar } from 'react-icons/fa'

const CalendarPage = () => {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex flex-col items-center bg-transparent h-full w-screen">
      <main className="flex flex-col items-center my-0 w-full max-w-4xl mx-auto p-4">
        <div className="w-full max-w-lg mb-6">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) => {
              return date.getDate() === 8 || date.getDate() === 20 || date.getDate() === 26 || date.getDate() === 29
                ? 'highlighted-day'
                : ''
            }}
            className="calendarStyles.css"
          />
        </div>

        {/* Buttons like, fav, and going */}
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center justify-center bg-pink-500 text-white rounded-full p-3 shadow-custom">
            <FaHeart className="text-xl" />
          </button>
          <button className="flex items-center justify-center bg-ore text-white rounded-full p-3 shadow-custom">
            <FaStar className="text-xl" />
          </button>
          <button className="flex items-center justify-center bg-grass text-white rounded-full p-3 shadow-custom">
            <FaCheck className="text-xl" />
          </button>
        </div>

        {/* Event Title */}
        <div className="w-full text-left my-6">
          <h3 className="text-2xl font-bold text-title">Event Title</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
          </p>
        </div>

        {/* Images from users */}
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
