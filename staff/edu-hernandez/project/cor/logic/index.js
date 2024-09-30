import getAllEvents from './getAllEvents.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js'
import toggleLikeEvent from './toggleGoingEvent.js'
import createEvent from './createEvent.js'
import deleteEvent from './deleteEvent.js'
import toggleFavEvent from './toggleUserEvent.js'
import toggleFollowUser from './toggleFollowUser.js'
import toggleGoingEvent from './toggleGoingEvent.js'
import authenticateUser from './authenticateUser.js'
import searchEvent from './searchEvent.js'
import getAllFavEvents from './getAllFavEvents.js'
import updateEventCaption from './updateEventCaption.js'
import createReview from './createReview.js'
import getAllRecommendedEvents from './getAllRecommendedEvents.js'
import getAllMapEvents from './getAllMapEvents.js'
import getAllGoingEvents from './getAllGoingEvents.js'

const logic = {
    authenticateUser,
    createEvent,
    deleteEvent,
    getAllFavEvents,
    getAllMapEvents,
    getAllEvents,
    getAllGoingEvents,
    getUserName,
    registerUser,
    toggleFavEvent,
    toggleGoingEvent,
    toggleFollowUser,
    toggleLikeEvent,
    updateEventCaption,
    searchEvent,
    createReview,
    getAllRecommendedEvents,
}

export default logic